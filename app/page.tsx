import BlogList from "@/components/blog/BlogList";
import Layout from "@/components/layout/Layout";
import { getPosts } from '@/lib/wordpress';
import { Post } from '@/types/blog';

// Server component for SSR
export default async function Home() {
  // Fetch initial posts on server for SSR
  const initialPosts = await getPosts();
  
  return (
    <Layout>
      {/* Fixed: Remove initialPosts prop since BlogList doesn't accept it */}
      <BlogList />
    </Layout>
  );
}

// Revalidate every 60 seconds for ISR
export const revalidate = 60;