// src/components/financialManagement/cashFlowProjections/MonthlyProjectionIE/ProjectionChart.tsx

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ProjectionData } from "@/types/financialManagement";

interface ProjectionChartProps {
  data: ProjectionData[];
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#8884d8" name="Ingresos" />
        <Bar dataKey="expenses" fill="#82ca9d" name="Egresos" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectionChart;
