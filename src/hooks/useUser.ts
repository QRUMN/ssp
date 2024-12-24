import { useAuth } from './useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type User = Database['public']['Tables']['users']['Row'];

export function useUser() {
  const { user: authUser } = useAuth();

  const { data: user, isLoading, error } = useQuery<User | null>({
    queryKey: ['user', authUser?.id],
    queryFn: async () => {
      if (!authUser?.id) return null;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();
        
      if (error) throw error;
      return data;
    },
    enabled: !!authUser?.id,
    retry: false
  });

  return {
    user,
    isLoading,
    error,
    isAdmin: user?.membership_tier === 'tribe',
  };
}