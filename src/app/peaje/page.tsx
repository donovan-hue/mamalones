'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

const RUTA_GDL_MTY = [
  { nombre: 'Encarnación', costo: 186 },
  { nombre: 'León – Lagos', costo: 312 },
  { nombre: 'San Juan del Río', costo: 245 },
  { nombre: 'Palmillas', costo: 198 },
  { nombre: 'Matehuala', costo: 420 },
  { nombre: 'Saltillo – Monterrey', costo: 389 },
]

export default function PeajePage() {
  const [viajeId, setViajeId] = useState('')
  useEffect(() => setViajeId(getViajeActivo()), [])
  const [tag, setTag] = useState('')
  const [saldo, setSaldo] = useState(2500)
  const [msg, setMsg] = useState<string | null>(null)
  const total = RUTA_GDL_MTY.reduce((a, c) => a + c.costo, 0)
  const falta = Math.max(0, total - saldo)

  const vincular = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('peajes').insert({
      viaje_id: viajeId || null,
      casetas: RUTA_GDL_MTY,
      total,
      tag_iave: tag,
      saldo_tag: saldo,
    })
    setMsg(error ? error.message : falta > 0 ? `Fondear TAG con $${falta} para cubrir la ruta.` : 'Saldo TAG suficiente para todas las casetas.')
  }

  return (
    <AppShell title="Peaje y TAG / IAVE" subtitle="Casetas de ruta + saldo telepeaje">
      <div className="space-y-2">
        {RUTA_GDL_MTY.map((c) => (
          <div key={c.nombre} className="flex justify-between text-xs vercel-card rounded-xl px-3 py-2">
            <span>{c.nombre}</span>
            <span>${c.costo}</span>
          </div>
        ))}
        <div className="flex justify-between text-sm font-bold pt-1">
          <span>Total casetas</span>
          <span>${total}</span>
        </div>
      </div>
      <input placeholder="Número TAG / IAVE" value={tag} onChange={(e) => setTag(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <label className="text-xs text-zinc-500">Saldo actual TAG
        <input type="number" value={saldo} onChange={(e) => setSaldo(+e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white" />
      </label>
      <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <button onClick={vincular} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">Vincular peaje al viaje</button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
