'use server'

import { db } from '@/db'
import { uploadToS3 } from '@/lib/s3'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { uploadSchema } from './schema'
import { ServerError } from '@/actions/_errors/server-error'
import { UploadDocumentState } from './types'

export async function uploadDocument(
  _: UploadDocumentState,
  data: z.infer<typeof uploadSchema>,
): Promise<UploadDocumentState> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return {
        errorMessage: 'Você precisa estar logado para fazer upload de documentos.',
      }
    }

    const file = data.file[0] as File
    if (!file) {
      return {
        errorMessage: 'Nenhum arquivo selecionado.',
      }
    }

    if (file.type !== 'application/pdf') {
      return {
        errorMessage: 'Apenas arquivos PDF são permitidos.',
      }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = `documents/${Date.now()}-${file.name}`
    const url = await uploadToS3(buffer, fileName)

    await db.document.create({
      data: {
        name: file.name,
        url,
        userId: session.user.id,
      },
    })

    return {
      successMessage: 'Documento enviado com sucesso!',
    }
  } catch (error) {
    console.error('Upload error:', error)
    return {
      errorMessage: new ServerError().message,
    }
  }
}
