import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';
import { getAllPosts, getAllCategories } from '@/lib/wordpress';
import { Metadata } from 'next';
import Link from 'next/link';
import { Category } from '@/types/blog';

export const metadata: Metadata = {
  title: 'All Categories | Al-Asr Islamic Service',
  description: 'Browse all categories and posts from Al-Asr Islamic Service',
};

// Category colors array - defined outside component
const categoryColors = [
  'from-red-500 to-orange-500',
  'from-blue-500 to-cyan-500', 
  'from-green-500 to-emerald-500',
  'from-purple-500 to-pink-500',
  'from-yellow-500 to-amber-500',
  'from-indigo-500 to-blue-500',
  'from-teal-500 to-green-500',
  'from-orange-500 to-red-500',
  'from-pink-500 to-rose-500',
  'from-cyan-500 to-blue-500'
];

export default async function CategoriesPage() {
  const [allPosts, allCategories] = await Promise.all([
    getAllPosts(),
    getAllCategories()
  ]);

  return (
    <Layout>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          {/* Premium Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl mb-6">
              <span className="text-2xl text-white">📚</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-gray-900 to-red-700 dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-6">
              Islamic Categories
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore comprehensive Islamic content organized into meaningful categories for easy discovery and learning
            </p>
            <div className="flex items-center justify-center space-x-4 mt-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{allCategories.length} Categories</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{allPosts.length} Total Posts</span>
              </div>
            </div>
          </div>

          {/* Premium Categories Grid */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Browse Categories
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Click anywhere on a category card to explore its content
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total:</span>
                <span className="text-red-600 dark:text-red-400 font-bold">{allCategories.length}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {allCategories.map((category, index) => {
                const categoryColor = categoryColors[index % categoryColors.length];
                
                return (
                  <div
                    key={category.id}
                    className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-linear-to-br ${categoryColor} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Category Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-14 h-14 bg-linear-to-r ${categoryColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="text-xl text-white font-bold">
                              {category.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <Link href={`/categories/${category.slug}`}>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300 cursor-pointer">
                                {category.name}
                              </h3>
                            </Link>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                              Islamic Content
                            </p>
                          </div>
                        </div>
                        
                        {/* Post Count Badge */}
                        <Link href={`/categories/${category.slug}`}>
                          <div className="bg-linear-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg cursor-pointer hover:from-red-600 hover:to-red-700 transition-all duration-300">
                            {category.count}
                          </div>
                        </Link>
                      </div>

                      {/* Sub-categories */}
                      {category.children && category.children.length > 0 && (
                        <div className="mb-6">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sub-categories:</span>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                              {category.children.length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.children.slice(0, 4).map((child) => (
                              <Link
                                key={child.id}
                                href={`/categories/${child.slug}`}
                                className="text-xs bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 font-medium"
                              >
                                {child.name}
                              </Link>
                            ))}
                            {category.children.length > 4 && (
                              <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full">
                                +{category.children.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="flex items-center space-x-2 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group/btn"
                        >
                          <span>Explore Category</span>
                          <svg 
                            className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                          </svg>
                        </Link>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {category.count}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                            Posts
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-red-500/20 transition-all duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 dark:text-red-400 mb-2">
                  {allCategories.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">
                  Total Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {allPosts.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">
                  Total Posts
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {allCategories.filter(cat => cat.children && cat.children.length > 0).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">
                  Parent Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {allCategories.reduce((acc, cat) => acc + (cat.children?.length || 0), 0)}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">
                  Sub-categories
                </div>
              </div>
            </div>
          </div>

          {/* All Posts Section with Premium Header */}
          <div className="bg-linear-to-r from-gray-900 to-red-900 dark:from-gray-800 dark:to-red-900 rounded-3xl p-1 mb-12">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Latest Islamic Content
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Discover the most recent posts across all categories
                </p>
              </div>
              
              <BlogList 
                showTitle={false}
                initialPosts={allPosts.slice(0, 12)}
              />
              
              {allPosts.length > 12 && (
                <div className="text-center mt-12">
                  <Link
                    href="/"
                    className="inline-flex items-center bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  >
                    <span>View All Posts</span>
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-linear-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-3xl p-8 border border-red-200 dark:border-red-800">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Explore our comprehensive Islamic services and resources beyond blog posts
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/services"
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-700"
                >
                  Our Services
                </Link>
                <Link
                  href="/contact"
                  className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const revalidate = 60;