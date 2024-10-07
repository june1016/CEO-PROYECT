import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";

// Definición de la interfaz RawMaterialInventory
export interface RawMaterialInventory {
  id: number;
  material_code: string;
  description: string;
  quantity: number;
  unit: string;
  cost_per_unit: number;
  total_cost: number;
  created_at: string;
  updated_at: string;
  financial_data: number;
}

export const useRawMaterialInventory = (financialDataId: number | null) => {
  return useQuery({
    queryKey: ["rawMaterialInventory", financialDataId],
    queryFn: async (): Promise<RawMaterialInventory[]> => {
      const { data } = await api.get<RawMaterialInventory[]>(
        `/raw-material-inventory/?financial_data_id=${financialDataId}`
      );
      return data;
    },
    enabled: !!financialDataId, // Solo ejecutar si financialDataId es válido
  });
};
