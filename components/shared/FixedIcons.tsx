// components/shared/FixedIcons.tsx
export const FixedIcons = {
  // Fixed Search Icon
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      {...props}
    >
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.3-4.3"/>
    </svg>
  ),
  
  // Fixed Menu Icon
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  
  // Fixed Close Icon
  X: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      {...props}
    >
      <line x1="18" x2="6" y1="6" y2="18"/>
      <line x1="6" x2="18" y1="6" y2="18"/>
    </svg>
  ),
  
  // Fixed Chevron Icons
  ChevronUp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      {...props}
    >
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  ),
  
  ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
      {...props}
    >
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
};