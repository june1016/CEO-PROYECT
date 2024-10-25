"use client";
import React from "react";
import RequestPasswordResetForm from "@/components/auth/requestPasswordResetForm";
import Link from "next/link";
import { Button } from "@nextui-org/react";

const RequestPasswordResetPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <RequestPasswordResetForm />
      <div className="text-center">
        <Link href="/login">
          <Button color="secondary" variant="flat">
            Volver al inicio de sesión
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RequestPasswordResetPage;
