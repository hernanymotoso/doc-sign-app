'use server'

import { db } from '@/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ServerError } from '@/actions/_errors/server-error'
import { uploadToS3 } from '@/lib/s3'
import { SignatureState } from './types'

export async function createSignature(
  _: SignatureState,
  { documentId, signatureData }: { documentId: string; signatureData: string },
): Promise<SignatureState> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return { error: 'Unauthorized' }
    }

    const existingSignature = await db.signature.findFirst({
      where: {
        documentId,
        userId: session.user.id,
      },
    })

    if (existingSignature) {
      return { error: 'Você já assinou este documento' }
    }

    const buffer = Buffer.from(signatureData.split(',')[1], 'base64')
    const fileName = `signatures/${documentId}/${session.user.id}_${Date.now()}.png`
    const signatureUrl = await uploadToS3(buffer, fileName)

    await db.signature.create({
      data: {
        imageUrl: signatureUrl,
        documentId,
        userId: session.user.id,
      },
    })

    await db.document.update({
      where: { id: documentId },
      data: { status: 'SIGNED' },
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating signature:', error)
    return { error: error instanceof Error ? error.message : new ServerError().message }
  }
}
