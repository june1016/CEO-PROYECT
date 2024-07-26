"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { ProductTable } from "./productTable";
import { InventoryDisplay } from "./inventoryDisplay";
import { InitialInventory } from "./initialInventory";

export const MarketInfoTabs: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("productos");

  return (
    <div>
      <Tabs
        aria-label="Opciones"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab key="productos" title="Productos">
          {selectedTab === "productos" && <ProductTable />}
        </Tab>
        <Tab key="inventario" title="indicadores objetivo">
          {selectedTab === "inventario" && <InventoryDisplay />}
        </Tab>
        <Tab key="inventarioInicial" title="inventario inicial">
          {selectedTab === "inventarioInicial" && <InitialInventory />}
        </Tab>
      </Tabs>
    </div>
  );
};
