// src/components/financialManagement/cashFlowProjections/LiquidityAnalysis/LiquidityRatiosChart.tsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { LiquidityData } from "@/types/financialManagement";

interface LiquidityRatiosChartProps {
  data: LiquidityData[];
}

const LiquidityRatiosChart: React.FC<LiquidityRatiosChartProps> = ({
  data,
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="currentRatio"
          stroke="#8884d8"
          name="Ratio Corriente"
        />
        <Line
          type="monotone"
          dataKey="quickRatio"
          stroke="#82ca9d"
          name="Ratio Rápido"
        />
        <Line
          type="monotone"
          dataKey="cashRatio"
          stroke="#ffc658"
          name="Ratio de Efectivo"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LiquidityRatiosChart;
