import {
  Account,
  AccountsDistribution,
  PaymentRecord,
} from "@/types/financialManagement";

export const accountsReceivable: Account[] = [
  {
    id: "1",
    clientName: "Cliente A",
    amount: 5000,
    dueDate: "2023-12-31",
    status: "Pendiente",
  },
  {
    id: "2",
    clientName: "Cliente B",
    amount: 3000,
    dueDate: "2023-12-15",
    status: "Vencido",
  },
  {
    id: "3",
    clientName: "Cliente C",
    amount: 2000,
    dueDate: "2024-01-15",
    status: "Pendiente",
  },
];

export const accountsPayable: Account[] = [
  {
    id: "1",
    clientName: "Proveedor X",
    amount: 4000,
    dueDate: "2023-12-20",
    status: "Pendiente",
  },
  {
    id: "2",
    clientName: "Proveedor Y",
    amount: 2500,
    dueDate: "2023-12-10",
    status: "Vencido",
  },
  {
    id: "3",
    clientName: "Proveedor Z",
    amount: 3500,
    dueDate: "2024-01-05",
    status: "Pendiente",
  },
];

export const accountsDistribution: AccountsDistribution[] = [
  { name: "Cuentas por Cobrar", value: 10000 },
  { name: "Cuentas por Pagar", value: 10000 },
];

export const paymentRecords: PaymentRecord[] = [
  { id: "1", accountId: "1", amount: 1000, date: "2023-12-01", type: "Cobro" },
  { id: "2", accountId: "1", amount: 2000, date: "2023-12-05", type: "Pago" },
];
