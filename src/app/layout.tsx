import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dashboard - سیستم مدیریت',
  description: 'داشبورد مدیریتی با احراز هویت',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}