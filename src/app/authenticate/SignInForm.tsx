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
import { Loader2 } from "lucide-react"
import { useState } from "react";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),

})
type Props = {}

const SignInForm = (props: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        setLoading(() => true)
        const res = await signIn(values)
        if (!res.success) {
            toast.error(res.error)
            //form.reset();
            setLoading(() => false)
            return;
        }
        toast.success('Login success!');
        router.push('/dashboard');
        

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

                        <Button type="submit" className="self-start" disabled={loading || !form.formState.isValid}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignInForm