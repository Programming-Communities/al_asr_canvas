import React from 'react';
import Layout from '@/components/layout/Layout';
import BlogList from '@/components/blog/BlogList';
import { getPosts, getAllCategories } from '@/lib/wordpress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ✅ FIXED: Await params in generateMetadata
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')} | Al-Asr Islamic Service`,
    description: `Browse posts in ${slug.replace(/-/g, ' ')} category`,
  };
}

// ✅ FIXED: Generate static params
export async function generateStaticParams() {
  return [
    { slug: 'calendar' },
    { slug: 'daily-post' },
    { slug: 'uncategorized' }
  ];
}

export const dynamicParams = true;

// ✅ FIXED: Await params in component
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  try {
    // Get all posts and filter by category slug
    const allPosts = await getPosts();
    const allCategories = await getAllCategories();
    
    // Filter posts by category
    const categoryPosts = allPosts.filter(post => 
      post.categories?.nodes?.some((cat: any) => cat.slug === slug)
    );

    // Find category name
    const findCategory = (cats: any[], categorySlug: string): any => {
      for (const cat of cats) {
        if (cat.slug === categorySlug) return cat;
        if (cat.children && cat.children.length > 0) {
          const found = findCategory(cat.children, categorySlug);
          if (found) return found;
        }
      }
      return null;
    };

    const category = findCategory(allCategories, slug);

    if (!category) {
      console.log(`Category ${slug} not found in categories list`);
      notFound();
    }

    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Home
            </Link>
            <span>›</span>
            <Link href="/categories" className="hover:text-red-600 dark:hover:text-red-400 transition-colors">
              Categories
            </Link>
            <span>›</span>
            <span className="text-red-600 dark:text-red-400 font-semibold">
              {category.name}
            </span>
          </nav>

          {/* Category Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {category.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} found
            </p>
            
            {category.count && (
              <div className="inline-flex items-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm">
                Total posts: {category.count}
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {categoryPosts.length > 0 ? (
            <BlogList 
              showTitle={false}
              initialPosts={categoryPosts}
            />
          ) : (
            <div className="text-center py-16">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 max-w-2xl mx-auto">
                <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  No Posts Found
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                  There are no posts available in the "{category.name}" category yet.
                </p>
                <Link
                  href="/categories"
                  className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Browse All Categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </Layout>
    );
  } catch (error) {
    console.error(`Error loading category page for ${slug}:`, error);
    notFound();
  }
}

export const revalidate = 60;