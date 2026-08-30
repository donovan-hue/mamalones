'use client'

import { useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { subirEvidencia } from '@/lib/storage'

const TIPOS = ['poliza_carga', 'licencia_federal', 'tarjeta_circulacion', 'verificacion_mecanica'] as const

export default function ExpedientePage() {
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('poliza_carga')
  const [file, setFile] = useState<File | null>(null)
  const [vigencia, setVigencia] = useState('')
  const [docs, setDocs] = useState<{ tipo: string; vigencia: string; alerta: boolean; url: string }[]>([])
  const [msg, setMsg] = useState<string | null>(null)

  const add = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMsg('Inicia sesión.')
      return
    }
    if (!file) {
      setMsg('Elige un archivo.')
      return
    }
    const up = await subirEvidencia(supabase, file, `expediente/${user.id}`)
    if (up.error) {
      setMsg(up.error + ' — corre storage_y_rls.sql (bucket evidencias).')
      return
    }
    const alerta = vigencia ? new Date(vigencia) < new Date(Date.now() + 30 * 86400000) : false
    const { error } = await supabase.from('expediente_docs').insert({
      usuario_id: user.id,
      tipo,
      url: up.path,
      vigencia: vigencia || null,
      alerta_caducidad: alerta,
    })
    setDocs((d) => [...d, { tipo, vigencia, alerta, url: up.path }])
    setMsg(error ? error.message : alerta ? 'Subido. Caduca en menos de 30 días.' : 'Documento en Storage.')
  }

  return (
    <AppShell title="Expediente digital" subtitle="Archivos en bucket evidencias">
      <select value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs">
        <option value="poliza_carga">Póliza de seguro de carga</option>
        <option value="licencia_federal">Licencia federal</option>
        <option value="tarjeta_circulacion">Tarjeta de circulación</option>
        <option value="verificacion_mecanica">Revisión mecánico-física</option>
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-xs" />
      <input type="date" value={vigencia} onChange={(e) => setVigencia(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs" />
      <button onClick={add} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">Subir al repositorio</button>
      {docs.map((d, i) => (
        <a key={i} href={d.url} target="_blank" rel="noreferrer" className="flex justify-between text-xs vercel-card rounded-xl px-3 py-2">
          <span>{d.tipo}</span>
          <span className={d.alerta ? 'text-amber-400' : 'text-zinc-500'}>{d.vigencia || 'archivo'}</span>
        </a>
      ))}
      {msg && <p className="text-xs text-zinc-400">{msg}</p>}
    </AppShell>
  )
}
