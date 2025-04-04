import { SignatureList } from '@/components/context/SignatureList'
import { Button } from '@/components/ui/Button'
import { ViewPdfButton } from '@/components/context/ViewPdfButton'
import { db } from '@/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getDocument(id: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return null

  return db.document.findFirst({
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
}

export default async function DocumentPage({ params }: { params: { id: string } }) {
  const document = await getDocument(params.id)

  if (!document) {
    notFound()
  }

  return (
    <main className="container mx-auto max-w-4xl space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{document.name}</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard">Voltar</Link>
          </Button>
          <ViewPdfButton url={document.url} />
          {document.status === 'PENDING' && (
            <Button asChild>
              <Link href={`/dashboard/documents/${document.id}/sign`}>Assinar Documento</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
        {document.signatures.length === 0 ? (
          <p className="text-gray-400">Nenhuma assinatura encontrada</p>
        ) : (
          <SignatureList
            signatures={document.signatures.map(signature => ({
              id: signature.id,
              imageUrl: signature.imageUrl,
              signedAt: signature.signedAt,
              user: {
                name: signature.user.name || 'Usuário não encontrado',
              },
            }))}
          />
        )}
      </div>
    </main>
  )
}
