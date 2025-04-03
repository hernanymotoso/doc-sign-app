'use client'

import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { signInSchema } from './schema'

export function SignInForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const signInResult = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (signInResult?.error) {
      console.log({ signInError: signInResult })
      toast.error('Email ou senha incorretos')
    } else {
      toast.success('Login realizado com sucesso!')
      redirect('/')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-200">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="mail@example.com"
                      className="h-10 border-gray-700 bg-gray-800 text-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-200">Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      className="h-10 border-gray-700 bg-gray-800 text-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="mt-6 h-11 w-full bg-blue-600 text-sm font-medium hover:bg-blue-700"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#0f172a] px-2 text-gray-400">ou</span>
          </div>
        </div>
      </Form>

      <div className="mt-4 text-center">
        <Button
          type="button"
          onClick={() => signIn('github')}
          variant="outline"
          className="inline-flex w-full items-center justify-center gap-2 border-gray-700 bg-transparent text-sm font-medium text-gray-200
            hover:bg-gray-800"
        >
          <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          Continuar com GitHub
        </Button>
      </div>
    </div>
  )
}
