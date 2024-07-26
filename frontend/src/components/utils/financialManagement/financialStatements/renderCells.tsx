import React from "react";
import { Chip } from "@nextui-org/react";
import { MoneyIcon } from "../../../icons/General/moneyIcon";
import { DebtIcon } from "../../../icons/General/debtIcon";
import { EquityIcon } from "../../../icons/General/equityIcon";
import { BalanceItem } from "@/types/financialManagement";

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
