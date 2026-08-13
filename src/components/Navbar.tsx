'use client'

import Link from 'next/link'
import Logo from './Logo'

export default function Navbar() {
  return (
    <nav className="bg-black border-b border-zinc-800 px-6 py-3 flex justify-between items-center text-white">
      <Link href="/dashboard">
        <Logo className="h-7 w-auto" />
      </Link>
      <div className="flex gap-4 text-sm text-zinc-400 font-medium">
        <Link href="/cargas" className="hover:text-white transition">Cargas</Link>
        <Link href="/rastreo" className="hover:text-white transition">Rastreo</Link>
        <Link href="/login" className="hover:text-white transition">Cuenta</Link>
      </div>
    </nav>
  )
}
