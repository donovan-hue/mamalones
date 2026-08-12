'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function EntregaPage() {
  const [cargaId, setCargaId] = useState('')
  const [receptorNombre, setReceptorNombre] = useState('')
  const [observaciones, setObservaciones] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const supabase = createClient()

  const handleCompletarEntrega = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const { error: updateError } = await supabase
      .from('cargas')
      .update({ estado: 'entregado' })
      .eq('id', cargaId)

    if (updateError) {
      setMensaje(`Error al actualizar estado: ${updateError.message}`)
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase
      .from('caseta_registros')
      .insert([
        {
          carga_id: cargaId,
          tipo_evento: 'salida',
          observaciones: `Entregado a: ${receptorNombre}. Notas: ${observaciones}`,
        },
      ])

    if (insertError) {
      setMensaje(`Entrega marcada pero falló el acuse: ${insertError.message}`)
    } else {
      setMensaje('¡Entrega confirmada y registrada exitosamente!')
      setCargaId('')
      setReceptorNombre('')
      setObservaciones('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-emerald-400">Confirmación de Entrega y Acuse</h1>
      {mensaje && <p className="mb-4 text-sm font-medium text-blue-400">{mensaje}</p>}
      <form onSubmit={handleCompletarEntrega} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
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
          <label className="block text-sm font-medium mb-1">Nombre de Quien Recibe</label>
          <input
            type="text"
            required
            placeholder="Nombre completo"
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={receptorNombre}
            onChange={(e) => setReceptorNombre(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Observaciones / Checkpoint Final</label>
          <textarea
            rows={3}
            placeholder="Estado del empaque, condiciones de descarga..."
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold transition"
        >
          {loading ? 'Procesando...' : 'Finalizar Viaje y Registrar Acuse'}
        </button>
      </form>
    </div>
  )
}
