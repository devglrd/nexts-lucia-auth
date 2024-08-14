import Image from "next/image";
import {Button} from "@/components/ui/button";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getUser();

  if(user) redirect('/dashboard')

  redirect('/authenticate');

  return (
    <>
    
    </>
  );
}
