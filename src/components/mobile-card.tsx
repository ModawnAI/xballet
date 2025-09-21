"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './ui/card';

interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'elevated' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
}

export function MobileCard({ 
  children, 
  className, 
  onClick,
  variant = 'default',
  size = 'md'
}: MobileCardProps) {
  const variantClasses = {
    default: 'bg-card border border-border',
    elevated: 'bg-card shadow-md border-0',
    outlined: 'bg-transparent border-2 border-border',
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <Card 
      className={cn(
        "transition-all duration-200 mobile-card-enter",
        "hover:shadow-lg mobile-button-press",
        variantClasses[variant],
        sizeClasses[size],
        onClick && "cursor-pointer hover:bg-muted/50 mobile-touch",
        className
      )}
      onClick={onClick}
    >
      <CardContent className={cn("p-0", sizeClasses[size])}>
        {children}
      </CardContent>
    </Card>
  );
}

// Mobile Feature Card Component
export function MobileFeatureCard({
  icon: Icon,
  title,
  description,
  onClick,
  className
}: {
  icon: React.ComponentType<{ className?: string; size?: string | number }>;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <MobileCard 
      onClick={onClick}
      variant="elevated"
      size="md"
      className={cn("group", className)}
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon size={24} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground text-sm mb-1 truncate">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs leading-relaxed">
            {description}
          </p>
        </div>
        {onClick && (
          <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-muted-foreground" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </MobileCard>
  );
}

// Mobile Difficulty Button Component
export function MobileDifficultyButton({
  level,
  isSelected,
  onClick,
  className
}: {
  level: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 h-14 rounded-xl border-2 transition-all duration-200",
        "hover:scale-105 active:scale-95",
        "flex flex-col items-center justify-center space-y-1",
        isSelected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-foreground hover:border-primary/50",
        className
      )}
    >
      <span className="text-sm font-medium">{level}</span>
      <div className={cn(
        "w-2 h-2 rounded-full transition-all duration-200",
        isSelected ? "bg-primary" : "bg-muted"
      )} />
    </button>
  );
}
