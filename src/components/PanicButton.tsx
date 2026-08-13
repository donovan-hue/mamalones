'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function PanicButton() {
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState<string | null>(null)

  const disparar = async () => {
    if (!confirm('¿Enviar alerta de pánico al centro de control satelital?')) return
    setBusy(true)
    setOk(null)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    let lat: number | null = null
    let lon: number | null = null
    try {
      const pos = await new Promise<GeolocationPosition>((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 4000 })
      )
      lat = pos.coords.latitude
      lon = pos.coords.longitude
    } catch {
      /* off-grid: se envía sin coords */
    }
    const { error } = await supabase.from('alertas_emergencia').insert({
      operador_id: user?.id ?? null,
      tipo: 'panico',
      latitud: lat,
      longitud: lon,
      nota: 'SOS vial — botón de emergencia Kronos',
    })
    setBusy(false)
    setOk(error ? error.message : 'Alerta enviada al centro de control')
    setTimeout(() => setOk(null), 4000)
  }

  return (
    <div className="text-right">
      <button
        onClick={disparar}
        disabled={busy}
        className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-[10px] font-black uppercase tracking-wide"
      >
        {busy ? 'Enviando…' : 'SOS vial'}
      </button>
      {ok && <p className="text-[9px] text-zinc-400 mt-1 max-w-[160px]">{ok}</p>}
    </div>
  )
}
