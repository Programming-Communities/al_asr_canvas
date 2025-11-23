import BlogList from "@/components/blog/BlogList";
import Layout from "@/components/layout/Layout";
import { getPosts } from '@/lib/wordpress';
import { Metadata } from 'next';

// ✅ PERFORMANCE: Server component for SSR
export default async function Home() {
  const initialPosts = await getPosts();

  return (
    <Layout>
      {/* ✅ PERFORMANCE: Optimized container with lazy loading */}
      <div className="container mx-auto px-4 py-8">
        <BlogList initialPosts={initialPosts} />
      </div>
    </Layout>
  );
}

// ✅ PERFORMANCE: Revalidate every 60 seconds for ISR
export const revalidate = 60;

// ✅ SEO: Home page metadata for social sharing
export const metadata: Metadata = {
  title: "Al-Asr ( Islamic Service ) - Islamic Services & Community Programs",
  description: "Comprehensive Islamic educational resources, community programs, and religious services. Explore Quran studies, Hadith collections, prayer times, and community services.",
  openGraph: {
    title: "Al-Asr ( Islamic Service ) - Islamic Services & Community Programs",
    description: "Comprehensive Islamic educational resources, community programs, and religious services",
    url: "https://al-asr.centers.pk",
    siteName: "Al-Asr Islamic Service",
    images: [
      {
        url: "https://al-asr.centers.pk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Al-Asr Islamic Service - Islamic Services & Community Programs",
      },
    ],
    type: 'website',
    locale: 'ur_PK',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Al-Asr ( Islamic Service ) - Islamic Services & Community Programs",
    description: "Comprehensive Islamic educational resources, community programs, and religious services",
    images: ["https://al-asr.centers.pk/og-image.png"],
  },
};