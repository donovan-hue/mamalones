'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function InspeccionPage() {
  const [viajeId, setViajeId] = useState('')
  const [merc, setMerc] = useState('')
  const [sellos, setSellos] = useState('')
  const [caja, setCaja] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!merc || !sellos || !caja) {
      setMsg('Las tres fotos son obligatorias antes de arrancar.')
      return
    }
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('inspecciones_prearranque').insert({
      viaje_id: viajeId || null,
      operador_id: user?.id,
      foto_mercancia: merc,
      foto_sellos: sellos,
      foto_caja: caja,
      checklist: { mercancia: true, sellos: true, caja: true, archivos: [merc, sellos, caja] },
    })
    setMsg(error ? error.message : 'Checklist sellado. Protege a la empresa ante reclamos de daño.')
  }

  return (
    <AppShell title="Inspección pre-arranque" subtitle="Fotos obligatorias">
      <form onSubmit={enviar} className="space-y-3 text-xs">
        <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <Foto label="Estado de la mercancía" on={setMerc} />
        <Foto label="Sellos del contenedor" on={setSellos} />
        <Foto label="Condiciones de la caja" on={setCaja} />
        <button className="w-full py-3 bg-white text-black rounded-xl font-black uppercase">Cerrar checklist</button>
      </form>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}

function Foto({ label, on }: { label: string; on: (v: string) => void }) {
  return (
    <label className="block vercel-card rounded-2xl p-3">
      <span className="text-zinc-400 uppercase text-[10px]">{label}</span>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        required
        className="mt-2 block w-full text-[11px]"
        onChange={(e) => on(e.target.files?.[0]?.name || '')}
      />
    </label>
  )
}
