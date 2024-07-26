"use client";

import { MarketInfoTabs } from "@/components/market/marketInfoTabs";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Información de Mercado y Objetivo
      </h1>
      <div className="w-full max-w-7xl">
        <MarketInfoTabs />
      </div>
    </main>
  );
}
