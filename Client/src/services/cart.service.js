import axiosInstance from "@/lib/axios";

const API = "/cart";

/* Get Cart */

export const getCart = async () => {
  const { data } = await axiosInstance.get(API);
  return data;
};

/* Add Item */

export const addToCart = async (payload) => {
  const { data } = await axiosInstance.post(API, payload);
  return data;
};

/* Update Quantity */

export const updateCartItem = async (cartItemId, quantity) => {
  const { data } = await axiosInstance.patch(
    `${API}/${cartItemId}`,
    { quantity }
  );

  return data;
};

/* Remove Item */

export const removeCartItem = async (cartItemId) => {
  const { data } = await axiosInstance.delete(
    `${API}/${cartItemId}`
  );

  return data;
};

/* Clear Cart */

export const clearCart = async () => {
  const { data } = await axiosInstance.delete(API);

  return data;
};