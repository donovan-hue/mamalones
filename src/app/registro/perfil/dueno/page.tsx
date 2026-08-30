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
  estado: string | null
}

export default function PerfilDueno() {
  const [seccion, setSeccion] = useState<'unidad' | 'ofertas' | 'seguridad' | 'bitacora'>('unidad')
  const [viajes, setViajes] = useState<Viaje[]>([])
  const [msg, setMsg] = useState<string | null>(null)
  const [estatus, setEstatus] = useState('en_transito')

  const cargar = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('viajes').select('*').order('created_at', { ascending: false })
    setViajes((data as Viaje[]) || [])
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      void cargar()
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const activo = viajes.find((v) => v.estado === 'asignado' || v.estado === 'aceptado' || v.estado === 'en_transito') || viajes[0]

  const actualizar = async () => {
    if (!activo) return
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('viajes').update({ estado: estatus, dueno_id: user?.id }).eq('id', activo.id)
    setViajeActivo(activo.id)
    setMsg(error ? error.message : `Estatus ${estatus} guardado.`)
    cargar()
  }

  const tomar = async (v: Viaje) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('viajes').update({ dueno_id: user?.id, estado: 'asignado' }).eq('id', v.id)
    setViajeActivo(v.id)
    setMsg(error ? error.message : 'Carga tomada por tu fletera.')
    cargar()
  }

  const contra = async (v: Viaje) => {
    const n = Number(prompt('Contraoferta MXN', String(v.tarifa_neta || 0)))
    if (!n) return
    const supabase = createClient()
    await supabase.from('negociaciones').insert({ viaje_id: v.id, tarifa_propuesta: n, estado: 'contraoferta' })
    await supabase.from('viajes').update({ tarifa_neta: n }).eq('id', v.id)
    setMsg('Contraoferta registrada.')
    cargar()
  }

  return (
    <AppShell title="Dueño de fletera" subtitle="Unidad · bolsa · protocolos · gastos">
      <div className="grid grid-cols-2 gap-2">
        {(['unidad', 'ofertas', 'seguridad', 'bitacora'] as const).map((s) => (
          <button key={s} onClick={() => setSeccion(s)} className={`py-2.5 rounded-xl text-[10px] font-bold uppercase border ${seccion === s ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
            {s}
          </button>
        ))}
      </div>
      {msg && <p className="text-xs text-emerald-400">{msg}</p>}

      {seccion === 'unidad' && (
        <div className="vercel-card rounded-3xl p-5 space-y-3 text-xs">
          {activo ? (
            <>
              <p className="font-bold">{activo.folio} · {activo.origen} → {activo.destino}</p>
              <p className="text-zinc-500">Estado actual: {activo.estado}</p>
              <select value={estatus} onChange={(e) => setEstatus(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5">
                <option value="en_transito">En tránsito</option>
                <option value="en_bascula">En báscula</option>
                <option value="entregado">Entregado</option>
              </select>
              <button onClick={actualizar} className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">Actualizar estatus</button>
            </>
          ) : (
            <p className="text-zinc-500">Aún no hay viaje. Toma uno en ofertas.</p>
          )}
        </div>
      )}

      {seccion === 'ofertas' && (
        <div className="space-y-2">
          {viajes.map((v) => (
            <div key={v.id} className="vercel-card rounded-2xl p-3 text-xs space-y-2">
              <div className="flex justify-between font-bold">
                <span>{v.origen} → {v.destino}</span>
                <span className="text-emerald-400">${Number(v.tarifa_neta || 0).toLocaleString('es-MX')}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => tomar(v)} className="flex-1 py-2 bg-white text-black rounded-lg font-bold uppercase text-[10px]">Tomar carga</button>
                <button onClick={() => contra(v)} className="flex-1 py-2 bg-zinc-800 rounded-lg font-bold uppercase text-[10px]">Contraoferta</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {seccion === 'seguridad' && (
        <div className="space-y-2 text-xs">
          <Link href="/seguridad" className="block vercel-card rounded-2xl p-4">Botón de pánico →</Link>
          <Link href="/clima" className="block vercel-card rounded-2xl p-4">Clima y bloqueos →</Link>
        </div>
      )}

      {seccion === 'bitacora' && (
        <div className="space-y-2 text-xs">
          <Link href="/anticipos" className="block vercel-card rounded-2xl p-4">Anticipo diésel / casetas →</Link>
          <Link href="/expediente" className="block vercel-card rounded-2xl p-4">Subir comprobante al expediente →</Link>
        </div>
      )}
    </AppShell>
  )
}
