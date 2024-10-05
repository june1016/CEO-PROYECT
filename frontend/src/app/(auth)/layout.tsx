import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import "@/styles/globals.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </NextUIProvider>
  );
}
