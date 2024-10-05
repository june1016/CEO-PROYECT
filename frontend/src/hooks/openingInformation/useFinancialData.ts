import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";

interface FinancialData {
  id: number;
  company_name: string;
  cash: number;
  banks: number;
  computer_equipment: number;
  furniture_fixtures: number;
  machinery_equipment: Record<string, any> | string; // Puede ser un objeto JSON o un string
  patents: Record<string, any> | string; // Puede ser un objeto JSON o un string
  accounts_payable: number;
  notes_payable: number;
  long_term_debt: number;
  capital: number;
  other_financial_data: Record<string, any> | string; // Puede ser un objeto JSON o un string
  created_at: string;
  updated_at: string;
  tutor_id: number;
}

export const useFinancialData = () => {
  return useQuery({
    queryKey: ["financialData"],
    queryFn: async (): Promise<FinancialData[]> => {
      const { data } = await api.get<FinancialData[]>("/financial-data/");

      // Deserializar campos JSON potenciales
      return data.map((item) => ({
        ...item,
        patents: parseIfJSONString(item.patents),
        other_financial_data: parseIfJSONString(item.other_financial_data),
        machinery_equipment: parseIfJSONString(item.machinery_equipment),
      }));
    },
  });
};

// Función auxiliar para parsear JSON de forma segura
const parseIfJSONString = (value: any): object | string => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value; // Retorna el valor original si no se puede parsear
    }
  }
  return value; // Si ya es un objeto, retornar directamente
};
