"use client";
import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { NumericFormat, NumberFormatValues } from "react-number-format";
import { LoanData } from "@/types/financialManagement";

interface LoanApplicationFormProps {
  onSubmit: (values: LoanData) => void;
  loanData: LoanData;
}

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .min(1000, "El monto mínimo es $1,000")
    .max(1000000, "El monto máximo es $1,000,000")
    .required("El monto es requerido"),
  interestRate: Yup.number()
    .min(1, "La tasa de interés mínima es 1%")
    .max(30, "La tasa de interés máxima es 30%")
    .required("La tasa de interés es requerida"),
  term: Yup.number()
    .min(6, "El plazo mínimo es 6 meses")
    .max(360, "El plazo máximo es 360 meses")
    .required("El plazo es requerido"),
});

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({
  onSubmit,
  loanData,
}) => {
  return (
    <Formik
      initialValues={loanData}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="space-y-4">
          <div>
            <Field name="amount">
              {({ field }: FieldProps) => (
                <NumericFormat
                  {...field}
                  customInput={Input}
                  thousandSeparator={true}
                  prefix="$"
                  onValueChange={(values: NumberFormatValues) => {
                    setFieldValue("amount", values.floatValue);
                  }}
                  label="Monto del préstamo"
                  placeholder="Ingrese el monto"
                  errorMessage={touched.amount && errors.amount}
                />
              )}
            </Field>
          </div>
          <div>
            <Field name="interestRate">
              {({ field }: FieldProps) => (
                <NumericFormat
                  {...field}
                  customInput={Input}
                  suffix="%"
                  decimalScale={2}
                  onValueChange={(values: NumberFormatValues) => {
                    setFieldValue("interestRate", values.floatValue);
                  }}
                  label="Tasa de interés anual"
                  placeholder="Ingrese la tasa de interés"
                  errorMessage={touched.interestRate && errors.interestRate}
                />
              )}
            </Field>
          </div>
          <div>
            <Field name="term">
              {({ field }: FieldProps) => (
                <Select
                  {...field}
                  label="Plazo del préstamo"
                  placeholder="Seleccione el plazo"
                  onChange={(e) =>
                    setFieldValue("term", parseInt(e.target.value))
                  }
                  errorMessage={touched.term && errors.term}
                >
                  {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((months) => (
                    <SelectItem key={months} value={months}>
                      {months} meses
                    </SelectItem>
                  ))}
                </Select>
              )}
            </Field>
          </div>
          <Button type="submit" color="primary">
            Solicitar Préstamo
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoanApplicationForm;
