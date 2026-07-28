import axiosInstance from "@/lib/axios";

const API = "/products";

export const getProducts = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  const { data } = await axiosInstance.get(
    `/products?page=${page}&limit=${limit}&search=${search}`
  );

  return data;
};

export const getProduct = async (id) => {
  const { data } = await axiosInstance.get(`${API}/${id}`);
  return data;
};

export const createProduct = async (formData) => {
  const { data } = await axiosInstance.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  
  return data;
};

export const updateProduct = async (id, formData) => {
  const { data } = await axiosInstance.put(
    `${API}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`${API}/${id}`);
  return data;
};

export const updateStock = async (id, inStock) => {
  const { data } = await axiosInstance.patch(
    `/products/${id}/stock`,
    { inStock }
  );

  return data;
};