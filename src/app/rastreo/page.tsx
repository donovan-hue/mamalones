'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { puedeVerTelemetria, rolSobreViaje } from '@/lib/privacidad'

interface Ubicacion {
  id: string
  latitud: number
  longitud: number
  created_at: string
  fuente?: string
}

export default function RastreoPage() {
  const [viajeId, setViajeId] = useState('')
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const supabase = createClient()

  const consultar = async () => {
    setError(null)
    setAviso(null)
    setUbicaciones([])
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Inicia sesión. La telemetría no es pública.')
      return
    }
    const { data: viaje, error: vErr } = await supabase.from('viajes').select('*').eq('id', viajeId).maybeSingle()
    if (vErr) {
      setError(vErr.message)
      return
    }
    if (!viaje) {
      setError('Viaje no encontrado o no eres parte del contrato.')
      return
    }
    const rol = rolSobreViaje(user.id, viaje)
    if (!puedeVerTelemetria(rol)) {
      setAviso(
        rol === 'operador'
          ? 'Tu posición se transmite al dueño y al solicitante. No hay mapa público ni para terceros.'
          : 'Acceso denegado. Solo el solicitante del flete y el dueño de la fletera ven la ruta activa.'
      )
      return
    }
    const { data, error: fetchError } = await supabase
      .from('rastreo_ubicaciones')
      .select('*')
      .or(`viaje_id.eq.${viajeId},carga_id.eq.${viajeId}`)
      .order('created_at', { ascending: false })
    if (fetchError) setError(fetchError.message)
    else setUbicaciones(data || [])
  }

  return (
    <AppShell title="Telemetría privada" subtitle="Visible solo solicitante + dueño">
      <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-3 text-[11px] text-emerald-300">
        Canal cerrado. No hay feed general ni exposición a otras fleteras.
      </div>
      <div className="flex gap-2">
        <input
          placeholder="UUID del viaje"
          className="flex-1 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm"
          value={viajeId}
          onChange={(e) => setViajeId(e.target.value)}
        />
        <button onClick={consultar} className="px-4 py-2 bg-white text-black rounded-xl text-xs font-bold">
          Abrir
        </button>
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {aviso && <p className="text-amber-300 text-xs">{aviso}</p>}
      <div className="space-y-2">
        {ubicaciones.map((loc) => (
          <div key={loc.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs flex justify-between">
            <div>
              <p className="font-mono text-emerald-400">
                {loc.latitud.toFixed(5)}, {loc.longitud.toFixed(5)}
              </p>
              <p className="text-zinc-500">{new Date(loc.created_at).toLocaleString()}</p>
            </div>
            <span className="text-[10px] uppercase text-zinc-400">{loc.fuente || 'celular'}</span>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
