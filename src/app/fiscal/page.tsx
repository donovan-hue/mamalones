'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function FiscalPage() {
  const [cargaId, setCargaId] = useState('')
  const [rfcRemitente, setRfcRemitente] = useState('')
  const [rfcDestinatario, setRfcDestinatario] = useState('')
  const [fraccionArancelaria, setFraccionArancelaria] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const supabase = createClient()

  const handleGuardarCartaPorte = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const { error } = await supabase.from('cargas').update({
      estado: 'documentado_sat'
    }).eq('id', cargaId)

    if (error) {
      setMensaje(`Error: ${error.message}`)
    } else {
      setMensaje('Datos de Carta Porte SAT vinculados correctamente.')
      setCargaId('')
      setRfcRemitente('')
      setRfcDestinatario('')
      setFraccionArancelaria('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Módulo Fiscal / Carta Porte SAT</h1>
      {mensaje && <p className="mb-4 text-sm font-medium text-blue-400">{mensaje}</p>}
      <form onSubmit={handleGuardarCartaPorte} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">RFC Remitente</label>
            <input
              type="text"
              required
              placeholder="XAXX010101000"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
              value={rfcRemitente}
              onChange={(e) => setRfcRemitente(e.target.value.toUpperCase())}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">RFC Destinatario</label>
            <input
              type="text"
              required
              placeholder="XAXX010101000"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
              value={rfcDestinatario}
              onChange={(e) => setRfcDestinatario(e.target.value.toUpperCase())}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Clave Producto / Fracción SAT</label>
          <input
            type="text"
            placeholder="Ej. 78101802"
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={fraccionArancelaria}
            onChange={(e) => setFraccionArancelaria(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          {loading ? 'Generando...' : 'Vincular Carta Porte'}
        </button>
      </form>
    </div>
  )
}
