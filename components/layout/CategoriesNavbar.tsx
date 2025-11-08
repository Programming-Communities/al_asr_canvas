'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getAllCategories } from '@/lib/wordpress';
import { Category } from '@/types/blog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp, Home, X } from 'lucide-react';

const CategoriesNavbar: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const navbarRef = useRef<HTMLDivElement>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const isCategoryActive = (categorySlug: string) => {
    return pathname === `/categories/${categorySlug}`;
  };

  const isHomeActive = pathname === '/';

  // Toggle category menu - CLICK BASED
  const toggleCategoryMenu = (categorySlug: string) => {
    setOpenCategory(openCategory === categorySlug ? null : categorySlug);
  };

  // Close menu only when clicking outside or on close button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setOpenCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setOpenCategory(null);
  }, [pathname]);

  // Recursive function to render categories with PERSISTENT menus
  const renderCategoryItem = (category: Category, level: number = 0) => {
    const isActive = isCategoryActive(category.slug);
    const isOpen = openCategory === category.slug;
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div
        key={category.id}
        className="relative"
      >
        {/* Category Button - CLICK TO TOGGLE MENU */}
        <div className="flex items-center">
          {/* Category Link */}
          <Link
            href={`/categories/${category.slug}`}
            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              isActive
                ? 'text-white bg-white/30 backdrop-blur-sm shadow-lg'
                : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
            } ${level > 0 ? 'pr-8' : ''}`}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault(); // Prevent navigation if has children
                toggleCategoryMenu(category.slug);
              } else {
                setOpenCategory(null); // Close menu if no children
              }
            }}
          >
            <span className="flex items-center space-x-2">
              <span className="font-medium">{category.name}</span>
              {level > 0 && (
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              )}
            </span>
          </Link>

          {/* Toggle Button for categories with children */}
          {hasChildren && (
            <button
              onClick={() => toggleCategoryMenu(category.slug)}
              className={`p-1 rounded-lg transition-all duration-200 backdrop-blur-sm mx-1 ${
                isOpen
                  ? 'bg-white/30 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              {isOpen ? (
                <X className="w-3 h-3" />
              ) : (
                <ChevronUp className="w-3 h-3" />
              )}
            </button>
          )}
        </div>

        {/* PERSISTENT Sub-categories DROPUP - Only closes on outside click or X button */}
        {hasChildren && isOpen && (
          <div 
            className={`absolute ${
              level === 0 ? 'bottom-full mb-1' : 'bottom-full mb-1'
            } left-0 bg-white/10 backdrop-blur-2xl rounded-lg border border-white/30 z-50 min-w-48 max-w-64 max-h-80 overflow-hidden shadow-2xl`}
          >
            {/* Close Button for persistent menu */}
            <div className="flex justify-between items-center p-2 border-b border-white/20 bg-white/5">
              <span className="text-white text-sm font-semibold">{category.name}</span>
              <button
                onClick={() => setOpenCategory(null)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close menu"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
            
            <div className={`p-1 ${
              category.children!.length > 6 
                ? 'max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/40 scrollbar-track-transparent' 
                : ''
            }`}>
              <div className="space-y-0.5">
                {category.children!.map((child) => (
                  <div key={child.id}>
                    {renderCategoryItem(child, level + 1)}
                  </div>
                ))}
              </div>
            </div>

            {/* View All Link */}
            <div className="p-1 border-t border-white/30">
              <Link
                href={`/categories/${category.slug}`}
                className="block text-center text-xs font-semibold text-white hover:text-white py-1.5 rounded-md bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/40 transition-all duration-200"
                onClick={() => setOpenCategory(null)}
              >
                View All {category.name}
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={navbarRef}
      className="categories-navbar hidden md:flex items-center justify-center space-x-0"
    >
      {/* Home Button - First Position */}
      <Link
        href="/"
        className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 mx-1 ${
          isHomeActive
            ? 'text-white bg-white/30 backdrop-blur-sm shadow-lg'
            : 'text-white/90 hover:text-white hover:bg-white/20 backdrop-blur-sm'
        }`}
        onClick={() => setOpenCategory(null)}
      >
        <Home className="w-4 h-4" />
      </Link>

      {categoriesLoading ? (
        // Loading Skeleton for main categories
        Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="w-24 h-8 bg-white/20 rounded-lg animate-pulse backdrop-blur-sm mx-1"
          ></div>
        ))
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div key={category.id} className="relative">
            {renderCategoryItem(category)}
          </div>
        ))
      ) : (
        <div className="text-white/70 text-sm px-3 py-2 backdrop-blur-sm">
          No categories found
        </div>
      )}
    </div>
  );
};

export default CategoriesNavbar;