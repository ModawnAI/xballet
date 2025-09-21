// Mobile-first responsive utilities for XBallet
// Optimized for Korean mobile web app

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Mobile-first responsive classes
export const responsive = {
  // Container widths
  container: {
    mobile: 'w-full px-4',
    tablet: 'md:px-6',
    desktop: 'lg:px-8',
    maxWidth: 'max-w-7xl mx-auto',
  },
  
  // Grid layouts
  grid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3 xl:grid-cols-4',
  },
  
  // Spacing
  spacing: {
    mobile: 'space-y-4',
    tablet: 'md:space-y-6',
    desktop: 'lg:space-y-8',
  },
  
  // Typography scaling
  typography: {
    h1: {
      mobile: 'text-2xl',
      tablet: 'md:text-3xl',
      desktop: 'lg:text-4xl',
    },
    h2: {
      mobile: 'text-xl',
      tablet: 'md:text-2xl',
      desktop: 'lg:text-3xl',
    },
    body: {
      mobile: 'text-sm',
      tablet: 'md:text-base',
      desktop: 'lg:text-lg',
    },
  },
  
  // Navigation
  navigation: {
    mobile: 'fixed bottom-0 left-0 right-0',
    tablet: 'md:relative md:bottom-auto md:left-auto md:right-auto',
  },
  
  // Video player
  video: {
    mobile: 'aspect-[9/16] w-full',
    tablet: 'md:aspect-video md:max-w-md',
    desktop: 'lg:aspect-video lg:max-w-lg',
  },
} as const;

// Utility function to combine responsive classes
export function combineResponsive(
  base: string,
  mobile?: string,
  tablet?: string,
  desktop?: string
): string {
  return [base, mobile, tablet, desktop].filter(Boolean).join(' ');
}

// Mobile-specific utilities
export const mobile = {
  // Touch-friendly button sizes
  button: {
    sm: 'h-10 min-w-[44px]', // Minimum touch target
    base: 'h-12 min-w-[44px]',
    lg: 'h-14 min-w-[44px]',
  },
  
  // Safe area padding for mobile devices
  safeArea: {
    top: 'pt-safe-top',
    bottom: 'pb-safe-bottom',
    left: 'pl-safe-left',
    right: 'pr-safe-right',
    all: 'pt-safe-top pb-safe-bottom pl-safe-left pr-safe-right',
  },
  
  // Mobile navigation height
  navHeight: 'h-16',
  
  // Mobile content padding
  contentPadding: 'px-4 pb-20', // Extra bottom padding for fixed nav
} as const;

// Korean text specific responsive adjustments
export const koreanResponsive = {
  // Line height adjustments for different screen sizes
  lineHeight: {
    mobile: 'leading-relaxed', // More breathing room on mobile
    tablet: 'md:leading-normal',
    desktop: 'lg:leading-tight',
  },
  
  // Font size scaling for Korean readability
  fontSize: {
    mobile: 'text-base', // Slightly larger for mobile readability
    tablet: 'md:text-base',
    desktop: 'lg:text-sm', // Can be smaller on desktop
  },
} as const;
