// frontend/src/components/financialManagement/bankCreditSystem/paymentInterestManagement/PaymentScheduleForm.tsx

import React from "react";
import { Formik, Form, Field } from "formik";
import { Input, Button } from "@nextui-org/react";
import { PaymentSchedule } from "@/types/financialManagement";

interface PaymentScheduleFormProps {
  onSubmit: (values: PaymentSchedule) => void;
  onSimulateEarlyPayment: (loanId: string, amount: number) => void;
}

const PaymentScheduleForm: React.FC<PaymentScheduleFormProps> = ({
  onSubmit,
  onSimulateEarlyPayment,
}) => {
  return (
    <Formik
      initialValues={{ loanId: "", amount: 0, date: "" }}
      onSubmit={(values) => onSubmit(values as PaymentSchedule)}
    >
      {({ values }) => (
        <Form className="space-y-4">
          <Field name="loanId">
            {({ field }: any) => (
              <Input
                {...field}
                label="ID del Préstamo"
                placeholder="Ingrese el ID del préstamo"
              />
            )}
          </Field>
          <Field name="amount">
            {({ field }: any) => (
              <Input
                {...field}
                type="number"
                label="Monto"
                placeholder="Ingrese el monto del pago"
              />
            )}
          </Field>
          <Field name="date">
            {({ field }: any) => (
              <Input {...field} type="date" label="Fecha de Pago" />
            )}
          </Field>
          <div className="flex space-x-2">
            <Button type="submit" color="primary">
              Programar Pago
            </Button>
            <Button
              onClick={() =>
                onSimulateEarlyPayment(values.loanId, values.amount)
              }
              color="secondary"
            >
              Simular Pago Anticipado
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentScheduleForm;
