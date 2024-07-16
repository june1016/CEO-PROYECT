import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";

export const CardDecisions = () => {
  const decisions = [
    { name: "Ajuste de precios", action: "Pendiente", date: "15/07/2024" },
    {
      name: "Inversión en publicidad",
      action: "Completada",
      date: "10/07/2024",
    },
    {
      name: "Contratación de personal",
      action: "En progreso",
      date: "20/07/2024",
    },
    { name: "Licitación pública", action: "Pendiente", date: "25/07/2024" },
    { name: "Mejora de producción", action: "Completada", date: "05/07/2024" },
  ];

  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">
              Decisiones Recientes
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6 ">
          {decisions.map((decision, index) => (
            <div key={index} className="grid grid-cols-3 w-full">
              <span className="text-default-900 font-semibold">
                {decision.name}
              </span>
              <div>
                <span
                  className={`text-xs ${
                    decision.action === "Completada"
                      ? "text-success"
                      : decision.action === "Pendiente"
                      ? "text-warning"
                      : "text-primary"
                  }`}
                >
                  {decision.action}
                </span>
              </div>
              <div>
                <span className="text-default-500 text-xs">
                  {decision.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
