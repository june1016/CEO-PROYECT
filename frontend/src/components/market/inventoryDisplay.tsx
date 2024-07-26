"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { MarginData, IndicadorData } from "@/types/market";
import {
  initialMargins,
  initialIndicadores,
} from "../../data/market/inventoryData";

export const InventoryDisplay: React.FC = () => {
  const [margins, setMargins] = useState<MarginData[]>(initialMargins);
  const [indicadores, setIndicadores] =
    useState<IndicadorData[]>(initialIndicadores);

  const handleMarginChange = (index: number, value: string) => {
    const newMargins = [...margins];
    newMargins[index].margen = value;
    setMargins(newMargins);
  };

  const handleIndicadorChange = (index: number, value: string) => {
    const newIndicadores = [...indicadores];
    newIndicadores[index].valor = value;
    setIndicadores(newIndicadores);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Márgenes de Utilidad</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabla de Márgenes de Utilidad">
            <TableHeader>
              <TableColumn>Producto</TableColumn>
              <TableColumn>Margen de Utilidad</TableColumn>
            </TableHeader>
            <TableBody>
              {margins.map((item, index) => (
                <TableRow key={item.producto}>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>
                    <Input
                      value={item.margen}
                      onChange={(e) =>
                        handleMarginChange(index, e.target.value)
                      }
                      size="sm"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Indicadores Objetivos</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabla de Indicadores Objetivos">
            <TableHeader>
              <TableColumn>Indicador</TableColumn>
              <TableColumn>Valor</TableColumn>
            </TableHeader>
            <TableBody>
              {indicadores.map((item, index) => (
                <TableRow key={item.indicador}>
                  <TableCell>{item.indicador}</TableCell>
                  <TableCell>
                    <Input
                      value={item.valor}
                      onChange={(e) =>
                        handleIndicadorChange(index, e.target.value)
                      }
                      size="sm"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};
