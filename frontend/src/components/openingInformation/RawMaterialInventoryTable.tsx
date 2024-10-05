import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { useRawMaterialInventory } from "@/hooks/openingInformation/useRawMaterialInventory";
import { Spinner } from "@nextui-org/react";
import { formatCurrency } from "@/utils/formatters";
import { useFinancialData } from "@/hooks/openingInformation/useFinancialData";

interface RawMaterialInventoryTableProps {
  filterValue: string; // Definir `filterValue` en los props
}

const RawMaterialInventoryTable: React.FC<RawMaterialInventoryTableProps> = ({
  filterValue,
}) => {
  const { data: financialData } = useFinancialData();
  const financialDataId = financialData?.[0]?.id;

  const {
    data: inventoryData,
    isLoading,
    error,
  } = useRawMaterialInventory(financialDataId);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al cargar el inventario de materia prima</div>;

  // Filtrar los datos según el valor de búsqueda (`filterValue`)
  const filteredData = inventoryData?.filter((item) =>
    Object.values(item).some((val) =>
      typeof val === "string"
        ? val.toLowerCase().includes(filterValue.toLowerCase())
        : val.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  // Definir las columnas para la tabla
  const columns = [
    { name: "Código", uid: "material_code" },
    { name: "Descripción", uid: "description" },
    { name: "Cantidad", uid: "quantity" },
    { name: "Unidad", uid: "unit" },
    { name: "Costo por Unidad", uid: "cost_per_unit" },
    { name: "Costo Total", uid: "total_cost" },
  ];

  // Renderizar cada celda de la tabla
  const renderCell = (item: any, columnKey: React.Key) => {
    const value = item[columnKey as keyof typeof item];
    if (
      typeof value === "number" &&
      (columnKey === "cost_per_unit" || columnKey === "total_cost")
    ) {
      return formatCurrency(value);
    } else if (typeof value === "object" && value !== null) {
      return JSON.stringify(value); // Convertir objetos a string para renderizar
    }
    return value?.toString() || ""; // Retornar valor como string o una cadena vacía si es null/undefined
  };

  return (
    <ResponsiveTable
      columns={columns}
      items={filteredData || []}
      renderCell={renderCell}
    />
  );
};

export default RawMaterialInventoryTable;
