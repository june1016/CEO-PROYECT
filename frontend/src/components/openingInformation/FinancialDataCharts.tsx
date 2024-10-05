// src/components/openingInformation/FinancialDataCharts.tsx
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

interface FinancialDataChartsProps {
  filterValue: string; // Definir `filterValue` en los props
}

const FinancialDataCharts: React.FC<FinancialDataChartsProps> = ({
  filterValue,
}) => {
  const { data: financialData, isLoading, error } = useFinancialData();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al cargar los datos financieros</div>;

  // Filtrar los datos según el valor de búsqueda (`filterValue`)
  const filteredData = financialData?.filter((item) =>
    Object.values(item).some((val) =>
      typeof val === "string"
        ? val.toLowerCase().includes(filterValue.toLowerCase())
        : val.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const chartData = filteredData?.[0]
    ? [
        { name: "Efectivo", value: filteredData[0].cash },
        { name: "Bancos", value: filteredData[0].banks },
        {
          name: "Equipo de Cómputo",
          value: filteredData[0].computer_equipment,
        },
        { name: "Mobiliario", value: filteredData[0].furniture_fixtures },
        { name: "Maquinaria", value: filteredData[0].machinery_equipment },
        { name: "Capital", value: filteredData[0].capital },
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
