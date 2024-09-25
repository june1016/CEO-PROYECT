// src/components/financialManagement/cashFlowProjections/LiquidityAnalysis/LiquidityAnalysisPanel.tsx

import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import LiquidityRatiosChart from "./LiquidityRatiosChart";
import LiquidityRatiosTable from "./LiquidityRatiosTable";
import CashFlowStatement from "./CashFlowStatement";
import useLiquidityAnalysis from "@/hooks/financialManagement/cashFlowProjections/LiquidityAnalysis/useLiquidityAnalysis";

const MemoizedLiquidityRatiosChart = React.memo(LiquidityRatiosChart);
const MemoizedLiquidityRatiosTable = React.memo(LiquidityRatiosTable);
const MemoizedCashFlowStatement = React.memo(CashFlowStatement);

const LiquidityAnalysisPanel: React.FC = () => {
  const {
    selectedTab,
    handleTabChange,
    liquidityData,
    cashFlowData,
    handlePeriodChange,
  } = useLiquidityAnalysis();

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: "ratiosChart",
        title: "Gráfico de Ratios",
        content: <MemoizedLiquidityRatiosChart data={liquidityData} />,
      },
      {
        key: "ratiosTable",
        title: "Tabla de Ratios",
        content: <MemoizedLiquidityRatiosTable data={liquidityData} />,
      },
      {
        key: "cashFlowStatement",
        title: "Estado de Flujo de Efectivo",
        content: <MemoizedCashFlowStatement data={cashFlowData} />,
      },
    ],
    [liquidityData, cashFlowData]
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <ReusableTabs
          items={tabItems}
          selectedTab={selectedTab}
          onSelectionChange={handleTabChange}
          ariaLabel="Análisis de Liquidez"
        />
        <Button color="primary" onClick={() => console.log("Generar Informe")}>
          Generar Informe
        </Button>
      </div>
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(LiquidityAnalysisPanel);
