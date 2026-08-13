'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMensaje(`Error: ${error.message}`)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-white/20 shadow-2xl">
        <h1 className="text-2xl font-black text-center mb-6 tracking-wide">Iniciar Sesión</h1>
        
        {mensaje && (
          <p className="mb-4 text-xs font-semibold text-center text-zinc-300 bg-zinc-900 py-2.5 px-4 rounded-full border border-white/20">
            {mensaje}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-white text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-white text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-white text-black hover:bg-zinc-200 font-bold rounded-full transition-all border border-white text-sm cursor-pointer"
          >
            {loading ? 'Ingresando...' : 'Entrar al Sistema'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-400">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-white underline font-semibold hover:text-zinc-300">
            Crear Cuenta
          </Link>
        </p>
      </div>
    </div>
  )
}
