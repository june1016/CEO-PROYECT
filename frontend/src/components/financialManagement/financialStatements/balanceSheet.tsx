import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { balanceData } from "@/data/financialManagement/balanceGeneral";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { BalanceChart } from "./balanceChart";
import { SummaryCard } from "./summaryCard";
import { useFilteredData } from "@/components/hooks/financialManagement/financialStatements/useFilteredData";
import { useBalanceTotals } from "@/components/hooks/financialManagement/financialStatements/useBalanceTotals";
import { renderBalanceCell } from "@/components/utils/financialManagement/financialStatements/renderCells";

const columns = [
  { name: "CATEGORÍA", uid: "categoria" },
  { name: "SUBCATEGORÍA", uid: "subcategoria" },
  { name: "VALOR", uid: "valor" },
];

interface BalanceGeneralProps {
  filterValue: string;
}

const BalanceGeneral: React.FC<BalanceGeneralProps> = ({ filterValue }) => {
  const filteredItems = useFilteredData(
    balanceData,
    filterValue,
    "subcategoria"
  );
  const totales = useBalanceTotals(balanceData);

  return (
    <Card>
      <CardBody>
        <ResponsiveTable
          columns={columns}
          items={filteredItems}
          renderCell={renderBalanceCell}
        />
        <SummaryCard
          title="Totales del Balance General"
          items={[
            {
              label: "Total Activos",
              value: totales.totalActivos,
              color: "success",
            },
            {
              label: "Total Pasivos",
              value: totales.totalPasivos,
              color: "danger",
            },
            {
              label: "Total Patrimonio",
              value: totales.totalPatrimonio,
              color: "warning",
            },
          ]}
        />
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">
            Gráfico del Balance General
          </h3>
          <BalanceChart data={balanceData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default BalanceGeneral;
