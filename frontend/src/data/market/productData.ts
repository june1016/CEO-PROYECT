import { Column, Product } from "@/types/market";

export const products: Product[] = [
  { id: 1, name: "Alfaros", estimatedQuantity: 1000, marketPrice: 50 },
  { id: 2, name: "Betacos", estimatedQuantity: 800, marketPrice: 60 },
  { id: 3, name: "Gamaroles", estimatedQuantity: 1200, marketPrice: 45 },
  { id: 4, name: "Deltas", estimatedQuantity: 500, marketPrice: 70 },
  { id: 5, name: "Omegras", estimatedQuantity: 900, marketPrice: 55 },
];

export const columns: Column[] = [
  { name: "PRODUCTO", uid: "name" },
  { name: "CANTIDAD ESTIMADA", uid: "estimatedQuantity" },
  { name: "PRECIO DE MERCADO", uid: "marketPrice" },
];
