// src/components/financialManagement/cashFlowProjections/MonthlyProjectionIE/MonthlyProjectionIEPanel.tsx

import React, { useMemo } from "react";
import { Button } from "@nextui-org/react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import ProjectionChart from "./ProjectionChart";
import ProjectionTable from "./ProjectionTable";
import ProjectionControlPanel from "./ProjectionControlPanel";
import useMonthlyProjection from "@/hooks/financialManagement/cashFlowProjections/MonthlyProjectionIE/useMonthlyProjection";

const MemoizedProjectionChart = React.memo(ProjectionChart);
const MemoizedProjectionTable = React.memo(ProjectionTable);
const MemoizedProjectionControlPanel = React.memo(ProjectionControlPanel);

const MonthlyProjectionIEPanel: React.FC = () => {
  const {
    selectedTab,
    handleTabChange,
    projectionData,
    handleProjectionUpdate,
    handleScenarioChange,
  } = useMonthlyProjection();

  const tabItems: TabItem[] = useMemo(
    () => [
      {
        key: "chart",
        title: "Gráfico de Proyección",
        content: <MemoizedProjectionChart data={projectionData} />,
      },
      {
        key: "table",
        title: "Tabla de Proyección",
        content: (
          <MemoizedProjectionTable
            data={projectionData}
            onUpdate={handleProjectionUpdate}
          />
        ),
      },
      {
        key: "control",
        title: "Panel de Control",
        content: (
          <MemoizedProjectionControlPanel
            onScenarioChange={handleScenarioChange}
          />
        ),
      },
    ],
    [projectionData, handleProjectionUpdate, handleScenarioChange]
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <ReusableTabs
          items={tabItems}
          selectedTab={selectedTab}
          onSelectionChange={handleTabChange}
          ariaLabel="Proyección Mensual de Ingresos y Egresos"
        />
        <Button color="primary" onClick={() => console.log("Exportar a Excel")}>
          Exportar a Excel
        </Button>
      </div>
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};

export default React.memo(MonthlyProjectionIEPanel);
