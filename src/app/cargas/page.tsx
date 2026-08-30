'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import AppShell from '@/components/AppShell'
import { createClient } from '@/lib/supabase'
import { setViajeActivo } from '@/lib/viajeActivo'

type Viaje = {
  id: string
  folio: string | null
  origen: string
  destino: string
  tarifa_neta: number | null
  peso_ton: number | null
  estado: string | null
  created_at: string
}

export default function CargasPage() {
  const [viajes, setViajes] = useState<Viaje[]>([])
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('viajes')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setErr(error.message)
        setViajes((data as Viaje[]) || [])
        setLoading(false)
      })
  }, [])

  const postular = async (v: Viaje) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setErr('Inicia sesión para postularte.')
      return
    }
    await supabase.from('viajes').update({ operador_id: user.id, estado: 'asignado' }).eq('id', v.id)
    await supabase.from('credenciales_intercambio').insert({
      viaje_id: v.id,
      operador_id: user.id,
      estado_validacion: 'enviado',
      payload_carta_porte: { auto: true, at: new Date().toISOString() },
    })
    setViajeActivo(v.id)
    setViajes((list) => list.map((x) => (x.id === v.id ? { ...x, estado: 'asignado' } : x)))
  }

  return (
    <AppShell title="Tablero de cargas" subtitle="Viajes reales · sin demo">
      <div className="flex justify-between items-center">
        <p className="text-[11px] text-zinc-500">Al postularse se intercambian credenciales para Carta Porte.</p>
        <Link href="/publicar" className="text-xs bg-white text-black px-3 py-1.5 rounded-xl font-bold">
          Publicar
        </Link>
      </div>
      {err && <p className="text-xs text-red-400">{err}</p>}
      {loading && <p className="text-xs text-zinc-500">Cargando…</p>}
      {!loading && viajes.length === 0 && (
        <p className="text-xs text-zinc-500">No hay viajes. Publica el primero.</p>
      )}
      {viajes.map((v) => (
        <div key={v.id} className="vercel-card rounded-2xl p-4 space-y-2">
          <div className="flex justify-between text-[10px] uppercase text-zinc-500">
            <span>{v.folio || v.id.slice(0, 8)}</span>
            <span>{v.estado}</span>
          </div>
          <p className="text-sm font-semibold">
            {v.origen} → {v.destino}
          </p>
          <p className="text-xs text-zinc-400">
            {v.peso_ton ?? '—'} t · ${(v.tarifa_neta ?? 0).toLocaleString('es-MX')}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => postular(v)}
              className="flex-1 py-2 bg-white text-black rounded-xl text-[10px] font-black uppercase"
            >
              Postularse + credenciales
            </button>
            <button
              onClick={() => {
                setViajeActivo(v.id)
                location.href = '/anticipos'
              }}
              className="px-3 py-2 bg-zinc-800 rounded-xl text-[10px] uppercase"
            >
              Operar
            </button>
          </div>
        </div>
      ))}
    </AppShell>
  )
}
