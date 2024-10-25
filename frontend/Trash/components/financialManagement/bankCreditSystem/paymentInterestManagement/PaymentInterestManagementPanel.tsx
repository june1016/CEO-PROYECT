"use client";
import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import ActiveLoansTable from "./ActiveLoansTable";
import InterestRateChart from "./InterestRateChart";
import PaymentScheduleForm from "./PaymentScheduleForm";
import usePaymentInterestManagement from "@/hooks/financialManagement/bankCreditSystem/paymentInterestManagement/usePaymentInterestManagement";

const MemoizedActiveLoansTable = React.memo(ActiveLoansTable);
const MemoizedInterestRateChart = React.memo(InterestRateChart);
const MemoizedPaymentScheduleForm = React.memo(PaymentScheduleForm);

const PaymentInterestManagementPanel: React.FC = () => {
  const {
    selectedTab,
    handleTabChange,
    activeLoans,
    interestRates,
    handlePaymentScheduling,
    handleEarlyPaymentSimulation,
    handleInterestRateChange,
  } = usePaymentInterestManagement();

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: "activeLoans",
        title: "Préstamos Activos",
        content: <MemoizedActiveLoansTable loans={activeLoans} />,
      },
      {
        key: "interestRates",
        title: "Tasas de Interés",
        content: <MemoizedInterestRateChart data={interestRates} />,
      },
      {
        key: "paymentSchedule",
        title: "Programación de Pagos",
        content: (
          <MemoizedPaymentScheduleForm
            onSubmit={handlePaymentScheduling}
            onSimulateEarlyPayment={handleEarlyPaymentSimulation}
          />
        ),
      },
    ],
    [
      activeLoans,
      interestRates,
      handlePaymentScheduling,
      handleEarlyPaymentSimulation,
    ]
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <ReusableTabs
          items={tabItems}
          selectedTab={selectedTab}
          onSelectionChange={handleTabChange}
          ariaLabel="Gestión de Pagos y Tasas de Interés"
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

export default React.memo(PaymentInterestManagementPanel);
