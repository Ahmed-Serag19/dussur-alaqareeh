export interface User {
  email: string;
  role: string;
}

export interface AdminContextType {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string, navigate: (path: string) => void) => void;
  logout: (navigate: (path: string) => void) => void;
  isLoading: boolean;
}
