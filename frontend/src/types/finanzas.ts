// frontend/src/types/finanzas.ts

export type BalanceItem = {
  id: string;
  categoria: string;
  subcategoria: string;
  valor: number;
};

export type EstadoResultadosItem = {
  id: string;
  concepto: string;
  valor: number;
};
