'use client'

import { uploadDocument } from '@/actions/document/upload'
import { uploadSchema } from '@/actions/document/upload/schema'
import { UploadDocumentState } from '@/actions/document/upload/types'
import { Button } from '@/components/ui/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { startTransition, useActionState, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export function UploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [formState, formAction, isPending] = useActionState<UploadDocumentState, z.infer<typeof uploadSchema>>(
    uploadDocument,
    {
      errorMessage: '',
      successMessage: '',
    },
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit: SubmitHandler<z.infer<typeof uploadSchema>> = async data => {
    startTransition(() => {
      formAction(data)
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (formState?.errorMessage) toast.error(formState.errorMessage)
    if (formState?.successMessage) {
      toast.success(formState.successMessage)
      reset()
      setSelectedFile(null)
    }
  }, [formState, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor="file"
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600
              bg-gray-700 hover:border-gray-500 hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              {selectedFile ? (
                <>
                  <svg
                    className="mb-3 size-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-medium">{selectedFile.name}</span>
                  </p>
                  <p className="text-xs text-gray-400">Clique para selecionar outro arquivo</p>
                </>
              ) : (
                <>
                  <svg
                    className="mb-3 size-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-400">
                    <span className="font-semibold">Clique para fazer upload</span> ou arraste e solte
                  </p>
                  <p className="text-xs text-gray-400">Apenas arquivos PDF (MAX. 10MB)</p>
                </>
              )}
            </div>
            <input
              id="file"
              type="file"
              accept="application/pdf"
              className="hidden"
              {...register('file', {
                onChange: handleFileChange,
              })}
            />
          </label>
        </div>
        {errors.file?.message && <p className="mt-2 text-sm text-red-400">{errors.file.message as string}</p>}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <div className="flex items-center gap-2">
            <div className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Enviando...</span>
          </div>
        ) : (
          'Enviar documento'
        )}
      </Button>
    </form>
  )
}
