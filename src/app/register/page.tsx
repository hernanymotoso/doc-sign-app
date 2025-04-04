import { RegisterForm } from '@/components/form/RegisterForm'

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="w-full max-w-md px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-white">Crie sua conta</h1>
          <p className="mt-2 text-gray-400">Registre-se para começar a usar o DocSign</p>
        </div>

        <RegisterForm />
      </div>
    </main>
  )
}
