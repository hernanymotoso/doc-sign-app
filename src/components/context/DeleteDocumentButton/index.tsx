'use client'

import { deleteDocument } from '@/actions/document/delete'
import { startTransition, useActionState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { DeleteDocumentState } from '@/actions/document/delete/types'
import { DeleteDocumentButtonProps } from './types'
import { Button } from '@/components/ui/Button'

export function DeleteDocumentButton({ documentId, onSuccess, children, className }: DeleteDocumentButtonProps) {
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
    <Button onClick={handleDelete} disabled={isPending} variant="destructive" size="sm" className={className}>
      {isPending ? (
        <>
          <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span className="ml-2 hidden sm:inline">Excluindo...</span>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
