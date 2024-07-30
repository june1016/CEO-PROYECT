import { useMemo } from "react";
import { IncomeStatementItem } from "@/types/financialManagement";

export const useIncomeStatementCalculations = (data: IncomeStatementItem[]) => {
  return useMemo(() => {
    const revenues =
      data.find((item) => item.concepto === "Ingresos por ventas")?.valor || 0;
    const costOfSales =
      data.find((item) => item.concepto === "Costo de ventas")?.valor || 0;
    const operatingExpenses =
      data.find((item) => item.concepto === "Gastos operativos")?.valor || 0;
    const financialExpenses =
      data.find((item) => item.concepto === "Gastos financieros")?.valor || 0;
    const taxes =
      data.find((item) => item.concepto === "Impuestos")?.valor || 0;

    const grossProfit = revenues - costOfSales;
    const operatingProfit = grossProfit - operatingExpenses;
    const profitBeforeTax = operatingProfit - financialExpenses;
    const netProfit = profitBeforeTax - taxes;

    return {
      grossProfit,
      operatingProfit,
      profitBeforeTax,
      netProfit,
    };
  }, [data]);
};
