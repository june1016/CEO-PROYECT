import { useState } from "react";
import { PaymentRecord } from "@/types/financialManagement";

export const usePaymentRecordForm = () => {
  const [formState, setFormState] = useState<PaymentRecord>({
    id: "",
    accountId: "",
    amount: 0,
    date: "",
    type: "Pago",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof PaymentRecord
  ) => {
    const value =
      field === "amount" ? parseFloat(e.target.value) : e.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el registro de pago/cobro
    console.log("Registro de operación:", formState);
    // Resetear el formulario
    setFormState({ id: "", accountId: "", amount: 0, date: "", type: "Pago" });
  };

  return { formState, handleInputChange, handleSubmit };
};
