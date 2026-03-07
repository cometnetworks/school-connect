"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const isAuth = localStorage.getItem("schoolConnectAdminAuth") === "true";

        if (!isAuth && pathname !== "/login") {
            router.replace("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    // Prevent layout thrashing on SSR
    if (!isMounted) return null;

    if (!isAuthenticated && pathname !== "/login") {
        return null;
    }

    return <>{children}</>;
}
