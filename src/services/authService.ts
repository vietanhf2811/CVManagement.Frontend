import api from './api';

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  message?: string;
}

export const authService = {
  register: async (data: RegisterRequest) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: (): boolean => {
    return Boolean(localStorage.getItem('token'));
  }
};

export default authService;
