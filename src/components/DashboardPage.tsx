'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import { User, DashboardCard as DashboardCardType } from '@/types';
import { apiService } from '@/services/mockApi';
import { DashboardCard } from './DashboardCard';
import { CardSkeleton } from './CardSkeleton';
import { useTranslation } from '@/i18n/useTranslation';

interface Props {
  user: User;
  onLogout: () => void;
}

export const DashboardPage = ({ user, onLogout }: Props) => {
  const [cards, setCards] = useState<DashboardCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const fetchData = async (simulateError: boolean = false) => {
    setLoading(true);
    setError(false);

    try {
      const data = await apiService.getDashboardData(user.role, simulateError);
      setCards(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.role]);

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
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition border border-white/20"
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
            onClick={() => fetchData()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg transition disabled:opacity-50 shadow-md hover:shadow-lg"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            {t('dashboard.refresh')}
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: user.role === 'admin' ? 5 : 10 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('dashboard.loadingError')}</h3>
            <p className="text-gray-600 mb-6">{t('dashboard.loadingErrorMessage')}</p>
            <button
              onClick={() => fetchData()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-lg transition shadow-md hover:shadow-lg"
            >
              <RefreshCw size={20} />
              {t('dashboard.tryAgain')}
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && cards.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl">
            <div className="text-gray-400 mb-4 text-6xl">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('dashboard.noCardsFound')}</h3>
            <p className="text-gray-600">{t('dashboard.noDataMessage')}</p>
          </div>
        )}

        {/* Success State - Cards Grid */}
        {!loading && !error && cards.length > 0 && (
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