'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface Ubicacion {
  id: string
  latitud: number
  longitud: number
  created_at: string
}

export default function RastreoPage() {
  const [cargaId, setCargaId] = useState('')
  const [ubicaciones, setUbicaciones] = useState<Ubicacion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const fetchUbicaciones = async () => {
    if (!cargaId) return
    setLoading(true)
    setError(null)

    const { data, error: fetchError } = await supabase
      .from('rastreo_ubicaciones')
      .select('*')
      .eq('carga_id', cargaId)
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else if (data) {
      setUbicaciones(data)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Telemetría y Rastreo en Tiempo Real</h1>
      
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Ingresa el ID de la Carga"
          className="flex-1 p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={cargaId}
          onChange={(e) => setCargaId(e.target.value)}
        />
        <button
          onClick={fetchUbicaciones}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
        >
          Consultar
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-zinc-500">Cargando datos GPS de la unidad...</p>
      ) : ubicaciones.length > 0 ? (
        <div className="space-y-3">
          {ubicaciones.map((loc) => (
            <div key={loc.id} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl flex justify-between items-center">
              <div>
                <p className="font-mono text-sm text-blue-400">Lat: {loc.latitud}, Lon: {loc.longitud}</p>
                <p className="text-xs text-zinc-500">{new Date(loc.created_at).toLocaleString()}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-emerald-400 border border-emerald-900">
                Activo
              </span>
            </div>
          ))}
        </div>
      ) : cargaId ? (
        <p className="text-zinc-500">No se encontraron coordenadas registradas o no tienes permisos para ver esta carga.</p>
      ) : null}
    </div>
  )
}
