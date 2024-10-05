// "use client";

// import React, { useState, useMemo } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   Card,
//   CardHeader,
//   CardBody,
//   Chip,
// } from "@nextui-org/react";
// import { initialInventoryData } from "../../data/market/initialInventoryData";
// import { MoneyIcon } from "@/components/icons/General/moneyIcon";
// import { InitialInventoryIcon } from "@/components/icons/General/initialInventoryIcon";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface InitialInventoryProps {
//   filterValue: string;
// }

// export const InitialInventory: React.FC<InitialInventoryProps> = ({
//   filterValue,
// }) => {
//   const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

//   const filteredData = useMemo(() => {
//     return initialInventoryData.filter((item) =>
//       item.material.toLowerCase().includes(filterValue.toLowerCase())
//     );
//   }, [filterValue]);

//   const totalInventory = filteredData.reduce(
//     (sum, item) => sum + (item.costoTotal || 0),
//     0
//   );

//   const toggleRow = (material: string) => {
//     setExpandedRows((prev) => {
//       const next = new Set(prev);
//       if (next.has(material)) {
//         next.delete(material);
//       } else {
//         next.add(material);
//       }
//       return next;
//     });
//   };

//   const chartData = filteredData.map((item) => ({
//     name: item.material,
//     costoTotal: item.costoTotal || 0,
//   }));

//   return (
//     <>
//       <Card className="w-full mb-8">
//         <CardHeader className="flex items-center justify-between">
//           <div className="flex items-center">
//             <InitialInventoryIcon className="mr-2" />
//             <h2 className="text-xl font-semibold">Inventario Inicial</h2>
//           </div>
//           <div className="flex flex-col items-center">
//             <Chip
//               startContent={<MoneyIcon />}
//               color="success"
//               variant="flat"
//               size="lg"
//             >
//               Total: ${totalInventory.toLocaleString()}
//             </Chip>
//           </div>
//         </CardHeader>
//         <CardBody>
//           <Table aria-label="Tabla de Inventario Inicial">
//             <TableHeader>
//               <TableColumn>MATERIAL</TableColumn>
//               <TableColumn>CANTIDAD</TableColumn>
//               <TableColumn>UNIDAD</TableColumn>
//               <TableColumn>COSTO UNITARIO</TableColumn>
//               <TableColumn>COSTO TOTAL</TableColumn>
//             </TableHeader>
//             <TableBody>
//               {filteredData.map((item) => (
//                 <TableRow
//                   key={item.material}
//                   onClick={() => toggleRow(item.material)}
//                 >
//                   <TableCell>{item.material}</TableCell>
//                   <TableCell>
//                     {item.cantidad !== null ? item.cantidad : "-"}
//                   </TableCell>
//                   <TableCell>{item.unidad}</TableCell>
//                   <TableCell>
//                     {item.costoUnitario !== null
//                       ? `$${item.costoUnitario.toLocaleString()}`
//                       : "-"}
//                   </TableCell>
//                   <TableCell>
//                     <Chip color="primary" variant="flat">
//                       {item.costoTotal !== null
//                         ? `$${item.costoTotal.toLocaleString()}`
//                         : "-"}
//                     </Chip>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardBody>
//       </Card>

//       <Card className="w-full">
//         <CardHeader className="flex flex-col sm:flex-row justify-between items-center p-4">
//           <h2 className="text-xl font-semibold">
//             Distribución del Costo Total por Material
//           </h2>
//         </CardHeader>
//         <CardBody>
//           <div className="h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={chartData}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="costoTotal" fill="#4F46E5" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardBody>
//       </Card>
//     </>
//   );
// };
