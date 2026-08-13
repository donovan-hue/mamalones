'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function RegistroPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre_completo: nombre,
        },
      },
    })

    if (error) {
      setMensaje(`Error: ${error.message}`)
    } else {
      setMensaje('Cuenta creada con éxito. Redirigiendo...')
      setTimeout(() => router.push('/dashboard'), 1500)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl text-center">
        {/* Marca y Subtítulo con K y Guion */}
        <h1 className="text-3xl font-black tracking-wider text-white uppercase mb-1">
          kronos-space.com
        </h1>
        <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-8">
          logística autónoma
        </p>

        <h2 className="text-lg font-bold text-left mb-4 text-zinc-200">
          Registro de Usuario
        </h2>
        
        {mensaje && (
          <p className="mb-4 text-xs font-semibold text-center text-zinc-300 bg-zinc-900 py-2.5 px-4 rounded-full border border-zinc-800">
            {mensaje}
          </p>
        )}

        <form onSubmit={handleRegistro} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Tu nombre o empresa"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
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
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-white text-black hover:bg-zinc-200 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-lg active:scale-[0.98]"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-white underline font-semibold hover:text-zinc-300">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
