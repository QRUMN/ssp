import { useNavigate } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';
import { supabase } from '../lib/supabase';

export function useMembershipFlow() {
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();

  const handleMembershipSelect = async (membershipId: string) => {
    try {
      // Validate membership selection
      if (!membershipId) {
        throw new Error('No membership selected');
      }

      // Track the selection in analytics
      trackEvent('membership_selected', {
        membership_tier: membershipId,
        source: 'landing_page'
      });

      // Store selection
      localStorage.setItem('selectedMembership', membershipId);

      // Create anonymous session for nomad users
      if (membershipId === 'nomad') {
        const { data: { session }, error } = await supabase.auth.signUp({
          email: `${Date.now()}@temp.sondae.service`,
          password: Math.random().toString(36).slice(-8),
        });

        if (error) throw error;
      }
      
      // Redirect to onboarding
      navigate('/onboarding');
      
    } catch (error) {
      console.error('Error in membership flow:', error);
      trackEvent('membership_selection_error', {
        error: error instanceof Error ? error.message : 'Unknown error',
        membership_tier: membershipId
      });
    }
  };

  return { handleMembershipSelect };
}