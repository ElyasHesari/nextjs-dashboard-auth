'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });
  const [isLoading, setIsLoading] = useState(true);

  // loading state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const token = window.localStorage.getItem('auth_token');
        const userStr = window.localStorage.getItem('user');

        if (token && userStr) {
          const user = JSON.parse(userStr);
          console.log('Loaded auth from localStorage:', user);
          setAuthState({
            isAuthenticated: true,
            user,
            token
          });
        }
      } catch (error) {
        console.error('Error loading auth from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (user: User) => {
    console.log('Login called with user:', user);
    setAuthState({
      isAuthenticated: true,
      user,
      token: user.token
    });
    
    // save to localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('auth_token', user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
    }
  };

  const logout = () => {
    console.log('Logout called');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
    
    // clear localStorage
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
      window.localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};