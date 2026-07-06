import api from "../utils/axios";
import { handleApiError } from "../utils/format";

export const getCategories = async () => {
  try {
    const { data } = await api.get("/category");
    return data;
  } catch (error) {
    handleApiError(error, "getCategories");
  }
};

export const getCategoryById = async (id) => {
  try {
    const { data } = await api.get(`/category/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "getCategoryById");
  }
};

export const createCategory = async (newCategory) => {
  try {
    const { data } = await api.post("/category", newCategory);
    return data;
  } catch (error) {
    handleApiError(error, "createCategory");
  }
};

export const updateCategory = async ({ id, updatedCategory }) => {
  try {
    const { data } = await api.put(`/category/${id}`, updatedCategory);
    return data;
  } catch (error) {
    handleApiError(error, "updateCategory");
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await api.delete(`/category/${id}`);
    return data;
  } catch (error) {
    handleApiError(error, "deleteCategory");
  }
};
