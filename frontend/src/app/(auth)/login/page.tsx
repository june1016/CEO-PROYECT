"use client";
import React from "react";
import LoginForm from "@/components/auth/loginForm";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const LoginPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <LoginForm />
      <div className="text-center">
        <Link href="/register">
          <Button color="secondary" variant="flat">
            ¿No tienes cuenta? Regístrate
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
