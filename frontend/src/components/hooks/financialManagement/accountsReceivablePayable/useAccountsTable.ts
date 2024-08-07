import { useState, useCallback } from "react";
import { Account } from "@/types/financialManagement";

export const useAccountsTable = (initialAccounts: Account[]) => {
  const [sortedAccounts, setSortedAccounts] = useState(initialAccounts);

  const handleSort = useCallback(
    (column: keyof Account, direction: "ascending" | "descending") => {
      const sorted = [...sortedAccounts].sort((a, b) => {
        if (column === "amount" || column === "daysOverdue") {
          return direction === "ascending"
            ? (a[column] as number) - (b[column] as number)
            : (b[column] as number) - (a[column] as number);
        }
        if (typeof a[column] === "string" && typeof b[column] === "string") {
          return direction === "ascending"
            ? (a[column] as string).localeCompare(b[column] as string)
            : (b[column] as string).localeCompare(a[column] as string);
        }
        return 0;
      });
      setSortedAccounts(sorted);
    },
    [sortedAccounts]
  );

  return { sortedAccounts, handleSort };
};
