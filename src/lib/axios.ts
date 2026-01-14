import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend.aqaar.dussur.sa/api",
  // Don't set Content-Type by default - let interceptor handle it based on data type
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Attach Accept-Language header based on saved language (defaults to 'ar')
    const lang = localStorage.getItem("i18nextLng") || "ar";
    config.headers["Accept-Language"] = lang.startsWith("en") ? "en" : "ar";

    // Handle Content-Type based on data type
    if (config.data instanceof FormData) {
      // Don't set Content-Type for FormData - browser will set multipart/form-data with boundary
      // Remove from all possible header locations
      delete config.headers["Content-Type"];
      delete config.headers.common?.["Content-Type"];
      delete config.headers.post?.["Content-Type"];
    } else if (
      config.data &&
      typeof config.data === "object" &&
      !config.headers["Content-Type"]
    ) {
      // Set Content-Type for JSON requests if not already set
      config.headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("token");
    const isPublicEndpoint =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register");

    if (token && !isPublicEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
