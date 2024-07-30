"use client";

import React from "react";
import { ProductTable } from "./productTable";
import { InventoryDisplay } from "./inventoryDisplay";
import { InitialInventory } from "./initialInventory";
import { useTabSelection } from "@/components/hooks/useTabSelection";
import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";

export const MarketInfoTabs: React.FC = () => {
  const { selectedTab, handleTabChange } = useTabSelection("productos");

  const tabItems: TabItem[] = [
    {
      key: "productos",
      title: "Productos",
      content: <ProductTable />,
    },
    {
      key: "inventario",
      title: "Indicadores objetivo",
      content: <InventoryDisplay />,
    },
    {
      key: "inventarioInicial",
      title: "Inventario inicial",
      content: <InitialInventory />,
    },
  ];

  return (
    <div className="flex flex-col space-y-4">
      <ReusableTabs
        items={tabItems}
        selectedTab={selectedTab}
        onSelectionChange={handleTabChange}
        ariaLabel="Opciones"
      />
      <div className="mt-4">
        {tabItems.find((item) => item.key === selectedTab)?.content}
      </div>
    </div>
  );
};
