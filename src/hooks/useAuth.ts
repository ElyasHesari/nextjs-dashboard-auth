'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/mockApi';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const result = await apiService.login(username, password);
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Login failed');
      }
      
      return result.data;
    },
    onSuccess: (user) => {
      console.log('Login successful:', user);
      login(user);
      
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        router.replace('/dashboard');
      }, 100);
    },
  });
};

