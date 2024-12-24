import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';
import { useAuth } from './useAuth';

type OnboardingType = 'free-jawn' | 'paid';

export function useOnboardingFlow(type: OnboardingType) {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  const { user } = useAuth();

  const steps = type === 'free-jawn' ? ['basic-info', 'interests'] : ['basic-info', 'interests', 'preferences'];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      trackEvent('onboarding_step_completed', {
        step: steps[currentStep],
        membership_type: type
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = async () => {
    try {
      trackEvent('onboarding_completed', {
        membership_type: type,
        user_id: user?.id
      });
      navigate('/home');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      trackEvent('onboarding_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        membership_type: type
      });
    }
  };

  return {
    currentStep,
    steps,
    nextStep,
    prevStep,
    handleComplete,
  };
}