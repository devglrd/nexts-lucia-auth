import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/lucia';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react'
import { logout } from '../authenticate/auth.action';
import LogoutBtn from '@/components/ui/LogoutBtn';

type Props = {}

const Dashboard = async (props: Props) => {

  const user = await getUser();

  if (!user) redirect('/');

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <Card className=''>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardFooter>
          <LogoutBtn>Logout</LogoutBtn>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Dashboard