// frontend/src/components/finanzas/BalanceChart.tsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { BalanceItem } from "@/types/finanzas";

interface BalanceChartProps {
  data: BalanceItem[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export const BalanceChart: React.FC<BalanceChartProps> = ({ data }) => {
  const chartData = [
    {
      name: "Activos",
      value: data
        .filter((item) => item.categoria === "Activos")
        .reduce((sum, item) => sum + item.valor, 0),
    },
    {
      name: "Pasivos",
      value: data
        .filter((item) => item.categoria === "Pasivos")
        .reduce((sum, item) => sum + item.valor, 0),
    },
    {
      name: "Patrimonio",
      value: data
        .filter((item) => item.categoria === "Patrimonio")
        .reduce((sum, item) => sum + item.valor, 0),
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
