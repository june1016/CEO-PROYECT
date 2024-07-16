import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";

export const CardBalance1 = () => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white">Ingresos Totales</span>
            <span className="text-white text-xs">Último mes</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center">
          <span className="text-white text-xl font-semibold">$1,234,567</span>
          <span className="text-success text-xs">+ 5.2%</span>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <div>
              <span className="font-semibold text-success text-xs">{"↑"}</span>
              <span className="text-xs text-white">800,000</span>
            </div>
            <span className="text-white text-xs">Ventas</span>
          </div>
          <div>
            <div>
              <span className="font-semibold text-danger text-xs">{"↓"}</span>
              <span className="text-xs text-white">434,567</span>
            </div>
            <span className="text-white text-xs">Otros ingresos</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
