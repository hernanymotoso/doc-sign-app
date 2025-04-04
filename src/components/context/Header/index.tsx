'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-700 bg-[#0f172a]">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-white">
          DocSign
        </Link>

        {session?.user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{session.user.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/sign-in' })}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Sair
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
