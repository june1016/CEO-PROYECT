"use client";
import React from "react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import { useTabSelection } from "@/hooks/useTabSelection";
import FinancialDataTable from "./FinancialDataTable";
import RawMaterialInventoryTable from "./RawMaterialInventoryTable";
import FinancialDataCharts from "./FinancialDataCharts";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/General/searchIcon";
import { motion } from "framer-motion";

const OpeningInformationTabs: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("financialData");
  const [filterValue, setFilterValue] = React.useState("");

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const tabItems: TabItem[] = [
    {
      key: "financialData",
      title: "Datos Financieros",
      content: <FinancialDataTable filterValue={filterValue} />, // Asegurarse de que `filterValue` esté definido en el componente
    },
    {
      key: "rawMaterialInventory",
      title: "Inventario de Materia Prima",
      content: <RawMaterialInventoryTable filterValue={filterValue} />, // Asegurarse de que `filterValue` esté definido en el componente
    },
    {
      key: "financialCharts",
      title: "Gráficos Financieros",
      content: <FinancialDataCharts filterValue={filterValue} />, // Asegurarse de que `filterValue` esté definido en el componente
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Información de Apertura</h1>
        <Input
          className="max-w-xs"
          placeholder="Buscar..."
          startContent={<SearchIcon />}
          value={filterValue}
          onValueChange={handleFilterChange}
        />
      </div>
      <ReusableTabs
        items={tabItems}
        selectedTab={selectedTab}
        onSelectionChange={handleTabChange}
        ariaLabel="Información de Apertura"
      />
    </motion.div>
  );
};

export default OpeningInformationTabs;
