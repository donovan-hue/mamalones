'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { getViajeActivo } from '@/lib/viajeActivo'

async function hashTexto(t: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t))
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function ContratosPage() {
  const [viajeId, setViajeId] = useState(() => getViajeActivo())
  const [tarifa, setTarifa] = useState(45000)
  const [hash, setHash] = useState<string | null>(null)
  const [msg, setMsg] = useState<string | null>(null)

  const firmar = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const sello = await hashTexto(`${viajeId}|${tarifa}|${user?.id}|${Date.now()}`)
    setHash(sello)
    const { error } = await supabase.from('contratos_digitales').insert({
      viaje_id: viajeId || null,
      hash_sello: sello,
      firmante_empresa: user?.id,
      tarifa_vinculante: tarifa,
    })
    setMsg(error ? error.message : 'Contrato sellado. Cancelación unilateral queda registrada.')
  }

  return (
    <AppShell title="Firma digital" subtitle="Sello de tiempo y tarifa vinculante">
      <input placeholder="UUID viaje" value={viajeId} onChange={(e) => setViajeId(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <label className="text-xs text-zinc-500">Tarifa pactada
        <input type="number" value={tarifa} onChange={(e) => setTarifa(+e.target.value)} className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white" />
      </label>
      <button onClick={firmar} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
        Aceptar carga y sellar
      </button>
      {hash && <p className="text-[10px] font-mono break-all text-emerald-400">{hash}</p>}
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
