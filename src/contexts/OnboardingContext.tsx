import React, { createContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useAnalytics } from '../hooks/useAnalytics';
import { useOnboardingSubmit } from '../hooks/useOnboardingSubmit';

export interface OnboardingFormData {
  name: string;
  location: string;
  bio: string;
  interests: string[];
  notifications: boolean;
  newsletter: boolean;
}

export interface OnboardingContextType {
  formData: OnboardingFormData;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  nextStep: () => Promise<void>;
  prevStep: () => void;
  isSubmitting: boolean;
  error: string | null;
}

export const OnboardingContext = createContext<OnboardingContextType | null>(null);

interface OnboardingProviderProps {
  children: React.ReactNode;
  onComplete: () => void;
}

export function OnboardingProvider({ children, onComplete }: OnboardingProviderProps) {
  const { user } = useAuth();
  const { trackEvent } = useAnalytics();
  const { submitOnboarding, isSubmitting, error } = useOnboardingSubmit();
  const [formData, setFormData] = React.useState<OnboardingFormData>({
    name: '',
    location: '',
    bio: '',
    interests: [],
    notifications: true,
    newsletter: true,
  });

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = async () => {
    if (!user) return;

    const success = await submitOnboarding(user.id, formData);
    if (success) {
      trackEvent('onboarding_completed', {
        membership_tier: localStorage.getItem('selectedMembership') || 'free-jawn',
        user_id: user.id
      });
      onComplete();
    }
  };

  const prevStep = () => {
    // Handle step navigation in the component
  };

  return (
    <OnboardingContext.Provider value={{
      formData,
      updateFormData,
      nextStep,
      prevStep,
      isSubmitting,
      error
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}