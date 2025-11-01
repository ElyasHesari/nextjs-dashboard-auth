'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2, User, Lock, Eye, EyeOff } from 'lucide-react';
import { apiService } from '@/services/mockApi';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from '@/i18n/useTranslation';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!username || !password) {
      setError(t('login.fillAllFields'));
      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await apiService.login(username, password);
      
      if (result.success && result.data) {
        console.log('Login successful:', result.data);
        
        login(result.data);
        
        setTimeout(() => {
          console.log('Redirecting to dashboard...');
          router.replace('/dashboard');
        }, 100);
      } else {
        setError(result.error || t('login.unknownError'));
        setLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoading(false);
      if (err instanceof Error) {
        if (err.message.includes('Network')) {
          setError(t('login.networkError'));
        } else if (err.message.includes('500')) {
          setError(t('login.serverError'));
        } else {
          setError(t('login.unexpectedError'));
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
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex" dir="rtl">
      {/* Left Panel - Green Teal Background */}
      <div className="w-1/2 bg-gradient-to-br from-teal-500 to-teal-600 relative overflow-hidden hidden lg:flex items-center justify-center p-12">
        {/* Decorative Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, white 2px, transparent 2px),
              radial-gradient(circle at 60% 70%, white 3px, transparent 3px),
              radial-gradient(circle at 40% 50%, white 1px, transparent 1px),
              repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 80px 80px, 40px 40px'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            {t('login.brandName')}
            <br />
            
          </h1>
          <p className="text-xl mb-8">{t('login.testText')}</p>
          <p className="text-sm opacity-90">{t('login.version')}</p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('login.welcome')}</h2>
          <p className="text-gray-700 leading-relaxed">
            {t('login.welcomeDescription')}
          </p>
        </div>

        <div className="space-y-5" onKeyPress={handleKeyPress}>
          {/* Username Input */}
          <div className="relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <User size={20} />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pr-12 pl-4 py-4 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 placeholder-gray-500"
              placeholder={t('login.username')}
              disabled={loading}
              autoComplete="username"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              <Lock size={20} />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-12 pl-12 py-4 bg-gray-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-900 placeholder-gray-500"
              placeholder={t('login.password')}
              disabled={loading}
              autoComplete="current-password"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-br from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {t('login.loggingIn')}
              </>
            ) : (
              t('login.loginButton')
            )}
          </button>


        </div>

        {/* Test Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg text-xs text-gray-600">
          <p className="font-semibold mb-2">{t('login.testCredentials')}</p>
          <p>admin/admin123</p>
          <p>owner/owner123</p>
        </div>
      </div>
    </div>
  );
};