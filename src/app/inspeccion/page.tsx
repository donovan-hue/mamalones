'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'
import { subirEvidencia } from '@/lib/storage'

export default function InspeccionPage() {
  const [viajeId, setViajeId] = useState('')
  useEffect(() => setViajeId(getViajeActivo()), [])
  const [merc, setMerc] = useState<File | null>(null)
  const [sellos, setSellos] = useState<File | null>(null)
  const [caja, setCaja] = useState<File | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!merc || !sellos || !caja) {
      setMsg('Las tres fotos son obligatorias.')
      return
    }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const folder = `prearranque/${viajeId || 'sin-viaje'}`
    const u1 = await subirEvidencia(supabase, merc, folder)
    const u2 = await subirEvidencia(supabase, sellos, folder)
    const u3 = await subirEvidencia(supabase, caja, folder)
    if (u1.error || u2.error || u3.error) {
      setMsg(u1.error || u2.error || u3.error)
      return
    }
    const { error } = await supabase.from('inspecciones_prearranque').insert({
      viaje_id: viajeId || null,
      operador_id: user?.id,
      foto_mercancia: u1.path,
      foto_sellos: u2.path,
      foto_caja: u3.path,
      checklist: { mercancia: u1.path, sellos: u2.path, caja: u3.path },
    })
    setMsg(error ? error.message : 'Fotos subidas a evidencias y checklist sellado.')
  }

  return (
    <AppShell title="Inspección pre-arranque" subtitle="Fotos reales en Storage">
      <form onSubmit={enviar} className="space-y-3 text-xs">
        <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <Foto label="Mercancía" on={setMerc} />
        <Foto label="Sellos" on={setSellos} />
        <Foto label="Caja" on={setCaja} />
        <button className="w-full py-3 bg-white text-black rounded-xl font-black uppercase">Subir y cerrar</button>
      </form>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}

function Foto({ label, on }: { label: string; on: (f: File | null) => void }) {
  return (
    <label className="block vercel-card rounded-2xl p-3">
      <span className="text-zinc-400 uppercase text-[10px]">{label}</span>
      <input type="file" accept="image/*" capture="environment" required className="mt-2 block w-full text-[11px]" onChange={(e) => on(e.target.files?.[0] || null)} />
    </label>
  )
}
