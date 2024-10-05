import { useQuery } from "@tanstack/react-query";
import api from "@/utils/axiosInstance";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export const useUser = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const { data } = await api.get<User>("auth/me/");
      return data;
    },
  });
};
