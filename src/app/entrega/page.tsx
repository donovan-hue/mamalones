'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'
import { subirEvidencia } from '@/lib/storage'

export default function EntregaPage() {
  const [viajeId, setViajeId] = useState('')
  const [receptor, setReceptor] = useState('')
  const [obs, setObs] = useState('')
  const [pod, setPod] = useState('')
  const [podFile, setPodFile] = useState<File | null>(null)
  const [msg, setMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => setViajeId(getViajeActivo()), [])

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    let podRef = pod
    if (podFile) {
      const up = await subirEvidencia(supabase, podFile, `pod/${viajeId || 'sin'}`)
      if (up.error) {
        setMsg(up.error)
        setLoading(false)
        return
      }
      podRef = up.path
    }
    const { error: u } = await supabase.from('viajes').update({ estado: 'entregado' }).eq('id', viajeId)
    if (u) {
      setMsg(u.message)
      setLoading(false)
      return
    }
    const { data: viaje } = await supabase.from('viajes').select('tarifa_neta').eq('id', viajeId).maybeSingle()
    const flete = Number(viaje?.tarifa_neta || 0)
    await supabase.from('liquidaciones').insert({
      viaje_id: viajeId,
      monto_flete: flete,
      anticipo_ya_pagado: 0,
      saldo: flete,
      pod_url: podRef || `POD ${receptor}`,
      estado: 'liberado',
      liberado_at: new Date().toISOString(),
    })
    setMsg(`Entrega y POD de ${receptor}. Liquidación disparada. ${obs}`)
    setLoading(false)
  }

  return (
    <AppShell title="Entrega y POD" subtitle="Cierra viaje y libera saldo">
      {msg && <p className="text-xs text-emerald-400">{msg}</p>}
      <form onSubmit={handle} className="space-y-3 vercel-card rounded-2xl p-4 text-xs">
        <input required value={viajeId} onChange={(e) => setViajeId(e.target.value)} placeholder="UUID viaje" className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800" />
        <input required value={receptor} onChange={(e) => setReceptor(e.target.value)} placeholder="Quien recibe" className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800" />
        <input value={pod} onChange={(e) => setPod(e.target.value)} placeholder="Hash / foto POD" className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800" />
        <textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Condiciones de descarga" className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800" />
        <button disabled={loading} className="w-full py-3 bg-white text-black rounded-xl font-black uppercase">
          {loading ? 'Cerrando…' : 'Confirmar entrega y liquidar'}
        </button>
      </form>
    </AppShell>
  )
}
