'use client';
import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import MobileMenu from '../shared/MobileMenu';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  return (
    <div className="mobile-layout min-h-screen bg-white dark:bg-gray-900">
      {/* ✅ MOBILE OPTIMIZED HEADER */}
      <Header />
      
      {/* ✅ MOBILE SPECIFIC CONTENT */}
      <main className="mobile-main pb-20">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>

      {/* ✅ BOTTOM MOBILE NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 md:hidden">
        <div className="flex justify-around items-center py-3">
          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <span className="text-2xl">🏠</span>
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <span className="text-2xl">📚</span>
            <span className="text-xs mt-1">Posts</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <span className="text-2xl">🕌</span>
            <span className="text-xs mt-1">Services</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 dark:text-gray-300">
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
      </nav>

      <Footer />
      <MobileMenu />
    </div>
  );
};

export default MobileLayout;