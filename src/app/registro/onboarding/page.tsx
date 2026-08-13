'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-zinc-800 text-center shadow-2xl">
        <h1 className="text-2xl font-black uppercase mb-1">KRONOS-SPACE.COM</h1>
        <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-8">Selecciona tu Perfil</p>

        <div className="space-y-3">
          <Link href="/registro/perfil/empresa" className="block w-full py-3.5 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-full text-sm hover:bg-zinc-800 transition-all">
            Empresa / Generador
          </Link>
          <Link href="/registro/perfil/dueno" className="block w-full py-3.5 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-full text-sm hover:bg-zinc-800 transition-all">
            Dueño - Operador
          </Link>
          <Link href="/registro/perfil/operador" className="block w-full py-3.5 bg-zinc-900 border border-zinc-700 text-white font-bold rounded-full text-sm hover:bg-zinc-800 transition-all">
            Operador Profesional
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900">
          <button
            onClick={() => router.push('/dashboard')}
            className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-semibold rounded-full text-xs transition-all border border-zinc-800"
          >
            ⚡ Omitir y ver App (Dashboard)
          </button>
        </div>
      </div>
    </div>
  )
}
