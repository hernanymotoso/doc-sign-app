'use client'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/actions/user/register/schema'

export function RegisterForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log({ values })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-200">Nome</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
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
                      placeholder="Enter your password"
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
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-200">Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirmar senha"
                      type="password"
                      className="h-10 border-gray-700 bg-gray-800 text-gray-100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-6 h-11 w-full bg-blue-600 text-sm font-medium hover:bg-blue-700" type="submit">
            Registrar
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
        <p className="text-sm text-gray-400">Entrar com o oauth</p>
      </div>
    </div>
  )
}
