// utils/cloudinary.js

export const optimizeCloudinaryImage = (
  url,
  width = 600,
  height = 600
) => {
  if (!url?.includes("res.cloudinary.com")) return url;

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto:eco,c_fill,w_${width},h_${height}/`
  );
};