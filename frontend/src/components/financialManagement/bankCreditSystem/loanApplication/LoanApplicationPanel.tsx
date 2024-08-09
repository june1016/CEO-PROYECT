// frontend/src/components/financialManagement/bankCreditSystem/loanApplication/LoanApplicationPanel.tsx
"use client";
import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import LoanApplicationForm from "./LoanApplicationForm";
import LoanCalculator from "./LoanCalculator";
import LoanProjectionChart from "./LoanProjectionChart";
import useLoanApplication from "@/components/hooks/financialManagement/bankCreditSystem/loanApplication/useLoanApplication";

const MemoizedLoanApplicationForm = React.memo(LoanApplicationForm);
const MemoizedLoanCalculator = React.memo(LoanCalculator);
const MemoizedLoanProjectionChart = React.memo(LoanProjectionChart);

const LoanApplicationPanel: React.FC = () => {
  const {
    selectedTab,
    handleTabChange,
    loanData,
    handleLoanApplication,
    handleLoanCalculation,
    loanProjection,
  } = useLoanApplication();

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: "application",
        title: "Solicitud de Préstamo",
        content: (
          <MemoizedLoanApplicationForm
            onSubmit={handleLoanApplication}
            loanData={loanData}
          />
        ),
      },
      {
        key: "calculator",
        title: "Calculadora de Préstamo",
        content: (
          <MemoizedLoanCalculator
            onCalculate={handleLoanCalculation}
            loanData={loanData}
          />
        ),
      },
      {
        key: "projection",
        title: "Proyección de Pagos",
        content: <MemoizedLoanProjectionChart data={loanProjection} />,
      },
    ],
    [loanData, loanProjection, handleLoanApplication, handleLoanCalculation]
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <ReusableTabs
          items={tabItems}
          selectedTab={selectedTab}
          onSelectionChange={handleTabChange}
          ariaLabel="Solicitud de Préstamos"
        />
        <Button color="primary" onClick={() => console.log("Generar informe")}>
          Generar Informe
        </Button>
      </div>
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(LoanApplicationPanel);
