// frontend\src\components\financialManagement\currentAssetsManagement\cashBankTable.tsx

import React from "react";
import {
  Card,
  CardBody,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  CashBankTransaction,
  CashBankBalance,
} from "@/types/financialManagement";
import { CashBankChart } from "./cashBankChart";
import { useCashBankTable } from "@/components/hooks/financialManagement/currentAssetsManagement/useCashBankTable";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { renderCashBankCell } from "@/components/utils/financialManagement/currentAssetsManagement/renderCells";

interface CashBankTableProps {
  transactions: CashBankTransaction[];
  balances: CashBankBalance[];
}

const columns = [
  { name: "FECHA", uid: "fecha" },
  { name: "TIPO", uid: "tipo" },
  { name: "CONCEPTO", uid: "concepto" },
  { name: "MONTO", uid: "monto" },
  { name: "CUENTA", uid: "cuenta" },
];

export const CashBankTable: React.FC<CashBankTableProps> = ({
  transactions,
  balances,
}) => {
  const { filteredItems, onTypeFilterChange } = useCashBankTable(transactions);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-1">
        <CardBody>
          <h3 className="text-lg font-bold mb-4">Saldos de Cuentas</h3>
          <CashBankChart balances={balances} />
        </CardBody>
      </Card>
      <Card className="lg:col-span-2">
        <CardBody>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Movimientos Recientes</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button size="sm" color="primary">
                  Filtrar por tipo
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => onTypeFilterChange(key as string)}
              >
                <DropdownItem key="all">Todos</DropdownItem>
                <DropdownItem key="ingreso">Ingreso</DropdownItem>
                <DropdownItem key="egreso">Egreso</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <ResponsiveTable
            columns={columns}
            items={filteredItems}
            renderCell={(item, columnKey) =>
              renderCashBankCell(item as CashBankTransaction, columnKey)
            }
          />
        </CardBody>
      </Card>
    </div>
  );
};
