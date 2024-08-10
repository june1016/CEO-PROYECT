// frontend/src/components/utils/financialManagement/bankCreditSystem/loanApplication/loanCalculations.ts
import { LoanData, LoanProjection } from "@/types/financialManagement";

export const calculateLoanPayments = (loanData: LoanData): LoanProjection[] => {
  const { amount, interestRate, term } = loanData;
  const monthlyRate = interestRate / 12 / 100;
  const monthlyPayment =
    (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);

  let balance = amount;
  const projection: LoanProjection[] = [];

  for (let month = 1; month <= term; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    projection.push({
      month,
      payment: monthlyPayment,
      principal,
      interest,
      balance: Math.max(0, balance),
    });
  }

  return projection;
};
