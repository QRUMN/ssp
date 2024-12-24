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

      // Create anonymous session for free-jawn users
      if (membershipId === 'free-jawn') {
        const { data: { session }, error } = await supabase.auth.signUp({
          email: `${Date.now()}@temp.sondae.service`,
          password: Math.random().toString(36).slice(-8),
        });

        if (error) throw error;
        if (session) {
          navigate('/onboarding/free-jawn');
        }
      } else {
        navigate('/onboarding/paid');
      }
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