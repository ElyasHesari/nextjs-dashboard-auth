'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    // after loading, if authenticated, redirect to dashboard
    if (!isLoading && isAuthenticated && user) {
      console.log('Authenticated user on login page - redirecting to dashboard');
      router.replace('/dashboard');
    }
  }, [isLoading, isAuthenticated, user, router]);

  // loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // if logined, redirecting state
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">در حال انتقال به داشبورد...</p>
        </div>
      </div>
    );
  }

  // only for not logined users
  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}