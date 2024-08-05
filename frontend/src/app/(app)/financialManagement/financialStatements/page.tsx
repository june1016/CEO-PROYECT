"use client";
import React from "react";
import EstadosFinancieros from "@/components/financialManagement/financialStatements/financialStatementsTabs";

const EstadosFinancierosPage: React.FC = () => {
  return (
    <div className="p-4">
      <EstadosFinancieros />
    </div>
  );
};

export default EstadosFinancierosPage;
