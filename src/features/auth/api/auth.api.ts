import { axiosInstance } from "@/lib/axios";
import type { LoginDto, RegisterDto } from "@/features/auth/types/auth.types";

export const handleLogin = (data: LoginDto) => {
  return axiosInstance.post("/auth/login", data);
};

export const handleRegister = (data: RegisterDto) => {
  return axiosInstance.post("/auth/register", data);
};
