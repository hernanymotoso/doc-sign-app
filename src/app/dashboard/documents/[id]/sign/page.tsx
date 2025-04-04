'use client'

import { SignatureCanvas } from '@/components/context/SignatureCanvas'
import { createSignature } from '@/actions/signature/create'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useActionState } from 'react'
import toast from 'react-hot-toast'
import { SignatureState } from '@/actions/signature/create/types'

export default function SignDocumentPage() {
  const params = useParams()
  const router = useRouter()
  const [state, action] = useActionState<SignatureState, { documentId: string; signatureData: string }>(
    createSignature,
    {},
  )

  const handleSignatureSave = (signatureData: string) => {
    startTransition(() => {
      action({
        documentId: params.id as string,
        signatureData,
      })
    })
  }

  if (state?.success) {
    toast.success('Documento assinado com sucesso!')
    router.push('/dashboard')
  }

  if (state?.error) {
    toast.error(state.error)
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8 p-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Assinar Documento</h1>
        <p className="text-gray-400">Use o campo abaixo para fazer sua assinatura. Você pode usar o mouse ou touch.</p>
      </div>

      <SignatureCanvas onSave={handleSignatureSave} onClear={() => null} />
    </div>
  )
}
