'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useDashboardData } from '@/hooks/useDashboard';
import { DashboardCard } from './DashboardCard';
import { CardSkeleton } from './CardSkeleton';
import { useTranslation } from '@/i18n/useTranslation';

export const DashboardContent = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const { data: cards, isLoading, error, refetch } = useDashboardData(user?.role);
  const { t } = useTranslation();

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    // after logout, redirect to login
    setTimeout(() => {
      router.push('/login');
    }, 100);
  };

  // if user is not login, redirect to login
  useEffect(() => {
    if (!isAuthenticated || !user) {
      console.log('DashboardContent - no user, redirecting to login');
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-200" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
            <p className="text-sm text-white/90 mt-1">
              {t('dashboard.welcome', {
                username: user.username,
                role: user.role === 'admin' ? t('dashboard.admin') : t('dashboard.owner')
              })}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg  border border-white/20"
          >
            <LogOut size={18} />
            {t('dashboard.logout')}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
          <h2 className="text-lg font-bold text-gray-800">
            {t('dashboard.dashboardCards')} ({user.role === 'admin' ? t('dashboard.adminCardsCount') : t('dashboard.ownerCardsCount')})
          </h2>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg transition disabled:opacity-50 shadow-md hover:shadow-lg"
          >
            <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
            {t('dashboard.refresh')}
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: user.role === 'admin' ? 5 : 10 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('dashboard.loadingError')}</h3>
            <p className="text-gray-600 mb-6">{t('dashboard.loadingErrorMessage')}</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg transition shadow-md hover:shadow-lg"
            >
              <RefreshCw size={20} />
              {t('dashboard.tryAgain')}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && cards && cards.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="text-gray-400 mb-4 text-6xl">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('dashboard.noCardsFound')}</h3>
            <p className="text-gray-600">{t('dashboard.noDataMessage')}</p>
          </div>
        )}

        {/* Success State - Cards Grid */}
        {!isLoading && !error && cards && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map(card => (
              <DashboardCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};