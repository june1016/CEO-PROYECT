// frontend/src/components/humanResources/payrollManagement/salaryAdjustForm.tsx
"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/types/humanResources";
import {
  Select,
  SelectItem,
  Input,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { motion } from "framer-motion";

const schema = z.object({
  employeeId: z.string().nonempty("Seleccionar un empleado es obligatorio"),
  newSalary: z
    .number({ invalid_type_error: "El salario debe ser un número" })
    .min(0, "El salario debe ser mayor o igual a 0"),
});

type FormData = z.infer<typeof schema>;

interface SalaryAdjustFormProps {
  employees: Employee[];
  onSalaryAdjust: (id: string, newSalary: number) => void;
}

const SalaryAdjustForm: React.FC<SalaryAdjustFormProps> = ({
  employees,
  onSalaryAdjust,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      employeeId: "",
      newSalary: 0,
    },
  });

  const onSubmit = (data: FormData) => {
    onSalaryAdjust(data.employeeId, data.newSalary);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="employeeId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Empleado"
                  placeholder="Selecciona un empleado"
                  errorMessage={errors.employeeId?.message}
                  isInvalid={!!errors.employeeId}
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys)[0])
                  }
                >
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="newSalary"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label="Nuevo Salario"
                  placeholder="0"
                  errorMessage={errors.newSalary?.message}
                  isInvalid={!!errors.newSalary}
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(Number(value))}
                />
              )}
            />

            <Button type="submit" color="primary" className="w-full">
              Actualizar Salario
            </Button>
          </form>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default SalaryAdjustForm;
