import api from "../utils/axios";

//** Global helper to standardize error reporting across endpoints
const handleApiError = (error, context) => {
  const message = error.response?.data?.message || `Error in ${context}`;
  throw new Error(message, { cause: error });
};

//** Fetch paginated, filtered, and sorted transactions along with high-level insights
export const getTransactions = async (filters = {}) => {
  try {
    const { data } = await api.get("/transactions", { params: filters });
    return data;
  } catch (error) {
    handleApiError(error, "getTransactions");
  }
};

//** Fetch detailed info for a single transaction entity
export const getTransactionById = async (id) => {
  try {
    const { data } = await api.get(`/transactions/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "getTransactionById");
  }
};

//* Fetch aggregated transaction trends for visualization
export const getTransactionTrend = async (filters = {}) => {
  try {
    const { data } = await api.get("/transactions/trend", { params: filters });
    return data; // { trend: [...] }
  } catch (error) {
    handleApiError(error, "getTransactionTrend");
  }
};

//** Post a newly created transaction record
export const createTransaction = async (newTx) => {
  try {
    const { data } = await api.post("/transactions", newTx);
    return data;
  } catch (error) {
    handleApiError(error, "createTransaction");
  }
};

// ** Submit changes to adjust fields, amounts, types, or accounts for a specific transaction
export const updateTransaction = async ({ id, updatedTx }) => {
  try {
    const { data } = await api.put(`/transactions/${id}`, updatedTx);
    return data;
  } catch (error) {
    handleApiError(error, "updateTransaction");
  }
};

//** Remove a transaction and automatically revert financial tracking impacts
export const deleteTransaction = async (id) => {
  try {
    const { data } = await api.delete(`/transactions/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "deleteTransaction");
  }
};

//** Remove an array of transactions in one unified transaction session
export const bulkDeleteTransactions = async (ids) => {
  try {
    const { data } = await api.post("/transactions/bulk-delete", { ids });
    return data;
  } catch (error) {
    handleApiError(error, "bulkDeleteTransactions");
  }
};

//**Process array of recent transactions via AI model context processing

export const analyzeTransactions = async (transactionIds) => {
  try {
    const { data } = await api.post("/transactions/analyze", {
      transactionIds,
    });
    return data; // Returns object containing: { highlight, insight }
  } catch (error) {
    handleApiError(error, "analyzeTransactions");
  }
};

//**Fetch filtered/selected financial entries converted to downloadable raw CSV files

// export const exportTransactionsCSV = async (filters = {}) => {
//   try {
//     const response = await api.get("/transactions/export-csv", {
//       params: filters,
//       responseType: "blob", // Critical binary flag configuration for secure file streams
//     });

//     // Create virtual reference link mapping, enforce direct trigger download, discard allocations
//     const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = url;
//     link.setAttribute("download", "transactions_export.csv");
//     document.body.appendChild(link);
//     link.click();

//     // Cleanup reference memory mappings properly
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     handleApiError(error, "exportTransactionsCSV");
//   }
// };
