import { DocumentsResponse } from '@/actions/document/list/types'

export type DocumentListState = DocumentsResponse & {
  error?: string
}
