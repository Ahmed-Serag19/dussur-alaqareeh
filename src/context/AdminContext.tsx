import { createContext, useContext, useState, useEffect } from "react";
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

  // Load token on first render
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded: any = jwtDecode(storedToken);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        } else {
          setUser({
            email: decoded.sub,
            role: decoded.role,
          });
          setToken(storedToken);
        }
      } catch {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
      }
    }
    setIsLoading(false);
  }, []);

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
