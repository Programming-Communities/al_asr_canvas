'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllCategories } from '@/lib/wordpress';
import { Category } from '@/types/blog';

const Navigation: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDropdownToggle = (categorySlug: string) => {
    setOpenDropdown(openDropdown === categorySlug ? null : categorySlug);
  };

  const renderCategoryItem = (category: Category, level: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isOpen = openDropdown === category.slug;

    return (
      <div key={category.id} className="relative">
        <div className="flex items-center justify-between">
          <Link
            href={`/categories/${category.slug}`}
            className={`block px-4 py-2 text-sm transition-colors ${
              level > 0 ? 'pl-8' : ''
            } ${
              level === 0 
                ? 'text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {category.name}
              {category.count && category.count > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                  {category.count}
                </span>
              )}
            </span>
          </Link>
          
          {hasChildren && (
            <button
              onClick={() => handleDropdownToggle(category.slug)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg 
                className={`w-3 h-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>

        {/* Sub-categories */}
        {hasChildren && isOpen && (
          <div className={`ml-4 border-l border-gray-200 dark:border-gray-700 ${
            level === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
          }`}>
            {category.children!.map(child => renderCategoryItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        Home
      </Link>
      
      {/* Categories Dropdown */}
      <div className="relative group">
        <button className="flex items-center text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          Categories
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {/* Dropdown Menu */}
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-center text-gray-500 dark:text-gray-400">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </div>
            </div>
          ) : categories.length > 0 ? (
            <div className="py-2">
              {categories.map((category) => renderCategoryItem(category))}
            </div>
          ) : (
            <div className="p-3 text-center text-gray-500 dark:text-gray-400">
              No categories found
            </div>
          )}
        </div>
      </div>

      <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        About
      </Link>
      <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        Services
      </Link>
      <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors">
        Contact
      </Link>
    </nav>
  );
};

export default Navigation;