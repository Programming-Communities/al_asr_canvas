'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllCategories } from '@/lib/wordpress';
import { Category } from '@/types/blog';
import { ChevronDown, ChevronUp, FolderOpen } from 'lucide-react';

const CategoriesTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategories = () => {
    setIsOpen(!isOpen);
  };

  const isActiveCategory = (categorySlug: string) => {
    return pathname === `/categories/${categorySlug}`;
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      {/* Main Categories Button */}
      <button
        onClick={toggleCategories}
        className="flex items-center space-x-2 bg-linear-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-950 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 font-semibold border-2 border-white/20 min-h-12"
        aria-label="Browse categories"
        aria-expanded={isOpen}
        aria-controls="categories-dropdown"
      >
        <FolderOpen className="w-5 h-5" aria-hidden="true" />
        <span>Categories</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        )}
      </button>

      {/* Categories Dropdown */}
      {isOpen && (
        <div 
          id="categories-dropdown"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
          role="menu"
          aria-label="Categories menu"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-linear-to-r from-red-800 to-red-900 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FolderOpen className="w-5 h-5" aria-hidden="true" />
                <h3 className="font-bold text-lg">All Categories</h3>
              </div>
              <button
                onClick={toggleCategories}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors min-h-10 min-w-10"
                aria-label="Close categories menu"
              >
                <ChevronUp className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="text-red-100 text-sm mt-1">
              Browse Islamic content by category
            </p>
          </div>

          {/* Categories List */}
          <div className="p-3 max-h-72 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600" aria-label="Loading categories"></div>
              </div>
            ) : categories.length > 0 ? (
              <div className="space-y-2">
                {/* All Categories Link */}
                <Link
                  href="/categories"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 min-h-14 ${
                    pathname === '/categories'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                      : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                  }`}
                  role="menuitem"
                  aria-label="Browse all categories"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-linear-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">All</span>
                    </div>
                    <span className="font-semibold">All Categories</span>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs font-bold">
                    {categories.reduce((acc, cat) => acc + (cat.count || 0), 0)}
                  </div>
                </Link>

                {/* Individual Categories */}
                {categories.map((category) => (
                  <div key={category.id} className="space-y-1">
                    <Link
                      href={`/categories/${category.slug}`}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 min-h-14 ${
                        isActiveCategory(category.slug)
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                          : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400'
                      }`}
                      role="menuitem"
                      aria-label={`Browse ${category.name} category`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold block">{category.name}</span>
                          {category.children && category.children.length > 0 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {category.children.length} sub-categories
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-bold">
                        {category.count}
                      </div>
                    </Link>

                    {/* Sub-categories */}
                    {category.children && category.children.length > 0 && (
                      <div className="ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                        {category.children.map((child) => (
                          <Link
                            key={child.id}
                            href={`/categories/${child.slug}`}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 min-h-12 ${
                              isActiveCategory(child.slug)
                                ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                                : 'bg-gray-50 dark:bg-gray-700/30 hover:bg-red-50 dark:hover:bg-red-900/10 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-300'
                            }`}
                            role="menuitem"
                            aria-label={`Browse ${child.name} subcategory`}
                          >
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-linear-to-r from-green-600 to-emerald-600 rounded flex items-center justify-center">
                                <span className="text-white text-xs">S</span>
                              </div>
                              <span className="text-sm">{child.name}</span>
                            </div>
                            <div className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded-full text-xs">
                              {child.count}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <FolderOpen className="w-12 h-12 mx-auto mb-2 opacity-50" aria-hidden="true" />
                <p>No categories found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 rounded-b-2xl">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {categories.length} categories available
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesTab;