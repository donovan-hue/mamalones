import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseAnonKey, supabaseUrl } from './env'

export async function createServerSupabase() {
  const jar = await cookies()
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return jar.getAll()
      },
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => jar.set(name, value, options))
        } catch {
          /* set desde Server Component de solo lectura */
        }
      },
    },
  })
}
