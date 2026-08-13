'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { setViajeActivo } from '@/lib/viajeActivo'

export default function PublicarPage() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [peso, setPeso] = useState(28)
  const [tarifa, setTarifa] = useState(45000)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handlePublicar = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('Inicia sesión para publicar.')
      setLoading(false)
      return
    }
    const folio = `KR-${Date.now().toString(36).toUpperCase()}`
    const { data, error: insertError } = await supabase
      .from('viajes')
      .insert({
        folio,
        solicitante_id: user.id,
        origen,
        destino,
        peso_ton: peso,
        tarifa_neta: tarifa,
        estado: 'disponible',
      })
      .select('id')
      .single()

    if (insertError) {
      setError(insertError.message + ' — corre supabase/rls_operativo.sql si habla de policy.')
      setLoading(false)
      return
    }
    if (data?.id) setViajeActivo(data.id)
    router.push('/cargas')
  }

  return (
    <AppShell title="Publicar carga" subtitle="Crea un viaje real en Supabase">
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <form onSubmit={handlePublicar} className="space-y-3 vercel-card rounded-2xl p-4">
        <input required placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm" />
        <input required placeholder="Destino / CEDIS" value={destino} onChange={(e) => setDestino(e.target.value)} className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm" />
        <div className="grid grid-cols-2 gap-2">
          <input type="number" value={peso} onChange={(e) => setPeso(+e.target.value)} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm" />
          <input type="number" value={tarifa} onChange={(e) => setTarifa(+e.target.value)} className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm" />
        </div>
        <button disabled={loading} className="w-full py-3 bg-white text-black rounded-xl text-xs font-black uppercase">
          {loading ? 'Publicando…' : 'Publicar en red privada'}
        </button>
      </form>
    </AppShell>
  )
}
