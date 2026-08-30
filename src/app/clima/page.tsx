'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

const MUESTRA = [
  { tipo: 'cierre', sev: 'alta', d: 'Bloqueo en tramo Matehuala–Saltillo. Desvío por 57D lento.' },
  { tipo: 'clima', sev: 'media', d: 'Tormenta eléctrica zona León. Hidroplaneo en caseta Encarnación.' },
  { tipo: 'accidente', sev: 'alta', d: 'Choque múltiple km 412. Carril derecho cerrado 90 min.' },
]

export default function ClimaPage() {
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [msg, setMsg] = useState<string | null>(null)

  const empujar = async (a: (typeof MUESTRA)[0]) => {
    const supabase = createClient()
    const { error } = await supabase.from('alertas_viales').insert({
      viaje_id: viajeId || null,
      tipo: a.tipo,
      descripcion: a.d,
      severidad: a.sev,
    })
    setMsg(error ? error.message : 'Alerta enviada a operador y dueño de fletera.')
  }

  return (
    <AppShell title="Clima y bloqueos" subtitle="Alertas al operador y al dueño">
      <input placeholder="UUID viaje (opcional)" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      {MUESTRA.map((a) => (
        <div key={a.d} className="vercel-card rounded-2xl p-3 space-y-2">
          <div className="flex justify-between text-[10px] uppercase text-zinc-500">
            <span>{a.tipo}</span>
            <span className={a.sev === 'alta' ? 'text-red-400' : 'text-amber-400'}>{a.sev}</span>
          </div>
          <p className="text-xs">{a.d}</p>
          <button onClick={() => empujar(a)} className="text-[10px] font-bold uppercase bg-zinc-800 px-3 py-1.5 rounded-lg">
            Coordinar desvío
          </button>
        </div>
      ))}
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
