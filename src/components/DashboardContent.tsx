'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw, LogOut } from 'lucide-react';
import { DashboardCard as DashboardCardType } from '@/types';
import { apiService } from '@/services/mockApi';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardCard } from './DashboardCard';
import { CardSkeleton } from './CardSkeleton';

export const DashboardContent = () => {
  const { user, logout } = useAuth();
  const [cards, setCards] = useState<DashboardCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (simulateError: boolean = false) => {
    if (!user) return;
    
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
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">داشبورد</h1>
            <p className="text-sm text-gray-600 mt-1">
              خوش آمدید، {user.username} ({user.role === 'admin' ? 'مدیر' : 'صاحب'})
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
          >
            <LogOut size={18} />
            خروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            کارت‌های داشبورد ({user.role === 'admin' ? '5 کارت' : '10 کارت'})
          </h2>
          <button
            onClick={() => fetchData()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition disabled:bg-blue-400"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            بروزرسانی
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
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <AlertCircle className="mx-auto text-red-500 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">خطا در دریافت داده‌ها</h3>
            <p className="text-gray-600 mb-6">متأسفانه مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.</p>
            <button
              onClick={() => fetchData()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <RefreshCw size={20} />
              تلاش مجدد
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && cards.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <div className="text-gray-400 mb-4 text-6xl">📭</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">هیچ کارتی یافت نشد</h3>
            <p className="text-gray-600">در حال حاضر داده‌ای برای نمایش وجود ندارد.</p>
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