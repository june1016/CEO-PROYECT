// src/utils/financialManagement/cashFlowProjections/MonthlyProjectionIE/projectionUtils.ts

import { ProjectionData } from "@/types/financialManagement";

export const calculateNetCashFlow = (
  data: ProjectionData[]
): ProjectionData[] => {
  return data.map((item) => ({
    ...item,
    netCashFlow: item.income - item.expenses,
  }));
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};
