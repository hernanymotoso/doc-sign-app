import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Header } from '@/components/context/Header'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import './globals.css'
import { SessionProvider } from '@/lib/sessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DocSign - Assinatura de Documentos',
  description: 'Plataforma de assinatura de documentos online',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  console.log({ session })

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          <div className="pt-16">{children}</div>
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  )
}
