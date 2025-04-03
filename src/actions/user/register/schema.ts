import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().optional(),
    email: z
      .string()
      .trim()
      .min(1, { message: 'Email é obrigatório' })
      .email({ message: 'Endereço de email inválido' }),
    password: z.string().trim().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    passwordConfirmation: z.string().trim().min(6, { message: 'Confirmação de senha é obrigatória' }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas não coincidem',
  })
