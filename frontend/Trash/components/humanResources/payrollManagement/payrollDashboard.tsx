// frontend/src/components/humanResources/payrollManagement/payrollDashboard.tsx
"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Employee } from "@/types/humanResources";
import { formatCurrency } from "@/utils/humanResources/payrollManagement/formatters";
import { motion } from "framer-motion";

interface PayrollDashboardProps {
  employees: Employee[];
}

const PayrollDashboard: React.FC<PayrollDashboardProps> = ({ employees }) => {
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  const totalBonuses = employees.reduce((sum, emp) => sum + emp.bonuses, 0);
  const totalCommissions = employees.reduce(
    (sum, emp) => sum + emp.commissions,
    0
  );
  const totalCompensation = employees.reduce(
    (sum, emp) => sum + emp.totalCompensation,
    0
  );

  const barChartData = [
    { name: "Salarios", value: totalSalary },
    { name: "Bonificaciones", value: totalBonuses },
    { name: "Comisiones", value: totalCommissions },
  ];

  const pieChartData = [
    { name: "Salarios", value: totalSalary },
    { name: "Bonificaciones", value: totalBonuses },
    { name: "Comisiones", value: totalCommissions },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <Card>
        <CardHeader className="pb-0 pt-2 px-4">
          <h4 className="font-bold text-large">
            Distribución de Costos de Nómina
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Bar dataKey="value" fill="#0070F3" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="pb-0 pt-2 px-4">
          <h4 className="font-bold text-large">Proporción de Costos</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="pb-0 pt-2 px-4">
          <h4 className="font-bold text-large">Resumen de Costos</h4>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-small text-default-500">Total Salarios:</p>
              <p className="text-large font-semibold">
                {formatCurrency(totalSalary)}
              </p>
            </div>
            <div>
              <p className="text-small text-default-500">
                Total Bonificaciones:
              </p>
              <p className="text-large font-semibold">
                {formatCurrency(totalBonuses)}
              </p>
            </div>
            <div>
              <p className="text-small text-default-500">Total Comisiones:</p>
              <p className="text-large font-semibold">
                {formatCurrency(totalCommissions)}
              </p>
            </div>
            <div>
              <p className="text-small text-default-500">Compensación Total:</p>
              <p className="text-large font-semibold">
                {formatCurrency(totalCompensation)}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default PayrollDashboard;
