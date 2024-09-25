// types de balance general
export type BalanceItem = {
  id: string;
  categoria: string;
  subcategoria: string;
  valor: number;
};
// types de estados financieros
export type IncomeStatementItem = {
  id: string;
  concepto: string;
  valor: number;
};

// types de Gestión de Activos y Pasivos
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

export interface Account {
  id: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: "Pendiente" | "Vencido" | "Pagado";
  daysOverdue: number;
  paymentHistory?: PaymentRecord[];
  notes?: string;
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
  isPartialPayment?: boolean;
}

export interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  date: string;
  type: "Ingreso" | "Egreso";
  description: string;
}

export interface FinancialSummary {
  totalReceivable: number;
  totalPayable: number;
  cashFlow: number;
  overdueReceivable: number;
  overduePayable: number;
}
// 3. Sistema de Créditos Bancarios
export interface LoanData {
  amount: number;
  interestRate: number;
  term: number;
}

export interface LoanProjection {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface ActiveLoan {
  id: string;
  amount: number;
  interestRate: number;
  dueDate: string;
  status: string;
}

export interface InterestRate {
  date: string;
  rate: number;
}

export interface PaymentSchedule {
  loanId: string;
  amount: number;
  date: string;
}

// types 4. Flujo de Caja y Proyecciones
// types 4.1 Proyección Mensual de Ingresos y Egresos
export interface ProjectionData {
  month: string;
  income: number;
  expenses: number;
}

// 4.2 Análisis de Liquidez
export interface LiquidityData {
  period: string;
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;
}

export interface CashFlowData {
  concept: string;
  amount: number;
}
