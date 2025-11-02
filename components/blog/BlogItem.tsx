"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import SocialShareButtons from "../shared/SocialShareButtons";
import { Post } from "@/types/blog";
import {
  Calendar,
  Clock,
  ArrowRight,
  Image as ImageIcon,
  Share2,
  Eye,
} from "lucide-react";

interface BlogItemProps extends Post {
  index?: number;
  readingTime?: number;
  views?: number;
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
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Memoized clean excerpt
  const cleanExcerpt = useMemo(() => {
    return excerpt
      ? excerpt.replace(/<[^>]*>/g, "").substring(0, 120) + "..."
      : "Discover insights and valuable information in this post...";
  }, [excerpt]);

  // Memoized category
  const category = useMemo(() => {
    return categories?.nodes?.[0]?.name || "Islamic Insights";
  }, [categories]);

  // Memoized formatted date
  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [date]);

  // Performance optimization
  const isLCPCandidate = index < 3;

  // Optimized image URL handler
  const getOptimizedImageUrl = useCallback((url: string) => {
    if (!url) return "";
    // Add image optimization parameters if needed
    return url;
  }, []);

  // Close social menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSocialMenu) {
        setShowSocialMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSocialMenu]);

  // Animation delay based on index
  const animationDelay = useMemo(() => {
    return `${(index % 6) * 100}ms`;
  }, [index]);

  return (
    <article
      className="group relative max-w-[360px] bg-white dark:bg-gray-900 border-2 border-red-900/20 dark:border-red-800/30 rounded-xl hover:border-red-900/40 dark:hover:border-red-800/60 hover:shadow-[-8px_8px_0px_#991b1b] dark:hover:shadow-[-8px_8px_0px_#7f1d1d] transition-all duration-500 ease-out cursor-pointer mx-auto overflow-hidden"
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Overlay */}
      <div className="relative h-52 w-full bg-red-50 dark:bg-gray-800 overflow-hidden">
        <Link href={`/posts/${slug}`} className="block h-full">
          {featuredImage?.node?.sourceUrl && !imageError ? (
            <>
              // Line ~50 ke around Image component mein
              <Image
                src={getOptimizedImageUrl(featuredImage.node.sourceUrl)}
                alt={featuredImage.node.altText || title}
                fill
                className={`object-cover transition-all duration-700 ${
                  isHovered ? "scale-110 rotate-1" : "scale-100"
                }`}
                onError={() => setImageError(true)}
                onLoad={() => setImageLoading(false)}
                loading={isLCPCandidate ? "eager" : "lazy"}
                priority={isLCPCandidate}
                fetchPriority={isLCPCandidate ? "high" : "auto"} // ✅ YEH ADD KARO
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75} // ✅ 85 se 75 kar do
              />
              {/* Loading Skeleton */}
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse z-10 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4`}
              >
                <span className="text-white text-sm font-medium bg-red-900/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  Read Article
                </span>
              </div>
            </>
          ) : (
            // Fallback Image State
            <div className="flex items-center justify-center h-full bg-red-50 dark:bg-gray-800">
              <div className="text-center p-6">
                <ImageIcon className="w-12 h-12 text-red-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-red-400 dark:text-gray-400 text-sm font-medium">
                  {imageError ? "Image Loading Failed" : "Featured Image"}
                </p>
              </div>
            </div>
          )}
        </Link>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center bg-red-900 dark:bg-red-800 text-white text-xs px-3 py-1.5 rounded-full font-semibold backdrop-blur-sm shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readingTime} min read</span>
          </div>
          {views > 0 && (
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{views} views</span>
            </div>
          )}
        </div>

        {/* Title */}
        <Link href={`/posts/${slug}`}>
          <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white line-clamp-2 min-h-14 leading-tight group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-300">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[60px] leading-relaxed">
          {cleanExcerpt}
        </p>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          {/* Read More Link */}
          <Link
            href={`/posts/${slug}`}
            className="group/link inline-flex items-center font-semibold text-red-900 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 text-sm"
          >
            Continue Reading
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {/* Share Button */}
          <div className="relative">
            <button
              className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 transition-all duration-300 group/share"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowSocialMenu(!showSocialMenu);
              }}
              aria-label="Share this post"
            >
              <Share2 className="w-4 h-4 transform group-hover/share:scale-110 transition-transform" />
            </button>

            {/* Social Share Menu */}
            {showSocialMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-4 z-30 animate-in fade-in duration-200">
                <div className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Share this post
                </div>
                <SocialShareButtons
                  title={title}
                  slug={slug}
                  excerpt={cleanExcerpt}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-900/10 dark:group-hover:border-red-800/20 rounded-xl transition-all duration-500 pointer-events-none" />
    </article>
  );
};

export default React.memo(BlogItem);
