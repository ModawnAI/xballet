"use client";

import React from 'react';
import { useOnboardingStore } from '@/store/onboarding-store';
import { OnboardingWelcome } from '@/components/onboarding/onboarding-welcome';
import { OnboardingSkillAssessment } from '@/components/onboarding/onboarding-skill-assessment';
import { OnboardingGoals } from '@/components/onboarding/onboarding-goals';
import { OnboardingPreferences } from '@/components/onboarding/onboarding-preferences';
import { OnboardingCompletion } from '@/components/onboarding/onboarding-completion';
import { OnboardingProgress } from '@/components/onboarding/onboarding-progress';
import { KoreanHeading } from '@/components/korean-text';

export default function OnboardingPage() {
  const { currentStep, totalSteps, data, nextStep, previousStep } = useOnboardingStore();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingWelcome />;
      case 2:
        return <OnboardingSkillAssessment />;
      case 3:
        return <OnboardingGoals />;
      case 4:
        return <OnboardingPreferences />;
      case 5:
        return <OnboardingCompletion />;
      default:
        return <OnboardingWelcome />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <KoreanHeading level={4} className="text-lg">
              XBallet 설정
            </KoreanHeading>
            {currentStep > 1 && (
              <button
                onClick={previousStep}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                이전
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <OnboardingProgress currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {renderCurrentStep()}
      </main>

      {/* Navigation Footer */}
      {currentStep < totalSteps && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="px-4 py-4">
            <button
              onClick={nextStep}
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              다음 단계
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
