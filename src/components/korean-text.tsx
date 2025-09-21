import React from 'react';
import { cn } from '@/lib/utils';

interface KoreanTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  lineHeight?: 'tight' | 'normal' | 'relaxed';
  letterSpacing?: 'tight' | 'normal' | 'wide';
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'label';
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const lineHeightClasses = {
  tight: 'leading-tight',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
};

const letterSpacingClasses = {
  tight: 'tracking-tight',
  normal: 'tracking-normal',
  wide: 'tracking-wide',
};

export function KoreanText({
  children,
  className,
  size = 'base',
  weight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  as: Component = 'p',
}: KoreanTextProps) {
  return (
    <Component
      className={cn(
        // Base Korean text styling
        'font-sans',
        // Size
        sizeClasses[size],
        // Weight
        weightClasses[weight],
        // Line height (optimized for Korean)
        lineHeightClasses[lineHeight],
        // Letter spacing (optimized for Korean)
        letterSpacingClasses[letterSpacing],
        // Custom classes
        className
      )}
    >
      {children}
    </Component>
  );
}

// Specialized Korean text components
export function KoreanHeading({
  children,
  className,
  level = 1,
}: {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const Component = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  const sizeMap = {
    1: '4xl' as const,
    2: '3xl' as const,
    3: '2xl' as const,
    4: 'xl' as const,
    5: 'lg' as const,
    6: 'base' as const,
  };

  return (
    <KoreanText
      as={Component}
      size={sizeMap[level]}
      weight="bold"
      lineHeight="tight"
      className={cn('text-foreground', className)}
    >
      {children}
    </KoreanText>
  );
}

export function KoreanBody({
  children,
  className,
  size = 'base',
}: {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
}) {
  return (
    <KoreanText
      size={size}
      weight="normal"
      lineHeight="relaxed"
      className={cn('text-muted-foreground', className)}
    >
      {children}
    </KoreanText>
  );
}

export function KoreanLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <KoreanText
      as="label"
      size="sm"
      weight="medium"
      className={cn('text-foreground', className)}
    >
      {children}
    </KoreanText>
  );
}
