import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { useFinancialData } from "@/hooks/openingInformation/useFinancialData";
import { Spinner } from "@nextui-org/react";
import { formatCurrency } from "@/utils/formatters";

interface FinancialDataTableProps {
  filterValue: string; // Asegurarse de que `filterValue` esté definido
}

const FinancialDataTable: React.FC<FinancialDataTableProps> = ({
  filterValue,
}) => {
  const { data: financialData, isLoading, error } = useFinancialData();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al cargar los datos financieros</div>;

  const filteredData = financialData?.filter((item) =>
    Object.values(item).some((val) =>
      typeof val === "string"
        ? val.toLowerCase().includes(filterValue.toLowerCase())
        : val.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const columns = [
    { name: "Compañía", uid: "company_name" },
    { name: "Efectivo", uid: "cash" },
    { name: "Bancos", uid: "banks" },
    { name: "Equipo de Cómputo", uid: "computer_equipment" },
    { name: "Mobiliario", uid: "furniture_fixtures" },
    { name: "Maquinaria", uid: "machinery_equipment" },
    { name: "Capital", uid: "capital" },
  ];

  const renderCell = (item: any, columnKey: React.Key) => {
    const value = item[columnKey as keyof typeof item];
    if (typeof value === "number") {
      return formatCurrency(value);
    }
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value?.toString() || "";
  };

  return (
    <ResponsiveTable
      columns={columns}
      items={filteredData || []}
      renderCell={renderCell}
    />
  );
};

export default FinancialDataTable;
