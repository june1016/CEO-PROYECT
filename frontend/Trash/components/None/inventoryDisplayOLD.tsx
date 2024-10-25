"use client";

import React, { useState, useMemo } from "react";
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
  Chip,
} from "@nextui-org/react";
import { MarginData, IndicadorData } from "@/types/market";
import {
  initialMargins,
  initialIndicadores,
} from "../../data/market/marketData";
import { PercentIcon } from "@/components/icons/General/percentIcon";
import { TargetIcon } from "@/components/icons/General/targetIcon";

interface InventoryDisplayProps {
  filterValue: string;
}

export const InventoryDisplay: React.FC<InventoryDisplayProps> = ({
  filterValue,
}) => {
  const [margins, setMargins] = useState<MarginData[]>(initialMargins);
  const [indicadores, setIndicadores] =
    useState<IndicadorData[]>(initialIndicadores);

  const filteredMargins = useMemo(() => {
    return margins.filter((item) =>
      item.producto.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [margins, filterValue]);

  const filteredIndicadores = useMemo(() => {
    return indicadores.filter((item) =>
      item.indicador.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [indicadores, filterValue]);

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
        <CardHeader className="flex items-center">
          <PercentIcon className="mr-2" />
          <h2 className="text-xl font-semibold">Márgenes de Utilidad</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabla de Márgenes de Utilidad" shadow="none">
            <TableHeader>
              <TableColumn>PRODUCTO</TableColumn>
              <TableColumn>MARGEN DE UTILIDAD</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredMargins.map((item, index) => (
                <TableRow key={item.producto}>
                  <TableCell>{item.producto}</TableCell>
                  <TableCell>
                    <Input
                      value={item.margen}
                      onChange={(e) =>
                        handleMarginChange(index, e.target.value)
                      }
                      size="sm"
                      endContent={
                        <Chip size="sm" variant="flat" color="primary">
                          %
                        </Chip>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center">
          <TargetIcon className="mr-2" />
          <h2 className="text-xl font-semibold">Indicadores Objetivos</h2>
        </CardHeader>
        <CardBody>
          <Table aria-label="Tabla de Indicadores Objetivos" shadow="none">
            <TableHeader>
              <TableColumn>INDICADOR</TableColumn>
              <TableColumn>VALOR</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredIndicadores.map((item, index) => (
                <TableRow key={item.indicador}>
                  <TableCell>{item.indicador}</TableCell>
                  <TableCell>
                    <Input
                      value={item.valor}
                      onChange={(e) =>
                        handleIndicadorChange(index, e.target.value)
                      }
                      size="sm"
                      endContent={
                        <Chip size="sm" variant="flat" color="secondary">
                          Objetivo
                        </Chip>
                      }
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
