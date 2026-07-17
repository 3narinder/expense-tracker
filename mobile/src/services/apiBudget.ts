import api from "./api";

export interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: string;
  startDate: string;
  alertThreshold: number;
  categories?: { id: string; name: string }[];
}

export const getBudgets = async (): Promise<Budget[]> => {
  const { data } = await api.get("/budgets");
  return data;
};
