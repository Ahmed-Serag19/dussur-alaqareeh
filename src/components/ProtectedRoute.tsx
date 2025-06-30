import Loader from "@/components/ui/Loader";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";
import { useAdmin } from "@/context/AdminContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, isLoading } = useAdmin();

  if (isLoading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/auth/login" replace />;
    }

    return <>{children}</>;
  } catch {
    localStorage.removeItem("token");
    return <Navigate to="/auth/login" replace />;
  }
};
