// components/shared/ContrastFix.tsx
'use client'
import { useEffect } from 'react'

export default function ContrastFix() {
  useEffect(() => {
    // Fix all red button contrast issues
    const fixButtonContrast = () => {
      const elements = document.querySelectorAll('*');
      
      elements.forEach(element => {
        // Fix bg-red-600 to bg-red-700
        if (element.classList.contains('bg-red-600')) {
          element.classList.remove('bg-red-600');
          element.classList.add('bg-red-700');
        }
        
        // Fix hover:bg-red-700 to hover:bg-red-800
        if (element.classList.contains('hover:bg-red-700')) {
          element.classList.remove('hover:bg-red-700');
          element.classList.add('hover:bg-red-800');
        }
      });
    };

    // Run on mount and after DOM changes
    fixButtonContrast();
    const observer = new MutationObserver(fixButtonContrast);
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return null;
}