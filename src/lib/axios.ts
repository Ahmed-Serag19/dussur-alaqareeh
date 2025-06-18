import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://backend.aqaar.dussur.sa/api",
  headers: {
    "Content-Type": "application/json",
  },
});
