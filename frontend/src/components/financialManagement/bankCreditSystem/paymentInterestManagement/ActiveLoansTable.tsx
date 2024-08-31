import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { ActiveLoan } from "@/types/financialManagement";
import {
  formatCurrency,
  formatDate,
} from "@/utils/financialManagement/bankCreditSystem/paymentInterestManagement/formatters";

interface ActiveLoansTableProps {
  loans: ActiveLoan[];
}

const ActiveLoansTable: React.FC<ActiveLoansTableProps> = ({ loans }) => {
  const columns = [
    { name: "ID Préstamo", uid: "id" },
    { name: "Monto", uid: "amount" },
    { name: "Tasa de Interés", uid: "interestRate" },
    { name: "Fecha de Vencimiento", uid: "dueDate" },
    { name: "Estado", uid: "status" },
  ];

  const renderCell = (loan: ActiveLoan, columnKey: React.Key) => {
    switch (columnKey) {
      case "amount":
        return formatCurrency(loan.amount);
      case "interestRate":
        return `${loan.interestRate}%`;
      case "dueDate":
        return formatDate(loan.dueDate);
      default:
        return loan[columnKey as keyof ActiveLoan];
    }
  };

  return (
    <ResponsiveTable columns={columns} items={loans} renderCell={renderCell} />
  );
};

export default ActiveLoansTable;
