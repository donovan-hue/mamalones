'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const ROLES = [
  { id: 'empresa' as const, href: '/registro/perfil/empresa', label: 'Empresa / Generador' },
  { id: 'dueno' as const, href: '/registro/perfil/dueno', label: 'Dueño de fletera' },
  { id: 'operador' as const, href: '/registro/perfil/operador', label: 'Operador profesional' },
]

export default function OnboardingPage() {
  const router = useRouter()

  const elegir = async (rol: 'empresa' | 'dueno' | 'operador', href: string) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('perfiles').upsert({
        id: user.id,
        rol,
        nombre: (user.user_metadata?.nombre_completo as string) || user.email,
      })
    }
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-zinc-800 text-center">
        <h1 className="text-2xl font-black uppercase mb-1">KRONOS-SPACE.COM</h1>
        <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-8">Selecciona tu perfil</p>
        <div className="space-y-3">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => elegir(r.id, r.href)}
              className="block w-full py-3.5 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-full text-sm"
            >
              {r.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-8 w-full py-3 text-xs text-zinc-500"
        >
          Ir al panel
        </button>
      </div>
    </div>
  )
}
