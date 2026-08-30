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

export default function PerfilOperador() {
  const [seccion, setSeccion] = useState<'disponibles' | 'viaje_activo' | 'seguridad'>('disponibles')
  const [viajes, setViajes] = useState<Viaje[]>([])
  const [msg, setMsg] = useState<string | null>(null)
  const [mio, setMio] = useState<Viaje | null>(null)

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

  const postular = async (v: Viaje) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMsg('Inicia sesión.')
      return
    }
    const { error } = await supabase.from('viajes').update({ operador_id: user.id, estado: 'asignado' }).eq('id', v.id)
    await supabase.from('credenciales_intercambio').insert({
      viaje_id: v.id,
      operador_id: user.id,
      estado_validacion: 'enviado',
      payload_carta_porte: { at: new Date().toISOString() },
    })
    setViajeActivo(v.id)
    setMio(v)
    setSeccion('viaje_activo')
    setMsg(error ? error.message : 'Postulación y credenciales enviadas a la empresa.')
    cargar()
  }

  return (
    <AppShell title="Operador" subtitle="Publicaciones · acuerdo · protocolos">
      <div className="grid grid-cols-3 gap-2">
        {(['disponibles', 'viaje_activo', 'seguridad'] as const).map((s) => (
          <button key={s} onClick={() => setSeccion(s)} className={`py-2 rounded-xl text-[9px] font-bold uppercase border ${seccion === s ? 'bg-white text-black' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
            {s.replace('_', ' ')}
          </button>
        ))}
      </div>
      {msg && <p className="text-xs text-emerald-400">{msg}</p>}

      {seccion === 'disponibles' && (
        <div className="space-y-2">
          {viajes.filter((v) => v.estado === 'disponible' || !v.estado).map((v) => (
            <div key={v.id} className="vercel-card rounded-2xl p-3 text-xs space-y-2">
              <div className="flex justify-between font-bold">
                <span>{v.origen} → {v.destino}</span>
                <span className="text-emerald-400">${Number(v.tarifa_neta || 0).toLocaleString('es-MX')}</span>
              </div>
              <p className="text-zinc-500">{v.folio}</p>
              <button onClick={() => postular(v)} className="w-full py-2 bg-white text-black rounded-lg font-bold uppercase text-[10px]">
                Aceptar y postularse
              </button>
            </div>
          ))}
          {viajes.filter((v) => v.estado === 'disponible' || !v.estado).length === 0 && (
            <p className="text-xs text-zinc-500">No hay publicaciones abiertas.</p>
          )}
        </div>
      )}

      {seccion === 'viaje_activo' && (
        <div className="vercel-card rounded-3xl p-5 text-xs space-y-2">
          {mio ? (
            <>
              <p className="font-black uppercase">Acuerdo</p>
              <p>{mio.origen} → {mio.destino}</p>
              <p className="text-emerald-400">${Number(mio.tarifa_neta || 0).toLocaleString('es-MX')}</p>
              <Link href="/anticipos" className="block py-2 text-center bg-zinc-800 rounded-xl">Ver anticipo</Link>
              <Link href="/inspeccion" className="block py-2 text-center bg-white text-black rounded-xl font-bold">Checklist pre-arranque</Link>
            </>
          ) : (
            <p className="text-zinc-500">Postúlate a una carga para ver el acuerdo.</p>
          )}
        </div>
      )}

      {seccion === 'seguridad' && (
        <div className="space-y-2 text-xs">
          <Link href="/seguridad" className="block vercel-card rounded-2xl p-4">SOS vial →</Link>
          <Link href="/bitacora" className="block vercel-card rounded-2xl p-4">Horas NOM-087 →</Link>
        </div>
      )}
    </AppShell>
  )
}
