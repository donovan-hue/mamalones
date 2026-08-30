import type { SupabaseClient } from '@supabase/supabase-js'

const BUCKET = 'evidencias'

export async function subirEvidencia(
  supabase: SupabaseClient,
  file: File,
  carpeta: string
): Promise<{ path: string; error: string | null }> {
  const safe = file.name.replace(/[^\w.\-]+/g, '_')
  const path = `${carpeta}/${Date.now()}-${safe}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || 'application/octet-stream',
  })
  if (error) return { path: '', error: error.message }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { path: data.publicUrl || path, error: null }
}
