"use client";

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Play, 
  BookOpen, 
  ShoppingBag, 
  User,
  Menu,
  X
} from 'lucide-react';
import { KoreanText } from './korean-text';

interface MobileNavigationProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navigationItems = [
  {
    id: 'home',
    label: '홈',
    icon: Home,
    href: '/',
  },
  {
    id: 'ai-classes',
    label: 'AI 클래스',
    icon: Play,
    href: '/ai-classes',
  },
  {
    id: 'technique',
    label: '테크닉',
    icon: BookOpen,
    href: '/technique',
  },
  {
    id: 'videos',
    label: '동작 DB',
    icon: BookOpen,
    href: '/videos',
  },
  {
    id: 'profile',
    label: '프로필',
    icon: User,
    href: '/profile',
  },
];

export function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Determine active tab from current path - this is the source of truth
  const getCurrentTab = () => {
    if (pathname === '/') return 'home';
    if (pathname === '/ai-classes') return 'ai-classes';
    if (pathname === '/technique') return 'technique';
    if (pathname === '/videos') return 'videos';
    if (pathname === '/shop') return 'shop';
    if (pathname === '/profile') return 'profile';
    if (pathname === '/landing') return 'home'; // Landing page maps to home tab
    return 'home';
  };

  // Always use pathname-based detection for consistency
  const currentActiveTab = getCurrentTab();

  const handleTabClick = (tabId: string) => {
    const targetRoute = navigationItems.find(item => item.id === tabId)?.href;
    if (targetRoute) {
      router.push(targetRoute);
    }
    onTabChange?.(tabId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Bottom Tab Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50 mobile-safe-bottom">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActiveTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 mobile-touch",
                  "hover:bg-muted/50 mobile-button-press",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="relative">
                  <Icon 
                    size={20} 
                    className=""
                  />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
                <KoreanText 
                  size="sm" 
                  weight={isActive ? "medium" : "normal"}
                  className={cn(
                    "transition-all duration-200",
                    isActive && "scale-105"
                  )}
                >
                  {item.label}
                </KoreanText>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hamburger Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <KoreanText size="lg" weight="bold">메뉴</KoreanText>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentActiveTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={cn(
                      "w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                      "hover:bg-muted active:scale-95",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon size={20} />
                    <KoreanText weight={isActive ? "medium" : "normal"}>
                      {item.label}
                    </KoreanText>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Mobile Header Component
export function MobileHeader({ 
  title, 
  showMenu = false, 
  onMenuClick 
}: { 
  title: string; 
  showMenu?: boolean; 
  onMenuClick?: () => void; 
}) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex items-center justify-between p-4 h-16">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">X</span>
          </div>
          <KoreanText size="lg" weight="bold">{title}</KoreanText>
        </div>
        
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <Menu size={20} />
          </button>
        )}
      </div>
    </header>
  );
}
