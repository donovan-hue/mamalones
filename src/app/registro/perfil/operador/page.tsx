'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilOperadorPage() {
  const [nombreOperador, setNombreOperador] = useState('')
  const [telefono, setTelefono] = useState('')
  const [licenciaFederal, setLicenciaFederal] = useState('')
  const [vigenciaLicencia, setVigenciaLicencia] = useState('')
  const [experiencia, setExperiencia] = useState('')
  const [tipoLicencia, setTipoLicencia] = useState('Licencia Federal Tipo B / E')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-lg bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <h1 className="text-2xl font-black uppercase tracking-wider text-center mb-1 text-white">
          KRONOS-SPACE.COM
        </h1>
        <p className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase text-center mb-6">
          Registro Profesional de Operador
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Nombre Completo del Operador</label>
            <input
              type="text"
              required
              placeholder="Nombre y apellidos"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={nombreOperador}
              onChange={(e) => setNombreOperador(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Teléfono Personal</label>
              <input
                type="tel"
                required
                placeholder="33 1234 5678"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Años de Experiencia</label>
              <input
                type="number"
                required
                placeholder="Ej. 8 años"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={experiencia}
                onChange={(e) => setExperiencia(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Tipo de Licencia Federal</label>
            <select
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={tipoLicencia}
              onChange={(e) => setTipoLicencia(e.target.value)}
            >
              <option value="Licencia Federal Tipo B / E">Tipo B / E (Carga General y Materiales Peligrosos)</option>
              <option value="Licencia Federal Tipo C">Tipo C (Camión Unitario)</option>
              <option value="Licencia Federal Tipo A">Tipo A (Autotransporte Federal de Pasajeros)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Número de Licencia Federal</label>
              <input
                type="text"
                required
                placeholder="Folio de credencial"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all uppercase"
                value={licenciaFederal}
                onChange={(e) => setLicenciaFederal(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Vigencia de Licencia</label>
              <input
                type="date"
                required
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={vigenciaLicencia}
                onChange={(e) => setVigenciaLicencia(e.target.value)}
              />
            </div>
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
