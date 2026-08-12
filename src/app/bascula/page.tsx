'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function BasculaPage() {
  const [cargaId, setCargaId] = useState('')
  const [pesoEntrada, setPesoEntrada] = useState('')
  const [pesoSalida, setPesoSalida] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const supabase = createClient()

  const handleGuardarPesaje = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const pEntrada = parseFloat(pesoEntrada) || 0
    const pSalida = parseFloat(pesoSalida) || 0
    const pesoNeto = Math.abs(pSalida - pEntrada)

    const { error } = await supabase.from('bascula_registros').insert([
      {
        carga_id: cargaId,
        peso_entrada: pEntrada,
        peso_salida: pSalida,
        peso_neto: pesoNeto,
      },
    ])

    if (error) {
      setMensaje(`Error: ${error.message}`)
    } else {
      setMensaje(`Ticket guardado con éxito. Peso neto: ${pesoNeto} kg`)
      setCargaId('')
      setPesoEntrada('')
      setPesoSalida('')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Registro de Báscula</h1>
      {mensaje && <p className="mb-4 text-sm font-medium text-blue-400">{mensaje}</p>}
      <form onSubmit={handleGuardarPesaje} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
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
            <label className="block text-sm font-medium mb-1">Peso Entrada (kg)</label>
            <input
              type="number"
              required
              placeholder="0.00"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
              value={pesoEntrada}
              onChange={(e) => setPesoEntrada(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Peso Salida (kg)</label>
            <input
              type="number"
              placeholder="0.00"
              className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
              value={pesoSalida}
              onChange={(e) => setPesoSalida(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          {loading ? 'Registrando...' : 'Guardar Pesaje'}
        </button>
      </form>
    </div>
  )
}
