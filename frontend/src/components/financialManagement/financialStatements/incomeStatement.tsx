import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { incomeStatementData } from "@/data/financialManagement/incomeStatement";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { SummaryCard } from "./summaryCard";
import { ResultsChart } from "./resultsChart";
import { useFilteredData } from "@/components/hooks/financialManagement/financialStatements/useFilteredData";
import { useIncomeStatementCalculations } from "@/components/hooks/financialManagement/financialStatements/useIncomeStatementCalculations";
import { renderIncomeStatementCell } from "@/components/utils/financialManagement/financialStatements/renderCells";

const columns = [
  { name: "CONCEPTO", uid: "concepto" },
  { name: "VALOR", uid: "valor" },
];

const IncomeStatement: React.FC<{ filterValue: string }> = ({
  filterValue,
}) => {
  const filteredItems = useFilteredData(
    incomeStatementData,
    filterValue,
    "concepto"
  );
  const calculations = useIncomeStatementCalculations(incomeStatementData);

  return (
    <Card>
      <CardBody>
        <ResponsiveTable
          columns={columns}
          items={filteredItems}
          renderCell={renderIncomeStatementCell}
        />
        <SummaryCard
          title="Resumen de Utilidades"
          items={[
            {
              label: "Utilidad Bruta",
              value: calculations.grossProfit,
              color: "success",
            },
            {
              label: "Utilidad Operativa",
              value: calculations.operatingProfit,
              color: "primary",
            },
            {
              label: "Utilidad antes de Impuestos",
              value: calculations.profitBeforeTax,
              color: "secondary",
            },
            {
              label: "Utilidad Neta",
              value: calculations.netProfit,
              color: "warning",
            },
          ]}
        />
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">
            Gráfico del Estado de Resultados
          </h3>
          <ResultsChart data={incomeStatementData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default IncomeStatement;
