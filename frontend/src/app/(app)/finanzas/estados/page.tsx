// frontend/src/app/(app)/finanzas/estados/page.tsx
"use client";
import React from "react";
import EstadosFinancieros from "@/components/finanzas/EstadosFinancierosTabs";

export default function EstadosFinancierosPage() {
  return (
    <div className="p-4">
      <EstadosFinancieros />
    </div>
  );
}
