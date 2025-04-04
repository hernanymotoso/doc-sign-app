'use server'

import { ServerError } from '@/actions/_errors/server-error'
import { db } from '@/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { DeleteDocumentState } from './types'

export async function deleteDocument(_: DeleteDocumentState, documentId: string): Promise<DeleteDocumentState> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) throw new Error('Você precisa estar logado para excluir documentos.')
    const document = await db.document.findFirst({
      where: {
        id: documentId,
        userId: session.user.id,
      },
    })

    if (!document) throw new Error('Documento não encontrado.')

    await db.document.delete({
      where: {
        id: documentId,
      },
    })

    return {
      success: true,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      }
    } else {
      return {
        error: new ServerError().message,
      }
    }
  }
}
