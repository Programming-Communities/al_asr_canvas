// types/blog.ts

export interface Category {
  id: string;
  slug: string;
  name: string;
  count: number;
  description?: string;
  parentId: string | null;
  children: Category[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
  modified: string; // ✅ ADDED: Modified date property
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails?: {
        width: number;
        height: number;
      };
    };
  };
  categories?: {
    nodes: Array<{
      slug: string;
      name: string;
      description?: string;
    }>;
  };
  author?: {
    node: {
      name: string;
      avatar?: {
        url: string;
      };
    };
  };
  tags?: {
    nodes: Array<{
      slug: string;
      name: string;
    }>;
  };
}

export interface BlogListResponse {
  posts: {
    nodes: Post[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
      hasPreviousPage: boolean;
      startCursor: string;
    };
  };
}

export interface SearchFilters {
  category?: string;
  tag?: string;
  author?: string;
  date?: string;
  sortBy?: 'date' | 'title' | 'modified' | 'relevance';
  sortOrder?: 'ASC' | 'DESC';
}

// ✅ ADDED: New interfaces for better type safety
export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes?: Array<{
    name: string;
    sourceUrl: string;
    width: number;
    height: number;
  }>;
}

export interface Author {
  node: {
    id: string;
    name: string;
    description?: string;
    avatar?: {
      url: string;
    };
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

// ✅ ADDED: For post cards and lists
export interface BlogCardProps {
  post: Post;
  index?: number;
  readingTime?: number;
  views?: number;
  priority?: boolean;
}

// ✅ ADDED: For search results
export interface SearchResult {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
  pageInfo: PageInfo;
}

// ✅ ADDED: For pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// ✅ ADDED: For API responses
export interface WordPressResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>;
}