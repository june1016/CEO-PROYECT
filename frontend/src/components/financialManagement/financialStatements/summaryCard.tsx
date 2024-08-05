import React from "react";
import { Card, CardBody } from "@nextui-org/react";

interface SummaryItem {
  label: string;
  value: number;
  color: string;
}

interface SummaryCardProps {
  title: string;
  items: SummaryItem[];
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, items }) => {
  return (
    <Card className="mt-4">
      <CardBody>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div key={index}>
              <p className="font-semibold">{item.label}</p>
              <p className={`text-${item.color} font-bold`}>
                ${item.value.toLocaleString("es-CO")}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
