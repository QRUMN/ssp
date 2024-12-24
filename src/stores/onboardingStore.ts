import { create } from 'zustand';
import { useAuth } from '../hooks/useAuth';
import { useAnalytics } from '../hooks/useAnalytics';
import { updateUserProfile } from '../lib/auth';
import type { MembershipTier } from '../config/memberships';

interface OnboardingFormData {
  name: string;
  location: string;
  bio: string;
  interests: string[];
  notifications: boolean;
  newsletter: boolean;
}

interface OnboardingState {
  formData: OnboardingFormData;
  isSubmitting: boolean;
  error: string | null;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  submitOnboarding: () => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  formData: {
    name: '',
    location: '',
    bio: '',
    interests: [],
    notifications: true,
    newsletter: true,
  },
  isSubmitting: false,
  error: null,
  updateFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data }
    }));
  },
  submitOnboarding: async () => {
    const { formData } = get();
    const { user } = useAuth.getState();
    const { trackEvent } = useAnalytics.getState();

    if (!user) {
      set({ error: 'No user found' });
      return false;
    }

    set({ isSubmitting: true, error: null });

    try {
      const membershipTier = localStorage.getItem('selectedMembership') as MembershipTier;
      
      await updateUserProfile(user.id, {
        ...formData,
        membership_tier: membershipTier
      });

      trackEvent('onboarding_completed', {
        membership_tier: membershipTier,
        user_id: user.id
      });

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save profile';
      set({ error: message });
      return false;
    } finally {
      set({ isSubmitting: false });
    }
  },
  setError: (error) => set({ error })
}));