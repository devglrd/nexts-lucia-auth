'use client';

import { logout } from "@/app/authenticate/auth.action";
import { Button } from "./button";

type Props = {
    children: React.ReactNode
}

function LogoutBtn({ children }: Props) {
    return (
        <Button onClick={() => logout()}>{children}</Button>
    )
}

export default LogoutBtn