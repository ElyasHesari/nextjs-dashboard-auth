'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useTranslation } from '@/i18n/useTranslation';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  useEffect(() => {
    console.log('Home page - redirecting based on auth:', isAuthenticated);
    if (isAuthenticated) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{t('common.loading')}</p>
      </div>
    </div>
  );
}