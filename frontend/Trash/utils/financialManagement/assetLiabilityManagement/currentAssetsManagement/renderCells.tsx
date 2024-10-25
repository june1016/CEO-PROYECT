import React from "react";
import { CashBankTransaction } from "@/types/financialManagement";

export const renderCashBankCell = (
  item: CashBankTransaction,
  columnKey: React.Key
): React.ReactNode => {
  const key = columnKey as keyof CashBankTransaction;
  switch (key) {
    case "monto":
      return `$${item[key].toLocaleString("es-CO")}`;
    case "tipo":
      return (
        <span
          className={
            item[key] === "ingreso" ? "text-green-500" : "text-red-500"
          }
        >
          {item[key].toUpperCase()}
        </span>
      );
    default:
      return item[key];
  }
};
