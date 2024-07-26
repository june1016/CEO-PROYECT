"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
//import { InventoryItem } from "@/types/market";
import { initialInventoryData } from "../../data/market/initialInventoryData";

export const InitialInventory: React.FC = () => {
  const totalInventory = initialInventoryData.reduce(
    (sum, item) => sum + (item.costoTotal || 0),
    0
  );

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Inventario Inicial</h2>
      </CardHeader>
      <CardBody>
        <Table aria-label="Tabla de Inventario Inicial">
          <TableHeader>
            <TableColumn>Material</TableColumn>
            <TableColumn>Cantidad</TableColumn>
            <TableColumn>Unidad</TableColumn>
            <TableColumn>Costo Unitario</TableColumn>
            <TableColumn>Costo Total</TableColumn>
          </TableHeader>
          <TableBody>
            {initialInventoryData.map((item) => (
              <TableRow key={item.material}>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.cantidad || "-"}</TableCell>
                <TableCell>{item.unidad}</TableCell>
                <TableCell>
                  {item.costoUnitario
                    ? `$${item.costoUnitario.toLocaleString()}`
                    : "-"}
                </TableCell>
                <TableCell>
                  {item.costoTotal
                    ? `$${item.costoTotal.toLocaleString()}`
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 text-right">
          <strong>
            Total del Inventario Inicial: ${totalInventory.toLocaleString()}
          </strong>
        </div>
      </CardBody>
    </Card>
  );
};
