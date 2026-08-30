'use client'

import { useEffect, useRef, useState } from 'react'
import { getViajeActivo } from '@/lib/viajeActivo'
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
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([])
  const [error, setError] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [emitiendo, setEmitiendo] = useState(false)
  const [ultimo, setUltimo] = useState<string | null>(null)
  const watchRef = useRef<number | null>(null)
  const supabase = createClient()

  const consultar = async () => {
    setError(null)
    setAviso(null)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Inicia sesión.')
      return
    }
    const { data: viaje, error: vErr } = await supabase.from('viajes').select('*').eq('id', viajeId).maybeSingle()
    if (vErr || !viaje) {
      setError(vErr?.message || 'Viaje no encontrado o no eres parte.')
      return
    }
    const rol = rolSobreViaje(user.id, viaje)
    if (!puedeVerTelemetria(rol)) {
      setAviso('Solo solicitante y dueño ven el historial. Tú puedes emitir si eres operador.')
    } else {
      const { data, error: fetchError } = await supabase
        .from('rastreo_ubicaciones')
        .select('*')
        .or(`viaje_id.eq.${viajeId},carga_id.eq.${viajeId}`)
        .order('created_at', { ascending: false })
      if (fetchError) setError(fetchError.message)
      else setUbicaciones(data || [])
    }
  }

  const emitirPunto = async (lat: number, lon: number) => {
    const { error: e } = await supabase.from('rastreo_ubicaciones').insert({
      viaje_id: viajeId || null,
      carga_id: viajeId || null,
      latitud: lat,
      longitud: lon,
      fuente: 'celular',
    })
    if (e) setError(e.message)
    else setUltimo(`${lat.toFixed(5)}, ${lon.toFixed(5)} · ${new Date().toLocaleTimeString()}`)
  }

  const toggleEmision = () => {
    if (emitiendo) {
      if (watchRef.current != null) navigator.geolocation.clearWatch(watchRef.current)
      watchRef.current = null
      setEmitiendo(false)
      return
    }
    if (!navigator.geolocation) {
      setError('Este dispositivo no tiene GPS.')
      return
    }
    setEmitiendo(true)
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => emitirPunto(pos.coords.latitude, pos.coords.longitude),
      (err) => setError(err.message),
      { enableHighAccuracy: true, maximumAge: 8000, timeout: 15000 }
    )
  }

  useEffect(() => () => {
    if (watchRef.current != null) navigator.geolocation.clearWatch(watchRef.current)
  }, [])

  return (
    <AppShell title="Telemetría privada" subtitle="Emitir + consultar">
      <div className="rounded-2xl border border-emerald-900/50 bg-emerald-950/20 p-3 text-[11px] text-emerald-300">
        El operador emite desde el celular. El historial solo lo ven solicitante y dueño.
      </div>
      <div className="flex gap-2">
        <input
          placeholder="UUID del viaje"
          className="flex-1 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm"
          value={viajeId}
          onChange={(e) => setViajeId(e.target.value)}
        />
        <button onClick={consultar} className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold">Abrir</button>
      </div>
      <button
        onClick={toggleEmision}
        className={`w-full py-3 rounded-xl text-xs font-black uppercase ${emitiendo ? 'bg-red-600' : 'bg-white text-black'}`}
      >
        {emitiendo ? 'Detener emisión GPS' : 'Emitir mi posición (operador)'}
      </button>
      {ultimo && <p className="text-[11px] font-mono text-emerald-400">Último envío: {ultimo}</p>}
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {aviso && <p className="text-amber-300 text-xs">{aviso}</p>}
      <div className="space-y-2">
        {ubicaciones.map((loc) => (
          <div key={loc.id} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs flex justify-between">
            <div>
              <p className="font-mono text-emerald-400">{loc.latitud.toFixed(5)}, {loc.longitud.toFixed(5)}</p>
              <p className="text-zinc-500">{new Date(loc.created_at).toLocaleString()}</p>
            </div>
            <span className="text-[10px] uppercase text-zinc-400">{loc.fuente || 'celular'}</span>
          </div>
        ))}
      </div>
    </AppShell>
  )
}
