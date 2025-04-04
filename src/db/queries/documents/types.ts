import { Document, Signature } from '@prisma/client'

export type DocumentWithSignatures = Document & {
  signatures: (Signature & {
    user: {
      name: string | null
    }
  })[]
}
