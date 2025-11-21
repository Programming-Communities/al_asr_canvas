// components/shared/AccessibilityFix.tsx
'use client'
import { useEffect } from 'react'

export default function AccessibilityFix() {
  useEffect(() => {
    // Fix contrast issues dynamically
    const fixContrast = () => {
      const buttons = document.querySelectorAll('button, a');
      buttons.forEach(btn => {
        if (btn.classList.contains('bg-red-600')) {
          btn.classList.remove('bg-red-600');
          btn.classList.add('bg-red-700');
        }
        if (btn.classList.contains('hover:bg-red-700')) {
          btn.classList.remove('hover:bg-red-700');
          btn.classList.add('hover:bg-red-800');
        }
      });
    };

    fixContrast();
    // Re-check after DOM changes
    const observer = new MutationObserver(fixContrast);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  return null;
}