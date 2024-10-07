import React from "react";
import { ResponsiveTable } from "@/components/shared/responsiveTable";
import {
  useFinancialData,
  FinancialData,
} from "@/hooks/openingInformation/useFinancialData";
import { Spinner } from "@nextui-org/react";
import { formatCurrency } from "@/utils/formatters";

interface FinancialDataTableProps {
  filterValue: string;
}

const FinancialDataTable: React.FC<FinancialDataTableProps> = ({
  filterValue,
}) => {
  const { data: financialData, isLoading, error } = useFinancialData();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al cargar los datos financieros</div>;

  const filteredData = financialData?.filter((item) =>
    Object.values(item).some(
      (val) =>
        val !== null &&
        val !== undefined &&
        val.toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const columns = [
    { name: "Compañía", uid: "company_name" },
    { name: "Dinero en caja", uid: "cash_on_hand" },
    { name: "Dinero en banco", uid: "cash_in_bank" },
    { name: "Cuentas por cobrar", uid: "accounts_receivable" },
    { name: "Inventario", uid: "inventory" },
    { name: "Equipos de cómputo", uid: "computer_equipment" },
    { name: "Muebles y enseres", uid: "furniture_fixtures" },
    { name: "Maquinaria y equipo", uid: "machinery_equipment" },
    { name: "Patentes", uid: "patents" },
    { name: "Cuentas por pagar", uid: "accounts_payable" },
    { name: "Letras por pagar", uid: "notes_payable" },
    { name: "Deuda a largo plazo", uid: "long_term_debt" },
    { name: "Capital social", uid: "capital_stock" },
    { name: "Utilidades retenidas", uid: "retained_earnings" },
    { name: "Ventas proyectadas", uid: "projected_sales" },
    { name: "Costos operativos", uid: "operating_costs" },
  ];

  const renderCell = (item: FinancialData, columnKey: React.Key) => {
    const value = item[columnKey as keyof FinancialData];
    if (typeof value === "number") {
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

export default FinancialDataTable;
