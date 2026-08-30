'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

function cifrarSimple(texto: string) {
  return btoa(unescape(encodeURIComponent(texto)))
}

export default function OffgridPage() {
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [lat, setLat] = useState('21.321')
  const [lon, setLon] = useState('-101.934')
  const [canal, setCanal] = useState<'sms' | 'satelital' | 'baliza'>('sms')
  const [payload, setPayload] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const generar = () => {
    const raw = JSON.stringify({ v: viajeId || 'SIN-VIAJE', lat, lon, t: Date.now() })
    setPayload(cifrarSimple(raw))
  }

  const transmitir = async () => {
    if (!payload) generar()
    const supabase = createClient()
    const { error } = await supabase.from('balizas_offgrid').insert({
      viaje_id: viajeId || null,
      payload_cifrado: payload || cifrarSimple(`${lat},${lon}`),
      canal,
    })
    setMsg(error ? error.message : `Baliza ${canal} registrada. En zona sin celular se reenvía por SMS/satélite.`)
  }

  return (
    <AppShell title="Enlace off-grid" subtitle="Baliza / SMS cifrado / satélite">
      <p className="text-xs text-zinc-400">
        Cuando no hay LTE, la unidad arma un paquete cifrado (Base64 de posición crítica) para SMS o módem satelital.
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <input placeholder="Viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <input value={lat} onChange={(e) => setLat(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <input value={lon} onChange={(e) => setLon(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <select value={canal} onChange={(e) => setCanal(e.target.value as typeof canal)} className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5">
          <option value="sms">SMS cifrado</option>
          <option value="satelital">Satelital directo</option>
          <option value="baliza">Baliza</option>
        </select>
      </div>
      <button onClick={generar} className="text-xs px-3 py-2 bg-zinc-800 rounded-xl">Generar payload</button>
      {payload && <pre className="text-[10px] break-all bg-zinc-950 border border-zinc-800 rounded-xl p-3">{payload}</pre>}
      <button onClick={transmitir} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Transmitir posición crítica
      </button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
