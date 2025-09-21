"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Play, Plus } from 'lucide-react';
import { KoreanText } from './korean-text';

interface MobileFABProps {
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MobileFAB({ 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className 
}: MobileFABProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed bottom-20 right-4 z-40 rounded-full mobile-fab mobile-touch",
        "flex items-center justify-center",
        sizeClasses[size],
        variant === 'primary' 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        className
      )}
    >
      <Play size={iconSizes[size]} />
    </button>
  );
}

// Quick Action Menu Component
export function QuickActionMenu({ 
  isOpen, 
  onClose, 
  actions 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  actions: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: string | number; className?: string }>;
    onClick: () => void;
  }>;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div className="fixed bottom-20 right-4 space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => {
                action.onClick();
                onClose();
              }}
              className={cn(
                "flex items-center space-x-3 bg-background rounded-full px-4 py-3 shadow-lg",
                "hover:bg-muted transition-all duration-200 animate-in slide-in-from-bottom-2",
                "min-w-[200px]"
              )}
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon size={16} className="text-primary" />
              </div>
              <KoreanText size="sm" weight="medium">
                {action.label}
              </KoreanText>
            </button>
          );
        })}
      </div>
    </div>
  );
}
