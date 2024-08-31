import { z } from "zod";

export const loanApplicationSchema = z.object({
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

export const paymentScheduleSchema = z.object({
  loanId: z.string().nonempty("Seleccione un préstamo"),
  amount: z.number().min(1, "El monto mínimo es $1"),
  date: z.string().nonempty("La fecha es requerida"),
});

export type LoanApplicationData = z.infer<typeof loanApplicationSchema>;
export type PaymentScheduleData = z.infer<typeof paymentScheduleSchema>;
