'use client'

import { useMemo, useState } from 'react'
import AppShell from '@/components/AppShell'
import { detectarAnomaliaCombustible } from '@/lib/calculoAnticipos'
import { createClient } from '@/lib/supabase'

export default function RendimientoPage() {
  const [peso, setPeso] = useState(28)
  const [litros, setLitros] = useState(310)
  const [km, setKm] = useState(720)
  const [desnivel, setDesnivel] = useState(890)
  const [viajeId, setViajeId] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const r = useMemo(() => detectarAnomaliaCombustible(peso, litros, km, desnivel), [peso, litros, km, desnivel])

  const guardar = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('rendimiento_combustible').insert({
      viaje_id: viajeId || null,
      peso_ton: peso,
      litros,
      km,
      desnivel_m: desnivel,
      km_por_litro: r.kmPorLitro,
      anomalia: r.anomalia,
      nota: r.anomalia ? 'Posible merma o desviación de ruta' : 'Dentro de banda',
    })
    setMsg(error ? error.message : r.anomalia ? 'Anomalía marcada para la fletera.' : 'Rendimiento dentro de lo esperado.')
  }

  return (
    <AppShell title="Combustible vs carga" subtitle="Detección de mermas">
      <div className="grid grid-cols-2 gap-2 text-xs">
        <Num l="Peso ton" v={peso} s={setPeso} />
        <Num l="Litros" v={litros} s={setLitros} />
        <Num l="Km" v={km} s={setKm} />
        <Num l="Desnivel m" v={desnivel} s={setDesnivel} />
      </div>
      <div className={`rounded-2xl p-4 border ${r.anomalia ? 'border-red-800 bg-red-950/30' : 'border-emerald-900 bg-emerald-950/20'}`}>
        <p className="text-sm font-bold">{r.kmPorLitro} km/L real</p>
        <p className="text-[11px] text-zinc-400">Esperado ≥ {r.esperado} km/L con este peso y pendiente.</p>
        <p className="text-xs mt-2">{r.anomalia ? '⚠ Merma o consumo fuera de banda' : '✓ Sin anomalía'}</p>
      </div>
      <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <button onClick={guardar} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">Registrar cruce</button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}

function Num({ l, v, s }: { l: string; v: number; s: (n: number) => void }) {
  return (
    <label className="space-y-1">
      <span className="text-[10px] uppercase text-zinc-500">{l}</span>
      <input type="number" value={v} onChange={(e) => s(+e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2" />
    </label>
  )
}
