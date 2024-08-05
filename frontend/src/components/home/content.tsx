"use client";
import React from "react";
import dynamic from "next/dynamic";
import { TableWrapper } from "./table";
import { CardBalance1 } from "./cardBalance1";
import { CardBalance2 } from "./cardBalance2";
import { CardBalance3 } from "./cardBalance3";
import { CardAgents } from "./cardAgents";
import { CardDecisions } from "./cardTransactions"; // Cambiaremos el nombre de este componente
import { Link } from "@nextui-org/react";
import NextLink from "next/link";

const Chart = dynamic(() => import("./steam").then((mod) => mod.Steam), {
  ssr: false,
});

export const Content = () => (
  <div className="h-full lg:px-6">
    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
      <div className="mt-6 gap-6 flex flex-col w-full">
        {/* Resumen Financiero */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Estado Actual de la Empresa</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
            <CardBalance1 />
            <CardBalance2 />
            <CardBalance3 />
          </div>
        </div>

        {/* Indicadores Clave */}
        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Indicadores Clave</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Chart />
          </div>
        </div>
      </div>

      {/* Decisiones Recientes */}
      <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
        <h3 className="text-xl font-semibold">Decisiones Recientes</h3>
        <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
          <CardAgents />
          <CardDecisions />
        </div>
      </div>
    </div>

    {/* Acciones Pendientes */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <div className="flex  flex-wrap justify-between">
        <h3 className="text-center text-xl font-semibold">
          Acciones Pendientes
        </h3>
        <Link
          href="/acciones"
          as={NextLink}
          color="primary"
          className="cursor-pointer"
        >
          Ver Todas
        </Link>
      </div>
      <TableWrapper />
    </div>

    {/* Nueva sección: Objetivos del Mes */}
    <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
      <h3 className="text-center text-xl font-semibold">Objetivos del Mes</h3>
      {/* Aquí puedes añadir un nuevo componente para mostrar los objetivos del mes */}
    </div>
  </div>
);
