import { useCallback } from 'react';
import { useOnboardingStore } from '../stores/onboardingStore';

export function useOnboarding() {
  const store = useOnboardingStore();
  
  const nextStep = useCallback(async () => {
    const success = await store.submitOnboarding();
    return success;
  }, []);

  return {
    formData: store.formData,
    updateFormData: store.updateFormData,
    nextStep,
    isSubmitting: store.isSubmitting,
    error: store.error,
  };
}