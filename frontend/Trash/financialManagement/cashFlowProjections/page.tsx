"use client";
import React from "react";
import CashFlowProjectionsPanel from "@/components/financialManagement/cashFlowProjections/cashFlowProjectionsPanel";

const cashFlowProjectionsPage: React.FC = () => {
  return (
    <div className="p-4">
      <CashFlowProjectionsPanel />
    </div>
  );
};

export default cashFlowProjectionsPage;
