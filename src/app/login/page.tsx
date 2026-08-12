'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
          <input
            type="email"
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}
