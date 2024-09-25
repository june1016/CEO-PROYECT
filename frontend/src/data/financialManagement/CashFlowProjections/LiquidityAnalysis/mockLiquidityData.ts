// src/data/financialManagement/cashFlowProjections/LiquidityAnalysis/mockLiquidityData.ts

import { LiquidityData, CashFlowData } from "@/types/financialManagement";

export const mockLiquidityData: LiquidityData[] = [
  { period: "Q1 2023", currentRatio: 1.5, quickRatio: 1.2, cashRatio: 0.8 },
  { period: "Q2 2023", currentRatio: 1.6, quickRatio: 1.3, cashRatio: 0.9 },
  { period: "Q3 2023", currentRatio: 1.4, quickRatio: 1.1, cashRatio: 0.7 },
  { period: "Q4 2023", currentRatio: 1.7, quickRatio: 1.4, cashRatio: 1.0 },
];

export const mockCashFlowData: CashFlowData[] = [
  { concept: "Flujo de efectivo de operaciones", amount: 500000 },
  { concept: "Flujo de efectivo de inversiones", amount: -200000 },
  { concept: "Flujo de efectivo de financiamiento", amount: 100000 },
  { concept: "Flujo de efectivo neto", amount: 400000 },
];
