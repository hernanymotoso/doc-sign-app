import { UploadForm } from '@/components/form/UploadForm'

export default function UploadPage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Upload de Documento</h1>
          <p className="mt-2 text-gray-400">Faça upload de documentos PDF para armazenamento seguro.</p>
        </div>

        <UploadForm />
      </div>
    </main>
  )
}
