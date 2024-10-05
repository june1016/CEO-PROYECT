// "use client";
// import React, { useMemo } from "react";
// import { Input } from "@nextui-org/react";
// import { SearchIcon } from "../icons/General/searchIcon";
// import { ProductIcon } from "../icons/General/productIcon";
// import { TargetIcon } from "../icons/General/targetIcon";
// import { InitialInventoryIcon } from "../icons/General/initialInventoryIcon";
// import { ProductTable } from "./productTable";
// import { InventoryDisplay } from "./inventoryDisplay";
// import { InitialInventory } from "./initialInventory";
// import { useTabSelection } from "@/hooks/useTabSelection";
// import { ReusableTabs, TabItem } from "@/components/shared/reusableTabs";
// import useMarketTab from "@/hooks/market/useMarketTab";

// const MemoizedProductTable = React.memo(ProductTable);
// const MemoizedInventoryDisplay = React.memo(InventoryDisplay);
// const MemoizedInitialInventory = React.memo(InitialInventory);

// const MarketInfoTabs: React.FC = () => {
//   const { selectedTab, handleTabChange } = useTabSelection("productos");
//   const { filterValue, handleFilterChange, clearFilter } = useMarketTab();

//   const tabItems: TabItem[] = useMemo(
//     () => [
//       {
//         key: "productos",
//         title: (
//           <div className="flex items-center space-x-2">
//             <ProductIcon />
//             <span>Productos</span>
//           </div>
//         ),
//         content: <MemoizedProductTable filterValue={filterValue} />,
//       },
//       {
//         key: "inventario",
//         title: (
//           <div className="flex items-center space-x-2">
//             <TargetIcon />
//             <span>Indicadores objetivo</span>
//           </div>
//         ),
//         content: <MemoizedInventoryDisplay filterValue={filterValue} />,
//       },
//       {
//         key: "inventarioInicial",
//         title: (
//           <div className="flex items-center space-x-2">
//             <InitialInventoryIcon />
//             <span>Inventario inicial</span>
//           </div>
//         ),
//         content: <MemoizedInitialInventory filterValue={filterValue} />,
//       },
//     ],
//     [filterValue]
//   );

//   return (
//     <div className="flex flex-col space-y-4">
//       {/* <h1 className="text-3xl font-bold mb-6">Información de Mercado</h1> */}
//       <div className="flex justify-between items-center">
//         <div className="flex-grow">
//           <ReusableTabs
//             items={tabItems}
//             selectedTab={selectedTab}
//             onSelectionChange={handleTabChange}
//             ariaLabel="Información de Mercado"
//           />
//         </div>
//         <div className="ml-4">
//           <Input
//             isClearable
//             className="w-full max-w-[250px]"
//             placeholder="Buscar..."
//             startContent={<SearchIcon />}
//             value={filterValue}
//             onClear={clearFilter}
//             onValueChange={handleFilterChange}
//           />
//         </div>
//       </div>
//       <div className="mt-4">
//         {tabItems.find((item) => item.key === selectedTab)?.content}
//       </div>
//     </div>
//   );
// };

// export default React.memo(MarketInfoTabs);
