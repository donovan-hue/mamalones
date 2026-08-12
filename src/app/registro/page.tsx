'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function RegistroPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nombre, setNombre] = useState('')
  const [rol, setRol] = useState<'solicitante' | 'dueno_fletera' | 'chofer'>('solicitante')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert([
        {
          id: data.user.id,
          nombre,
          rol,
        },
      ])

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }

      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <form onSubmit={handleRegistro} className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-4">
        <h1 className="text-2xl font-bold text-center">Registro de Usuario</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre Completo</label>
          <input
            type="text"
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
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
        <div>
          <label className="block text-sm font-medium mb-1">Rol</label>
          <select
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={rol}
            onChange={(e) => setRol(e.target.value as any)}
          >
            <option value="solicitante">Solicitante de Servicio</option>
            <option value="dueno_fletera">Dueño de Fletera</option>
            <option value="chofer">Chofer</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
        >
          {loading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}
