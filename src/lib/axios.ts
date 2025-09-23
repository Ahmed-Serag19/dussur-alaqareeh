import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend.aqaar.dussur.sa/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Attach Accept-Language header based on saved language (defaults to 'ar')
    const lang = localStorage.getItem("i18nextLng") || "ar";
    config.headers["Accept-Language"] = lang.startsWith("en") ? "en" : "ar";

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
