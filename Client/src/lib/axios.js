import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ==============================
// Request Interceptor
// ==============================

axiosInstance.interceptors.request.use(
  (config) => {
    // Future Authentication
    // const token = authStore.getState().token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// Response Interceptor
// ==============================

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong.";

    if (error.code === "ECONNABORTED") {
      message =
        "Request timed out. Please check your connection.";
    } else if (!error.response) {
      message =
        "Unable to connect to the server. It may be waking up. Please wait a moment and try again.";
    } else {
      switch (error.response.status) {
        case 400:
          message =
            error.response.data?.message ||
            "Bad request.";
          break;

        case 401:
          message =
            error.response.data?.message ||
            "Unauthorized.";
          break;

        case 403:
          message =
            error.response.data?.message ||
            "Access denied.";
          break;

        case 404:
          message =
            error.response.data?.message ||
            "Resource not found.";
          break;

        case 422:
          message =
            error.response.data?.message ||
            "Validation failed.";
          break;

        case 429:
          message =
            "Too many requests. Please try again shortly.";
          break;

        case 500:
          message =
            "Server error. Please try again in a few moments.";
          break;

        default:
          message =
            error.response.data?.message ||
            error.message ||
            "Unexpected error occurred.";
      }
    }

    return Promise.reject({
      ...error,
      message,
    });
  }
);

export default axiosInstance;