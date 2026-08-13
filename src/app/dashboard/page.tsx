'use client'

import Link from 'next/link'
import AppShell from '@/components/AppShell'

const MODULOS = [
  { href: '/anticipos', t: 'Anticipos y viáticos', d: 'Diésel, casetas y depósito al operador antes de arrancar.' },
  { href: '/rastreo', t: 'Telemetría privada', d: 'GPS solo entre solicitante y dueño de fletera.' },
  { href: '/credenciales', t: 'Credenciales Carta Porte', d: 'Intercambio automático de licencias al postularse.' },
  { href: '/negociacion', t: 'Acuerdos de itinerario', d: 'Hora de carga, CEDIS y tarifa neta en vivo.' },
  { href: '/seguridad', t: 'Alertas y SOS', d: 'Pánico integrado al centro de control.' },
  { href: '/offgrid', t: 'Enlace off-grid', d: 'Balizas y SMS cifrados sin señal celular.' },
  { href: '/rendimiento', t: 'Combustible vs carga', d: 'Detecta mermas cruzando peso, litros y pendiente.' },
  { href: '/billetera', t: 'Liquidación instantánea', d: 'Saldo al subir POD firmado. Sin 30/60 días.' },
  { href: '/inspeccion', t: 'Checklist pre-arranque', d: 'Fotos de mercancía, sellos y caja.' },
  { href: '/bitacora', t: 'Horas NOM-087', d: 'Volante y descansos para evitar multas.' },
  { href: '/contratos', t: 'Firma digital', d: 'Sello de tiempo y tarifa vinculante.' },
  { href: '/reputacion', t: 'Reputación cruzada', d: 'Operador ↔ empresa: puntualidad y pagos.' },
  { href: '/peaje', t: 'Peaje / TAG IAVE', d: 'Casetas de ruta y saldo telepeaje.' },
  { href: '/expediente', t: 'Expediente en nube', d: 'Pólizas, licencias y verificación mecánica.' },
  { href: '/clima', t: 'Clima y bloqueos', d: 'Alertas de cierre vial y desvíos.' },
]

export default function Dashboard() {
  return (
    <AppShell title="Panel logístico" subtitle="Módulos Kronos — red privada">
      <div className="grid sm:grid-cols-2 gap-3">
        {MODULOS.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="vercel-card rounded-2xl p-4 hover:bg-zinc-950"
          >
            <p className="text-sm font-semibold">{m.t}</p>
            <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{m.d}</p>
          </Link>
        ))}
      </div>
      <p className="text-[10px] text-zinc-600">
        La telemetría en vivo nunca es pública. RLS en Supabase: solo solicitante y dueño.
      </p>
    </AppShell>
  )
}
