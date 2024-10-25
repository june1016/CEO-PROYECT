// src/hooks/financialManagement/cashFlowProjections/MonthlyProjectionIE/useMonthlyProjection.ts

import { useState, useCallback } from "react";
import { useTabSelection } from "@/hooks/useTabSelection";
import { ProjectionData } from "@/types/financialManagement";

const useMonthlyProjection = () => {
  const { selectedTab, handleTabChange } = useTabSelection("chart");
  const [projectionData, setProjectionData] = useState<ProjectionData[]>([]);

  const handleProjectionUpdate = useCallback(
    (updatedData: ProjectionData[]) => {
      setProjectionData(updatedData);
    },
    []
  );

  const handleScenarioChange = useCallback((scenario: string) => {
    // Lógica para cambiar el escenario de proyección
    console.log("Changing scenario to:", scenario);
  }, []);

  return {
    selectedTab,
    handleTabChange,
    projectionData,
    handleProjectionUpdate,
    handleScenarioChange,
  };
};

export default useMonthlyProjection;
