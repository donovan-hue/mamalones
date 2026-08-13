import { createClient as createJsClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tfrqoxkjgxioxzfaonfv.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export function createClient() {
  return createJsClient(supabaseUrl, supabaseAnonKey || 'public-anon-placeholder')
}

export const supabase = createClient()
