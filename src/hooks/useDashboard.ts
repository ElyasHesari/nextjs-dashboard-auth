'use client';

import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/mockApi';
import { DashboardCard } from '@/types';

export const useDashboardData = (role: 'admin' | 'owner' | undefined) => {
  return useQuery<DashboardCard[]>({
    queryKey: ['dashboard', role],
    queryFn: async () => {
      if (!role) throw new Error('Role is required');
      return await apiService.getDashboardData(role, false);
    },
    enabled: !!role,
  });
};

