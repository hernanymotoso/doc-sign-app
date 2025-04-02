import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().optional(),
    email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string().trim().min(1, { message: 'Password is required' }),
    passwordConfirmation: z.string().trim().min(1, { message: 'Password confirmation is required' }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
  })
