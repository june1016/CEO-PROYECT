// frontend/src/components/financialManagement/bankCreditSystem/loanApplication/LoanCalculator.tsx
"use client";
import React, { useState } from "react";
import { Input, Button, Card, CardBody } from "@nextui-org/react";
import { NumericFormat } from "react-number-format";
import { LoanData } from "@/types/financialManagement";
import { calculateLoanPayments } from "@/components/utils/financialManagement/bankCreditSystem/loanApplication/loanCalculations";

interface LoanCalculatorProps {
  onCalculate: (loanData: LoanData) => void;
  loanData: LoanData;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  onCalculate,
  loanData,
}) => {
  const [calculatedData, setCalculatedData] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const handleCalculate = () => {
    const payments = calculateLoanPayments(loanData);
    const totalPayment = payments.reduce(
      (sum, payment) => sum + payment.payment,
      0
    );
    const totalInterest = totalPayment - loanData.amount;
    const monthlyPayment = payments[0].payment;

    setCalculatedData({
      monthlyPayment,
      totalInterest,
      totalPayment,
    });

    onCalculate(loanData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumericFormat
          customInput={Input}
          thousandSeparator={true}
          prefix="$"
          value={loanData.amount}
          onValueChange={(values) =>
            onCalculate({ ...loanData, amount: values.floatValue || 0 })
          }
          label="Monto del préstamo"
          placeholder="Ingrese el monto"
        />
        <NumericFormat
          customInput={Input}
          suffix="%"
          decimalScale={2}
          value={loanData.interestRate}
          onValueChange={(values) =>
            onCalculate({ ...loanData, interestRate: values.floatValue || 0 })
          }
          label="Tasa de interés anual"
          placeholder="Ingrese la tasa de interés"
        />
        <NumericFormat
          customInput={Input}
          value={loanData.term}
          onValueChange={(values) =>
            onCalculate({ ...loanData, term: values.floatValue || 0 })
          }
          label="Plazo (meses)"
          placeholder="Ingrese el plazo"
        />
      </div>
      <Button color="primary" onClick={handleCalculate}>
        Calcular
      </Button>
      {calculatedData && (
        <Card>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Pago Mensual</h3>
                <p className="text-xl">
                  ${calculatedData.monthlyPayment.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Interés Total</h3>
                <p className="text-xl">
                  ${calculatedData.totalInterest.toFixed(2)}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pago Total</h3>
                <p className="text-xl">
                  ${calculatedData.totalPayment.toFixed(2)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default LoanCalculator;
