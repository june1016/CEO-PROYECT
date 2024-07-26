import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { BalanceItem } from "@/types/financialManagement";
import { useBalanceChartData } from "@/components/hooks/financialManagement/financialStatements/useBalanceChartData";

interface BalanceChartProps {
  data: BalanceItem[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export const BalanceChart: React.FC<BalanceChartProps> = React.memo(
  ({ data }) => {
    const chartData = useBalanceChartData(data);

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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
);

BalanceChart.displayName = "BalanceChart";
