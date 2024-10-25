// src/components/financialManagement/cashFlowProjections/MonthlyProjectionIE/ProjectionControlPanel.tsx

import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface ProjectionControlPanelProps {
  onScenarioChange: (scenario: string) => void;
}

const ProjectionControlPanel: React.FC<ProjectionControlPanelProps> = ({
  onScenarioChange,
}) => {
  return (
    <div>
      <Select
        label="Escenario"
        placeholder="Seleccione un escenario"
        onChange={(e) => onScenarioChange(e.target.value)}
      >
        <SelectItem key="optimista" value="optimista">
          Optimista
        </SelectItem>
        <SelectItem key="pesimista" value="pesimista">
          Pesimista
        </SelectItem>
        <SelectItem key="realista" value="realista">
          Realista
        </SelectItem>
      </Select>
    </div>
  );
};

export default ProjectionControlPanel;
