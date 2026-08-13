'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function IncidentesPage() {
  const [viajeId, setViajeId] = useState('')
  const [tipo, setTipo] = useState('mecanico')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => setViajeId(getViajeActivo()), [])

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('alertas_emergencia').insert({
      viaje_id: viajeId || null,
      operador_id: user?.id,
      tipo,
      nota: descripcion,
    })
    setMensaje(error ? error.message : 'Incidente en centro de control.')
    setLoading(false)
  }

  return (
    <AppShell title="Incidentes en ruta" subtitle="Alerta al centro de control">
      {mensaje && <p className="text-xs text-emerald-400">{mensaje}</p>}
      <form onSubmit={handle} className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
        <input value={viajeId} onChange={(e) => setViajeId(e.target.value)} placeholder="UUID viaje" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5">
          <option value="mecanico">Falla mecánica</option>
          <option value="accidente">Siniestro</option>
          <option value="reten">Retén / bloqueo</option>
          <option value="retraso">Retraso</option>
        </select>
        <textarea required value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Qué ocurrió y dónde" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <button disabled={loading} className="w-full py-3 bg-red-600 text-white font-black uppercase rounded-xl">Enviar alerta</button>
      </form>
    </AppShell>
  )
}
