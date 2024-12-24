import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { BasicInfo } from '../components/onboarding/steps/BasicInfo';
import { Interests } from '../components/onboarding/steps/Interests';
import { OnboardingProvider } from '../contexts/OnboardingContext';

export function FreeJawnOnboarding() {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate('/home');
  };

  return (
    <OnboardingProvider onComplete={handleComplete}>
      <OnboardingLayout
        title="Welcome to Free Jawn"
        subtitle="Let's get you started with the basics"
        currentStep={0}
        totalSteps={2}
      >
        <BasicInfo />
        <Interests />
      </OnboardingLayout>
    </OnboardingProvider>
  );
}