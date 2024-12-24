import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { BasicInfo } from '../components/onboarding/steps/BasicInfo';
import { Interests } from '../components/onboarding/steps/Interests';
import { Preferences } from '../components/onboarding/steps/Preferences';
import { OnboardingProvider } from '../contexts/OnboardingContext';

export function PaidOnboarding() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/home');
  };

  return (
    <OnboardingProvider onComplete={handleComplete}>
      <OnboardingLayout
        title="Welcome to the Tribe"
        subtitle="Let's personalize your experience"
        currentStep={0}
        totalSteps={3}
      >
        <BasicInfo />
        <Interests />
        <Preferences onComplete={handleComplete} />
      </OnboardingLayout>
    </OnboardingProvider>
  );
}