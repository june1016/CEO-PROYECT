"use client";
import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { useTabSelection } from "@/components/hooks/useTabSelection";
import { ReusableTabs } from "@/components/shared/reusableTabs";
import { AccountsTable } from "./accountsTable";
import { AccountsDistributionChart } from "./AccountsDistributionChart";
import { PaymentRecordForm } from "./PaymentRecordForm";
import {
  accountsReceivable,
  accountsPayable,
  accountsDistribution,
} from "@/data/financialManagement/accountsReceivablePayable";
import { generateAgeingReport } from "@/components/utils/financialManagement/accountsReceivablePayable/reportGenerator";

const AccountsManagementPanel: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("receivable");

  const tabItems = useMemo(
    () => [
      {
        key: "receivable",
        title: "Cuentas por Cobrar",
        content: (
          <AccountsTable accounts={accountsReceivable} type="receivable" />
        ),
      },
      {
        key: "payable",
        title: "Cuentas por Pagar",
        content: <AccountsTable accounts={accountsPayable} type="payable" />,
      },
      {
        key: "distribution",
        title: "Distribución de Cuentas",
        content: <AccountsDistributionChart data={accountsDistribution} />,
      },
      {
        key: "payment",
        title: "Registro de Pagos/Cobros",
        content: <PaymentRecordForm />,
      },
    ],
    []
  );

  const handleGenerateReport = () => {
    const report = generateAgeingReport(accountsReceivable, accountsPayable);
    // Aquí puedes decidir qué hacer con el reporte generado
    // Por ejemplo, abrirlo en una nueva ventana o descargarlo
    console.log("Reporte generado:", report);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Administración de Cuentas por Cobrar y Pagar
        </h1>
        <Button color="primary" onClick={handleGenerateReport}>
          Generar Reporte de Antigüedad
        </Button>
      </div>
      <ReusableTabs
        items={tabItems}
        selectedTab={selectedTab}
        onSelectionChange={handleTabChange}
        ariaLabel="Administración de Cuentas"
      />
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(AccountsManagementPanel);
