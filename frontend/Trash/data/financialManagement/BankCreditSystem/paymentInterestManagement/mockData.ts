// frontend/src/data/financialManagement/bankCreditSystem/paymentInterestManagement/mockData.ts

import { ActiveLoan, InterestRate } from "@/types/financialManagement";

export const mockActiveLoans: ActiveLoan[] = [
  {
    id: "L001",
    amount: 10000000,
    interestRate: 5.5,
    dueDate: "2024-12-31",
    status: "Al día",
  },
  {
    id: "L002",
    amount: 5000000,
    interestRate: 6.0,
    dueDate: "2025-06-30",
    status: "Al día",
  },
  {
    id: "L003",
    amount: 15000000,
    interestRate: 5.0,
    dueDate: "2026-03-31",
    status: "Atrasado",
  },
];

export const mockInterestRates: InterestRate[] = [
  { date: "2023-01-01", rate: 5.0 },
  { date: "2023-04-01", rate: 5.2 },
  { date: "2023-07-01", rate: 5.5 },
  { date: "2023-10-01", rate: 5.3 },
  { date: "2024-01-01", rate: 5.1 },
];
