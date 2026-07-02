import api from "../utils/axios";

const handleApiError = (error, context) => {
  const message = error.response?.data?.message || `Error in ${context}`;
  throw new Error(message, { cause: error });
};

export const getTransactions = async (filters = {}) => {
  try {
    const { data } = await api.get("/transactions", { params: filters });
    return data; // Returns { pagination, insights, transactions }
  } catch (error) {
    handleApiError(error, "getTransactions");
  }
};

export const getTransactionById = async (id) => {
  try {
    const { data } = await api.get(`/transactions/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "getTransactionById");
  }
};

export const createTransaction = async (newTx) => {
  try {
    const { data } = await api.post("/transactions", newTx);
    return data;
  } catch (error) {
    handleApiError(error, "createTransaction");
  }
};

export const updateTransaction = async ({ id, updatedTx }) => {
  try {
    const { data } = await api.put(`/transactions/${id}`, updatedTx);
    return data;
  } catch (error) {
    handleApiError(error, "updateTransaction");
  }
};

export const deleteTransaction = async (id) => {
  try {
    const { data } = await api.delete(`/transactions/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "deleteTransaction");
  }
};

export const bulkDeleteTransactions = async (ids) => {
  try {
    const { data } = await api.post("/transactions/bulk-delete", { ids });
    return data;
  } catch (error) {
    handleApiError(error, "bulkDeleteTransactions");
  }
};

// CSV Export Helper (Downloads the file directly)
// export const exportTransactionsCSV = async (filters = {}) => {
//   try {
//     const response = await api.get("/transactions/export-csv", {
//       params: filters,
//       responseType: "blob", //* Critical for downloading files
//     });

//     //* Create a temporary link to trigger the browser download
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "transactions_export.csv");
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   } catch (error) {
//     handleApiError(error, "exportTransactionsCSV");
//   }
// };
