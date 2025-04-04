export type DocumentsResponse = {
  documents: {
    id: string
    name: string
    url: string
    created_at: Date
  }[]
  totalPages: number
  currentPage: number
  error?: string
}
