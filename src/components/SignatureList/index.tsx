'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type Signature = {
  id: string
  imageUrl: string
  signedAt: Date
  user: {
    name: string
  }
}

type SignatureListProps = {
  signatures: Signature[]
}

export function SignatureList({ signatures }: SignatureListProps) {
  return (
    <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4">
      <h3 className="text-lg font-semibold">Assinaturas ({signatures.length})</h3>
      {signatures.length === 0 ? (
        <p className="text-gray-400">Nenhuma assinatura encontrada</p>
      ) : (
        <div className="divide-y divide-gray-700">
          {signatures.map(signature => (
            <div key={signature.id} className="flex items-center gap-4 py-4">
              <img src={signature.imageUrl} alt="Assinatura" className="h-16 w-32 object-contain" />
              <div>
                <p className="font-medium">{signature.user.name}</p>
                <p className="text-sm text-gray-400">
                  {format(new Date(signature.signedAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
