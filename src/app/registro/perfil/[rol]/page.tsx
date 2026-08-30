'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'

export default function PerfilDinamicoPage({ params }: { params: Promise<{ rol: string }> }) {
  const { rol } = use(params)
  const router = useRouter()
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [msg, setMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMsg('Inicia sesión.')
      return
    }
    const extra = rol === 'empresa' ? { nombre: a, rfc: b } : { nombre: a, rfc: b }
    const { error } = await supabase.from('perfiles').upsert({
      id: user.id,
      rol: rol === 'dueno' || rol === 'operador' || rol === 'empresa' ? rol : 'operador',
      ...extra,
    })
    if (error) setMsg(error.message)
    else router.push('/dashboard')
  }

  return (
    <AppShell title={`Perfil ${rol}`} subtitle="Datos que viajan a Carta Porte">
      {msg && <p className="text-xs text-red-400">{msg}</p>}
      <form onSubmit={handleSubmit} className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
        {rol === 'empresa' && (
          <>
            <input required value={a} onChange={(e) => setA(e.target.value)} placeholder="Razón social" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
            <input required value={b} onChange={(e) => setB(e.target.value)} placeholder="RFC" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          </>
        )}
        {rol === 'dueno' && (
          <>
            <input required value={a} onChange={(e) => setA(e.target.value)} placeholder="Tipo de unidad" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
            <input required value={b} onChange={(e) => setB(e.target.value)} placeholder="Placas" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          </>
        )}
        {rol === 'operador' && (
          <>
            <input required value={a} onChange={(e) => setA(e.target.value)} placeholder="Licencia federal" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
            <input required value={b} onChange={(e) => setB(e.target.value)} placeholder="Años de experiencia" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          </>
        )}
        <button className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">Guardar y entrar</button>
      </form>
    </AppShell>
  )
}
