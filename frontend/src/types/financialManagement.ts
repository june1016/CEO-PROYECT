export type BalanceItem = {
  id: string;
  categoria: string;
  subcategoria: string;
  valor: number;
};

export type IncomeStatementItem = {
  id: string;
  concepto: string;
  valor: number;
};

export type CashBankTransaction = {
  id: string;
  fecha: string;
  tipo: "ingreso" | "egreso";
  concepto: string;
  monto: number;
  cuenta: string;
};

export type CashBankBalance = {
  id: string;
  cuenta: string;
  saldo: number;
};

export type BankTransfer = {
  fromAccount: string;
  toAccount: string;
  amount: number;
};

export type AccountsReceivableItem = {
  id: string;
  cliente: string;
  monto: number;
  fechaVencimiento: string;
};

export interface Account {
  id: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: "Pendiente" | "Vencido" | "Pagado";
}

export interface AccountsDistribution {
  name: string;
  value: number;
}

export interface PaymentRecord {
  id: string;
  accountId: string;
  amount: number;
  date: string;
  type: "Pago" | "Cobro";
}
