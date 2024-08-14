'use server'

import { z } from "zod"
import { signUpSchema } from "./SignUpForm"
import prisma from "@/lib/prisma"
import { Argon2id } from 'oslo/password'
import { lucia } from "@/lib/lucia"
import { cookies } from "next/headers"
import { signInSchema } from "./SignInForm"
import { redirect } from "next/navigation"
export const signUp = async ({ email, name, confirmPassword }: z.infer<typeof signUpSchema>) => {
    
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        return { success: false, error: 'User already exist' }
    }

    const password = await new Argon2id().hash(confirmPassword);
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password,
        }
    })

    const session = await lucia.createSession(user.id, {})
    const cookie = await lucia.createSessionCookie(session.id)
    cookies().set(cookie.name, cookie.value, cookie.attributes)
    return { success: true }

}

export const logout = async () => {
    const cookie = await lucia.createBlankSessionCookie();
    cookies().set(cookie.name, cookie.value, cookie.attributes)

    return redirect('/authenticate')
}

export const signIn = async ({ email, password }: z.infer<typeof signInSchema>) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !user.password) return { success: false, error: 'Invalid credentials' }


    const verify = await new Argon2id().verify(user.password, password)
    if (!verify) return { success: false, error: 'Invalid credentials' }

    const session = await lucia.createSession(user.id, {})
    const cookie = await lucia.createSessionCookie(session.id)
    cookies().set(cookie.name, cookie.value, cookie.attributes)
    return { success: true }
}