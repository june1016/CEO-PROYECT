import React from "react";
import { useFinancialData } from "@/hooks/openingInformation/useFinancialData";
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
import { Spinner } from "@nextui-org/react";

const FinancialDataCharts: React.FC = () => {
  const { data: financialData, isLoading, error } = useFinancialData();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al cargar los datos financieros</div>;

  const chartData = financialData?.[0]
    ? [
        { name: "Efectivo en caja", value: financialData[0].cash_on_hand },
        { name: "Efectivo en banco", value: financialData[0].cash_in_bank },
        {
          name: "Equipo de Cómputo",
          value: financialData[0].computer_equipment,
        },
        { name: "Mobiliario", value: financialData[0].furniture_fixtures },
        { name: "Maquinaria", value: financialData[0].machinery_equipment },
        { name: "Capital social", value: financialData[0].capital_stock },
      ]
    : [];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FinancialDataCharts;
