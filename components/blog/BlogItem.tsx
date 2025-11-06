'use client';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SocialShareButtons from '../shared/SocialShareButtons';
import { Post } from '@/types/blog';
import { 
  Calendar, 
  Clock, 
  Image as ImageIcon,
  Share2,
  Eye,
  X,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface BlogItemProps extends Post {
  index?: number;
  readingTime?: number;
  views?: number;
  priority?: boolean;
}

const BlogItem: React.FC<BlogItemProps> = ({
  title,
  excerpt,
  categories,
  featuredImage,
  date,
  slug,
  index = 0,
  readingTime = 3,
  views = 0,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const socialMenuRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Memoized values for performance - Optimized
  const postUrl = useMemo(() => 
    `${window?.location?.origin || ''}/posts/${slug}`,
    [slug]
  );

  const cleanExcerpt = useMemo(() => {
    if (!excerpt) return 'Discover insights and valuable information in this post...';
    
    const text = excerpt.replace(/<[^>]*>/g, '').trim();
    return text.length > 120 ? `${text.substring(0, 120)}...` : text;
  }, [excerpt]);

  const category = useMemo(() => {
    const categoryName = categories?.nodes?.[0]?.name || 'Islamic Insights';
    return categoryName.length > 15 ? `${categoryName.substring(0, 15)}...` : categoryName;
  }, [categories]);

  const formattedDate = useMemo(() => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Invalid date';
    }
  }, [date]);

  const animationDelay = useMemo(() => 
    `${(index % 6) * 100}ms`,
    [index]
  );

  const isLCPCandidate = index < 3 || priority;

  // Optimized navigation handler
  const handleNavigation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      router.push(`/posts/${slug}`);
    });
  }, [router, slug, isNavigating]);

  const handleShareClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSocialMenu(prev => !prev);
  }, []);

  const closeSocialMenu = useCallback(() => {
    setShowSocialMenu(false);
  }, []);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (showSocialMenu) {
      e.preventDefault();
      e.stopPropagation();
      setShowSocialMenu(false);
    }
  }, [showSocialMenu]);

  // Optimized Intersection Observer
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Optimized click outside handler
  useEffect(() => {
    if (!showSocialMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (socialMenuRef.current && !socialMenuRef.current.contains(event.target as Node)) {
        setShowSocialMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSocialMenu]);

  // Reset navigation state
  useEffect(() => {
    if (isNavigating) {
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isNavigating]);

  // Optimized image handlers
  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoading(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  // Optimized blur data URL for faster loading
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  return (
    <article 
      ref={cardRef}
      className={`group relative w-full bg-white/80 dark:bg-gray-900/80 border-2 border-red-900/20 dark:border-red-800/30 rounded-xl hover:border-red-900/40 dark:hover:border-red-800/60 hover:shadow-[-4px_4px_0px_#991b1b] dark:hover:shadow-[-4px_4px_0px_#7f1d1d] backdrop-blur-sm transition-all duration-300 ease-out cursor-pointer mx-auto overflow-hidden will-change-transform ${
        isNavigating ? 'opacity-70 pointer-events-none' : ''
      }`}
      style={{ 
        animationDelay,
        transform: isVisible 
          ? (isHovered ? 'translateY(-2px) scale(1.01)' : 'translateY(0) scale(1)') 
          : 'translateY(10px)',
        opacity: isVisible ? 1 : 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Navigation Loading Indicator */}
      {isNavigating && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 z-50 flex items-center justify-center rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
            <span className="text-xs text-gray-600 dark:text-gray-300">Loading...</span>
          </div>
        </div>
      )}

      {/* Image Container - Optimized */}
      <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div 
          className="block h-full w-full focus:outline-none cursor-pointer"
          onClick={handleNavigation}
          aria-label={`Read article: ${title}`}
        >
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <>
              <Image
                src={featuredImage.node.sourceUrl}
                alt={featuredImage.node.altText || title}
                width={400}
                height={240}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading={isLCPCandidate ? "eager" : "lazy"}
                priority={isLCPCandidate}
                sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 25vw"
                quality={70}
                placeholder="blur"
                blurDataURL={blurDataURL}
              />
              
              {/* Loading State - Simplified */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse z-10" />
              )}

              {/* Read Article Overlay - Optimized */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-semibold bg-red-600/90 px-3 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
                  <Sparkles className="w-3 h-3" />
                  Read Article
                </span>
              </div>
            </>
          ) : (
            // Fallback State - Optimized
            <div 
              className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 p-4 text-center cursor-pointer"
              onClick={handleNavigation}
            >
              <div className="flex flex-col items-center gap-2">
                <ImageIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {imageError ? 'Image unavailable' : 'Featured Image'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Section - Optimized */}
      <div className="p-4 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
        {/* Meta Information - Optimized */}
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <time dateTime={date}>{formattedDate}</time>
          </div>
          <span className="text-gray-300">•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readingTime} min</span>
          </div>
          {views > 0 && (
            <>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{views > 1000 ? `${(views/1000).toFixed(1)}k` : views}</span>
              </div>
            </>
          )}
        </div>

        {/* Title - Optimized */}
        <div 
          className="mb-2 cursor-pointer"
          onClick={handleNavigation}
        >
          <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight hover:text-red-700 dark:hover:text-red-400 transition-colors duration-200 min-h-10">
            {title}
          </h3>
        </div>

        {/* Excerpt - Optimized */}
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-3 min-h-10">
          {cleanExcerpt}
        </p>

        {/* Bottom Actions Bar - Optimized */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
          {/* Categories - Optimized */}
          <div className="flex items-center max-w-[70%]">
            <span className="text-xs text-red-700 dark:text-red-400 font-semibold bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md border border-red-200 dark:border-red-800 truncate">
              {category}
            </span>
          </div>

          {/* Share Button - Optimized */}
          <div className="relative" ref={socialMenuRef}>
            <button
              className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 backdrop-blur-sm border ${
                showSocialMenu 
                  ? 'bg-red-50 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' 
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-gray-700/50 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800'
              }`}
              onClick={handleShareClick}
              aria-label="Share this post"
              aria-expanded={showSocialMenu}
            >
              <Share2 className="w-3 h-3" />
            </button>

            {/* Social Share Menu - Optimized */}
            {showSocialMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 rounded-lg shadow-xl p-2 z-50 backdrop-blur-sm min-w-[140px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Share
                  </span>
                  <button
                    onClick={closeSocialMenu}
                    className="p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded"
                    aria-label="Close share menu"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                
                {/* Fixed: Remove compact prop */}
                <SocialShareButtons 
                  title={title} 
                  url={postUrl}
                  excerpt={cleanExcerpt}
                  onShare={closeSocialMenu}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default React.memo(BlogItem);