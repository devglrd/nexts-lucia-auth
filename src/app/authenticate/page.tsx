import TabSwitcher from '@/components/ui/TabSwitcher';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { getUser } from '@/lib/lucia';
import { redirect } from 'next/navigation';
const AuthenticatePage = async () => {
    const user = await getUser();
    if (user) redirect('/dashboard');
    return (
        <div className={"w-full h-screen bg-background"}>
            <div className={"flex items-center justify-center min-h-screen"}>
                <TabSwitcher SignInTab={<SignInForm />} SignUpTab={<SignUpForm />} />
            </div>

        </div>
    );
};

export default AuthenticatePage;