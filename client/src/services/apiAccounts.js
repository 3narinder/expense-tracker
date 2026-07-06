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
