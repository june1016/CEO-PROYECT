"use client";
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
import { IncomeStatementItem } from "@/types/financialManagement";
import { useResultsChartData } from "@/hooks/financialManagement/financialStatements/useResultsChartData";

interface ResultsChartProps {
  data: IncomeStatementItem[];
}

export const ResultsChart: React.FC<ResultsChartProps> = React.memo(
  ({ data }) => {
    const chartData = useResultsChartData(data);

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
  }
);

ResultsChart.displayName = "ResultsChart";
