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
        next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
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

// Define GraphQL response types
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

    // Check if data exists and has the expected structure
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

    // Check if data exists and has the expected structure
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

export async function getAllCategories(): Promise<Category[]> {
  try {
    const data = await fetchGraphQL(`
      query GetCategories {
        categories {
          nodes {
            slug
            name
          }
        }
      }
    `);

    // Check if data exists and has the expected structure
    if (!data?.categories?.nodes) {
      console.warn('No categories data found in response');
      return [];
    }

    return data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}