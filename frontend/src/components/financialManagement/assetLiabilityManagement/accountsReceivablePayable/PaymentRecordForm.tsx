import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  accountsReceivable,
  accountsPayable,
} from "@/data/financialManagement/assetLiabilityManagement/accountsReceivablePayable";
import { PaymentRecord } from "@/types/financialManagement";

export const PaymentRecordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentRecord>({
    defaultValues: {
      type: "Pago",
      accountId: "",
      amount: 0,
      date: "",
      isPartialPayment: false,
    },
  });

  const allAccounts = [...accountsReceivable, ...accountsPayable];

  const onSubmit: SubmitHandler<PaymentRecord> = (data) => {
    console.log(data);
    // Aquí iría la lógica para procesar el formulario
  };

  return (
    // <Card>
    //   <CardBody>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="type"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <Select
            label="Tipo de Operación"
            placeholder="Seleccione el tipo"
            {...field}
            errorMessage={errors.type?.message}
          >
            <SelectItem key="Pago" value="Pago">
              Pago
            </SelectItem>
            <SelectItem key="Cobro" value="Cobro">
              Cobro
            </SelectItem>
          </Select>
        )}
      />
      <Controller
        name="accountId"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <Select
            label="Cuenta"
            placeholder="Seleccione la cuenta"
            {...field}
            errorMessage={errors.accountId?.message}
          >
            {allAccounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.clientName} - ${account.amount}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      <Controller
        name="amount"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <Input
            type="number"
            label="Monto"
            placeholder="Ingrese el monto"
            value={field.value?.toString() || ""}
            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
            onBlur={field.onBlur}
            errorMessage={errors.amount?.message}
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        rules={{ required: "Este campo es requerido" }}
        render={({ field }) => (
          <Input
            type="date"
            label="Fecha"
            value={field.value || ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage={errors.date?.message}
          />
        )}
      />
      <div className="flex justify-between">
        <Button type="submit" color="primary">
          Registrar Operación
        </Button>
        <Controller
          name="isPartialPayment"
          control={control}
          render={({ field }) => (
            <Button
              type="button"
              color="secondary"
              onClick={() => field.onChange(true)}
            >
              Pago Parcial
            </Button>
          )}
        />
      </div>
    </form>
    //   </CardBody>
    // </Card>
  );
};
