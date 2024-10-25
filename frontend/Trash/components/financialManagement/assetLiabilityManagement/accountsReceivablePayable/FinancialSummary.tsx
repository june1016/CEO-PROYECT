import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { FinancialSummary as FinancialSummaryType } from "@/types/financialManagement";

interface FinancialSummaryProps {
  summary: FinancialSummaryType;
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  summary,
}) => {
  return (
    <Card>
      <CardBody>
        <h2 className="text-lg font-semibold mb-2">Resumen Financiero</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>Total por Cobrar: ${summary.totalReceivable.toFixed(2)}</div>
          <div>Total por Pagar: ${summary.totalPayable.toFixed(2)}</div>
          <div>Flujo de Caja: ${summary.cashFlow.toFixed(2)}</div>
          <div>Vencido por Cobrar: ${summary.overdueReceivable.toFixed(2)}</div>
          <div>Vencido por Pagar: ${summary.overduePayable.toFixed(2)}</div>
        </div>
      </CardBody>
    </Card>
  );
};
