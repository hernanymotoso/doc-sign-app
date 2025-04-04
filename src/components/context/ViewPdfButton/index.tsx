'use client'

import { Button } from '@/components/ui/Button'

type ViewPdfButtonProps = {
  url: string
}

export function ViewPdfButton({ url }: ViewPdfButtonProps) {
  return <Button onClick={() => window.open(url, '_blank')}>Visualizar PDF</Button>
}
