'use client'

import AppShell from '@/components/AppShell'
import PanicButton from '@/components/PanicButton'

export default function SeguridadPage() {
  return (
    <AppShell title="Alerta temprana" subtitle="Centro de control satelital">
      <div className="vercel-card rounded-3xl p-6 text-center space-y-4">
        <p className="text-xs text-zinc-400">
          El botón SOS envía posición (si hay red) o queda en cola off-grid. El dueño y el centro de control reciben la alerta.
        </p>
        <div className="flex justify-center scale-150 py-4">
          <PanicButton />
        </div>
      </div>
      <ul className="text-[11px] text-zinc-500 space-y-1 list-disc pl-4">
        <li>Incidencia en carretera reportada en un toque.</li>
        <li>Se registra en alertas_emergencia (Supabase).</li>
        <li>Compatible con el canal satelital / SMS cifrado.</li>
      </ul>
    </AppShell>
  )
}
