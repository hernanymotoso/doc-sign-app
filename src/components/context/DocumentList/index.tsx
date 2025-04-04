'use client'

import { getDocuments } from '@/actions/document/list'
import { startTransition, useActionState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DocumentListState } from './types'
import { DeleteDocumentButton } from '../DeleteDocumentButton'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { Eye, Trash2, FileSignature } from 'lucide-react'

export function DocumentList() {
  const [state, action, isPending] = useActionState<DocumentListState, number>(getDocuments, {
    documents: [],
    totalPages: 1,
    currentPage: 1,
  })

  const handlePageChange = (page: number) => {
    startTransition(() => {
      action(page)
    })
  }

  const handleDeleteSuccess = () => {
    startTransition(() => {
      action(state?.currentPage || 1)
    })
  }

  useEffect(() => {
    startTransition(() => {
      action(1)
    })
  }, [action])

  if (!state) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-red-500">{state.error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg border border-gray-700 bg-gray-800">
        {isPending && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm">
            <div className="size-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-gray-700 text-xs uppercase text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>

                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                  Data de criação
                </th>

                <th scope="col" className="hidden px-6 py-3 md:table-cell">
                  Status
                </th>

                <th scope="col" className="px-6 py-3 text-right">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {state.documents.map(document => (
                <tr key={document.id} className="border-b border-gray-700">
                  <td className="px-6 py-4">
                    <Link href={`/dashboard/documents/${document.id}`} className="hover:text-blue-400">
                      {document.name}
                    </Link>
                  </td>

                  <td className="hidden px-6 py-4 md:table-cell">
                    {format(new Date(document.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </td>

                  <td className="hidden px-6 py-4 md:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      document.status === 'SIGNED'
                          ? 'bg-green-400/10 text-green-400'
                          : 'bg-yellow-400/10 text-yellow-400'
                      }`}
                    >
                      {document.status === 'SIGNED' ? 'Assinado' : 'Pendente'}
                    </span>
                  </td>

                  <td className="flex justify-end gap-2 px-6 py-4">
                    {document.status === 'SIGNED' && (
                      <Button asChild variant="ghost" size="icon">
                        <Link href={`/dashboard/documents/${document.id}`}>
                          <FileSignature className="size-4" />
                          <span className="sr-only">Ver assinaturas</span>
                        </Link>
                      </Button>
                    )}

                    <Button
                      onClick={() => window.open(document.url, '_blank')}
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 hover:text-blue-400"
                    >
                      <Eye className="size-4 sm:hidden" />
                      <span className="hidden sm:inline">Visualizar</span>
                    </Button>

                    {document.status === 'PENDING' && (
                      <Button asChild size="sm">
                        <Link href={`/dashboard/documents/${document.id}/sign`}>
                          <span className="hidden sm:inline">Assinar</span>
                          <FileSignature className="size-4 sm:hidden" />
                        </Link>
                      </Button>
                    )}

                    <DeleteDocumentButton
                      documentId={document.id}
                      onSuccess={handleDeleteSuccess}
                      className="sm:w-auto"
                    >
                      <Trash2 className="size-4 sm:hidden" />
                      <span className="hidden sm:inline">Excluir</span>
                    </DeleteDocumentButton>
                  </td>
                </tr>
              ))}

              {state.documents.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    Nenhum documento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {state.totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: state.totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={isPending}
              className={`rounded-lg px-3 py-2 text-sm ${
              page === state.currentPage
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-400 hover:bg-gray-600 disabled:opacity-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
