// frontend/src/components/finanzas/ResultsChart.tsx
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
import { EstadoResultadosItem } from "@/types/financialManagement";

interface ResultsChartProps {
  data: EstadoResultadosItem[];
}

export const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item.concepto,
    valor: item.valor,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="valor" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
