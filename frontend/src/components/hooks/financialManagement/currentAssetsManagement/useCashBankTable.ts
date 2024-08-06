import { useState, useCallback, useMemo } from "react";
import { CashBankTransaction } from "@/types/financialManagement";

export const useCashBankTable = (transactions: CashBankTransaction[]) => {
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredItems = useMemo(() => {
    return transactions.filter(
      (item) => typeFilter === "all" || item.tipo === typeFilter
    );
  }, [transactions, typeFilter]);

  const onTypeFilterChange = useCallback((key: string) => {
    setTypeFilter(key);
  }, []);

  return { filteredItems, onTypeFilterChange };
};
