export interface Category {
  id: string;
  slug: string;
  name: string;
  count?: number;
  parentId?: string | null;
  children?: Category[];
}

export interface FeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  slug: string;
  featuredImage?: FeaturedImage;
  categories: {
    nodes: Category[];
  };
  author: {
    node: {
      name: string;
    };
  };
}

export interface BlogListProps {
  showTitle?: boolean;
  currentPostSlug?: string | null;
  initialPosts?: Post[];
}