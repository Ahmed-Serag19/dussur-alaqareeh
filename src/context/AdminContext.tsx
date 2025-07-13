import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import type { User, AdminContextType } from "@/types/types";
import { useTranslation } from "react-i18next";

const AdminContext = createContext<AdminContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  token: null,
  isLoading: true,
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();
  const logoutTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const now = Date.now() / 1000;

        if (decoded.exp > now) {
          // Token is valid
          setToken(storedToken);
          setUser({
            email: decoded.sub,
            role: decoded.role,
          });
        } else {
          // Token expired
          localStorage.removeItem("token");
        }
      } catch {
        // Invalid token
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, []);

  // Handle token expiration timer
  useEffect(() => {
    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
    }

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const now = Date.now() / 1000;
        const timeout = (decoded.exp - now) * 1000;

        if (timeout > 0) {
          logoutTimer.current = setTimeout(() => {
            localStorage.removeItem("token");
            setUser(null);
            setToken(null);
            toast.error(t("auth.sessionExpired"));
            window.location.href = "/auth/login";
          }, timeout);
        } else {
          // Token already expired
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
          window.location.href = "/auth/login";
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        window.location.href = "/auth/login";
      }
    }

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [token, t]);

  const login = (newToken: string, navigate: (path: string) => void) => {
    try {
      const decoded: any = jwtDecode(newToken);
      if (decoded.role !== "Admin") {
        toast.error(t("auth.login.invalidRole"));
        return;
      }
      localStorage.setItem("token", newToken);
      setUser({
        email: decoded.sub,
        role: decoded.role,
      });
      setToken(newToken);
      toast.success(t("auth.login.loginSuccess"));
      navigate("/");
    } catch (err) {
      toast.error("Invalid token");
    }
  };

  const logout = (navigate: (path: string) => void) => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success(t("auth.logout.success"));
    navigate("/auth/login");
  };

  return (
    <AdminContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        token,
        isLoading,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
