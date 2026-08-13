'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'

export default function BilleteraPage() {
  const [viajeId, setViajeId] = useState('')
  const [flete, setFlete] = useState(45000)
  const [anticipo, setAnticipo] = useState(13500)
  const [pod, setPod] = useState('')
  const [msg, setMsg] = useState<string | null>(null)
  const saldo = Math.max(0, flete - anticipo)

  const liberar = async () => {
    if (!pod.trim()) {
      setMsg('Sube o pega la referencia del POD firmado digitalmente.')
      return
    }
    const supabase = createClient()
    const { error } = await supabase.from('liquidaciones').insert({
      viaje_id: viajeId || null,
      monto_flete: flete,
      anticipo_ya_pagado: anticipo,
      saldo,
      canal: 'fondeo',
      pod_url: pod,
      estado: 'liberado',
      liberado_at: new Date().toISOString(),
    })
    setMsg(error ? error.message : `Saldo $${saldo.toLocaleString('es-MX')} liberado al instante (fondeo). Sin 30/60 días.`)
  }

  return (
    <AppShell title="Billetera y liquidación" subtitle="POD firmado → fondeo inmediato">
      <div className="space-y-2 text-xs">
        <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <label>Flete total
          <input type="number" value={flete} onChange={(e) => setFlete(+e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        </label>
        <label>Anticipo ya pagado
          <input type="number" value={anticipo} onChange={(e) => setAnticipo(+e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        </label>
        <label>Referencia POD / hash de firma
          <input value={pod} onChange={(e) => setPod(e.target.value)} placeholder="hash o URL del acuse" className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        </label>
      </div>
      <div className="vercel-card rounded-2xl p-4 flex justify-between text-sm">
        <span className="text-zinc-400">Saldo a liberar</span>
        <span className="font-black text-emerald-400">${saldo.toLocaleString('es-MX')}</span>
      </div>
      <button onClick={liberar} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Liberar por POD
      </button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
