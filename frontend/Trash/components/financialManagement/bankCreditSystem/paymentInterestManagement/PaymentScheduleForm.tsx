import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Button } from "@nextui-org/react";
import { PaymentSchedule } from "@/types/financialManagement";

interface PaymentScheduleFormProps {
  onSubmit: (values: PaymentSchedule) => void;
  onSimulateEarlyPayment: (loanId: string, amount: number) => void;
}

const validationSchema = z.object({
  loanId: z.string().nonempty("El ID del préstamo es requerido"),
  amount: z.string().nonempty("El monto es requerido"),
  date: z.string().nonempty("La fecha de pago es requerida"),
});

type FormValues = z.infer<typeof validationSchema>;

const PaymentScheduleForm: React.FC<PaymentScheduleFormProps> = ({
  onSubmit,
  onSimulateEarlyPayment,
}) => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { loanId: "", amount: "", date: "" },
    resolver: zodResolver(validationSchema),
  });

  const watchedValues = watch();

  const handleFormSubmit = (data: FormValues) => {
    onSubmit({
      ...data,
      amount: parseFloat(data.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Controller
        name="loanId"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            label="ID del Préstamo"
            placeholder="Ingrese el ID del préstamo"
            errorMessage={error?.message}
          />
        )}
      />
      <Controller
        name="amount"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="text"
            label="Monto"
            placeholder="Ingrese el monto del pago"
            errorMessage={error?.message}
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type="date"
            label="Fecha de Pago"
            placeholder="Seleccione la fecha de pago"
            errorMessage={error?.message}
          />
        )}
      />
      <div className="flex space-x-2">
        <Button type="submit" color="primary">
          Programar Pago
        </Button>
        <Button
          onClick={() =>
            onSimulateEarlyPayment(
              watchedValues.loanId,
              parseFloat(watchedValues.amount)
            )
          }
          color="secondary"
        >
          Simular Pago Anticipado
        </Button>
      </div>
    </form>
  );
};

export default PaymentScheduleForm;
