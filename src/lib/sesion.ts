import { createClient } from '@/lib/supabase'

export async function usuarioActual() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return { supabase, user }
}
