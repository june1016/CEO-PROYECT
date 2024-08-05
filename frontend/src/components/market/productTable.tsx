"use client";

import React, { useMemo } from "react";
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
  Chip,
} from "@nextui-org/react";
import { Product, Column } from "@/types/market";
import { ProductIcon } from "@/components/icons/General/productIcon";
import { columns, products } from "@/data/market/productData";

interface ProductTableProps {
  filterValue: string;
}

export const ProductTable: React.FC<ProductTableProps> = ({ filterValue }) => {
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center">
          <ProductIcon className="mr-2" />
          <h2 className="text-xl font-semibold">Tabla de Productos</h2>
        </div>
      </CardHeader>
      <CardBody>
        <Table aria-label="Tabla de Productos" shadow="none">
          <TableHeader>
            {columns.map((column: Column) => (
              <TableColumn key={column.uid}>{column.name}</TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product: Product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.estimatedQuantity}</TableCell>
                <TableCell>
                  <Chip color="success" variant="flat">
                    ${product.marketPrice.toLocaleString()}
                  </Chip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};
