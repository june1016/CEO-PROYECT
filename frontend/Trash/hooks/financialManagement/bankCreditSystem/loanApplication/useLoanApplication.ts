import { useState, useCallback } from "react";
import { useTabSelection } from "@/hooks/useTabSelection";
import { LoanData, LoanProjection } from "@/types/financialManagement";
import { calculateLoanPayments } from "@/utils/financialManagement/bankCreditSystem/loanApplication/loanCalculations";

const useLoanApplication = () => {
  const { selectedTab, handleTabChange } = useTabSelection("application");
  const [loanData, setLoanData] = useState<LoanData>({
    amount: 0,
    interestRate: 0,
    term: 0,
  });
  const [loanProjection, setLoanProjection] = useState<LoanProjection[]>([]);

  const handleLoanApplication = useCallback(
    (data: LoanData) => {
      setLoanData(data);
      const projection = calculateLoanPayments(data);
      setLoanProjection(projection);
      handleTabChange("projection");
    },
    [handleTabChange]
  );

  const handleLoanCalculation = useCallback((data: LoanData) => {
    setLoanData(data);
    const projection = calculateLoanPayments(data);
    setLoanProjection(projection);
  }, []);

  return {
    selectedTab,
    handleTabChange,
    loanData,
    handleLoanApplication,
    handleLoanCalculation,
    loanProjection,
  };
};

export default useLoanApplication;
