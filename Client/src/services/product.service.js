import axiosInstance from "@/lib/axios";

const API = "/products";

const buildParams = ({
  page = 1,
  limit = 12,
  search = "",
  sort = "newest",
  filters = {},
}) => {
  const params = {
    page,
    limit,
    sort,
  };

  if (search.trim()) {
    params.search = search.trim();
  }

  if (filters.brand?.length) {
    params.brand = filters.brand.join(",");
  }

  if (filters.category?.length) {
    params.category = filters.category.join(",");
  }

  if (filters.size?.length) {
    params.size = filters.size.join(",");
  }

  if (filters.color?.length) {
    params.color = filters.color.join(",");
  }

  if (filters.minPrice) {
    params.minPrice = filters.minPrice;
  }

  if (filters.maxPrice) {
    params.maxPrice = filters.maxPrice;
  }

  if (filters.inStock) {
    params.inStock = true;
  }

  return params;
};


export const getProducts = async (options = {}) => {
  const { data } = await axiosInstance.get(API, {
    params: buildParams(options),
  });
console.log(data);
  return data;
};

export const getProduct = async (id) => {
  const { data } = await axiosInstance.get(`${API}/${id}`);
  return data;
};

export const getRelatedProducts = async (id) => {
  const { data } = await axiosInstance.get(`${API}/related/${id}`);
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
  const { data } = await axiosInstance.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axiosInstance.delete(`${API}/${id}`);
  return data;
};

export const updateStock = async (id, inStock) => {
  const { data } = await axiosInstance.patch(`${API}/${id}/stock`, {
    inStock,
  });

  return data;
};