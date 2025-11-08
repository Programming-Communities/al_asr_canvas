import { gql } from '@apollo/client';
import { Post, Category } from '@/types/blog';

// Server-side fetch function
async function fetchGraphQL(query: string, variables?: any) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin-al-asr.centers.pk/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL Errors:', result.errors);
      throw new Error('GraphQL query failed');
    }

    return result.data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// ✅ GET ALL POSTS FUNCTION
export async function getPosts(): Promise<Post[]> {
  try {
    const data = await fetchGraphQL(`
      query GetPosts {
        posts {
          nodes {
            id
            title
            content
            excerpt
            date
            slug
            featuredImage {
              node {
                sourceUrl
                altText
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

    if (!data?.posts?.nodes) {
      console.warn('No posts data found in response');
      return [];
    }

    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const data = await fetchGraphQL(`
      query GetPost($slug: ID!) {
        post(id: $slug, idType: SLUG) {
          id
          title
          content
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
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

    if (!data?.post) {
      console.warn(`No post found for slug: ${slug}`);
      return null;
    }

    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// ✅ GET ALL CATEGORIES WITH HIERARCHY
export async function getAllCategories(): Promise<Category[]> {
  try {
    const data = await fetchGraphQL(`
      query GetCategories {
        categories(first: 100, where: {hideEmpty: false}) {
          nodes {
            id
            slug
            name
            count
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

    if (!data?.categories?.nodes) {
      console.warn('No categories data found in response');
      return [];
    }

    // Organize categories with hierarchy
    const allCategories = data.categories.nodes;
    const categoriesWithHierarchy = organizeCategoriesHierarchy(allCategories);
    
    return categoriesWithHierarchy;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Helper function to organize categories hierarchically
function organizeCategoriesHierarchy(categories: any[]): Category[] {
  const categoryMap = new Map();
  const rootCategories: Category[] = [];

  // First pass: create map of all categories
  categories.forEach(category => {
    const categoryData: Category = {
      id: category.id,
      slug: category.slug,
      name: category.name,
      count: category.count || 0,
      parentId: category.parent?.node?.id || null,
      children: []
    };

    categoryMap.set(category.id, categoryData);
  });

  // Second pass: build hierarchy
  categories.forEach(category => {
    const categoryData = categoryMap.get(category.id);
    
    if (category.parent?.node) {
      // This is a child category
      const parentCategory = categoryMap.get(category.parent.node.id);
      if (parentCategory) {
        parentCategory.children = parentCategory.children || [];
        parentCategory.children.push(categoryData);
      }
    } else {
      // This is a root category (no parent)
      rootCategories.push(categoryData);
    }
  });

  return rootCategories;
}

// ✅ SIMPLE: Get posts by category using filtering (No GraphQL errors)
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    // Get all posts and filter by category
    const allPosts = await getPosts();
    
    const filteredPosts = allPosts.filter(post => 
      post.categories?.nodes?.some((cat: any) => cat.slug === categorySlug)
    );

    console.log(`Found ${filteredPosts.length} posts for category: ${categorySlug}`);
    return filteredPosts;
  } catch (error) {
    console.error('Error in getPostsByCategory:', error);
    return [];
  }
}

// ✅ GET ALL POSTS FOR CATEGORIES PAGE
export async function getAllPosts(): Promise<Post[]> {
  return await getPosts();
}