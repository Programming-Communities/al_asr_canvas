import { apolloClient } from './apollo-client';
import { gql } from '@apollo/client';
import { Post, Category } from '@/types/blog';

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
    const result = await apolloClient.query<PostsResponse>({
      query: gql`
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
      `,
    });

    // Check if data exists and has the expected structure
    if (!result.data?.posts?.nodes) {
      console.warn('No posts data found in response');
      return [];
    }

    return result.data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const result = await apolloClient.query<PostResponse>({
      query: gql`
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
      `,
      variables: { slug },
    });

    // Check if data exists and has the expected structure
    if (!result.data?.post) {
      console.warn(`No post found for slug: ${slug}`);
      return null;
    }

    return result.data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const result = await apolloClient.query<CategoriesResponse>({
      query: gql`
        query GetCategories {
          categories {
            nodes {
              slug
              name
            }
          }
        }
      `,
    });

    // Check if data exists and has the expected structure
    if (!result.data?.categories?.nodes) {
      console.warn('No categories data found in response');
      return [];
    }

    return result.data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}