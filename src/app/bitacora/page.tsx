'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

type Tipo = 'volante' | 'descanso' | 'carga' | 'descarga'

export default function BitacoraPage() {
  const [viajeId, setViajeId] = useState('')
  useEffect(() => setViajeId(getViajeActivo()), [])
  const [tipo, setTipo] = useState<Tipo>('volante')
  const [minutos, setMinutos] = useState(240)
  const [regs, setRegs] = useState<{ tipo: Tipo; minutos: number }[]>([])
  const [msg, setMsg] = useState<string | null>(null)

  const volante = regs.filter((r) => r.tipo === 'volante').reduce((a, b) => a + b.minutos, 0)
  const descanso = regs.filter((r) => r.tipo === 'descanso').reduce((a, b) => a + b.minutos, 0)
  const alertaNOM = volante >= 8 * 60 && descanso < 30

  const add = async () => {
    setRegs((r) => [...r, { tipo, minutos }])
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('bitacora_horas').insert({
      operador_id: user?.id,
      viaje_id: viajeId || null,
      tipo,
      minutos,
      inicio: new Date().toISOString(),
    })
    setMsg('Evento NOM-087 registrado.')
  }

  return (
    <AppShell title="Bitácora NOM-087" subtitle="Horas al volante y descanso federal">
      <div className="grid grid-cols-2 gap-2 text-center">
        <div className="vercel-card rounded-2xl p-3">
          <p className="text-[10px] text-zinc-500 uppercase">Volante</p>
          <p className="text-xl font-black">{(volante / 60).toFixed(1)} h</p>
        </div>
        <div className="vercel-card rounded-2xl p-3">
          <p className="text-[10px] text-zinc-500 uppercase">Descanso</p>
          <p className="text-xl font-black">{descanso} min</p>
        </div>
      </div>
      {alertaNOM && (
        <p className="text-xs text-red-400">Límite de fatiga: debes registrar parada obligatoria.</p>
      )}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <select value={tipo} onChange={(e) => setTipo(e.target.value as Tipo)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5">
          <option value="volante">Al volante</option>
          <option value="descanso">Descanso</option>
          <option value="carga">Carga</option>
          <option value="descarga">Descarga</option>
        </select>
        <input type="number" value={minutos} onChange={(e) => setMinutos(+e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
      </div>
      <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <button onClick={add} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Registrar evento
      </button>
      {msg && <p className="text-xs text-zinc-500">{msg}</p>}
    </AppShell>
  )
}
