'use client'

import { useEffect, useMemo, useState } from 'react'
import { getViajeActivo } from '@/lib/viajeActivo'
import AppShell from '@/components/AppShell'
import { calcularAnticipo } from '@/lib/calculoAnticipos'
import { createClient } from '@/lib/supabase'

export default function AnticiposPage() {
  const [km, setKm] = useState(720)
  const [rend, setRend] = useState(2.35)
  const [diesel, setDiesel] = useState(25.8)
  const [casetas, setCasetas] = useState(2850)
  const [viaticos, setViaticos] = useState(850)
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [msg, setMsg] = useState<string | null>(null)
  const d = useMemo(
    () => calcularAnticipo({ km, rendimientoKmL: rend, precioDiesel: diesel, casetas, viaticosDia: viaticos }),
    [km, rend, diesel, casetas, viaticos]
  )

  const guardar = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('anticipos').insert({
      viaje_id: viajeId || null,
      km_estimados: d.km,
      litros_diesel: d.litros,
      precio_diesel: d.precioDiesel,
      casetas: d.casetas,
      viaticos: d.viaticos,
      total_deposito: d.total,
      desglose: d,
    })
    setMsg(error ? error.message : `Anticipo listo: $${d.total.toLocaleString('es-MX')} MXN para depositar al operador.`)
  }

  return (
    <AppShell title="Gastos y anticipos" subtitle="Cálculo automático antes de arrancar">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <label className="space-y-1">
          <span className="text-zinc-500 uppercase text-[10px]">Km de ruta</span>
          <input type="number" value={km} onChange={(e) => setKm(+e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2" />
        </label>
        <label className="space-y-1">
          <span className="text-zinc-500 uppercase text-[10px]">Rendimiento km/L</span>
          <input type="number" step="0.05" value={rend} onChange={(e) => setRend(+e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2" />
        </label>
        <label className="space-y-1">
          <span className="text-zinc-500 uppercase text-[10px]">Diésel MXN/L</span>
          <input type="number" step="0.1" value={diesel} onChange={(e) => setDiesel(+e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2" />
        </label>
        <label className="space-y-1">
          <span className="text-zinc-500 uppercase text-[10px]">Casetas MXN</span>
          <input type="number" value={casetas} onChange={(e) => setCasetas(+e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2" />
        </label>
        <label className="space-y-1 col-span-2">
          <span className="text-zinc-500 uppercase text-[10px]">Viático / día</span>
          <input type="number" value={viaticos} onChange={(e) => setViaticos(+e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2" />
        </label>
      </div>

      <div className="vercel-card rounded-2xl p-4 space-y-2 text-sm">
        <Row k="Litros diésel" v={`${d.litros} L`} />
        <Row k="Costo diésel" v={`$${d.costoDiesel.toLocaleString('es-MX')}`} />
        <Row k="Casetas" v={`$${d.casetas.toLocaleString('es-MX')}`} />
        <Row k={`Viáticos (${d.dias} d)`} v={`$${d.viaticos.toLocaleString('es-MX')}`} />
        <Row k="Colchón 8%" v={`$${d.colchon.toLocaleString('es-MX')}`} />
        <div className="flex justify-between pt-2 border-t border-zinc-800 font-bold">
          <span>Depósito al operador</span>
          <span className="text-emerald-400">${d.total.toLocaleString('es-MX')} MXN</span>
        </div>
      </div>

      <input
        placeholder="UUID del viaje (opcional)"
        value={viajeId}
        onChange={(e) => setViajeId(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs"
      />
      <button onClick={guardar} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Fondear anticipo
      </button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-zinc-500">{k}</span>
      <span>{v}</span>
    </div>
  )
}
