import { MarginData, IndicadorData } from "@/types/market";

export const initialMargins: MarginData[] = [
  { producto: "ALFAROS", margen: "35%" },
  { producto: "BETACOS", margen: "35%" },
  { producto: "GAMAROLES", margen: "35%" },
];

export const initialIndicadores: IndicadorData[] = [
  { indicador: "Ingreso por Ventas", valor: "115,000,000" },
  { indicador: "Costos Totales", valor: "41,650,000" },
  { indicador: "Utilidad Bruta", valor: "73,350,000" },
  { indicador: "Gastos Generales", valor: "38,560,000" },
  { indicador: "Utilidad Operacional", valor: "34,790,000" },
  { indicador: "Impuestos", valor: "11,480,700" },
  { indicador: "Utilidad Neta", valor: "23,309,300" },
  { indicador: "Razón Corriente", valor: "2.5" },
  { indicador: "Prueba Ácida", valor: "3.0" },
  { indicador: "Margen Bruto", valor: "45%" },
  { indicador: "Margen Operacional", valor: "28%" },
  { indicador: "Margen Neto", valor: "19%" },
  { indicador: "EBITDA", valor: "18,000,000" },
  { indicador: "Nivel de Endeudamiento", valor: "42%" },
  { indicador: "Rentabilidad del Patrimonio", valor: "26%" },
  { indicador: "Rentabilidad del Activo", valor: "35%" },
  { indicador: "Capital de Trabajo", valor: "8,500,000" },
];