import { useMemo } from "react";
import { IncomeStatementItem } from "@/types/financialManagement";

export const useResultsChartData = (data: IncomeStatementItem[]) => {
  return useMemo(
    () =>
      data.map((item) => ({
        name: item.concepto,
        valor: item.valor,
      })),
    [data]
  );
};
