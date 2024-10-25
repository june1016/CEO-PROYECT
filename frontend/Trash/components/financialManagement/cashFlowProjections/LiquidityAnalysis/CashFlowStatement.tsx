// src/components/financialManagement/cashFlowProjections/LiquidityAnalysis/CashFlowStatement.tsx

import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { CashFlowData } from "@/types/financialManagement";
import { formatCurrency } from "@/utils/financialManagement/cashFlowProjections/LiquidityAnalysis/liquidityUtils";

interface CashFlowStatementProps {
  data: CashFlowData[];
}

const CashFlowStatement: React.FC<CashFlowStatementProps> = ({ data }) => {
  const columns = [
    { name: "Concepto", uid: "concept" },
    { name: "Monto", uid: "amount" },
  ];

  const renderCell = (item: CashFlowData, columnKey: React.Key) => {
    const value = item[columnKey as keyof CashFlowData];
    return columnKey === "amount" ? formatCurrency(value as number) : value;
  };

  return (
    <ResponsiveTable columns={columns} items={data} renderCell={renderCell} />
  );
};

export default CashFlowStatement;
