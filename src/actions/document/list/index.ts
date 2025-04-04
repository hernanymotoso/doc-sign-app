'use server'

import { db } from '@/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { cache } from 'react'
import { ServerError } from '@/actions/_errors/server-error'
import { DocumentsResponse } from './types'

const ITEMS_PER_PAGE = 10

export const getDocuments = cache(async (prevState: DocumentsResponse, page = 1): Promise<DocumentsResponse> => {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return {
        ...prevState,
        error: 'Você precisa estar logado para ver seus documentos.',
      }
    }

    const skip = (page - 1) * ITEMS_PER_PAGE
    const [documents, total] = await Promise.all([
      db.document.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          name: true,
          url: true,
          created_at: true,
        },
        skip,
        take: ITEMS_PER_PAGE,
        orderBy: {
          created_at: 'desc',
        },
      }),
      db.document.count({
        where: {
          userId: session.user.id,
        },
      }),
    ])

    return {
      documents,
      totalPages: Math.ceil(total / ITEMS_PER_PAGE),
      currentPage: page,
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
    return {
      ...prevState,
      error: new ServerError().message,
    }
  }
})
