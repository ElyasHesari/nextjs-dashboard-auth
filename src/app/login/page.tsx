'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/i18n/useTranslation';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { t } = useTranslation();

  useEffect(() => {
    // after loading, if authenticated, redirect to dashboard
    if (isAuthenticated && user) {
      console.log('Authenticated user on login page - redirecting to dashboard');
      router.replace('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  // if logined, redirecting state
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.redirectingToDashboard')}</p>
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