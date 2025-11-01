'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardContent } from '@/components/DashboardContent';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // if user is not login, redirect to login
    if (!isAuthenticated && !user) {
      const timer = setTimeout(() => {
        if (!isAuthenticated && !user) {
          console.log('Not authenticated, redirecting to login');
          router.push('/login');
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  // if user is login, wait
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return <DashboardContent />;
}