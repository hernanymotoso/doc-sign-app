type Signature = {
  id: string
  imageUrl: string
  signedAt: Date
  user: {
    name: string
  }
}

export type SignatureListProps = {
  signatures: Signature[]
}
