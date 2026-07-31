import api from "../utils/axios";
import { handleApiError } from "../utils/format";

export const getAccounts = async () => {
  try {
    const { data } = await api.get("/accounts");
    return data;
  } catch (error) {
    handleApiError(error, "getAccounts");
  }
};

export const createAccount = async (newAccount) => {
  try {
    const { data } = await api.post("/accounts", newAccount);
    return data;
  } catch (error) {
    handleApiError(error, "createAccount");
  }
};

export const updateAccount = async ({ id, updates }) => {
  try {
    const { data } = await api.put(`/accounts/${id}`, updates);
    return data;
  } catch (error) {
    handleApiError(error, "updateAccount");
  }
};

export const deleteAccount = async (id) => {
  try {
    const { data } = await api.delete(`/accounts/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "deleteAccount");
  }
};
