'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function ReputacionPage() {
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [rol, setRol] = useState<'operador' | 'empresa'>('operador')
  const [p1, setP1] = useState(5)
  const [p2, setP2] = useState(5)
  const [comentario, setComentario] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const enviar = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const payload =
      rol === 'operador'
        ? { puntualidad: p1, manejo: p2, honestidad_carga: null, rapidez_pago: null }
        : { puntualidad: null, manejo: null, honestidad_carga: p1, rapidez_pago: p2 }
    const { error } = await supabase.from('calificaciones').insert({
      viaje_id: viajeId || null,
      de_usuario: user?.id,
      rol_evaluado: rol,
      comentario,
      ...payload,
    })
    setMsg(error ? error.message : 'Calificación cruzada publicada en el expediente.')
  }

  return (
    <AppShell title="Reputación cruzada" subtitle="Operador ↔ empresa">
      <select value={rol} onChange={(e) => setRol(e.target.value as typeof rol)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs">
        <option value="operador">Evalúo al operador (puntualidad / manejo)</option>
        <option value="empresa">Evalúo a la empresa (honestidad de carga / pago)</option>
      </select>
      <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <label className="text-xs">{rol === 'operador' ? 'Puntualidad' : 'Honestidad de la carga'} {p1}
        <input type="range" min={1} max={5} value={p1} onChange={(e) => setP1(+e.target.value)} className="w-full" />
      </label>
      <label className="text-xs">{rol === 'operador' ? 'Manejo de carga' : 'Rapidez de anticipos'} {p2}
        <input type="range" min={1} max={5} value={p2} onChange={(e) => setP2(+e.target.value)} className="w-full" />
      </label>
      <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" rows={3} placeholder="Comentario" />
      <button onClick={enviar} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">Publicar</button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
