import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type Message = Database['public']['Tables']['messages']['Row'];
type NewMessage = Database['public']['Tables']['messages']['Insert'];

export function useMessages(channel: string) {
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['messages', channel],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('channel', channel)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data;
    },
  });

  const { mutate: sendMessage } = useMutation({
    mutationFn: async (newMessage: NewMessage) => {
      const { error } = await supabase
        .from('messages')
        .insert(newMessage);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channel] });
    },
  });

  return {
    messages,
    isLoading,
    sendMessage,
  };
}