// src/components/shared/responsiveTable.tsx
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
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden md:block"
      >
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="md:hidden space-y-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
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
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};
