// frontend\src\components\financialManagement\currentAssetsManagement\transferForm.tsx

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface TransferFormProps {
  accounts: string[];
}

export const TransferForm: React.FC<TransferFormProps> = ({ accounts }) => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar la transferencia
    console.log("Transferencia:", { fromAccount, toAccount, amount });
  };

  return (
    <Card>
      <CardBody>
        <h3 className="text-lg font-bold mb-4">Realizar Transferencia</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Cuenta de origen"
            placeholder="Selecciona la cuenta de origen"
            value={fromAccount}
            onChange={(e) => setFromAccount(e.target.value)}
          >
            {accounts.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Cuenta de destino"
            placeholder="Selecciona la cuenta de destino"
            value={toAccount}
            onChange={(e) => setToAccount(e.target.value)}
          >
            {accounts.map((account) => (
              <SelectItem key={account} value={account}>
                {account}
              </SelectItem>
            ))}
          </Select>
          <Input
            type="number"
            label="Monto"
            placeholder="Ingrese el monto a transferir"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button type="submit" color="primary">
            Realizar Transferencia
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
