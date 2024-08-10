import * as Yup from "yup";

export const loanApplicationSchema = Yup.object().shape({
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

export const paymentScheduleSchema = Yup.object().shape({
  loanId: Yup.string().required("Seleccione un préstamo"),
  amount: Yup.number()
    .min(1, "El monto mínimo es $1")
    .required("El monto es requerido"),
  date: Yup.date().required("La fecha es requerida"),
});
