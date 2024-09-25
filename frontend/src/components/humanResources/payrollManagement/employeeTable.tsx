// frontend/src/components/humanResources/payrollManagement/employeeTable.tsx
"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  Input,
} from "@nextui-org/react";
import { Employee } from "@/types/humanResources";
import { motion } from "framer-motion";
import { Edit2, Save } from "lucide-react";
import { formatCurrency } from "@/utils/humanResources/payrollManagement/formatters";

interface EmployeeTableProps {
  employees: Employee[];
  onSalaryChange: (id: string, newSalary: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onSalaryChange,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editSalary, setEditSalary] = useState<number>(0);

  const columns = [
    { name: "EMPLEADO", uid: "name" },
    { name: "POSICIÓN", uid: "position" },
    { name: "SALARIO", uid: "salary" },
    { name: "BONIFICACIONES", uid: "bonuses" },
    { name: "COMISIONES", uid: "commissions" },
    { name: "TOTAL", uid: "totalCompensation" },
    { name: "ACCIONES", uid: "actions" },
  ];

  const renderCell = (employee: Employee, columnKey: React.Key) => {
    const cellValue = employee[columnKey as keyof Employee];

    switch (columnKey) {
      case "name":
        return (
          <User
            name={employee.name}
            description={employee.position}
            avatarProps={{ src: `https://i.pravatar.cc/150?u=${employee.id}` }}
          />
        );
      case "salary":
        return editingId === employee.id ? (
          <Input
            type="number"
            value={editSalary.toString()}
            onChange={(e) => setEditSalary(Number(e.target.value))}
            size="sm"
          />
        ) : (
          formatCurrency(employee.salary)
        );
      case "bonuses":
      case "commissions":
      case "totalCompensation":
        return formatCurrency(cellValue as number);
      case "actions":
        return (
          <div className="flex items-center gap-2">
            {editingId === employee.id ? (
              <Tooltip content="Guardar">
                <Button
                  isIconOnly
                  size="sm"
                  color="success"
                  onClick={() => {
                    onSalaryChange(employee.id, editSalary);
                    setEditingId(null);
                  }}
                >
                  <Save size={18} />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip content="Editar salario">
                <Button
                  isIconOnly
                  size="sm"
                  color="primary"
                  onClick={() => {
                    setEditingId(employee.id);
                    setEditSalary(employee.salary);
                  }}
                >
                  <Edit2 size={18} />
                </Button>
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Table aria-label="Tabla de empleados">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={employees}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default EmployeeTable;
