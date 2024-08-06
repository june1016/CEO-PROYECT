import React from "react";
import { Account } from "@/types/financialManagement";

export const renderAccountCell = (account: Account, columnKey: React.Key) => {
  switch (columnKey) {
    case "clientName":
      return <div className="font-medium">{account.clientName}</div>;
    case "amount":
      return <div>${account.amount.toFixed(2)}</div>;
    case "dueDate":
      return <div>{new Date(account.dueDate).toLocaleDateString()}</div>;
    case "status":
      return (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium
          ${
            account.status === "Pendiente"
              ? "bg-yellow-100 text-yellow-800"
              : account.status === "Vencido"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {account.status}
        </div>
      );
    default:
      return <div>-</div>;
  }
};
