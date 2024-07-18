export interface Column {
  name: string;
  uid: keyof Product;
}

export interface Product {
  id: number;
  name: string;
  estimatedQuantity: number;
  marketPrice: number;
}

export interface MarginData {
  producto: string;
  margen: string;
}

export interface IndicadorData {
  indicador: string;
  valor: string;
}

export interface InventoryItem {
  material: string;
  cantidad: number | null;
  unidad: string;
  costoUnitario: number | null;
  costoTotal: number | null;
}
