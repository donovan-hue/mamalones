'use client'

import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-black uppercase mb-2">KRONOS-SPACE.COM</h1>
      <p className="text-xs font-semibold tracking-widest text-zinc-400 uppercase mb-8">Logística Autónoma</p>
      
      <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 max-w-sm w-full space-y-4">
        <h2 className="text-lg font-bold">Bienvenido al Panel</h2>
        <p className="text-xs text-zinc-400">Has iniciado sesión correctamente.</p>
        
        <Link 
          href="/registro/onboarding" 
          className="block w-full py-3 bg-white text-black font-extrabold rounded-full text-sm hover:bg-zinc-200 transition-all"
        >
          Ir a Selección de Perfil
        </Link>
      </div>
    </div>
  )
}
