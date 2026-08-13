'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilDinamicoPage({ params }: { params: Promise<{ rol: string }> }) {
  const resolvedParams = use(params)
  const rol = resolvedParams.rol
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl text-center">
        <h1 className="text-2xl font-black uppercase tracking-wider text-white mb-1">
          kronos-space.com
        </h1>
        <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-6">
          Perfil: {rol}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {rol === 'empresa' && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Razón Social</label>
                <input required placeholder="Ej. Logística Global S.A." className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">RFC</label>
                <input required placeholder="ABC123456XYZ" className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none" />
              </div>
            </>
          )}

          {rol === 'dueno' && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Tipo de Unidad</label>
                <input required placeholder="Ej. Quinta Rueda / Torton" className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Placas</label>
                <input required placeholder="Placas de la unidad" className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none" />
              </div>
            </>
          )}

          {rol === 'operador' && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Número de Licencia</label>
                <input required placeholder="Licencia vigente" className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Años de Experiencia</label>
                <input required placeholder="Ej. 5 años" className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none" />
              </div>
            </>
          )}

          <button type="submit" className="w-full py-3.5 mt-4 bg-white text-black font-extrabold rounded-full text-sm hover:bg-zinc-200 transition-all">
            Completar Registro
          </button>
        </form>
      </div>
    </div>
  )
}
