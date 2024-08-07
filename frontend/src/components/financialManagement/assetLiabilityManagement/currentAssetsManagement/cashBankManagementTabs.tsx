"use client";
import React, { useMemo } from "react";
import { BalanceIcon } from "../../../icons/General/balanceIcon";
import { CashBankTable } from "./cashBankTable";
import { TransferForm } from "./transferForm";
import { useTabSelection } from "@/components/hooks/useTabSelection";
import { ReusableTabs } from "@/components/shared/reusableTabs";
import {
  cashBankBalances,
  cashBankTransactions,
} from "@/data/financialManagement/assetLiabilityManagement/cashBankManagement";

const MemoizedCashBankTable = React.memo(CashBankTable);
const MemoizedTransferForm = React.memo(TransferForm);

const CashBankManagementTabs: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("overview");

  const tabItems = useMemo(
    () => [
      {
        key: "overview and transactions",
        title: (
          <div className="flex items-center space-x-2">
            <BalanceIcon />
            <span>Resumen y movimientos</span>
          </div>
        ),
        content: (
          <MemoizedCashBankTable
            transactions={cashBankTransactions}
            balances={cashBankBalances}
          />
        ),
      },
      {
        key: "transfer",
        title: (
          <div className="flex items-center space-x-2">
            <BalanceIcon />
            <span>Transferencias</span>
          </div>
        ),
        content: (
          <MemoizedTransferForm
            accounts={cashBankBalances.map((b) => b.cuenta)}
          />
        ),
      },
    ],
    []
  );

  return (
    <div className="flex flex-col space-y-4">
      {/* <h1 className="text-2xl font-bold mb-4">Control de Caja y Bancos</h1> */}
      <ReusableTabs
        items={tabItems}
        selectedTab={selectedTab}
        onSelectionChange={handleTabChange}
        ariaLabel="Control de Caja y Bancos"
      />
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(CashBankManagementTabs);
