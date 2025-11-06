export interface Category {
  slug: string;
  name: string;
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
  initialPosts?: Post[]; // Added for SSR hydration
}