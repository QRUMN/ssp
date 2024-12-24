import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Event = Database['public']['Tables']['events']['Row'];

export function useUpcomingEvents() {
  return useQuery<Event[]>({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', now)
        .order('date', { ascending: true });
        
      if (error) throw error;
      return data;
    },
  });
}