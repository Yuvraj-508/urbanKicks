import axiosInstance from "@/lib/axios";

const API = "/products";

export const getProducts = async (params = {}) => {
  const { data } = await axiosInstance.get(API, { params });
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

export const toggleStock = async (id) => {
  const { data } = await axiosInstance.patch(
    `${API}/${id}/stock`
  );

  return data;
};