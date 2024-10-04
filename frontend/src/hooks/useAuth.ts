"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (!token) {
      // Si no hay token, redirigir al login
      router.push("/login");
    }
  }, [router]);
};

export default useAuth;
