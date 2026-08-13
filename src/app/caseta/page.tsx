'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function CasetaPage() {
  const [viajeId, setViajeId] = useState('')
  const [tipoEvento, setTipoEvento] = useState<'entrada' | 'salida'>('entrada')
  const [observaciones, setObservaciones] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)

  useEffect(() => setViajeId(getViajeActivo()), [])

  const handle = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from('caseta_registros').insert({
      viaje_id: viajeId,
      carga_id: viajeId,
      tipo_evento: tipoEvento,
      observaciones,
    })
    if (error) {
      await supabase.from('alertas_viales').insert({
        viaje_id: viajeId || null,
        tipo: 'caseta',
        descripcion: `${tipoEvento}: ${observaciones}`,
      })
      setMensaje('Registrado en alertas de patio (tabla caseta opcional).')
    } else setMensaje(`Acceso de ${tipoEvento} guardado.`)
    setLoading(false)
  }

  return (
    <AppShell title="Caseta / acceso" subtitle="Entrada y salida de planta">
      {mensaje && <p className="text-xs text-emerald-400">{mensaje}</p>}
      <form onSubmit={handle} className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
        <input required value={viajeId} onChange={(e) => setViajeId(e.target.value)} placeholder="UUID viaje" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <select value={tipoEvento} onChange={(e) => setTipoEvento(e.target.value as 'entrada' | 'salida')} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5">
          <option value="entrada">Entrada a planta</option>
          <option value="salida">Salida de planta</option>
        </select>
        <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} placeholder="Sellos, placas, unidad" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <button disabled={loading} className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">Registrar acceso</button>
      </form>
    </AppShell>
  )
}
