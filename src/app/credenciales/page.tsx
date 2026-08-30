'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

export default function CredencialesPage() {
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [licencia, setLicencia] = useState('')
  const [tipo, setTipo] = useState('E Federal')
  const [vigencia, setVigencia] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const postular = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMsg('Inicia sesión como operador.')
      return
    }
    const { error } = await supabase.from('credenciales_intercambio').insert({
      viaje_id: viajeId,
      operador_id: user.id,
      licencia_federal: licencia,
      tipo_licencia: tipo,
      vigencia,
      estado_validacion: 'enviado',
      payload_carta_porte: {
        operador: user.id,
        licencia,
        tipo,
        vigencia,
        intercambiado_at: new Date().toISOString(),
      },
    })
    setMsg(error ? error.message : 'Credenciales enviadas a la empresa. Carta Porte puede validarse sin llamada.')
  }

  return (
    <AppShell title="Sincronización de credenciales" subtitle="Postulación → Carta Porte">
      <p className="text-xs text-zinc-400">
        Al postularse, la licencia federal y vigencia se empujan al expediente del solicitante.
      </p>
      <div className="space-y-2 text-xs">
        <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <input placeholder="Número de licencia federal" value={licencia} onChange={(e) => setLicencia(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <input placeholder="Tipo (E / B Federal)" value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <input type="date" value={vigencia} onChange={(e) => setVigencia(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
      </div>
      <button onClick={postular} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Postularse e intercambiar credenciales
      </button>
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
