'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function PublicarPage() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handlePublicar = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('Debes iniciar sesión para publicar una carga.')
      setLoading(false)
      return
    }

    const { error: insertError } = await supabase.from('cargas').insert([
      {
        solicitante_id: user.id,
        origen,
        destino,
        estado: 'pendiente'
      }
    ])

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      router.push('/cargas')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Publicar Nueva Carga</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handlePublicar} className="space-y-4 bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <div>
          <label className="block text-sm font-medium mb-1">Origen</label>
          <input
            type="text"
            required
            placeholder="Ej. Guadalajara, JAL"
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Destino</label>
          <input
            type="text"
            required
            placeholder="Ej. Monterrey, NL"
            className="w-full p-2.5 rounded bg-zinc-800 border border-zinc-700 text-white"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
        >
          {loading ? 'Guardando...' : 'Publicar Carga'}
        </button>
      </form>
    </div>
  )
}
