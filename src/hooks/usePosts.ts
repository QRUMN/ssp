import { useQuery } from '@tanstack/react-query';
import { tribePosts } from '../data/posts';

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => tribePosts,
  });
}