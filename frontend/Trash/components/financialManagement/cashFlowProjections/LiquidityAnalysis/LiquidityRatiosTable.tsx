// src/components/financialManagement/cashFlowProjections/LiquidityAnalysis/LiquidityRatiosTable.tsx

import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { LiquidityData } from "@/types/financialManagement";
import { formatDecimal } from "@/utils/financialManagement/cashFlowProjections/LiquidityAnalysis/liquidityUtils";

interface LiquidityRatiosTableProps {
  data: LiquidityData[];
}

const LiquidityRatiosTable: React.FC<LiquidityRatiosTableProps> = ({
  data,
}) => {
  const columns = [
    { name: "Periodo", uid: "period" },
    { name: "Ratio Corriente", uid: "currentRatio" },
    { name: "Ratio Rápido", uid: "quickRatio" },
    { name: "Ratio de Efectivo", uid: "cashRatio" },
  ];

  const renderCell = (item: LiquidityData, columnKey: React.Key) => {
    const value = item[columnKey as keyof LiquidityData];
    return columnKey === "period" ? value : formatDecimal(value as number);
  };

  return (
    <ResponsiveTable columns={columns} items={data} renderCell={renderCell} />
  );
};

export default LiquidityRatiosTable;
