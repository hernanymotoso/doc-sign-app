'use client'

import { deleteDocument } from '@/actions/document/delete'
import { startTransition, useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { DeleteDocumentState } from '@/actions/document/delete/types'
import { DeleteDocumentButtonProps } from './types'

export function DeleteDocumentButton({ documentId, onSuccess }: DeleteDocumentButtonProps) {
  const [state, action, isPending] = useActionState<DeleteDocumentState, string>(deleteDocument, {})

  const handleDelete = () => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este documento?')
    if (!confirmed) return

    startTransition(() => {
      action(documentId)
    })
  }

  useEffect(() => {
    if (state?.error) toast.error(state.error)

    if (state?.success) {
      state.success = false
      toast.success('Documento excluído com sucesso!')
      onSuccess?.()
    }
  }, [state, onSuccess])

  return (
    <button onClick={handleDelete} disabled={isPending} className="text-red-500 hover:text-red-400 disabled:opacity-50">
      {isPending ? 'Excluindo...' : 'Excluir'}
    </button>
  )
}
