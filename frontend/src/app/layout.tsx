import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '../app/context/AppContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';


export const metadata: Metadata = {
  title: 'ResellHub - Ultimate Reselling Marketplace',
  description: 'Buy and sell pre-owned items with confidence on ResellHub',
  keywords: 'reselling, marketplace, buy, sell, secondhand, pre-owned',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <AppProvider>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
