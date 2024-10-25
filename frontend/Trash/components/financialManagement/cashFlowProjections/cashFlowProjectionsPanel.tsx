// src/components/financialManagement/cashFlowProjections/CashFlowProjectionsPanel.tsx

import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useTabSelection } from "@/hooks/useTabSelection";
import MonthlyProjectionIEPanel from "./MonthlyProjectionIE/MonthlyProjectionIEPanel";
import LiquidityAnalysisPanel from "./LiquidityAnalysis/LiquidityAnalysisPanel";

const CashFlowProjectionsPanel: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("monthlyProjection");

  return (
    <div className="flex flex-col space-y-4">
      <Tabs
        aria-label="Cash Flow Projections"
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="monthlyProjection"
          title="Proyección Mensual de Ingresos y Egresos"
        >
          <Card>
            <CardBody>
              <MonthlyProjectionIEPanel />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="liquidityAnalysis" title="Análisis de Liquidez">
          <Card>
            <CardBody>
              <LiquidityAnalysisPanel />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default CashFlowProjectionsPanel;
