import api from "../utils/axios";

const handleApiError = (error, context) => {
  const message = error.response?.data?.message || `Error in ${context}`;
  throw new Error(message, { cause: error });
};

export const getInsights = async () => {
  try {
    const { data } = await api.get("/insight");
    return data;
  } catch (error) {
    handleApiError(error, "getInsights");
  }
};

export const generateInsight = async (type) => {
  try {
    const { data } = await api.post("/insight/generate", { type });
    return data;
  } catch (error) {
    handleApiError(error, "generateInsight");
  }
};
