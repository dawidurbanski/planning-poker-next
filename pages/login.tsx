import { useRouter } from "next/router";
import { useEffect } from "react";

function Login() {
    const router = useRouter();

    useEffect(() => {
        router.push('/api/auth/login');
    }, [router]);

    return null;
}

export default Login;