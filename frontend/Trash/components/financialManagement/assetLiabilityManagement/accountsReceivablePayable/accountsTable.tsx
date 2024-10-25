import React, { useState, useMemo } from "react";
import { Input, Pagination } from "@nextui-org/react";
import { Account } from "@/types/financialManagement";
import { useAccountsTable } from "@/hooks/financialManagement/assetLiabilityManagement/accountsReceivablePayable/useAccountsTable";
import { renderAccountCell } from "@/utils/financialManagement/assetLiabilityManagement/accountsReceivablePayable/renderCells";
import { ResponsiveTable } from "@/components/shared/responsiveTable";

interface AccountsTableProps {
  accounts: Account[];
  type: "receivable" | "payable";
}

export const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  type,
}) => {
  const { sortedAccounts, handleSort } = useAccountsTable(accounts);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const rowsPerPage = 10;

  const filteredAccounts = useMemo(
    () =>
      sortedAccounts.filter(
        (account) =>
          account.clientName.toLowerCase().includes(filter.toLowerCase()) ||
          account.status.toLowerCase().includes(filter.toLowerCase())
      ),
    [sortedAccounts, filter]
  );

  const pages = Math.ceil(filteredAccounts.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredAccounts.slice(start, end);
  }, [page, filteredAccounts]);

  const columns = [
    { name: "Cliente", uid: "clientName", sortable: true },
    { name: "Monto", uid: "amount", sortable: true },
    { name: "Fecha de vencimiento", uid: "dueDate", sortable: true },
    { name: "Estado", uid: "status", sortable: true },
    { name: "Días de retraso", uid: "daysOverdue", sortable: true },
  ];

  return (
    <div>
      <Input
        placeholder="Filtrar por cliente o estado"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      <ResponsiveTable
        columns={columns}
        items={items}
        renderCell={renderAccountCell}
        onSortChange={(column, direction) =>
          handleSort(column as keyof Account, direction)
        }
      />
      <Pagination
        total={pages}
        page={page}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};
