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
  SortDescriptor,
} from "@nextui-org/react";

interface ResponsiveTableProps {
  columns: { name: string; uid: string; sortable?: boolean }[];
  items: any[];
  renderCell: (item: any, columnKey: React.Key) => React.ReactNode;
  onSortChange?: (
    column: string,
    direction: "ascending" | "descending"
  ) => void;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  columns,
  items,
  renderCell,
  onSortChange,
}) => {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: undefined,
    direction: "ascending",
  });

  const handleSortChange = (descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    if (onSortChange && descriptor.column) {
      onSortChange(
        descriptor.column.toString(),
        descriptor.direction as "ascending" | "descending"
      );
    }
  };

  return (
    <>
      {/* Tabla para pantallas más grandes */}
      <div className="hidden md:block">
        <Table
          aria-label="Tabla de datos"
          sortDescriptor={sortDescriptor}
          onSortChange={handleSortChange}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "valor" ? "end" : "start"}
                allowsSorting={column.sortable !== false}
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
                  className="flex justify-between items-center py-1"
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
