import React from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { usePaymentRecordForm } from "@/components/hooks/financialManagement/accountsReceivablePayable/usePaymentRecordForm";

export const PaymentRecordForm: React.FC = () => {
  const { formState, handleInputChange, handleSubmit } = usePaymentRecordForm();

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Tipo de Operación"
            placeholder="Seleccione el tipo"
            value={formState.type}
            onChange={(e) => handleInputChange(e, "type")}
          >
            <SelectItem key="Pago" value="Pago">
              Pago
            </SelectItem>
            <SelectItem key="Cobro" value="Cobro">
              Cobro
            </SelectItem>
          </Select>
          <Input
            type="text"
            label="ID de Cuenta"
            placeholder="Ingrese el ID de la cuenta"
            value={formState.accountId}
            onChange={(e) => handleInputChange(e, "accountId")}
          />
          <Input
            type="number"
            label="Monto"
            placeholder="Ingrese el monto"
            value={formState.amount.toString()}
            onChange={(e) => handleInputChange(e, "amount")}
          />
          <Input
            type="date"
            label="Fecha"
            value={formState.date}
            onChange={(e) => handleInputChange(e, "date")}
          />
          <Button type="submit" color="primary">
            Registrar Operación
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
