// src/components/openingInformation/OpeningInformationTabs.tsx
"use client";
import React from "react";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
import { useTabSelection } from "@/hooks/useTabSelection";
import FinancialDataList from "./3.1/financialDataTable";
import RawMaterialInventoryTable from "./3.1/rawMaterialInventoryTable";
import FinancialDataCharts from "./3.1/financialDataCharts";
import { Input, Card, CardBody } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons/General/searchIcon";
import { motion } from "framer-motion";

const OpeningInformationTabs: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection(
    "informacionApertura"
  );
  const [filterValue, setFilterValue] = React.useState("");

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  const tabItems: TabItem[] = [
    {
      key: "informacionApertura",
      title: "Información de Apertura",
      content: (
        <div className="space-y-8">
          <FinancialDataList />
          <Card>
            <CardBody>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Materia prima inicial</h3>
                <Input
                  className="max-w-xs"
                  placeholder="Buscar materia prima..."
                  startContent={<SearchIcon />}
                  value={filterValue}
                  onValueChange={handleFilterChange}
                />
              </div>
              <RawMaterialInventoryTable filterValue={filterValue} />
            </CardBody>
          </Card>
          <FinancialDataCharts />
        </div>
      ),
    },
    {
      key: "balanceGeneral",
      title: "Balance General",
      content: <div>Contenido del Balance General (3.2)</div>,
    },
    {
      key: "indicadoresIniciales",
      title: "Indicadores Iniciales",
      content: <div>Contenido de Indicadores Iniciales (3.3)</div>,
    },
    {
      key: "indicadoresObjetivo",
      title: "Indicadores Objetivo",
      content: <div>Contenido de Indicadores Objetivo (3.4)</div>,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <h1 className="text-2xl font-bold">Información de Apertura</h1>
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
