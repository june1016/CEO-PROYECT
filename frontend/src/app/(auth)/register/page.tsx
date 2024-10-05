// src/app/(auth)/register/page.tsx
"use client";
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const RegisterPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <RegisterForm />
      <div className="text-center">
        <Link href="/login">
          <Button color="secondary" variant="flat">
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
