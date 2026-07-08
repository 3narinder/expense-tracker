import api from "../utils/axios";

const handleApiError = (error, context) => {
  const message = error.response?.data?.message || `Error in ${context}`;
  throw new Error(message, { cause: error });
};

export const getBudgets = async () => {
  try {
    const { data } = await api.get("/budgets");
    return data;
  } catch (error) {
    handleApiError(error, "getBudgets");
  }
};

export const createBudget = async (newBudget) => {
  try {
    const { data } = await api.post("/budgets", newBudget);
    return data;
  } catch (error) {
    handleApiError(error, "createBudget");
  }
};

export const updateBudget = async ({ id, updatedBudget }) => {
  try {
    const { data } = await api.put(`/budgets/${id}`, updatedBudget);
    return data;
  } catch (error) {
    handleApiError(error, "updateBudget");
  }
};

export const deleteBudget = async (id) => {
  try {
    const { data } = await api.delete(`/budgets/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "deleteBudget");
  }
};
