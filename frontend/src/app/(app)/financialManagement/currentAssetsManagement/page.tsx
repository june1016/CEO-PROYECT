// frontend/src/app/(app)/financialManagement/currentAssets/page.tsx

"use client";
import React from "react";
import CashBankManagementTabs from "@/components/financialManagement/currentAssetsManagement/cashBankManagementTabs";

const CurrentAssetsPage: React.FC = () => {
  return (
    <div className="p-4">
      <CashBankManagementTabs />
    </div>
  );
};

export default CurrentAssetsPage;
