import { axiosInstance } from "@/lib/axios";
import type { LoginDto, RegisterDto } from "@/features/auth/types/auth.types";

export const login = (data: LoginDto) => {
  return axiosInstance.post("/auth/login", data);
};

export const register = (data: RegisterDto) => {
  return axiosInstance.post("/auth/register", data);
};
