import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import { useRawMaterialInventory } from "@/hooks/openingInformation/useRawMaterialInventory";
import { Spinner } from "@nextui-org/react";
import { formatCurrency } from "@/utils/formatters";
import { useFinancialData } from "@/hooks/openingInformation/useFinancialData";

interface RawMaterialInventoryTableProps {
  filterValue: string;
}

const RawMaterialInventoryTable: React.FC<RawMaterialInventoryTableProps> = ({
  filterValue,
}) => {
  const {
    data: financialData,
    isLoading: isLoadingFinancialData,
    error: errorFinancialData,
  } = useFinancialData();

  const financialDataId =
    financialData && financialData.length > 0 ? financialData[0].id : null;

  const {
    data: inventoryData,
    isLoading: isLoadingInventory,
    error: errorInventory,
  } = useRawMaterialInventory(financialDataId);

  if (isLoadingFinancialData || isLoadingInventory) return <Spinner />;
  if (errorFinancialData)
    return <div>Error al cargar los datos financieros</div>;
  if (errorInventory)
    return <div>Error al cargar el inventario de materia prima</div>;

  if (!financialDataId) return <div>No se encontró información financiera</div>;

  const filteredData = inventoryData?.filter((item) =>
    Object.values(item).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const columns = [
    { name: "Código", uid: "material_code" },
    { name: "Descripción", uid: "description" },
    { name: "Cantidad", uid: "quantity" },
    { name: "Unidad", uid: "unit" },
    { name: "Costo por Unidad", uid: "cost_per_unit" },
    { name: "Costo Total", uid: "total_cost" },
  ];

  const renderCell = (item: any, columnKey: React.Key) => {
    const value = item[columnKey as keyof typeof item];
    if (
      typeof value === "number" &&
      (columnKey === "cost_per_unit" || columnKey === "total_cost")
    ) {
      return formatCurrency(value);
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

export default RawMaterialInventoryTable;
