// frontend/src/components/finanzas/EstadoResultados.tsx
"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { EstadoResultadosItem } from "@/types/financialManagement";
import { estadoResultadosData } from "@/data/financialManagement/estadoResultados";
import { IncomeIcon } from "../../icons/General/incomeIcon";
import { ExpenseIcon } from "../../icons/General/expenseIcon";
import { ResponsiveTable } from "../../shared/table/responsiveTable";
import { ResultsChart } from "./resultsChart";

const columns = [
  { name: "CONCEPTO", uid: "concepto" },
  { name: "VALOR", uid: "valor" },
];

export default function EstadoResultados({
  filterValue,
}: {
  filterValue: string;
}) {
  const filteredItems = React.useMemo(() => {
    return estadoResultadosData.filter((item) =>
      item.concepto.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

  const renderCell = React.useCallback(
    (item: EstadoResultadosItem, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof EstadoResultadosItem];

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
    },
    []
  );

  const calcularUtilidad = React.useMemo(() => {
    const ingresos =
      estadoResultadosData.find(
        (item) => item.concepto === "Ingresos por ventas"
      )?.valor || 0;
    const costoVentas =
      estadoResultadosData.find((item) => item.concepto === "Costo de ventas")
        ?.valor || 0;
    const gastosOperativos =
      estadoResultadosData.find((item) => item.concepto === "Gastos operativos")
        ?.valor || 0;
    const gastosFinancieros =
      estadoResultadosData.find(
        (item) => item.concepto === "Gastos financieros"
      )?.valor || 0;
    const impuestos =
      estadoResultadosData.find((item) => item.concepto === "Impuestos")
        ?.valor || 0;

    const utilidadBruta = ingresos - costoVentas;
    const utilidadOperativa = utilidadBruta - gastosOperativos;
    const utilidadAntesImpuestos = utilidadOperativa - gastosFinancieros;
    const utilidadNeta = utilidadAntesImpuestos - impuestos;

    return {
      utilidadBruta,
      utilidadOperativa,
      utilidadAntesImpuestos,
      utilidadNeta,
    };
  }, []);

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
            <h3 className="text-lg font-bold mb-2">Resumen de Utilidades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="font-semibold">Utilidad Bruta</p>
                <p className="text-success font-bold">
                  ${calcularUtilidad.utilidadBruta.toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Utilidad Operativa</p>
                <p className="text-primary font-bold">
                  ${calcularUtilidad.utilidadOperativa.toLocaleString("es-CO")}
                </p>
              </div>
              <div>
                <p className="font-semibold">Utilidad antes de Impuestos</p>
                <p className="text-secondary font-bold">
                  $
                  {calcularUtilidad.utilidadAntesImpuestos.toLocaleString(
                    "es-CO"
                  )}
                </p>
              </div>
              <div>
                <p className="font-semibold">Utilidad Neta</p>
                <p className="text-warning font-bold">
                  ${calcularUtilidad.utilidadNeta.toLocaleString("es-CO")}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">
            Gráfico del Estado de Resultados
          </h3>
          <ResultsChart data={estadoResultadosData} />
        </div>
      </CardBody>
    </Card>
  );
}
