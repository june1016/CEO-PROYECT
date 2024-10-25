import { useMemo, useCallback } from "react";
import {
  accountsReceivable,
  accountsPayable,
  accountsDistribution,
} from "@/data/financialManagement/assetLiabilityManagement/accountsReceivablePayable";
import { generateAgeingReport } from "@/utils/financialManagement/assetLiabilityManagement/accountsReceivablePayable/reportGenerator";
import { FinancialSummary } from "@/types/financialManagement";
import { useTabSelection } from "@/hooks/useTabSelection";

const useAccountsManagement = () => {
  const { selectedTab, handleTabChange } = useTabSelection("receivable");

  const financialSummary: FinancialSummary = useMemo(() => {
    return {
      totalReceivable: accountsReceivable.reduce(
        (sum, account) => sum + account.amount,
        0
      ),
      totalPayable: accountsPayable.reduce(
        (sum, account) => sum + account.amount,
        0
      ),
      cashFlow:
        accountsReceivable.reduce((sum, account) => sum + account.amount, 0) -
        accountsPayable.reduce((sum, account) => sum + account.amount, 0),
      overdueReceivable: accountsReceivable
        .filter((account) => account.status === "Vencido")
        .reduce((sum, account) => sum + account.amount, 0),
      overduePayable: accountsPayable
        .filter((account) => account.status === "Vencido")
        .reduce((sum, account) => sum + account.amount, 0),
    };
  }, []);

  const handleGenerateReport = useCallback(() => {
    const report = generateAgeingReport(accountsReceivable, accountsPayable);
    console.log("Reporte generado:", report);
  }, []);

  return {
    selectedTab,
    handleTabChange,
    financialSummary,
    handleGenerateReport,
    accountsReceivable,
    accountsPayable,
    accountsDistribution,
  };
};

export default useAccountsManagement;
