import { db } from '@/db'
import { User } from '@prisma/client'

export const getUsers = async () => {
  const users = await db.user.findMany()
  return users
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: { email },
  })
  return user
}
