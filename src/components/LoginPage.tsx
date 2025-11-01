'use client';

import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiService } from '@/services/mockApi';
import { useAuth } from '@/contexts/AuthContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await apiService.login(username, password);
      
      if (result.success && result.data) {
        login(result.data);
      } else {
        setError(result.error || 'خطای ناشناخته');
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('Network')) {
          setError('خطا در اتصال به اینترنت. لطفاً دوباره تلاش کنید.');
        } else if (err.message.includes('500')) {
          setError('خطای سرور. لطفاً بعداً تلاش کنید.');
        } else {
          setError('خطای غیرمنتظره رخ داده است.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ورود به سیستم</h1>
        <p className="text-gray-600">لطفاً اطلاعات خود را وارد کنید</p>
      </div>

      <div className="space-y-6" onKeyPress={handleKeyPress}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نام کاربری
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="admin یا owner"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رمز عبور
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="رمز عبور خود را وارد کنید"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              در حال ورود...
            </>
          ) : (
            'ورود'
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p className="font-semibold mb-2">اطلاعات تست:</p>
        <p>admin / admin123</p>
        <p>owner / owner123</p>
      </div>
    </div>
  );
};