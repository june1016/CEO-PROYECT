"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import LoanApplicationPanel from "@/components/financialManagement/bankCreditSystem/loanApplication/LoanApplicationPanel";

const bankCreditPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("loanApplication");

  return (
    <div className="flex flex-col space-y-4">
      <Tabs
        aria-label="Bank Credit System"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab key="loanApplication" title="Solicitud de préstamos">
          <Card>
            <CardBody>
              <LoanApplicationPanel />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="accounts" title="Gestión de pagos y tasas de interés">
          <Card>
            <CardBody>{/* < /> */}</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default bankCreditPanel;