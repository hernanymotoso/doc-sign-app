import { db } from '@/db'

export const getUsers = async () => {
  const users = await db.user.findMany()
  return users
}
