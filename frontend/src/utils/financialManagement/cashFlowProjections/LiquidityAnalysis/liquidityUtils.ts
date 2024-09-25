// src/utils/financialManagement/cashFlowProjections/LiquidityAnalysis/liquidityUtils.ts

export const formatDecimal = (value: number): string => {
  return value.toFixed(2);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};
