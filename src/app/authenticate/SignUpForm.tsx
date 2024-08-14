'use client'

import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { signUp } from "./auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export const signUpSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine(({ password, confirmPassword }) => password === confirmPassword, {
  message: "Password do not match",
  path: ['confirmPassword']
})
type Props = {}

const SignUpForm = (props: Props) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      confirmPassword: '',
      password: ""
    }
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    

    const response = await signUp(values);
    
    if (!response.success) {
      toast.error(response.error)
      return;
    }
    toast.success('Account created!')
    router.push('/dashboard')
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Begin your journey ! </CardTitle>
        <CardDescription>Sign up to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="name"
                      placeholder="Name ..." {...field} />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email ..." {...field} />

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Please confirm password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="self-start"> Submit </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SignUpForm