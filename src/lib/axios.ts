import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend.aqaar.dussur.sa/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
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
