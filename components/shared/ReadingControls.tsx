'use client';
import React, { useState, useEffect } from 'react';

// Simple emoji-based icons to avoid HMR issues and TypeScript errors
const Icons = {
  ZoomIn: '🔍',
  ZoomOut: '🔎', 
  Type: '📝',
  Sun: '☀️',
  Moon: '🌙',
  Settings: '⚙️',
  X: '❌',
  BookOpen: '📖',
};

interface ReadingControlsProps {
  onFontSizeChange?: (size: number) => void;
  onThemeChange?: (theme: 'light' | 'dark') => void;
  currentFontSize?: number;
  currentTheme?: 'light' | 'dark';
}

const ReadingControls: React.FC<ReadingControlsProps> = ({
  onFontSizeChange,
  onThemeChange,
  currentFontSize = 100,
  currentTheme = 'light'
}) => {
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [isOpen, setIsOpen] = useState(false);
  const [readingTheme, setReadingTheme] = useState<'light' | 'dark'>(currentTheme);
  const [autoCloseTimer, setAutoCloseTimer] = useState<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Sync with parent component when props change
  useEffect(() => {
    setFontSize(currentFontSize);
  }, [currentFontSize]);

  useEffect(() => {
    setReadingTheme(currentTheme);
  }, [currentTheme]);

  // Scroll detection for professional appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fontSizes = [
    { label: 'A', value: 80, level: 'XS' },
    { label: 'A', value: 90, level: 'S' },
    { label: 'A', value: 100, level: 'M' },
    { label: 'A+', value: 115, level: 'L' },
    { label: 'A++', value: 130, level: 'XL' },
    { label: 'A+++', value: 150, level: 'XXL' }
  ];

  // Auto close after 8 seconds of inactivity
  const startAutoCloseTimer = () => {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 8000);
    setAutoCloseTimer(timer);
  };

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(newSize);
    onFontSizeChange?.(newSize);
    localStorage.setItem('readingFontSize', newSize.toString());
    startAutoCloseTimer();
  };

  const handleThemeToggle = () => {
    const newTheme = readingTheme === 'light' ? 'dark' : 'light';
    setReadingTheme(newTheme);
    onThemeChange?.(newTheme);
    localStorage.setItem('readingTheme', newTheme);
    startAutoCloseTimer();
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.findIndex(size => size.value === fontSize);
    if (currentIndex > 0) {
      handleFontSizeChange(fontSizes[currentIndex - 1].value);
    }
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.findIndex(size => size.value === fontSize);
    if (currentIndex < fontSizes.length - 1) {
      handleFontSizeChange(fontSizes[currentIndex + 1].value);
    }
  };

  const toggleControls = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      startAutoCloseTimer();
    } else if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
  };

  const closeControls = () => {
    setIsOpen(false);
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
  };

  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem('readingFontSize');
    const savedTheme = localStorage.getItem('readingTheme') as 'light' | 'dark';
    
    if (savedFontSize && !currentFontSize) {
      const size = Number(savedFontSize);
      setFontSize(size);
      onFontSizeChange?.(size);
    }
    if (savedTheme && !currentTheme) {
      setReadingTheme(savedTheme);
      onThemeChange?.(savedTheme);
    }
  }, [currentFontSize, currentTheme, onFontSizeChange, onThemeChange]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [autoCloseTimer]);

  const currentFontSizeObj = fontSizes.find(size => size.value === fontSize) || fontSizes[2];

  return (
    <div className={`fixed right-4 z-100 transition-all duration-500 ${
      isScrolled ? 'bottom-4 scale-95' : 'bottom-6 scale-100'
    }`}>
      {/* Professional Controls Panel */}
      {isOpen && (
        <div 
          className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-4 mb-3 animate-in fade-in duration-300 slide-in-from-bottom-4 max-w-xs"
          onMouseEnter={() => {
            if (autoCloseTimer) clearTimeout(autoCloseTimer);
          }}
          onMouseLeave={startAutoCloseTimer}
        >
          {/* Professional Header */}
          <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200/60 dark:border-gray-700/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-linear-to-br from-red-500 to-red-600 rounded-lg">
                <span className="text-white text-sm">{Icons.BookOpen}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Reading Mode
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Customize reading
                </p>
              </div>
            </div>
            <button
              onClick={closeControls}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 group"
              aria-label="Close reading settings"
            >
              <span className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 text-sm">
                {Icons.X}
              </span>
            </button>
          </div>

          {/* Font Size Section */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Font Size
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">
                  {currentFontSizeObj.level}
                </span>
              </div>
            </div>
            
            {/* Professional Font Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === fontSizes[0].value}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium text-gray-700 dark:text-gray-300 min-w-16 justify-center"
                  aria-label="Decrease font size"
                >
                  <span className="text-xs">{Icons.ZoomOut}</span>
                  Smaller
                </button>

                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === fontSizes[fontSizes.length - 1].value}
                  className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-xs font-medium text-gray-700 dark:text-gray-300 min-w-16 justify-center"
                  aria-label="Increase font size"
                >
                  Larger
                  <span className="text-xs">{Icons.ZoomIn}</span>
                </button>
              </div>

              {/* Professional Size Indicators */}
              <div className="grid grid-cols-6 gap-1 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-1">
                {fontSizes.map((size, index) => (
                  <button
                    key={size.value}
                    onClick={() => handleFontSizeChange(size.value)}
                    className={`p-1.5 rounded-md text-xs font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-0.5 ${
                      fontSize === size.value
                        ? 'bg-red-500 text-white shadow scale-105'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 hover:scale-105'
                    }`}
                    aria-label={`Set font size to ${size.level}`}
                  >
                    <span className="text-[10px]">{size.label}</span>
                    <span className="text-[6px] opacity-70">{size.level}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theme Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Theme
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {readingTheme} Mode
              </span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleThemeToggle()}
                className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg border transition-all duration-300 ${
                  readingTheme === 'light'
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-xs">{Icons.Sun}</span>
                <span className="text-xs font-medium">Light</span>
              </button>
              
              <button
                onClick={() => handleThemeToggle()}
                className={`flex-1 flex items-center justify-center gap-1 p-2 rounded-lg border transition-all duration-300 ${
                  readingTheme === 'dark'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <span className="text-xs">{Icons.Moon}</span>
                <span className="text-xs font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-4 pt-3 border-t border-gray-200/60 dark:border-gray-700/60">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Auto-closes in 8s</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleFontSizeChange(100)}
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs"
                >
                  Reset
                </button>
                <button
                  onClick={closeControls}
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors text-xs"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Main Toggle Button - ALWAYS VISIBLE */}
      <button
        onClick={toggleControls}
        className={`group relative transition-all duration-300 ${
          isScrolled 
            ? 'scale-90 shadow-lg' 
            : 'scale-100 shadow-xl'
        } ${
          isOpen 
            ? 'bg-linear-to-br from-red-600 to-red-700 rotate-90 scale-105' 
            : 'bg-linear-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
        } rounded-xl p-3 text-white backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95`}
        aria-label={isOpen ? "Close reading settings" : "Open reading settings"}
        style={{
          // Ensure it's always visible
          opacity: 1,
          visibility: 'visible',
          display: 'flex'
        }}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isOpen ? (
            <span className="text-base animate-spin-once">{Icons.Settings}</span>
          ) : (
            <span className="text-base">{Icons.BookOpen}</span>
          )}
          
          {/* Active Settings Indicator */}
          {(fontSize !== 100 || readingTheme !== 'light') && !isOpen && (
            <div className="absolute -top-1 -right-1">
              <div className="relative">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75" />
                <div className="absolute top-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-900" />
              </div>
            </div>
          )}
        </div>

        {/* Hover Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
              Reading Settings
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
            </div>
          </div>
        )}
      </button>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes spin-once {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(90deg); }
        }
        .animate-spin-once {
          animation: spin-once 0.3s ease-in-out;
        }
        
        /* Ensure button is always visible */
        .reading-controls-button {
          opacity: 1 !important;
          visibility: visible !important;
          display: flex !important;
        }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default ReadingControls;