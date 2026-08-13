'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import { createClient } from '@/lib/supabase'

export default function PortadaPage() {
  const router = useRouter()
  const supabase = createClient()

  const handleAccesoCorporativo = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      router.push('/dashboard')
    } else {
      router.push('/registro')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between p-6">
      <header className="flex items-center justify-between max-w-5xl mx-auto w-full py-4">
        <Logo className="h-8 w-auto" />
        <div className="flex gap-3">
          <Link href="/login" className="px-4 py-2 text-sm rounded bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition">
            Iniciar Sesión
          </Link>
          <Link href="/registro" className="px-4 py-2 text-sm rounded bg-white text-black font-semibold hover:bg-zinc-200 transition">
            Crear Cuenta
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto text-center space-y-6 my-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Logística Autónoma
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
          Ecosistema corporativo para la optimización de flotas, trazabilidad en tiempo real y cumplimiento normativo de transporte de carga.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleAccesoCorporativo}
            className="px-8 py-3 bg-white text-black hover:bg-zinc-200 text-lg font-bold rounded-xl transition cursor-pointer"
          >
            Acceso Corporativo
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-zinc-600 py-4 border-t border-zinc-900">
        <a href="/dashboard" className="text-zinc-400 underline mr-3">Panel</a>
        kronos-space.com © 2026 — Plataforma de Gestión Logística
      </footer>
    </div>
  )
}
