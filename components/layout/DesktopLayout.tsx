'use client';
import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import SidebarMenu from '../layout/SidebarMenu';
import CategoriesNavbar from '../layout/CategoriesNavbar';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({ children }) => {
  return (
    <div className="desktop-layout min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ✅ DESKTOP OPTIMIZED HEADER */}
      <Header />
      
      {/* ✅ SIDEBAR + MAIN CONTENT LAYOUT */}
      <div className="flex">
        {/* LEFT SIDEBAR - CATEGORIES */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen hidden lg:block">
          <div className="p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Categories</h3>
            <CategoriesNavbar />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 desktop-main">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>

        {/* RIGHT SIDEBAR - RECENT POSTS */}
        <aside className="w-80 bg-white dark:bg-gray-800 shadow-lg min-h-screen hidden xl:block">
          <div className="p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Recent Posts</h3>
            {/* Add recent posts sidebar content */}
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-sm">Post Title 1</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">2 hours ago</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-sm">Post Title 2</h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default DesktopLayout;