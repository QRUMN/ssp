import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { MembershipTier } from '../config/memberships';

interface OnboardingData {
  name: string;
  location: string;
  bio: string;
  interests: string[];
  notifications: boolean;
  newsletter: boolean;
}

export function useOnboardingSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOnboarding = async (userId: string, data: OnboardingData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const selectedMembership = localStorage.getItem('selectedMembership') as MembershipTier;
      if (!selectedMembership) {
        throw new Error('No membership selected');
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          name: data.name,
          location: data.location,
          bio: data.bio,
          membership_tier: selectedMembership,
          interests: data.interests,
          preferences: {
            notifications: data.notifications,
            newsletter: data.newsletter
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (updateError) throw updateError;

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save profile';
      setError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitOnboarding, isSubmitting, error };
}