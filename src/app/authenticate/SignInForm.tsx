'use client'

import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { signIn } from "./auth.action";
import { useRouter } from "next/navigation";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),

})
type Props = {}

const SignInForm = (props: Props) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        const res = await signIn(values)
        if (!res.success) {
            toast.error(res.error)
            form.reset();
            return;
        }
        toast.success('Login success!');
        router.push('/dashboard')

    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome Back ! </CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
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
                                            placeholder="Email" {...field} />

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
                        <Button type="submit" className="self-start"> Submit </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignInForm