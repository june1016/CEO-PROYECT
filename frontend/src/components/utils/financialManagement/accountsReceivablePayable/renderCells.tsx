import React from "react";
import { Account } from "@/types/financialManagement";
import { Chip } from "@nextui-org/react";

export const renderAccountCell = (account: Account, columnKey: React.Key) => {
  switch (columnKey) {
    case "clientName":
      return <div className="font-medium">{account.clientName}</div>;
    case "amount":
      return <div className="font-mono">${account.amount.toFixed(2)}</div>;
    case "dueDate":
      return <div>{new Date(account.dueDate).toLocaleDateString()}</div>;
    case "status":
      return (
        <Chip
          color={
            account.status === "Pendiente"
              ? "warning"
              : account.status === "Vencido"
              ? "danger"
              : "success"
          }
          variant="flat"
        >
          {account.status}
        </Chip>
      );
    case "daysOverdue":
      return <div>{account.daysOverdue}</div>;
    default:
      return <div>-</div>;
  }
};
