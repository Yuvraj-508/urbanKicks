import axiosInstance from "@/lib/axios";

export const sellerLogin = async (data) => {
  const { data: response } = await axiosInstance.post(
    "/auth/seller/login",
    data
  );

  return response;
};