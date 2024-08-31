import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { LoanData } from "@/types/financialManagement";

interface LoanApplicationFormProps {
  onSubmit: (values: LoanData) => void;
  loanData: LoanData;
}

const validationSchema = z.object({
  amount: z
    .number()
    .min(1000, "El monto mínimo es $1,000")
    .max(1000000, "El monto máximo es $1,000,000"),
  interestRate: z
    .number()
    .min(1, "La tasa de interés mínima es 1%")
    .max(30, "La tasa de interés máxima es 30%"),
  term: z
    .number()
    .min(6, "El plazo mínimo es 6 meses")
    .max(360, "El plazo máximo es 360 meses"),
});

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({
  onSubmit,
  loanData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanData>({
    defaultValues: loanData,
    resolver: zodResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="amount"
        control={control}
        render={({ field }) => (
          <NumericFormat
            {...field}
            customInput={Input}
            thousandSeparator={true}
            prefix="$"
            onValueChange={(values) => {
              field.onChange(values.floatValue);
            }}
            label="Monto del préstamo"
            placeholder="Ingrese el monto"
            errorMessage={errors.amount?.message}
          />
        )}
      />

      <Controller
        name="interestRate"
        control={control}
        render={({ field }) => (
          <NumericFormat
            {...field}
            customInput={Input}
            suffix="%"
            decimalScale={2}
            onValueChange={(values) => {
              field.onChange(values.floatValue);
            }}
            label="Tasa de interés anual"
            placeholder="Ingrese la tasa de interés"
            errorMessage={errors.interestRate?.message}
          />
        )}
      />

      <Controller
        name="term"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label="Plazo del préstamo"
            placeholder="Seleccione el plazo"
            onChange={(e) => field.onChange(parseInt(e.target.value))}
            errorMessage={errors.term?.message}
          >
            {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((months) => (
              <SelectItem key={months} value={months}>
                {months} meses
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Button type="submit" color="primary">
        Solicitar Préstamo
      </Button>
    </form>
  );
};

export default LoanApplicationForm;
