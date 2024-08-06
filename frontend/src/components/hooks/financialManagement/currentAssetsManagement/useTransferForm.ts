import { useState } from "react";
import { BankTransfer } from "@/types/financialManagement";

export const useTransferForm = () => {
  const [formState, setFormState] = useState<BankTransfer>({
    fromAccount: "",
    toAccount: "",
    amount: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la transferencia
    console.log("Transferencia realizada:", formState);
    // Resetear el formulario
    setFormState({ fromAccount: "", toAccount: "", amount: 0 });
  };

  return { formState, handleInputChange, handleSubmit };
};
