'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PanicButton from './PanicButton'

const NAV = [
  { href: '/dashboard', label: 'Panel' },
  { href: '/cargas', label: 'Cargas' },
  { href: '/publicar', label: 'Publicar' },
  { href: '/anticipos', label: 'Anticipos' },
  { href: '/inspeccion', label: 'Pre-arranque' },
  { href: '/rastreo', label: 'GPS' },
  { href: '/entrega', label: 'POD' },
  { href: '/billetera', label: 'Pago' },
]

export default function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
}) {
  const path = usePathname()
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-900 px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <Link href="/dashboard" className="text-[11px] font-black tracking-[0.2em] uppercase">
            KRONOS-SPACE
          </Link>
          <h1 className="text-sm font-semibold mt-0.5">{title}</h1>
          {subtitle && <p className="text-[10px] text-zinc-500 uppercase">{subtitle}</p>}
        </div>
        <PanicButton />
      </header>
      <nav className="flex gap-1 overflow-x-auto px-3 py-2 border-b border-zinc-900 text-[10px] font-bold uppercase">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${
              path === n.href ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'
            }`}
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 max-w-3xl mx-auto space-y-4">{children}</div>
    </div>
  )
}
