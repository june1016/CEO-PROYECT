import { useMemo } from "react";
import { BalanceItem } from "@/types/financialManagement";

export const useBalanceChartData = (data: BalanceItem[]) => {
  return useMemo(
    () => [
      {
        name: "Activos",
        value: data
          .filter((item) => item.categoria === "Activos")
          .reduce((sum, item) => sum + item.valor, 0),
      },
      {
        name: "Pasivos",
        value: data
          .filter((item) => item.categoria === "Pasivos")
          .reduce((sum, item) => sum + item.valor, 0),
      },
      {
        name: "Patrimonio",
        value: data
          .filter((item) => item.categoria === "Patrimonio")
          .reduce((sum, item) => sum + item.valor, 0),
      },
    ],
    [data]
  );
};
