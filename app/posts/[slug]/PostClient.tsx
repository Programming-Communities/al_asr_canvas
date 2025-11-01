'use client';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Post } from '@/types/blog';

// Social Sharing Component
function PostSocialShareButtons({ title, slug, isRTL }: { 
  title: string; 
  slug: string; 
  isRTL: boolean; 
}) {
  const shareOnWhatsApp = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    const text = `📖 ${title}\n\nRead this amazing post from Al-Asr ( Islamic Service ):\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className={`flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
      <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
        Share this post:
      </span>
    
      <button
        onClick={shareOnWhatsApp}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
        title="Share on WhatsApp"
      >
        <span>📱</span>
        WhatsApp
      </button>
    
      <button
        onClick={shareOnFacebook}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        title="Share on Facebook"
      >
        <span>🔵</span>
        Facebook
      </button>
    </div>
  );
}

// Post Meta Information Component
function PostMetaInfo({ post, isRTL }: { 
  post: Post; 
  isRTL: boolean; 
}) {
  const readingTime = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? "rtl" : "ltr"}>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300`}>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">📖</span>
          <span>{readingTime(post.content)}</span>
        </div>
      
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">📅</span>
          <span>Published on {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}</span>
        </div>
      
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="text-red-900 dark:text-red-400">👤</span>
          <span>By {post.author?.node?.name || 'Admin'}</span>
        </div>
      </div>
    
      {post.categories.nodes.length > 0 && (
        <div className={`mt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${isRTL ? 'ml-2' : 'mr-2'}`}>
            Categories:
          </span>
          {post.categories.nodes.map((category, index) => (
            <span
              key={category.slug}
              className={`inline-block bg-red-900 dark:bg-red-800 text-white text-xs px-3 py-1 rounded-full ${isRTL ? 'ml-2' : 'mr-2'} mb-2`}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Post Client Component
interface PostClientProps {
  post: Post;
  slug: string;
  isUrdu: boolean;
}

export default function PostClient({ post, slug, isUrdu }: PostClientProps) {
  const isTitleRTL = isUrdu;
  const isContentRTL = isUrdu;
  const currentIsRTL = isTitleRTL || isContentRTL;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
    
      <div className="py-8 bg-white dark:bg-gray-900">
        <article
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          dir={currentIsRTL ? "rtl" : "ltr"}
        >
          {/* Featured Image */}
          {post.featuredImage?.node?.sourceUrl && (
            <div className="w-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <div className="relative w-full h-[500px] mx-auto">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-contain object-center bg-black"
                  priority
                  sizes="100vw"
                />
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Title */}
            <h1
              className={`text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight ${
                currentIsRTL ? 'text-right' : 'text-left'
              }`}
              style={{
                fontFamily: currentIsRTL 
                  ? "'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif" 
                  : "system-ui, -apple-system, sans-serif"
              }}
            >
              {post.title}
            </h1>

            {/* Meta Information */}
            <PostMetaInfo post={post} isRTL={currentIsRTL} />

            {/* Main Content */}
            <div
              className={`wp-content max-w-none text-gray-700 dark:text-gray-300 ${
                currentIsRTL ? 'urdu-arabic-content' : 'english-content'
              }`}
              style={{
                fontFamily: currentIsRTL 
                  ? "'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif" 
                  : "system-ui, -apple-system, sans-serif",
                lineHeight: currentIsRTL ? '2.2' : '1.8',
                fontSize: currentIsRTL ? '1.2rem' : '1rem',
                textAlign: currentIsRTL ? 'right' : 'left'
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Social Sharing */}
            <div className="mt-8">
              <PostSocialShareButtons title={post.title} slug={slug} isRTL={currentIsRTL} />
            </div>

            {/* Back to Posts */}
            <div className={`mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 ${currentIsRTL ? 'text-right' : 'text-left'}`}>
              <Link
                href="/"
                className={`inline-flex items-center text-red-900 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-semibold transition-colors ${
                  currentIsRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <svg
                  className={`${currentIsRTL ? 'ml-2 rotate-180' : 'mr-2'} w-4 h-4`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Posts
              </Link>
            </div>
          </div>
        </article>
      </div>

      {/* Global Styles for Content */}
      <style jsx global>{`
        .wp-content {
          color: inherit;
        }

        .wp-content p {
          margin-bottom: 1.5rem;
          color: inherit;
        }

        .wp-content h1, .wp-content h2, .wp-content h3, 
        .wp-content h4, .wp-content h5, .wp-content h6 {
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
          color: inherit;
        }

        .wp-content h1 { font-size: 2.5rem; }
        .wp-content h2 { font-size: 2rem; }
        .wp-content h3 { font-size: 1.75rem; }
        .wp-content h4 { font-size: 1.5rem; }
        .wp-content h5 { font-size: 1.25rem; }
        .wp-content h6 { font-size: 1.125rem; }

        /* Urdu/Arabic Content Styling */
        .urdu-arabic-content {
          font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', 'Scheherazade New', serif;
          line-height: 2.2;
          text-align: right;
          font-size: 1.2rem;
        }

        .urdu-arabic-content h1, 
        .urdu-arabic-content h2, 
        .urdu-arabic-content h3, 
        .urdu-arabic-content h4, 
        .urdu-arabic-content h5, 
        .urdu-arabic-content h6 {
          font-family: 'Noto Nastaliq Urdu', 'Noto Sans Arabic', serif;
          text-align: right;
          line-height: 2;
        }

        .urdu-arabic-content h1 { font-size: 2.8rem; }
        .urdu-arabic-content h2 { font-size: 2.4rem; }
        .urdu-arabic-content h3 { font-size: 2rem; }
        .urdu-arabic-content h4 { font-size: 1.6rem; }
        .urdu-arabic-content h5 { font-size: 1.4rem; }
        .urdu-arabic-content h6 { font-size: 1.2rem; }

        /* English Content Styling */
        .english-content {
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.7;
          text-align: left;
        }

        .english-content h1, 
        .english-content h2, 
        .english-content h3, 
        .english-content h4, 
        .english-content h5, 
        .english-content h6 {
          font-family: system-ui, -apple-system, sans-serif;
          text-align: left;
        }

        /* Dark mode support */
        .dark .wp-content {
          color: #e5e7eb;
        }

        .dark .wp-content h1,
        .dark .wp-content h2,
        .dark .wp-content h3,
        .dark .wp-content h4,
        .dark .wp-content h5,
        .dark .wp-content h6 {
          color: #f9fafb;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .wp-content h1 { font-size: 2rem; }
          .wp-content h2 { font-size: 1.75rem; }
          .wp-content h3 { font-size: 1.5rem; }
          
          .urdu-arabic-content h1 { font-size: 2.2rem; }
          .urdu-arabic-content h2 { font-size: 1.9rem; }
          .urdu-arabic-content h3 { font-size: 1.6rem; }
          .urdu-arabic-content { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}