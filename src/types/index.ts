export interface User {
  username: string;
  role: "admin" | "owner";
  token: string;
}

export interface DashboardCard {
  id: number;
  value: number;
  title: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export interface LoginResponse {
  success: boolean;
  data?: User;
  error?: string;
}
