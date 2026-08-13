'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'

const TIPOS = ['poliza_carga', 'licencia_federal', 'tarjeta_circulacion', 'verificacion_mecanica'] as const

export default function ExpedientePage() {
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('poliza_carga')
  const [url, setUrl] = useState('')
  const [vigencia, setVigencia] = useState('')
  const [docs, setDocs] = useState<{ tipo: string; vigencia: string; alerta: boolean }[]>([])
  const [msg, setMsg] = useState<string | null>(null)

  const add = async () => {
    const alerta = vigencia ? new Date(vigencia) < new Date(Date.now() + 30 * 86400000) : false
    setDocs((d) => [...d, { tipo, vigencia, alerta }])
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('expediente_docs').insert({
      usuario_id: user?.id,
      tipo,
      url,
      vigencia: vigencia || null,
      alerta_caducidad: alerta,
    })
    setMsg(error ? error.message : alerta ? 'Documento guardado. Caduca en menos de 30 días.' : 'Documento en la nube.')
  }

  return (
    <AppShell title="Expediente digital" subtitle="Pólizas, licencias, circulación">
      <select value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs">
        <option value="poliza_carga">Póliza de seguro de carga</option>
        <option value="licencia_federal">Licencia federal</option>
        <option value="tarjeta_circulacion">Tarjeta de circulación</option>
        <option value="verificacion_mecanica">Revisión mecánico-física</option>
      </select>
      <input placeholder="URL o folio en la nube" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <input type="date" value={vigencia} onChange={(e) => setVigencia(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <button onClick={add} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">Subir al repositorio</button>
      {docs.map((d, i) => (
        <div key={i} className="flex justify-between text-xs vercel-card rounded-xl px-3 py-2">
          <span>{d.tipo}</span>
          <span className={d.alerta ? 'text-amber-400' : 'text-zinc-500'}>{d.vigencia || 's/v'}{d.alerta ? ' · por vencer' : ''}</span>
        </div>
      ))}
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
