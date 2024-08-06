"use client";
import React from "react";
import AccountsManagementPanel from "@/components/financialManagement/accountsReceivablePayable/accountsManagementPanel";

const CurrentAssetsPage: React.FC = () => {
  return (
    <div className="p-4">
      <AccountsManagementPanel />
    </div>
  );
};

export default CurrentAssetsPage;
