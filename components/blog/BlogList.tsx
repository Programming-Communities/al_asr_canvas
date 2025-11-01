'use client';
import React, { useState, useEffect } from 'react';
import BlogItem from './BlogItem';
import { BlogItemSkeleton } from '../skeleton/BlogItemSkeleton';
import { getPosts, getAllCategories } from '@/lib/wordpress';
import { Post, Category } from '@/types/blog';

const BlogList: React.FC<{ showTitle?: boolean; currentPostSlug?: string | null }> = ({
  showTitle = true,
  currentPostSlug = null
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    let filtered = posts;
    
    if (activeCategory === 'all') {
      filtered = posts;
    } else {
      filtered = posts.filter(post =>
        post.categories?.nodes?.some((cat: Category) => cat.slug === activeCategory)
      );
    }

    if (currentPostSlug) {
      filtered = filtered.filter(post => post.slug !== currentPostSlug);
    }

    setFilteredPosts(filtered);
  }, [activeCategory, posts, currentPostSlug]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [postsData, categoriesData] = await Promise.all([
        getPosts(),
        getAllCategories()
      ]);

      setPosts(postsData);

      let initialFiltered = postsData;
      if (currentPostSlug) {
        initialFiltered = postsData.filter(post => post.slug !== currentPostSlug);
      }
      setFilteredPosts(initialFiltered);

      if (categoriesData) {
        setCategories(categoriesData);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Connection Error</h3>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchInitialData}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {showTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Latest Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Discover more Islamic content and events
          </p>
        </div>
      )}

      {/* Category Filters */}
      <div className='flex justify-center gap-2 my-8 flex-wrap'>
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-2 rounded-lg transition-colors text-sm ${
            activeCategory === 'all' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setActiveCategory(category.slug)}
            className={`px-3 py-2 rounded-lg transition-colors text-sm ${
              activeCategory === category.slug
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Posts Grid - Improved spacing and responsiveness */}
      {loading ? (
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-16'>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <BlogItemSkeleton key={item} />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-16'>
          {filteredPosts.map((post, index) => (
            <BlogItem
              key={post.id}
              {...post}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">No Posts Found</h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            {activeCategory === 'all'
              ? 'No content available yet. Please check back later.'
              : `No posts found in this category.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogList;