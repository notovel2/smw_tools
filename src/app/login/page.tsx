'use client'
import { auth, provider } from '@/infrastructure/firebase';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const login = async () => {
        try {
        await signInWithPopup(auth, provider);
        router.push('/');
        } catch (error: any) {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        }
    }

    return (
        <Card>
            <Button icon={<GoogleOutlined/>} onClick={login}>Sign in</Button>
        </Card>
    );
};

export default LoginPage;
