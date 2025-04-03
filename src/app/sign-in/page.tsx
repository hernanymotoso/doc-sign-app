import { SignInForm } from '@/components/form/SignInForm'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-md px-4">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-bold text-white">Bem-vindo ao DocSign</h1>
          <p className="mt-2 text-gray-400">Faça login para acessar sua conta</p>
        </div>

        <SignInForm />
      </div>
    </main>
  )
}
