import { z } from 'zod'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const uploadSchema = z.object({
  file: z
    .any()
    .refine((files: FileList) => files?.length === 1, 'Por favor, selecione um arquivo')
    .refine((files: FileList) => {
      const file = files[0]
      return file.size <= MAX_FILE_SIZE
    }, 'O arquivo deve ter no máximo 10MB')
    .refine((files: FileList) => {
      const file = files[0]
      return file.type === 'application/pdf'
    }, 'Apenas arquivos PDF são permitidos'),
})
