import { db } from '@/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { DocumentWithSignatures } from './types'

export async function getDocumentById(id: string): Promise<DocumentWithSignatures | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  const document = await db.document.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      signatures: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          signedAt: 'desc',
        },
      },
    },
  })

  if (!document) return null

  return document
}
