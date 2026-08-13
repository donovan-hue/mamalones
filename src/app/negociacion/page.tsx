'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'

export default function NegociacionPage() {
  const [viajeId, setViajeId] = useState('')
  const [horaCarga, setHoraCarga] = useState('')
  const [cedis, setCedis] = useState('')
  const [tarifa, setTarifa] = useState(45000)
  const [chat, setChat] = useState('')
  const [hilos, setHilos] = useState<{ de: string; texto: string; at: string }[]>([])
  const [msg, setMsg] = useState<string | null>(null)

  const enviar = () => {
    if (!chat.trim()) return
    setHilos((h) => [...h, { de: 'tú', texto: chat, at: new Date().toLocaleTimeString() }])
    setChat('')
  }

  const pactar = async () => {
    const supabase = createClient()
    const { error } = await supabase.from('negociaciones').insert({
      viaje_id: viajeId || null,
      hora_carga: horaCarga || null,
      hora_limite_cedis: cedis || null,
      tarifa_propuesta: tarifa,
      tarifa_acordada: tarifa,
      mensajes: hilos,
      estado: 'pactada',
    })
    setMsg(error ? error.message : 'Itinerario y tarifa neta sellados sin intermediario.')
  }

  return (
    <AppShell title="Canal de acuerdos" subtitle="Carga · CEDIS · tarifa neta">
      <div className="grid gap-2 text-xs">
        <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <label className="text-zinc-500">Hora exacta de carga
          <input type="datetime-local" value={horaCarga} onChange={(e) => setHoraCarga(e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white" />
        </label>
        <label className="text-zinc-500">Límite entrega CEDIS
          <input type="datetime-local" value={cedis} onChange={(e) => setCedis(e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white" />
        </label>
        <label className="text-zinc-500">Tarifa neta MXN
          <input type="number" value={tarifa} onChange={(e) => setTarifa(+e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        </label>
      </div>
      <div className="vercel-card rounded-2xl p-3 space-y-2 min-h-[140px]">
        {hilos.length === 0 && <p className="text-[11px] text-zinc-600">Pacten horarios y precio aquí. Sin comisión de marketplace.</p>}
        {hilos.map((m, i) => (
          <p key={i} className="text-xs"><span className="text-zinc-500">{m.at}</span> {m.texto}</p>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Mensaje de negociación" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-xs" />
        <button onClick={enviar} className="px-3 bg-zinc-800 rounded-xl text-xs">Enviar</button>
      </div>
      <button onClick={pactar} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Cerrar acuerdo vinculante
      </button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
