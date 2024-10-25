// src/components/openingInformation/FinancialDataList.tsx
import React from "react";
import { useFinancialData } from "@/hooks/openingInformation/useFinancialData";
import { Spinner, Card, CardBody, Divider } from "@nextui-org/react";
import { formatCurrency } from "@/utils/formatters";
import { motion } from "framer-motion";

const FinancialDataList: React.FC = () => {
  const { data: financialData, isLoading, error } = useFinancialData();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error al cargar los datos financieros</div>;

  const company = financialData?.[0];

  if (!company) return <div>No se encontraron datos financieros</div>;

  const financialItems = [
    {
      label: "Activos",
      items: [
        { label: "Dinero en caja", value: company.cash_on_hand },
        { label: "Dinero en banco", value: company.cash_in_bank },
        { label: "Cuentas por cobrar", value: company.accounts_receivable },
        { label: "Inventario", value: company.inventory },
        { label: "Equipos de cómputo", value: company.computer_equipment },
        { label: "Muebles y enseres", value: company.furniture_fixtures },
        { label: "Maquinaria y equipo", value: company.machinery_equipment },
        { label: "Patentes", value: company.patents },
      ],
    },
    {
      label: "Pasivos",
      items: [
        { label: "Cuentas por pagar", value: company.accounts_payable },
        { label: "Letras por pagar", value: company.notes_payable },
        { label: "Deuda a largo plazo", value: company.long_term_debt },
      ],
    },
    {
      label: "Patrimonio",
      items: [
        { label: "Capital social", value: company.capital_stock },
        { label: "Utilidades retenidas", value: company.retained_earnings },
      ],
    },
    {
      label: "Otros",
      items: [
        { label: "Ventas proyectadas", value: company.projected_sales },
        { label: "Costos operativos", value: company.operating_costs },
      ],
    },
  ];

  return (
    <Card>
      <CardBody>
        <h2 className="text-2xl font-bold mb-4">{company.company_name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialItems.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">{section.label}</h3>
              <Divider className="my-2" />
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between py-1">
                  <span className="text-gray-600">{item.label}:</span>
                  <span className="font-medium">
                    {formatCurrency(item.value)}
                  </span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default FinancialDataList;
