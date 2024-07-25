// frontend/src/components/finanzas/EstadosFinancierosTabs.tsx
"use client";
import React from "react";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/finanzas/SearchIcon";
import { BalanceIcon } from "../icons/finanzas/BalanceIcon";
import { ResultadosIcon } from "../icons/finanzas/ResultadosIcon";
import BalanceGeneral from "./BalanceGeneral";
import EstadoResultados from "./EstadoResultados";

export default function EstadosFinancieros() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState("balance");

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Estados Financieros</h1>

      <div className="flex justify-between items-center">
        <Tabs
          aria-label="Estados Financieros"
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
        >
          <Tab
            key="balance"
            title={
              <div className="flex items-center space-x-2">
                <BalanceIcon />
                <span>Balance General</span>
              </div>
            }
          />
          <Tab
            key="resultados"
            title={
              <div className="flex items-center space-x-2">
                <ResultadosIcon />
                <span>Estado de Resultados</span>
              </div>
            }
          />
        </Tabs>

        <Input
          isClearable
          className="w-full max-w-[250px]"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => setFilterValue("")}
          onValueChange={(value) => setFilterValue(value)}
        />
      </div>

      <div>
        {selectedTab === "balance" && (
          <BalanceGeneral filterValue={filterValue} />
        )}
        {selectedTab === "resultados" && (
          <EstadoResultados filterValue={filterValue} />
        )}
      </div>
    </div>
  );
}
