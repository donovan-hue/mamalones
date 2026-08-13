'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilEmpresaPage() {
  const [razonSocial, setRazonSocial] = useState('')
  const [rfc, setRfc] = useState('')
  const [telefono, setTelefono] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí guardas los datos de la empresa en Supabase
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl text-center">
        <h1 className="text-2xl font-black uppercase tracking-wider text-white mb-1">kronos-space.com</h1>
        <p className="text-[10px] tracking-[0.2em] text-zinc-500 uppercase mb-6">Datos de Empresa / Generador</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Razón Social / Nombre Comercial</label>
            <input
              type="text"
              required
              placeholder="Ej. Logística Global S.A. de C.V."
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">RFC</label>
            <input
              type="text"
              required
              placeholder="ABC123456XYZ"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white"
              value={rfc}
              onChange={(e) => setRfc(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Teléfono de Contacto</label>
            <input
              type="tel"
              required
              placeholder="33 1234 5678"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-4 bg-white text-black font-extrabold rounded-full text-sm hover:bg-zinc-200 transition-all active:scale-[0.98]"
          >
            Finalizar y Crear Perfil
          </button>
        </form>
      </div>
    </div>
  )
}
