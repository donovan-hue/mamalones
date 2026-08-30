'use client'

import { useEffect, useState } from 'react'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'

export default function ConfiguracionPage() {
  const [nombre, setNombre] = useState('')
  const [rfc, setRfc] = useState('')
  const [rol, setRol] = useState('empresa')
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase.from('perfiles').select('*').eq('id', user.id).maybeSingle()
      if (data) {
        setNombre(data.nombre || '')
        setRfc(data.rfc || '')
        setRol(data.rol || 'empresa')
      } else {
        setNombre((user.user_metadata?.nombre_completo as string) || user.email || '')
      }
    })
  }, [])

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMsg('Inicia sesión.')
      return
    }
    const { error } = await supabase.from('perfiles').upsert({ id: user.id, nombre, rfc, rol })
    setMsg(error ? error.message : 'Perfil guardado en Supabase.')
  }

  return (
    <AppShell title="Configuración" subtitle="Perfil real en la nube">
      {msg && <p className="text-xs text-emerald-400">{msg}</p>}
      <form onSubmit={guardar} className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Razón social / nombre" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <input value={rfc} onChange={(e) => setRfc(e.target.value.toUpperCase())} placeholder="RFC" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
        <select value={rol} onChange={(e) => setRol(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5">
          <option value="empresa">Empresa</option>
          <option value="dueno">Dueño</option>
          <option value="operador">Operador</option>
        </select>
        <button className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">Guardar en base de datos</button>
      </form>
    </AppShell>
  )
}
