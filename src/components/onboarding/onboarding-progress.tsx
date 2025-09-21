"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function OnboardingProgress({ 
  currentStep, 
  totalSteps, 
  className 
}: OnboardingProgressProps) {
  const steps = [
    { id: 1, label: '환영', shortLabel: '환영' },
    { id: 2, label: '실력 평가', shortLabel: '실력' },
    { id: 3, label: '목표 설정', shortLabel: '목표' },
    { id: 4, label: '선호도', shortLabel: '선호도' },
    { id: 5, label: '완료', shortLabel: '완료' },
  ];

  return (
    <div className={cn("px-4 py-4 bg-muted/30", className)}>
      <div className="flex items-center justify-between">
        {steps.slice(0, totalSteps).map((step, index) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          const isUpcoming = step.id > currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle */}
              <div className="flex flex-col items-center space-y-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-2 ring-primary/20",
                    isUpcoming && "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                
                {/* Step Label */}
                <div className="text-center">
                  <div className={cn(
                    "text-xs font-medium transition-colors",
                    isCompleted && "text-primary",
                    isCurrent && "text-primary",
                    isUpcoming && "text-muted-foreground"
                  )}>
                    {step.shortLabel}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < totalSteps - 1 && (
                <div className="flex-1 mx-2">
                  <div className="h-0.5 bg-muted relative">
                    <div
                      className={cn(
                        "h-full bg-primary transition-all duration-300",
                        step.id < currentStep ? "w-full" : "w-0"
                      )}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
