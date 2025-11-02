'use client';
import React, { useState } from 'react';
import Link from 'next/link';
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
  Sparkles // ✅ ADD THIS ICON FOR EVENTS
} from 'lucide-react';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/', icon: Home, color: 'text-blue-500' },
    { name: 'About', href: '/about', icon: Info, color: 'text-green-500' },
    { name: 'Services', href: '/services', icon: Settings, color: 'text-purple-500' },
    { name: 'Events', href: '/events', icon: Sparkles, color: 'text-indigo-500' }, // ✅ ADDED EVENTS
    { name: 'Islamic Calendar', href: '/islamic-calendar', icon: Calendar, color: 'text-orange-500' },
    { name: 'Quran Classes', href: '/quran-classes', icon: BookOpen, color: 'text-cyan-500' },
    { name: 'Religious Guidance', href: '/religious-guidance', icon: GraduationCap, color: 'text-yellow-500' },
    { name: 'Community Programs', href: '/community-programs', icon: Users, color: 'text-pink-500' },
    { name: 'Funeral Services', href: '/funeral-services', icon: Heart, color: 'text-red-500' },
    { name: 'Contact', href: '/contact', icon: Mail, color: 'text-gray-400' },
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

  return (
    <>
      {/* Modern Menu Button */}
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
        
        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-2xl border-2 border-red-400/30 group-hover:border-red-300/50 transition-all duration-300" />
      </button>

      {/* Modern Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Glass Morphism Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Modern Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-l border-gray-700 transform transition-transform duration-500 ease-out">
            {/* Header with Gradient */}
            <div className="relative p-6 bg-linear-to-r from-red-600 to-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Navigation</h2>
                  <p className="text-red-100 text-sm mt-1">Al-Asr Islamic Service</p>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 text-white hover:bg-white/20 rounded-xl transition-all duration-200 transform hover:scale-110 min-w-10 min-h-10 flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-white/30 to-transparent" />
            </div>

            {/* Search Section */}
            <div className="p-6 border-b border-gray-700">
              <div 
                className="flex items-center gap-3 p-4 bg-gray-800 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => setShowSearch(!showSearch)}
              >
                <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-xl group-hover:bg-red-700 transition-colors">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Search Posts</p>
                  <p className="text-gray-400 text-sm">Find Islamic content</p>
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
                <div className="mt-4 animate-in fade-in duration-300">
                  <SearchBar onSearch={closeMenu} compact />
                </div>
              )}
            </div>

            {/* Navigation Links with Icons */}
            <nav className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMenu}
                      className="group relative flex items-center gap-4 p-4 text-gray-300 hover:text-white bg-gray-800 hover:bg-linear-to-r hover:from-red-600/20 hover:to-red-700/20 rounded-2xl border border-gray-700 hover:border-red-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg min-h-14"
                    >
                      {/* Icon Container */}
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gray-700 group-hover:bg-red-600 transition-all duration-300 ${item.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      {/* Text Content */}
                      <div className="flex-1">
                        <span className="font-medium text-lg">{item.name}</span>
                      </div>
                      
                      {/* Animated Arrow */}
                      <svg
                        className="w-4 h-4 text-gray-500 group-hover:text-red-400 transform group-hover:translate-x-1 transition-all duration-300"
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

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-500/20 transition-all duration-300" />
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer with Social Links */}
            <div className="p-6 border-t border-gray-700 bg-gray-800/50">
              <div className="text-center mb-4">
                <p className="text-gray-400 text-sm mb-3">
                  Connect with us
                </p>
                <div className="flex justify-center space-x-3">
                  {[
                    { icon: '📘', label: 'Facebook', color: 'hover:bg-blue-500' },
                    { icon: '🐦', label: 'Twitter', color: 'hover:bg-sky-500' },
                    { icon: '📷', label: 'Instagram', color: 'hover:bg-pink-500' },
                    { icon: '📱', label: 'WhatsApp', color: 'hover:bg-green-500' }
                  ].map((social) => (
                    <button
                      key={social.label}
                      className={`w-10 h-10 bg-gray-700 rounded-xl text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${social.color}`}
                      aria-label={social.label}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Made with Love */}
              <div className="text-center pt-4 border-t border-gray-700">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;