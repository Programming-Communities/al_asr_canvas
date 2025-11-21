// lib/wordpress.ts
import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client';
import { Post, Category } from '@/types/blog';

// ✅ Response types define karein
interface PostsResponse {
  posts: {
    nodes: Post[];
  };
}

interface PostResponse {
  post: Post;
}

interface CategoriesResponse {
  categories: {
    nodes: Category[];
  };
}

interface SitemapPostsResponse {
  posts: {
    nodes: { slug: string; modified: string }[];
  };
}

interface HealthCheckResponse {
  generalSettings: {
    title: string;
    description: string;
  };
}

// ✅ GET ALL POSTS FUNCTION - WITH PROPER TYPING
export async function getPosts(): Promise<Post[]> {
  try {
    console.log('📝 Fetching posts from WordPress...');
    
    const { data } = await apolloClient.query<PostsResponse>({
      query: gql`
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
      `,
    });

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Retrieved ${posts.length} posts from WordPress`);
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return [];
  }
}

// ✅ GET SINGLE POST - WITH PROPER TYPING
export async function getPost(slug: string): Promise<Post | null> {
  try {
    console.log(`📄 Fetching post: ${slug}`);
    
    const { data } = await apolloClient.query<PostResponse>({
      query: gql`
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
      `,
      variables: { slug },
    });

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

// ✅ GET POSTS FOR SITEMAP - WITH PROPER TYPING
export async function getPostsForSitemap(): Promise<{slug: string; modified: string}[]> {
  try {
    console.log('🗺️ Fetching posts for sitemap...');
    
    const { data } = await apolloClient.query<SitemapPostsResponse>({
      query: gql`
        query GetPostsForSitemap {
          posts(first: 100, where: {status: PUBLISH}) {
            nodes {
              slug
              modified
            }
          }
        }
      `,
    });

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Retrieved ${posts.length} posts for sitemap`);
    
    return posts;
  } catch (error) {
    console.error('❌ Error fetching posts for sitemap:', error);
    return [];
  }
}

// ✅ GET ALL CATEGORIES FUNCTION - WITH PROPER TYPING
export async function getAllCategories(): Promise<Category[]> {
  try {
    console.log('📂 Fetching categories from WordPress...');
    
    const { data } = await apolloClient.query<CategoriesResponse>({
      query: gql`
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
      `,
    });

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

// ✅ GET POSTS BY CATEGORY - WITH PROPER TYPING
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    console.log(`📂 Fetching posts for category: ${categorySlug}`);
    
    const { data } = await apolloClient.query<PostsResponse>({
      query: gql`
        query GetPostsByCategory($categorySlug: [String]) {
          posts(first: 100, where: {categoryNameIn: $categorySlug}) {
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
      `,
      variables: { categorySlug: [categorySlug] },
    });

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Found ${posts.length} posts for category: ${categorySlug}`);
    return posts;
  } catch (error) {
    console.error('❌ Error in getPostsByCategory:', error);
    return [];
  }
}

// ✅ GET FEATURED POSTS - WITH PROPER TYPING
export async function getFeaturedPosts(limit: number = 6): Promise<Post[]> {
  try {
    console.log('⭐ Fetching featured posts...');
    
    const { data } = await apolloClient.query<PostsResponse>({
      query: gql`
        query GetFeaturedPosts {
          posts(first: ${limit}, where: {orderby: {field: DATE, order: DESC}}) {
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
      `,
    });

    const posts = data?.posts?.nodes || [];
    console.log(`✅ Retrieved ${posts.length} featured posts`);
    return posts;
  } catch (error) {
    console.error('❌ Error fetching featured posts:', error);
    return [];
  }
}

// ✅ GET ALL POSTS (alias for getPosts)
export async function getAllPosts(): Promise<Post[]> {
  return await getPosts();
}

// ✅ HEALTH CHECK - WITH PROPER TYPING
export async function checkWordPressHealth(): Promise<boolean> {
  try {
    console.log('🏥 Checking WordPress health...');
    
    const { data } = await apolloClient.query<HealthCheckResponse>({
      query: gql`
        query HealthCheck {
          generalSettings {
            title
            description
          }
        }
      `,
    });

    const hasSettings = !!data?.generalSettings;
    console.log(`✅ WordPress health check: ${hasSettings ? 'HEALTHY' : 'ISSUES'}`);
    
    return hasSettings;
  } catch (error) {
    console.error('❌ WordPress health check failed:', error);
    return false;
  }
}