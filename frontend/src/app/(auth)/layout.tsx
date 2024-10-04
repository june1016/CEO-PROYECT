import React from "react";
import "@/styles/globals.css";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">{children}</main>
    </div>
  );
}
