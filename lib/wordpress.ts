// lib/wordpress.ts
import { Post, Category } from '@/types/blog';

// Server-side fetch function with better error handling
async function fetchGraphQL(query: string, variables?: any) {
  const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;
  
  if (!WORDPRESS_API_URL) {
    throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL environment variable is not set');
  }

  console.log('🔍 Fetching from WordPress:', WORDPRESS_API_URL);
  
  try {
    // GraphQL request body properly format karein
    const requestBody = {
      query: query,
      variables: variables || {}
    };

    console.log('📋 GraphQL Query:', query.substring(0, 100) + '...');
    
    const response = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
      next: { revalidate: 60 }
    });

    console.log('📊 Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ WordPress Error Response:', errorText);
      throw new Error(`WordPress GraphQL Error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      console.error('❌ GraphQL Query Errors:', result.errors);
      throw new Error('GraphQL query failed: ' + JSON.stringify(result.errors));
    }

    console.log('✅ GraphQL Query Successful');
    return result.data;
  } catch (error) {
    console.error('💥 Fetch error:', error);
    throw error;
  }
}

// ✅ GET ALL POSTS FUNCTION - UPDATED WITH MODIFIED FIELD FOR SOCIAL SHARING
export async function getPosts(): Promise<Post[]> {
  try {
    console.log('📝 Fetching posts from WordPress...');
    
    const data = await fetchGraphQL(`
      query GetPosts {
        posts(first: 100) {
          nodes {
            id
            title
            content
            excerpt
            date
            modified
            slug
            featuredImage {
              node {
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
              }
            }
            categories {
              nodes {
                slug
                name
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `);

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Retrieved ${posts.length} posts from WordPress`);
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return [];
  }
}

// ✅ GET SINGLE POST - UPDATED WITH MODIFIED FIELD FOR SOCIAL SHARING
export async function getPost(slug: string): Promise<Post | null> {
  try {
    console.log(`📄 Fetching post: ${slug}`);
    
    const data = await fetchGraphQL(`
      query GetPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          content
          excerpt
          date
          modified
          slug
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              slug
              name
            }
          }
          author {
            node {
              name
            }
          }
        }
      }
    `, { slug });

    if (data?.post) {
      console.log(`✅ Successfully fetched post: ${data.post.title}`);
      return data.post;
    } else {
      console.log(`❌ Post not found: ${slug}`);
      return null;
    }
  } catch (error) {
    console.error(`❌ Error fetching post ${slug}:`, error);
    return null;
  }
}

// ✅ GET POSTS FOR SITEMAP - OPTIMIZED FOR PERFORMANCE
export async function getPostsForSitemap(): Promise<{slug: string; modified: string}[]> {
  try {
    console.log('🗺️ Fetching posts for sitemap...');
    
    const data = await fetchGraphQL(`
      query GetPostsForSitemap {
        posts(first: 100, where: {status: PUBLISH}) {
          nodes {
            slug
            modified
          }
        }
      }
    `);

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Retrieved ${posts.length} posts for sitemap`);
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts for sitemap:', error);
    return [];
  }
}

// ✅ GET ALL CATEGORIES FUNCTION - UPDATED
export async function getAllCategories(): Promise<Category[]> {
  try {
    console.log('📂 Fetching categories from WordPress...');
    
    const data = await fetchGraphQL(`
      query GetAllCategories {
        categories(first: 50, where: {hideEmpty: true}) {
          nodes {
            id
            slug
            name
            count
            description
            parent {
              node {
                id
                slug
                name
              }
            }
          }
        }
      }
    `);

    const categories = data?.categories?.nodes || [];
    console.log(`✅ Retrieved ${categories.length} categories from WordPress`);
    
    return organizeCategoriesHierarchy(categories);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    return [];
  }
}

// Helper function to organize categories hierarchically
function organizeCategoriesHierarchy(categories: any[]): Category[] {
  const categoryMap = new Map();
  const rootCategories: Category[] = [];

  categories.forEach(category => {
    const categoryData: Category = {
      id: category.id,
      slug: category.slug,
      name: category.name,
      count: category.count || 0,
      description: category.description || '',
      parentId: category.parent?.node?.id || null,
      children: []
    };

    categoryMap.set(category.id, categoryData);
  });

  categories.forEach(category => {
    const categoryData = categoryMap.get(category.id);
    
    if (category.parent?.node) {
      const parentCategory = categoryMap.get(category.parent.node.id);
      if (parentCategory) {
        parentCategory.children = parentCategory.children || [];
        parentCategory.children.push(categoryData);
      }
    } else {
      rootCategories.push(categoryData);
    }
  });

  return rootCategories;
}

// ✅ GET POSTS BY CATEGORY - UPDATED
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    console.log(`📂 Fetching posts for category: ${categorySlug}`);
    
    const allPosts = await getPosts();
    const filteredPosts = allPosts.filter(post => 
      post.categories?.nodes?.some((cat: any) => cat.slug === categorySlug)
    );

    console.log(`✅ Found ${filteredPosts.length} posts for category: ${categorySlug}`);
    return filteredPosts;
  } catch (error) {
    console.error('❌ Error in getPostsByCategory:', error);
    return [];
  }
}

// ✅ GET FEATURED POSTS - NEW FUNCTION
export async function getFeaturedPosts(limit: number = 6): Promise<Post[]> {
  try {
    console.log('⭐ Fetching featured posts...');
    
    const allPosts = await getPosts();
    const featuredPosts = allPosts.slice(0, limit);
    
    console.log(`✅ Retrieved ${featuredPosts.length} featured posts`);
    return featuredPosts;
  } catch (error) {
    console.error('❌ Error fetching featured posts:', error);
    return [];
  }
}

// ✅ GET ALL POSTS (alias for getPosts)
export async function getAllPosts(): Promise<Post[]> {
  return await getPosts();
}

// ✅ HEALTH CHECK - NEW FUNCTION
export async function checkWordPressHealth(): Promise<boolean> {
  try {
    console.log('🏥 Checking WordPress health...');
    
    const data = await fetchGraphQL(`
      query HealthCheck {
        generalSettings {
          title
          description
        }
      }
    `);

    const hasSettings = !!data?.generalSettings;
    console.log(`✅ WordPress health check: ${hasSettings ? 'HEALTHY' : 'ISSUES'}`);
    
    return hasSettings;
  } catch (error) {
    console.error('❌ WordPress health check failed:', error);
    return false;
  }
}