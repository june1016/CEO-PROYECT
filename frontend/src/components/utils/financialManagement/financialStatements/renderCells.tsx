import React from "react";
import { Chip } from "@nextui-org/react";
import { MoneyIcon } from "../../../icons/General/moneyIcon";
import { DebtIcon } from "../../../icons/General/debtIcon";
import { EquityIcon } from "../../../icons/General/equityIcon";
import { BalanceItem } from "@/types/financialManagement";
import { IncomeStatementItem } from "@/types/financialManagement";
import { IncomeIcon } from "@/components/icons/General/incomeIcon";
import { ExpenseIcon } from "@/components/icons/General/expenseIcon";

export const renderBalanceCell = (item: BalanceItem, columnKey: React.Key) => {
  const cellValue = item[columnKey as keyof BalanceItem];

  switch (columnKey) {
    case "valor":
      return (
        <div className="flex justify-end">
          ${cellValue.toLocaleString("es-CO")}
        </div>
      );
    case "categoria":
      return (
        <Chip
          startContent={
            item.categoria === "Activos" ? (
              <MoneyIcon />
            ) : item.categoria === "Pasivos" ? (
              <DebtIcon />
            ) : (
              <EquityIcon />
            )
          }
          color={
            item.categoria === "Activos"
              ? "success"
              : item.categoria === "Pasivos"
              ? "danger"
              : "warning"
          }
          variant="flat"
        >
          {cellValue}
        </Chip>
      );
    default:
      return cellValue;
  }
};

export const renderIncomeStatementCell = (
  item: IncomeStatementItem,
  columnKey: React.Key
) => {
  const cellValue = item[columnKey as keyof IncomeStatementItem];

  switch (columnKey) {
    case "valor":
      return (
        <div className="flex justify-end">
          ${cellValue.toLocaleString("es-CO")}
        </div>
      );
    case "concepto":
      return (
        <div className="flex items-center">
          {item.valor >= 0 ? <IncomeIcon /> : <ExpenseIcon />}
          <span className="ml-2">{cellValue}</span>
        </div>
      );
    default:
      return cellValue;
  }
};
