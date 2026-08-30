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
  peso_ton: number | null
}

export default function PerfilEmpresa() {
  const [seccion, setSeccion] = useState<'publicar' | 'ofertas' | 'seguridad' | 'pagos'>('publicar')
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [peso, setPeso] = useState('28')
  const [tarifa, setTarifa] = useState('45000')
  const [msg, setMsg] = useState<string | null>(null)
  const [viajes, setViajes] = useState<Viaje[]>([])

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

  const publicar = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setMsg('Inicia sesión.')
      return
    }
    const folio = `KR-${Date.now().toString(36).toUpperCase()}`
    const { data, error } = await supabase
      .from('viajes')
      .insert({
        folio,
        solicitante_id: user.id,
        origen,
        destino,
        peso_ton: Number(peso),
        tarifa_neta: Number(tarifa),
        estado: 'disponible',
      })
      .select('id')
      .single()
    if (error) setMsg(error.message)
    else {
      if (data?.id) setViajeActivo(data.id)
      setMsg(`Carga ${folio} publicada.`)
      setOrigen('')
      setDestino('')
      cargar()
    }
  }

  const aceptar = async (v: Viaje) => {
    const supabase = createClient()
    const { error } = await supabase.from('viajes').update({ estado: 'aceptado' }).eq('id', v.id)
    if (!error) {
      setViajeActivo(v.id)
      await supabase.from('contratos_digitales').insert({ viaje_id: v.id, tarifa_vinculante: v.tarifa_neta, hash_sello: `acepta-${v.id}` })
    }
    setMsg(error ? error.message : 'Oferta aceptada y contrato abierto.')
    cargar()
  }

  const contra = async (v: Viaje) => {
    const supabase = createClient()
    const nueva = Number(prompt('Nueva tarifa neta MXN', String(v.tarifa_neta || 0)))
    if (!nueva) return
    await supabase.from('negociaciones').insert({
      viaje_id: v.id,
      tarifa_propuesta: nueva,
      estado: 'contraoferta',
    })
    await supabase.from('viajes').update({ tarifa_neta: nueva }).eq('id', v.id)
    setMsg(`Contraoferta $${nueva.toLocaleString('es-MX')} enviada.`)
    cargar()
  }

  return (
    <AppShell title="Empresa / generador" subtitle="Publicar · ofertas · custodia · pagos">
      <div className="grid grid-cols-2 gap-2">
        {(['publicar', 'ofertas', 'seguridad', 'pagos'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSeccion(s)}
            className={`py-2.5 rounded-xl text-[10px] font-bold uppercase border ${seccion === s ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}
          >
            {s}
          </button>
        ))}
      </div>
      {msg && <p className="text-xs text-emerald-400">{msg}</p>}

      {seccion === 'publicar' && (
        <div className="vercel-card rounded-3xl p-5 space-y-2 text-xs">
          <input value={origen} onChange={(e) => setOrigen(e.target.value)} placeholder="Origen" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          <input value={destino} onChange={(e) => setDestino(e.target.value)} placeholder="Destino CEDIS" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          <div className="grid grid-cols-2 gap-2">
            <input value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ton" className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
            <input value={tarifa} onChange={(e) => setTarifa(e.target.value)} placeholder="Tarifa" className="bg-zinc-900 border border-zinc-800 rounded-xl p-2.5" />
          </div>
          <button onClick={publicar} className="w-full py-3 bg-white text-black font-black uppercase rounded-xl">
            Publicar en red
          </button>
        </div>
      )}

      {seccion === 'ofertas' && (
        <div className="space-y-2">
          {viajes.length === 0 && <p className="text-xs text-zinc-500">Sin cargas. Publica una.</p>}
          {viajes.map((v) => (
            <div key={v.id} className="vercel-card rounded-2xl p-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="font-bold">{v.origen} → {v.destino}</span>
                <span className="text-emerald-400">${Number(v.tarifa_neta || 0).toLocaleString('es-MX')}</span>
              </div>
              <p className="text-zinc-500">{v.folio} · {v.estado}</p>
              <div className="flex gap-2">
                <button onClick={() => aceptar(v)} className="flex-1 py-2 bg-white text-black rounded-lg font-bold uppercase text-[10px]">Aceptar</button>
                <button onClick={() => contra(v)} className="flex-1 py-2 bg-zinc-800 rounded-lg font-bold uppercase text-[10px]">Contraofertar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {seccion === 'seguridad' && (
        <div className="space-y-2 text-xs">
          <Link href="/seguridad" className="block vercel-card rounded-2xl p-4">Abrir SOS y centro de control →</Link>
          <Link href="/rastreo" className="block vercel-card rounded-2xl p-4">Telemetría privada (solo tú y la fletera) →</Link>
        </div>
      )}

      {seccion === 'pagos' && (
        <div className="space-y-2 text-xs">
          <Link href="/anticipos" className="block vercel-card rounded-2xl p-4">Calcular y fondear anticipo diésel/casetas →</Link>
          <Link href="/billetera" className="block vercel-card rounded-2xl p-4">Liquidar saldo contra POD →</Link>
        </div>
      )}
    </AppShell>
  )
}
