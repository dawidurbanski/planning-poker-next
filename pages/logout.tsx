import { useRouter } from "next/router";
import { useEffect } from "react";

function Logout() {
    const router = useRouter();

    useEffect(() => {
        router.push('/api/auth/logout');
    }, [router]);

    return null;
}

export default Logout;