'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import { apiService } from '@/services/mockApi';
import { useAuth } from '@/contexts/AuthContext';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

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
        console.log('Login successful:', result.data);
        
        // first update auth context state
        login(result.data);
        
        // after delay redirect to dashboard
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          router.replace('/dashboard');
        }, 100);
      } else {
        setError(result.error || 'خطای ناشناخته');
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      if (err instanceof Error) {
        if (err.message.includes('Network')) {
          setError('خطا در اتصال به اینترنت. لطفاً دوباره تلاش کنید.');
        } else if (err.message.includes('500')) {
          setError('خطای سرور. لطفاً بعداً تلاش کنید.');
        } else {
          setError('خطای غیرمنتظره رخ داده است.');
        }
      }
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
            className="
                w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:border focus:ring-blue-400 rounded-lg
                text-gray-700 focus:border-transparent focus:outline-none
                focus:text-gray-700 focus:placeholder-gray-400
            "
            placeholder="admin یا owner"
            disabled={loading}
            autoComplete="username"
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
            className="
                w-full px-4 py-3 border border-gray-300 focus:ring-1 focus:border focus:ring-blue-400 rounded-lg
                text-gray-700 focus:border-transparent focus:outline-none
                focus:text-gray-700 focus:placeholder-gray-400
            "
            placeholder="رمز عبور خود را وارد کنید"
            disabled={loading}
            autoComplete="current-password"
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
        <p>admin/admin123</p>
        <p>owner/owner123</p>
      </div>
    </div>
  );
};