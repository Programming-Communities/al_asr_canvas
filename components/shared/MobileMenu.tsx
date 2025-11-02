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
  Bookmark
} from 'lucide-react';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
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
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowSearch(false);
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

  return (
    <>
      {/* Enhanced Menu Button with Notification Dot */}
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
        
        {/* Notification Dot for New Features */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-2xl border-2 border-red-400/50 group-hover:border-red-300/70 transition-all duration-300" />
      </button>

      {/* Premium Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Glass Morphism Backdrop with Blur */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
            onClick={closeMenu}
          />
          
          {/* Premium Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-84 bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-l border-gray-600/50 transform transition-transform duration-500 ease-out overflow-hidden">
            
            {/* Header with Premium Gradient */}
            <div className="relative p-6 bg-linear-to-r from-red-600 via-red-700 to-red-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white text-lg">🕌</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Al-Asr</h2>
                    <p className="text-red-100 text-sm">Islamic Service</p>
                  </div>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-white hover:bg-white/20 rounded-xl transition-all duration-200 transform hover:scale-110 min-w-10 min-h-10 flex items-center justify-center backdrop-blur-sm"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Decorative Wave */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-transparent via-white/40 to-transparent" />
            </div>

            {/* User Status Bar */}
            <div className="px-6 py-3 bg-gray-800/80 border-b border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Online</span>
                </div>
                <div className="text-gray-400">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-sm font-semibold text-gray-400 mb-3 px-2">Quick Access</h3>
              <div className="grid grid-cols-4 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.name}
                    href={action.href}
                    onClick={closeMenu}
                    className="flex flex-col items-center p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-200 group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg ${action.color} group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="text-xs text-gray-300 mt-1 text-center leading-tight">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Enhanced Search Section */}
            <div className="p-4 border-b border-gray-700">
              <div 
                className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl border border-gray-600 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setShowSearch(!showSearch)}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg group-hover:bg-red-700 transition-colors">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Search Islamic Content</p>
                  <p className="text-gray-400 text-sm">Quran, Hadith, Articles</p>
                </div>
                <div className={`transform transition-transform duration-300 ${
                  showSearch ? 'rotate-180' : ''
                }`}>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Animated Search Bar */}
              {showSearch && (
                <div className="mt-3 animate-in fade-in duration-300">
                  <SearchBar onSearch={closeMenu} compact />
                </div>
              )}
            </div>

            {/* Premium Navigation Links */}
            <nav className="p-4 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isActiveLink(item.href);
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenu}
                      className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-h-14 ${
                        isActive 
                          ? 'bg-red-600/20 text-white border-red-500/30 scale-105 shadow-lg' 
                          : 'text-gray-300 hover:text-white bg-gray-800 hover:bg-linear-to-r hover:from-red-600/20 hover:to-red-700/20 border-gray-700 hover:border-red-500/30'
                      }`}
                    >
                      {/* Icon Container */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-red-600 scale-110' 
                          : 'bg-gray-700 group-hover:bg-red-600'
                      } ${item.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1 flex items-center justify-between">
                        <span className="font-medium text-lg">{item.name}</span>
                        {item.badge && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
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
                        className={`w-4 h-4 transform transition-all duration-300 ${
                          isActive ? 'text-red-400 scale-110' : 'text-gray-500 group-hover:text-red-400 group-hover:translate-x-1'
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
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-red-400 rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Premium Footer with Actions */}
            <div className="p-4 border-t border-gray-700 bg-gray-800/80 backdrop-blur-lg">
              
              {/* App Actions */}
              <div className="flex justify-between mb-4">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={shareApp}
                  className="flex items-center gap-2 p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Share app"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {!isPWA && deferredPrompt && (
                  <button
                    onClick={handleInstallPWA}
                    className="flex items-center gap-2 p-2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Install app"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                )}

                <button
                  className="flex items-center gap-2 p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Bookmark"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-3 mb-4">
                {[
                  { icon: '📘', label: 'Facebook', color: 'hover:bg-blue-500' },
                  { icon: '📷', label: 'Instagram', color: 'hover:bg-pink-500' },
                  { icon: '📱', label: 'WhatsApp', color: 'hover:bg-green-500' },
                  { icon: '📺', label: 'YouTube', color: 'hover:bg-red-500' }
                ].map((social) => (
                  <button
                    key={social.label}
                    className={`w-8 h-8 bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${social.color}`}
                    aria-label={social.label}
                  >
                    <span className="text-sm">{social.icon}</span>
                  </button>
                ))}
              </div>
              
              {/* Made with Love */}
              <div className="text-center pt-3 border-t border-gray-700">
                <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                  Made with <Heart className="w-3 h-3 text-red-400 fill-current" /> by{' '}
                  <a 
                    href="https://programming.communities.pk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    Programming Communities
                  </a>
                </p>
                <p className="text-gray-600 text-xs mt-1">v1.0.0 • PWA Ready</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;