import { useState, useCallback } from "react";
import { Account } from "@/types/financialManagement";

export const useAccountsTable = (initialAccounts: Account[]) => {
  const [sortedAccounts, setSortedAccounts] = useState(initialAccounts);

  const handleSort = useCallback(
    (column: keyof Account, direction: "ascending" | "descending") => {
      const sorted = [...sortedAccounts].sort((a, b) => {
        if (a[column] < b[column]) return direction === "ascending" ? -1 : 1;
        if (a[column] > b[column]) return direction === "ascending" ? 1 : -1;
        return 0;
      });
      setSortedAccounts(sorted);
    },
    [sortedAccounts]
  );

  return { sortedAccounts, handleSort };
};
