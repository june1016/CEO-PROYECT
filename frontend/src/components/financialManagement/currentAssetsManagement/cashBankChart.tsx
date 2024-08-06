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
import { CashBankBalance } from "@/types/financialManagement";

interface CashBankChartProps {
  balances: CashBankBalance[];
}

export const CashBankChart: React.FC<CashBankChartProps> = ({ balances }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={balances}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cuenta" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="saldo" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
