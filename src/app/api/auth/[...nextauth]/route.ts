import { db } from '@/db'
import { findUserByEmail } from '@/db/queries/users'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const existingUser = await findUserByEmail(credentials.email)
        if (!existingUser) return null
        const passwordsMatch = await compare(credentials.password, existingUser.password_hash)
        if (!passwordsMatch) return null

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
        }
      },
    }),
  ],
  callbacks: {
    session({ session }) {
      return session
    },
  },
})

export { handler as GET, handler as POST }
