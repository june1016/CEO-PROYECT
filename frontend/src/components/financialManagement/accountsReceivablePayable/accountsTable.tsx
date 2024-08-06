import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { Account } from "@/types/financialManagement";
import { renderAccountCell } from "@/components/utils/financialManagement/accountsReceivablePayable/renderCells";
import { useAccountsTable } from "@/components/hooks/financialManagement/accountsReceivablePayable/useAccountsTable";

interface AccountsTableProps {
  accounts: Account[];
  type: "receivable" | "payable";
}

const columns = [
  { name: "CLIENTE/PROVEEDOR", uid: "clientName" },
  { name: "MONTO", uid: "amount" },
  { name: "FECHA DE VENCIMIENTO", uid: "dueDate" },
  { name: "ESTADO", uid: "status" },
];

export const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  type,
}) => {
  const { sortedAccounts, handleSort } = useAccountsTable(accounts);

  return (
    <ResponsiveTable
      columns={columns}
      items={sortedAccounts}
      renderCell={(item, columnKey) =>
        renderAccountCell(item as Account, columnKey)
      }
      onSortChange={(column, direction) =>
        handleSort(column as keyof Account, direction)
      }
    />
  );
};
