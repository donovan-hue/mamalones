'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilEmpresaPage() {
  const [razonSocial, setRazonSocial] = useState('')
  const [rfc, setRfc] = useState('')
  const [representante, setRepresentante] = useState('')
  const [telefono, setTelefono] = useState('')
  const [tipoCarga, setTipoCarga] = useState('Caja Seca')
  const [unidades, setUnidades] = useState('')
  const [operadores, setOperadores] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí puedes conectar el guardado de datos a Supabase
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <h1 className="text-2xl font-black uppercase tracking-wider text-center mb-1 text-white">
          KRONOS-SPACE.COM
        </h1>
        <p className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase text-center mb-6">
          Registro Detallado de Flota y Empresa
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Razón Social / Nombre Comercial</label>
            <input
              type="text"
              required
              placeholder="Ej. Transportes y Logística del Norte S.A. de C.V."
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">RFC de la Empresa</label>
              <input
                type="text"
                required
                placeholder="ABC123456XYZ"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
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
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Representante Legal</label>
            <input
              type="text"
              required
              placeholder="Nombre completo del representante"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={representante}
              onChange={(e) => setRepresentante(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Cantidad de Unidades</label>
              <input
                type="number"
                required
                placeholder="Ej. 10"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={unidades}
                onChange={(e) => setUnidades(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Operadores Registrados</label>
              <input
                type="number"
                required
                placeholder="Ej. 12"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={operadores}
                onChange={(e) => setOperadores(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Tipo Principal de Carga</label>
            <select
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={tipoCarga}
              onChange={(e) => setTipoCarga(e.target.value)}
            >
              <option value="Caja Seca">Caja Seca / General</option>
              <option value="Refrigerado">Refrigerado (Thermo King)</option>
              <option value="Plataforma">Plataforma / Full</option>
              <option value="Carga Especializada">Carga Especializada / Sobredimensionada</option>
              <option value="Materiales Peligrosos">Materiales Peligrosos (Hazmat)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 mt-6 bg-white text-black hover:bg-zinc-200 font-extrabold rounded-full transition-all text-sm cursor-pointer shadow-lg active:scale-[0.98]"
          >
            Guardar Registro y Continuar
          </button>
        </form>
      </div>
    </div>
  )
}
