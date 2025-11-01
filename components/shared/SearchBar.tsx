'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  // Mock search function - replace with actual API call
  const searchPosts = async (query: string): Promise<string[]> => {
    if (!query.trim()) return [];
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock data - replace with actual search from WordPress
    const mockPosts = [
      'Islamic Calendar Events',
      'Ramadan Schedule 2025',
      'Friday Prayer Times',
      'Quran Learning Classes',
      'Islamic Community Programs',
      'Eid ul Fitr Celebration',
      'Hajj Preparation Guide',
      'Islamic History Lectures'
    ];
    
    return mockPosts.filter(post => 
      post.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }
      
      const results = await searchPosts(query);
      setSuggestions(results);
      setShowSuggestions(true);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white text-gray-900 dark:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-600"
        >
          🔍
        </button>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-900 dark:text-gray-900 border-b border-gray-200 dark:border-gray-300 last:border-b-0"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && searchQuery.length >= 2 && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50 p-4">
          <p className="text-gray-600 dark:text-gray-600 text-center">
            No results found for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;