import { DocumentList } from '@/components/context/DocumentList'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Meus Documentos</h1>
          <p className="mt-2 text-gray-400">Gerencie seus documentos de forma segura.</p>
        </div>

        <Link
          href="/dashboard/upload"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Upload de Documento
        </Link>
      </div>

      <DocumentList />
    </main>
  )
}
