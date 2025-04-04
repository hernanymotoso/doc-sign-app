'use server'

import { ServerError } from '@/actions/_errors/server-error'
import { RegisterFormState } from '@/components/form/RegisterForm/types'
import { db } from '@/db'
import { findUserByEmail } from '@/db/queries/users'
import { UserAlreadyExistsError } from '@/db/queries/users/errors'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { registerSchema } from './schema'

const SALT_ROUNDS = 10

export const register = async (
  _: RegisterFormState,
  data: z.infer<typeof registerSchema>,
): Promise<RegisterFormState> => {
  try {
    const { name, email, password } = data
    const existingUser = await findUserByEmail(email)
    if (existingUser) throw new UserAlreadyExistsError()
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return {
      successMessage: 'Usuário criado com sucesso, por favor faça login.',
      fields: {},
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        errorMessage: error.message,
        fields: data,
      }
    } else {
      return {
        errorMessage: new ServerError().message,
        fields: data,
      }
    }
  }
}
