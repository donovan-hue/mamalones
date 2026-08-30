'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function BasculaPage() {
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [pesoEntrada, setPesoEntrada] = useState('')
  const [pesoSalida, setPesoSalida] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)


  const handleGuardarPesaje = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const pEntrada = parseFloat(pesoEntrada) || 0
    const pSalida = parseFloat(pesoSalida) || 0
    const pesoNeto = Math.abs(pSalida - pEntrada)
    const { error } = await supabase.from('bascula_registros').insert({
      viaje_id: viajeId || null,
      carga_id: viajeId || null,
      peso_entrada: pEntrada,
      peso_salida: pSalida,
      peso_neto: pesoNeto,
    })
    if (error) {
      await supabase.from('rendimiento_combustible').insert({
        viaje_id: viajeId || null,
        peso_ton: pesoNeto / 1000,
        nota: `bascula entrada ${pEntrada} salida ${pSalida}`,
      })
      setMensaje(error.message.includes('schema') ? `Ticket en bitácora de rendimiento. Neto ${pesoNeto} kg. Corre extras_patio.sql para tabla dedicada.` : error.message)
    } else {
      await supabase.from('viajes').update({ estado: 'en_bascula' }).eq('id', viajeId)
      setMensaje(`Ticket guardado. Neto: ${pesoNeto} kg`)
    }
    setLoading(false)
  }

  return (
    <AppShell title="Báscula" subtitle="Peso de entrada / salida">
      {mensaje && <p className="text-xs text-emerald-400">{mensaje}</p>}
      <form onSubmit={handleGuardarPesaje} className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
        <input required value={viajeId} onChange={(e) => setViajeId(e.target.value)} placeholder="UUID viaje" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <div className="grid grid-cols-2 gap-2">
          <input required type="number" value={pesoEntrada} onChange={(e) => setPesoEntrada(e.target.value)} placeholder="Entrada kg" className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          <input type="number" value={pesoSalida} onChange={(e) => setPesoSalida(e.target.value)} placeholder="Salida kg" className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        </div>
        <button disabled={loading} className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">
          {loading ? 'Registrando…' : 'Guardar pesaje'}
        </button>
      </form>
    </AppShell>
  )
}
