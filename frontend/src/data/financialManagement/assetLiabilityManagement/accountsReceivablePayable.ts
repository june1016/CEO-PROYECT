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
    daysOverdue: 0,
  },
  {
    id: "2",
    clientName: "Cliente B",
    amount: 3000,
    dueDate: "2023-12-15",
    status: "Vencido",
    daysOverdue: 16,
  },
  {
    id: "3",
    clientName: "Cliente C",
    amount: 2000,
    dueDate: "2024-01-15",
    status: "Pendiente",
    daysOverdue: 0,
  },
  {
    id: "4",
    clientName: "Cliente D",
    amount: 10000,
    dueDate: "2023-12-20",
    status: "Vencido",
    daysOverdue: 11,
  },
  {
    id: "5",
    clientName: "Cliente E",
    amount: 7500,
    dueDate: "2024-01-05",
    status: "Pendiente",
    daysOverdue: 0,
  },
];

export const accountsPayable: Account[] = [
  {
    id: "1",
    clientName: "Proveedor X",
    amount: 4000,
    dueDate: "2023-12-20",
    status: "Pendiente",
    daysOverdue: 0,
  },
  {
    id: "2",
    clientName: "Proveedor Y",
    amount: 2500,
    dueDate: "2023-12-10",
    status: "Vencido",
    daysOverdue: 21,
  },
  {
    id: "3",
    clientName: "Proveedor Z",
    amount: 3500,
    dueDate: "2024-01-05",
    status: "Pendiente",
    daysOverdue: 0,
  },
  {
    id: "4",
    clientName: "Proveedor W",
    amount: 8000,
    dueDate: "2023-12-25",
    status: "Vencido",
    daysOverdue: 6,
  },
  {
    id: "5",
    clientName: "Proveedor V",
    amount: 6000,
    dueDate: "2024-01-10",
    status: "Pendiente",
    daysOverdue: 0,
  },
];

export const accountsDistribution: AccountsDistribution[] = [
  { name: "Cuentas por Cobrar Pendientes", value: 14500 },
  { name: "Cuentas por Cobrar Vencidas", value: 13000 },
  { name: "Cuentas por Pagar Pendientes", value: 13500 },
  { name: "Cuentas por Pagar Vencidas", value: 10500 },
];

export const paymentRecords: PaymentRecord[] = [
  { id: "1", accountId: "1", amount: 1000, date: "2023-12-01", type: "Cobro" },
  { id: "2", accountId: "1", amount: 2000, date: "2023-12-05", type: "Pago" },
  { id: "3", accountId: "2", amount: 1500, date: "2023-12-10", type: "Cobro" },
  { id: "4", accountId: "3", amount: 3000, date: "2023-12-15", type: "Pago" },
];
