// frontend/src/components/finanzas/BalanceGeneral.tsx
"use client";
import React from "react";
import { Chip, Card, CardBody } from "@nextui-org/react";
import { BalanceItem } from "@/types/finanzas";
import { balanceData } from "@/data/finanzas/balanceGeneral";
import { MoneyIcon } from "../icons/finanzas/MoneyIcon";
import { DebtIcon } from "../icons/finanzas/DebtIcon";
import { EquityIcon } from "../icons/finanzas/EquityIcon";
import { ResponsiveTable } from "./ResponsiveTable";
import { BalanceChart } from "./BalanceChart";

const columns = [
  { name: "CATEGORÍA", uid: "categoria" },
  { name: "SUBCATEGORÍA", uid: "subcategoria" },
  { name: "VALOR", uid: "valor" },
];

export default function BalanceGeneral({
  filterValue,
}: {
  filterValue: string;
}) {
  const filteredItems = React.useMemo(() => {
    return balanceData.filter((item) =>
      item.subcategoria.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

  const totales = React.useMemo(() => {
    const totalActivos = balanceData
      .filter((item) => item.categoria === "Activos")
      .reduce((sum, item) => sum + item.valor, 0);
    const totalPasivos = balanceData
      .filter((item) => item.categoria === "Pasivos")
      .reduce((sum, item) => sum + item.valor, 0);
    const totalPatrimonio = balanceData
      .filter((item) => item.categoria === "Patrimonio")
      .reduce((sum, item) => sum + item.valor, 0);
    return { totalActivos, totalPasivos, totalPatrimonio };
  }, []);

  const renderCell = React.useCallback(
    (item: BalanceItem, columnKey: React.Key) => {
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
    },
    []
  );

  return (
    <Card>
      <CardBody>
        <ResponsiveTable
          columns={columns}
          items={filteredItems}
          renderCell={renderCell}
        />
        <Card className="mt-4">
          <CardBody>
            <h3 className="text-lg font-bold mb-2">
              Totales del Balance General
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold">Total Activos</p>
                <p className="text-success font-bold">
                  ${totales.totalActivos.toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Total Pasivos</p>
                <p className="text-danger font-bold">
                  ${totales.totalPasivos.toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Total Patrimonio</p>
                <p className="text-warning font-bold">
                  ${totales.totalPatrimonio.toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">
            Gráfico del Balance General
          </h3>
          <BalanceChart data={balanceData} />
        </div>
      </CardBody>
    </Card>
  );
}
