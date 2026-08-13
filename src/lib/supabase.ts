import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tfrqoxkjgxioxzfaonfv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ZUJKfsHQNhKVfQbUVINnLg_TQvXa2xd'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
