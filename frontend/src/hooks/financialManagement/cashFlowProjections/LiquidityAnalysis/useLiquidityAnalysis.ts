// frontend/src/hooks/financialManagement/cashFlowProjections/LiquidityAnalysis/useLiquidityAnalysis.ts

import { useState, useCallback } from "react";
import { useTabSelection } from "@/hooks/useTabSelection";
import { LiquidityData, CashFlowData } from "@/types/financialManagement";
import {
  mockLiquidityData,
  mockCashFlowData,
} from "@/data/financialManagement/CashFlowProjections/LiquidityAnalysis/mockLiquidityData";

const useLiquidityAnalysis = () => {
  const { selectedTab, handleTabChange } = useTabSelection("ratiosChart");
  const [liquidityData, setLiquidityData] =
    useState<LiquidityData[]>(mockLiquidityData);
  const [cashFlowData, setCashFlowData] =
    useState<CashFlowData[]>(mockCashFlowData);

  const handlePeriodChange = useCallback((period: string) => {
    // Lógica para cambiar el período de análisis
    console.log("Changing analysis period to:", period);
  }, []);

  return {
    selectedTab,
    handleTabChange,
    liquidityData,
    cashFlowData,
    handlePeriodChange,
  };
};

export default useLiquidityAnalysis;
