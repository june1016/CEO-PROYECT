"use client";
import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import { AccountsTable } from "./accountsTable";
import { AccountsDistributionChart } from "./AccountsDistributionChart";
import { PaymentRecordForm } from "./PaymentRecordForm";
import useAccountsManagement from "@/components/hooks/financialManagement/assetLiabilityManagement/accountsReceivablePayable/useAccountsManagement";

const MemoizedAccountsTable = React.memo(AccountsTable);
const MemoizedAccountsDistributionChart = React.memo(AccountsDistributionChart);
const MemoizedPaymentRecordForm = React.memo(PaymentRecordForm);

const AccountsManagementPanel: React.FC = () => {
  const {
    selectedTab,
    handleTabChange,
    financialSummary,
    handleGenerateReport,
    accountsReceivable,
    accountsPayable,
    accountsDistribution,
  } = useAccountsManagement();

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: "receivable",
        title: "Cuentas por Cobrar",
        content: (
          <>
            <h2 className="text-xl font-semibold mb-4">Cuentas por Cobrar</h2>
            <MemoizedAccountsTable
              accounts={accountsReceivable}
              type="receivable"
            />
          </>
        ),
      },
      {
        key: "payable",
        title: "Cuentas por Pagar",
        content: (
          <>
            <h2 className="text-xl font-semibold mb-4">Cuentas por Pagar</h2>
            <MemoizedAccountsTable accounts={accountsPayable} type="payable" />
          </>
        ),
      },
      {
        key: "distribution",
        title: "Distribución de Cuentas",
        content: (
          <MemoizedAccountsDistributionChart
            data={accountsDistribution}
            financialSummary={financialSummary}
          />
        ),
      },
      {
        key: "payment",
        title: "Registro de Pagos/Cobros",
        content: <MemoizedPaymentRecordForm />,
      },
    ],
    [
      financialSummary,
      accountsReceivable,
      accountsPayable,
      accountsDistribution,
    ]
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* <h1 className="text-2xl font-bold mb-4">Administración de Cuentas</h1> */}
      <div className="flex justify-between items-center">
        <div className="flex-grow flex items-center">
          <ReusableTabs
            items={tabItems}
            selectedTab={selectedTab}
            onSelectionChange={handleTabChange}
            ariaLabel="Administración de Cuentas"
          />
          <Button
            color="primary"
            className="ml-4 h-[40px]" // Ajustado para coincidir con la altura de las pestañas
            onClick={handleGenerateReport}
          >
            Generar Reporte
          </Button>
        </div>
      </div>
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(AccountsManagementPanel);
