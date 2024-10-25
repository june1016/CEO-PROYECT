import {
  CashBankTransaction,
  CashBankBalance,
} from "@/types/financialManagement";

export const cashBankTransactions: CashBankTransaction[] = [
  {
    id: "1",
    fecha: "2023-12-01",
    tipo: "ingreso",
    concepto: "Venta de productos",
    monto: 50000000,
    cuenta: "Banco A",
  },
  {
    id: "2",
    fecha: "2023-12-02",
    tipo: "egreso",
    concepto: "Pago a proveedores",
    monto: 30000000,
    cuenta: "Banco B",
  },
  {
    id: "3",
    fecha: "2023-12-03",
    tipo: "ingreso",
    concepto: "Cobro de facturas",
    monto: 25000000,
    cuenta: "Caja",
  },
  {
    id: "4",
    fecha: "2023-12-04",
    tipo: "egreso",
    concepto: "Nómina",
    monto: 20000000,
    cuenta: "Banco A",
  },
  {
    id: "5",
    fecha: "2023-12-05",
    tipo: "ingreso",
    concepto: "Préstamo bancario",
    monto: 100000000,
    cuenta: "Banco B",
  },
];

export const cashBankBalances: CashBankBalance[] = [
  { id: "1", cuenta: "Caja", saldo: 15000000 },
  { id: "2", cuenta: "Banco A", saldo: 63060868 },
  { id: "3", cuenta: "Banco B", saldo: 85000000 },
];
