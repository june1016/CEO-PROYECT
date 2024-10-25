"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import CashBankManagementTabs from "@/components/financialManagement/assetLiabilityManagement/currentAssetsManagement/cashBankManagementTabs";
import AccountsManagementPanel from "@/components/financialManagement/assetLiabilityManagement/accountsReceivablePayable/accountsManagementPanel";

const AssetLiabilityManagementPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("cashBank");

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Activos y Pasivos</h1>
      <Tabs
        aria-label="Asset Liability Management Options"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab key="cashBank" title="Control de Caja y Bancos">
          <Card>
            <CardBody>
              <CashBankManagementTabs />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="accounts" title="Cuentas por Cobrar y Pagar">
          <Card>
            <CardBody>
              <AccountsManagementPanel />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AssetLiabilityManagementPanel;
