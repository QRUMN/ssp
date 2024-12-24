import { useUser } from './useUser';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export type Permission =
  | 'create:events'
  | 'edit:events'
  | 'delete:events'
  | 'create:posts'
  | 'moderate:posts'
  | 'access:analytics'
  | 'manage:users';

export function usePermissions() {
  const { user } = useUser();

  const { data: permissions = [] } = useQuery<Permission[]>({
    queryKey: ['permissions', user?.role],
    queryFn: async () => {
      if (!user?.role) return [];

      const { data, error } = await supabase
        .from('role_permissions')
        .select('permission_id')
        .eq('role_id', user.role);

      if (error) throw error;
      return data.map(p => p.permission_id);
    },
    enabled: !!user?.role,
  });

  const hasPermission = (permission: Permission) => {
    return permissions.includes(permission);
  };

  return {
    permissions,
    hasPermission,
    isAdmin: user?.role === 'admin',
    isTribe: user?.role === 'tribe',
    isMember: user?.role === 'member',
  };
}