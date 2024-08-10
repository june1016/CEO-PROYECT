import { useMemo } from "react";
import { BalanceItem } from "@/types/financialManagement";

export const useBalanceTotals = (data: BalanceItem[]) => {
  return useMemo(() => {
    const totalActivos = data
      .filter((item) => item.categoria === "Activos")
      .reduce((sum, item) => sum + item.valor, 0);
    const totalPasivos = data
      .filter((item) => item.categoria === "Pasivos")
      .reduce((sum, item) => sum + item.valor, 0);
    const totalPatrimonio = data
      .filter((item) => item.categoria === "Patrimonio")
      .reduce((sum, item) => sum + item.valor, 0);
    return { totalActivos, totalPasivos, totalPatrimonio };
  }, [data]);
};
