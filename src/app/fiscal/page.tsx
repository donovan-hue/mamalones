'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function FiscalPage() {
  const [viajeId, setViajeId] = useState('')
  const [rfcRem, setRfcRem] = useState('')
  const [rfcDest, setRfcDest] = useState('')
  const [fraccion, setFraccion] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => setViajeId(getViajeActivo()), [])

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const payload = { rfc_remitente: rfcRem, rfc_destinatario: rfcDest, fraccion, at: new Date().toISOString() }
    const { error } = await supabase.from('cartas_porte').insert({
      viaje_id: viajeId || null,
      ...payload,
    })
    await supabase.from('credenciales_intercambio').insert({
      viaje_id: viajeId || null,
      estado_validacion: 'carta_porte',
      payload_carta_porte: payload,
    })
    await supabase.from('viajes').update({ estado: 'documentado_sat' }).eq('id', viajeId)
    setMensaje(error ? `Carta Porte en credenciales. ${error.message}` : 'Carta Porte SAT vinculada al viaje.')
    setLoading(false)
  }

  return (
    <AppShell title="Carta Porte SAT" subtitle="RFC y fracción arancelaria">
      {mensaje && <p className="text-xs text-emerald-400">{mensaje}</p>}
      <form onSubmit={handle} className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
        <input required value={viajeId} onChange={(e) => setViajeId(e.target.value)} placeholder="UUID viaje" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <div className="grid grid-cols-2 gap-2">
          <input required value={rfcRem} onChange={(e) => setRfcRem(e.target.value.toUpperCase())} placeholder="RFC remitente" className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          <input required value={rfcDest} onChange={(e) => setRfcDest(e.target.value.toUpperCase())} placeholder="RFC destinatario" className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        </div>
        <input value={fraccion} onChange={(e) => setFraccion(e.target.value)} placeholder="Clave producto SAT" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <button disabled={loading} className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">Vincular Carta Porte</button>
      </form>
    </AppShell>
  )
}
