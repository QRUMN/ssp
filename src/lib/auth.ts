import { supabase } from './supabase';
import type { MembershipTier } from '../config/memberships';

export async function updateUserProfile(userId: string, data: {
  name: string;
  location: string;
  bio: string;
  membership_tier: MembershipTier;
}) {
  const { error } = await supabase
    .from('users')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}