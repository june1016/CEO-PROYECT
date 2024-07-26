"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Product } from "@/types/market";
import { columns, products } from "../../data/market/productData";

export const ProductTable: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const list = useAsyncList<Product>({
    async load({ signal }) {
      // Simulamos una carga asíncrona
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
      return {
        items: products,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const column = sortDescriptor.column as keyof Product;
          const first = a[column];
          const second = b[column];
          let cmp = 0;

          if (typeof first === "string" && typeof second === "string") {
            cmp = first.localeCompare(second);
          } else if (typeof first === "number" && typeof second === "number") {
            cmp = first - second;
          }

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <Table
      aria-label="Tabla de productos con ordenamiento del lado del cliente"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
      classNames={{
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.uid} allowsSorting>
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        items={list.items}
        isLoading={isLoading}
        loadingContent={<Spinner label="Cargando..." />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{item[columnKey as keyof Product]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
