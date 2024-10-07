import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";

export interface FinancialData {
  id: number;
  tutor: string | null;
  company_name: string;
  cash_on_hand: number;
  cash_in_bank: number;
  accounts_receivable: number;
  inventory: number;
  computer_equipment: number;
  furniture_fixtures: number;
  machinery_equipment: number;
  patents: number;
  accounts_payable: number;
  notes_payable: number;
  long_term_debt: number;
  capital_stock: number;
  retained_earnings: number;
  projected_sales: number;
  operating_costs: number;
  created_at: string;
  updated_at: string;
}

export const useFinancialData = () => {
  return useQuery<FinancialData[], Error>({
    queryKey: ["financialData"],
    queryFn: async () => {
      const { data } = await api.get<FinancialData[]>("/financial-data/");
      return data;
    },
  });
};
