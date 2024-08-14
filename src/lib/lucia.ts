import { Lucia } from 'lucia';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import prisma from './prisma';
import { cookies } from 'next/headers';

const adapater = new PrismaAdapter(prisma.session, prisma.user);
export const lucia = new Lucia(
    adapater,
    {
        sessionCookie: {
            name: "app",
            expires: false,
            attributes: {
                secure: process.env.NODE_ENV === 'production',
            }
        }
    }

)

export const getUser = async () => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
    if (!sessionId) return null;

    const { session, user } = await lucia.validateSession(sessionId);

    if (session && session.fresh) {
        const sessionCookie = await lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    } 

    if(!session){
        const sessionCookie = await lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }

    const dbUser = await prisma.user.findUnique({where: {id: user?.id}, select: {name: true, email: true}})

    return dbUser;

}