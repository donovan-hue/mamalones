'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function IncidentesPage() {
  const [cargaId, setCargaId] = useState('')
  const [tipo, setTipo] = useState('mecanico')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const supabase = createClient()

  const handleReportarIncidente = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const { error } = await supabase.from('incidentes').insert([
      {
        carga_id: cargaId,
        tipo,
        descripcion,
      },
    ])

    if (error) {
      setMensaje(`Error: ${error.message}`)
    } else {
      setMensaje('Incidente reportado exitosamente.')
      setCargaId('')
      setDescripcion('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-red-500">Reporte de Incidentes en Ruta</h1>
      {mensaje && <p className="mb-4 text-sm font-medium text-blue-400">{mensaje}</p>}
      <form onSubmit={handleReportarIncidente} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div>
          <label className="block text-sm font-medium mb-1">ID del Viaje / Carga</label>
          <input
            type="text"
            required
            placeholder="UUID del viaje"
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={cargaId}
            onChange={(e) => setCargaId(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Evento</label>
          <select
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="mecanico">Falla Mecánica</option>
            <option value="accidente">Siniestro / Accidente</option>
            <option value="reten">Retén / Bloqueo Vial</option>
            <option value="retraso">Retraso Operativo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Detalles del Incidente</label>
          <textarea
            rows={4}
            required
            placeholder="Describe lo ocurrido y ubicación aproximada..."
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          {loading ? 'Enviando...' : 'Enviar Reporte de Alerta'}
        </button>
      </form>
    </div>
  )
}
