import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  //  "https://urbankicks-backend-eowi.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example:
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized user
      console.error("Unauthorized");
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }

    if (error.response?.status === 403) {
      console.error("Forbidden");
    }

    if (error.response?.status >= 500) {
      console.error("Server Error");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;