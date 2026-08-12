'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function CasetaPage() {
  const [cargaId, setCargaId] = useState('')
  const [tipoEvento, setTipoEvento] = useState<'entrada' | 'salida'>('entrada')
  const [observaciones, setObservaciones] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const supabase = createClient()

  const handleRegistroAcceso = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const { error } = await supabase.from('caseta_registros').insert([
      {
        carga_id: cargaId,
        tipo_evento: tipoEvento,
        observaciones,
      },
    ])

    if (error) {
      setMensaje(`Error: ${error.message}`)
    } else {
      setMensaje(`Acceso de ${tipoEvento} registrado correctamente.`)
      setCargaId('')
      setObservaciones('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Control de Caseta / Acceso</h1>
      {mensaje && <p className="mb-4 text-sm font-medium text-blue-400">{mensaje}</p>}
      <form onSubmit={handleRegistroAcceso} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
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
          <label className="block text-sm font-medium mb-1">Evento</label>
          <select
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={tipoEvento}
            onChange={(e) => setTipoEvento(e.target.value as any)}
          >
            <option value="entrada">Entrada a Planta</option>
            <option value="salida">Salida de Planta</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Observaciones / Inspección</label>
          <textarea
            rows={3}
            placeholder="Estatus de sellos, placas o detalles de la unidad..."
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          {loading ? 'Procesando...' : 'Registrar Acceso'}
        </button>
      </form>
    </div>
  )
}
