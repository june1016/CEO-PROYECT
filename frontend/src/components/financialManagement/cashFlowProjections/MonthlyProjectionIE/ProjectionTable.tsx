// src/components/financialManagement/cashFlowProjections/MonthlyProjectionIE/ProjectionTable.tsx

import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { ProjectionData } from "@/types/financialManagement";

interface ProjectionTableProps {
  data: ProjectionData[];
  onUpdate: (updatedData: ProjectionData[]) => void;
}

const ProjectionTable: React.FC<ProjectionTableProps> = ({
  data,
  onUpdate,
}) => {
  const columns = [
    { name: "Mes", uid: "month" },
    { name: "Ingresos", uid: "income" },
    { name: "Egresos", uid: "expenses" },
  ];

  const renderCell = (item: ProjectionData, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof ProjectionData];
    return cellValue;
  };

  return (
    <ResponsiveTable columns={columns} items={data} renderCell={renderCell} />
  );
};

export default ProjectionTable;
