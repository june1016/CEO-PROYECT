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
  CardBody,
} from "@nextui-org/react";

interface ResponsiveTableProps {
  columns: { name: string; uid: string }[];
  items: any[];
  renderCell: (item: any, columnKey: React.Key) => React.ReactNode;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  items,
  renderCell,
}) => {
  return (
    <>
      {/* Tabla para pantallas más grandes */}
      <div className="hidden md:block">
        <Table aria-label="Tabla de datos">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "valor" ? "end" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Tarjetas para dispositivos móviles */}
      <div className="md:hidden space-y-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardBody>
              {columns.map((column) => (
                <div
                  key={column.uid}
                  className="flex justify-between items-center"
                >
                  <span className="font-bold">{column.name}</span>
                  <span>{renderCell(item, column.uid)}</span>
                </div>
              ))}
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};
