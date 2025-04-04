'use client'

import { useRef, useEffect } from 'react'
import SignaturePad from 'signature_pad'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'
import { SignatureCanvasProps } from './types'

export function SignatureCanvas({ onSave, onClear }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const signaturePadRef = useRef<SignaturePad>(null)

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current)
    }
  }, [])

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) {
      toast.error('Por favor, faça sua assinatura')
      return
    }
    const dataUrl = signaturePadRef.current?.toDataURL()
    onSave(dataUrl as string)
  }

  const handleClear = () => {
    signaturePadRef.current?.clear()
    onClear()
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <canvas ref={canvasRef} className="touch-none border border-gray-600" width={600} height={200} />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleClear} variant="outline">
          Limpar
        </Button>
        <Button onClick={handleSave}>Salvar Assinatura</Button>
      </div>
    </div>
  )
}
