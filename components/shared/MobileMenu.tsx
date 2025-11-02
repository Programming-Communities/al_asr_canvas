'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { 
  X, 
  Search, 
  Home, 
  Info, 
  Settings, 
  Mail, 
  BookOpen, 
  Calendar,
  Users,
  GraduationCap,
  Heart,
  Sparkles,
  Moon,
  Sun,
  Share2,
  Download,
  Bookmark,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [menuScrollTop, setMenuScrollTop] = useState(0);
  const pathname = usePathname();

  // Check if PWA is installed
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    // Check if app is running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const menuItems = [
    { name: 'Home', href: '/', icon: Home, color: 'text-blue-400', badge: null },
    { name: 'About', href: '/about', icon: Info, color: 'text-emerald-400', badge: null },
    { name: 'Services', href: '/services', icon: Settings, color: 'text-purple-400', badge: 'New' },
    { name: 'Events', href: '/events', icon: Sparkles, color: 'text-amber-400', badge: 'Soon' },
    { name: 'Islamic Calendar', href: '/islamic-calendar', icon: Calendar, color: 'text-orange-400', badge: null },
    { name: 'Quran Classes', href: '/quran-classes', icon: BookOpen, color: 'text-cyan-400', badge: null },
    { name: 'Religious Guidance', href: '/religious-guidance', icon: GraduationCap, color: 'text-yellow-400', badge: null },
    { name: 'Community Programs', href: '/community-programs', icon: Users, color: 'text-pink-400', badge: 'Soon' },
    { name: 'Funeral Services', href: '/funeral-services', icon: Heart, color: 'text-red-400', badge: null },
    { name: 'Contact', href: '/contact', icon: Mail, color: 'text-indigo-400', badge: null },
  ];

  const quickActions = [
    { name: 'Prayer Times', href: '/prayer-times', icon: '🕋', color: 'bg-green-500' },
    { name: 'Islamic Calendar', href: '/islamic-calendar', icon: '📅', color: 'bg-orange-500' },
    { name: 'Quran Reading', href: '/quran-classes', icon: '📖', color: 'bg-blue-500' },
    { name: 'Donate', href: '/donate', icon: '💰', color: 'bg-emerald-500' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowSearch(false);
      setMenuScrollTop(0);
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowSearch(false);
    setMenuScrollTop(0);
    document.body.style.overflow = 'auto';
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
  };

  const shareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Al-Asr Islamic Service',
          text: 'Discover Islamic services, events, and community programs',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const handleMenuScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    setMenuScrollTop(scrollTop);
    setShowScrollTop(scrollTop > 100);
  };

  const scrollToTop = () => {
    const menuContent = document.getElementById('menu-content');
    if (menuContent) {
      menuContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    const menuContent = document.getElementById('menu-content');
    if (menuContent) {
      menuContent.scrollTo({ top: menuContent.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Enhanced Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative p-3 rounded-2xl bg-linear-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl min-w-12 min-h-12 flex items-center justify-center group"
        aria-label="Toggle menu"
      >
        {/* Animated Hamburger Icon */}
        <div className="relative w-6 h-6">
          <span className={`absolute top-1 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isOpen ? 'rotate-45 top-3' : ''
          }`} />
          <span className={`absolute top-3 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`} />
          <span className={`absolute top-5 left-0 w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${
            isOpen ? '-rotate-45 top-3' : ''
          }`} />
        </div>
        
        {/* Notification Dot */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-2xl border-2 border-red-400/50 group-hover:border-red-300/70 transition-all duration-300" />
      </button>

      {/* Premium Menu Overlay - Perfect Mobile Fit */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Glass Morphism Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
            onClick={closeMenu}
          />
          
          {/* Mobile-Optimized Menu Panel */}
          <div className="absolute inset-0 flex flex-col bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl">
            
            {/* Header - Fixed at Top */}
            <div className="relative p-4 bg-linear-to-r from-red-600 via-red-700 to-red-600 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-sm">🕌</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Al-Asr</h2>
                    <p className="text-red-100 text-xs">Islamic Service</p>
                  </div>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 transform hover:scale-110 min-w-8 min-h-8 flex items-center justify-center backdrop-blur-sm"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div 
              id="menu-content"
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
              onScroll={handleMenuScroll}
            >
              {/* User Status Bar */}
              <div className="px-4 py-2 bg-gray-800/80 border-b border-gray-700">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-gray-300">Online • Mobile</span>
                  </div>
                  <div className="text-gray-400">
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              {/* Quick Actions Grid - Compact */}
              <div className="p-3 border-b border-gray-700">
                <h3 className="text-xs font-semibold text-gray-400 mb-2 px-1">Quick Access</h3>
                <div className="grid grid-cols-4 gap-1">
                  {quickActions.map((action) => (
                    <Link
                      key={action.name}
                      href={action.href}
                      onClick={closeMenu}
                      className="flex flex-col items-center p-1 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 group"
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-sm ${action.color} group-hover:scale-110 transition-transform`}>
                        {action.icon}
                      </div>
                      <span className="text-[10px] text-gray-300 mt-1 text-center leading-tight">{action.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Enhanced Search Section */}
              <div className="p-3 border-b border-gray-700">
                <div 
                  className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg border border-gray-600 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-red-600 rounded group-hover:bg-red-700 transition-colors">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">Search Content</p>
                    <p className="text-gray-400 text-xs">Quran, Hadith, Articles</p>
                  </div>
                  <div className={`transform transition-transform duration-300 ${
                    showSearch ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Animated Search Bar */}
                {showSearch && (
                  <div className="mt-2 animate-in fade-in duration-300">
                    <SearchBar onSearch={closeMenu} compact />
                  </div>
                )}
              </div>

              {/* Premium Navigation Links - Optimized for Mobile */}
              <nav className="p-3">
                <div className="space-y-1">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = isActiveLink(item.href);
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMenu}
                        className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 min-h-12 ${
                          isActive 
                            ? 'bg-red-600/20 text-white border-red-500/30 shadow-md' 
                            : 'text-gray-300 hover:text-white bg-gray-800 hover:bg-linear-to-r hover:from-red-600/20 hover:to-red-700/20 border-gray-700 hover:border-red-500/30'
                        }`}
                      >
                        {/* Icon Container */}
                        <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? 'bg-red-600 scale-105' 
                            : 'bg-gray-700 group-hover:bg-red-600'
                        } ${item.color}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        
                        {/* Text Content */}
                        <div className="flex-1 flex items-center justify-between">
                          <span className="font-medium text-sm">{item.name}</span>
                          {item.badge && (
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                              item.badge === 'New' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-amber-500 text-white'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                        
                        {/* Animated Arrow */}
                        <svg
                          className={`w-3 h-3 transform transition-all duration-300 ${
                            isActive ? 'text-red-400' : 'text-gray-500 group-hover:text-red-400 group-hover:translate-x-0.5'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>

                        {/* Active Indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0.5 h-4 bg-red-400 rounded-r-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>

              {/* Scroll Spacer */}
              <div className="h-4" />
            </div>

            {/* Scroll Buttons - Fixed Position */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="absolute right-4 top-20 w-8 h-8 bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 z-10"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={scrollToBottom}
              className="absolute right-4 top-32 w-8 h-8 bg-gray-700/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-all duration-300 transform hover:scale-110 z-10"
              aria-label="Scroll to bottom"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Footer - Fixed at Bottom */}
            <div className="p-3 border-t border-gray-700 bg-gray-800/80 backdrop-blur-lg shrink-0">
              
              {/* App Actions - Compact */}
              <div className="flex justify-around mb-3">
                <button
                  onClick={toggleDarkMode}
                  className="flex flex-col items-center gap-1 p-1 text-gray-400 hover:text-white transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                  <span className="text-[10px]">Theme</span>
                </button>

                <button
                  onClick={shareApp}
                  className="flex flex-col items-center gap-1 p-1 text-gray-400 hover:text-white transition-colors"
                  aria-label="Share app"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-[10px]">Share</span>
                </button>

                {!isPWA && deferredPrompt && (
                  <button
                    onClick={handleInstallPWA}
                    className="flex flex-col items-center gap-1 p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Install app"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-[10px]">Install</span>
                  </button>
                )}

                <button
                  className="flex flex-col items-center gap-1 p-1 text-gray-400 hover:text-white transition-colors"
                  aria-label="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="text-[10px]">Save</span>
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-2 mb-3">
                {[
                  { icon: '📘', label: 'Facebook' },
                  { icon: '📷', label: 'Instagram' },
                  { icon: '📱', label: 'WhatsApp' },
                  { icon: '📺', label: 'YouTube' }
                ].map((social) => (
                  <button
                    key={social.label}
                    className="w-6 h-6 bg-gray-700 rounded text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center text-xs"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
              
              {/* Made with Love */}
              <div className="text-center pt-2 border-t border-gray-700">
                <p className="text-gray-500 text-[10px] flex items-center justify-center gap-1">
                  Made with <Heart className="w-2 h-2 text-red-400 fill-current" /> by{' '}
                  <a 
                    href="https://programming.communities.pk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    PC
                  </a>
                </p>
                <p className="text-gray-600 text-[8px] mt-0.5">v1.0.0 • PWA Ready</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;