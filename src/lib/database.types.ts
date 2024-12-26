export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          membership_tier: 'nomad' | 'pow-wow' | 'tribe'
          avatar_url: string | null
          bio: string | null
          location: string | null
          join_date: string
          updated_at: string
        }
        Insert: Omit<Tables['users']['Row'], 'join_date' | 'updated_at'>
        Update: Partial<Tables['users']['Insert']>
      }
      // ... rest of the types remain the same
    }
  }
}