'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PerfilDuenoPage() {
  const [nombrePropietario, setNombrePropietario] = useState('')
  const [telefono, setTelefono] = useState('')
  const [licenciaFederal, setLicenciaFederal] = useState('')
  const [tipoUnidad, setTipoUnidad] = useState('Tractocamión Quinta Rueda')
  const [placasUnidad, setPlacasUnidad] = useState('')
  const [numChasis, setNumChasis] = useState('')
  const [configuracionEjes, setConfiguracionEjes] = useState('Full (Tractocamión + 2 Semirremolques)')
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
          Registro Detallado Dueño - Operador y Unidad
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Nombre Completo del Propietario</label>
            <input
              type="text"
              required
              placeholder="Tu nombre completo"
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={nombrePropietario}
              onChange={(e) => setNombrePropietario(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Teléfono Celular</label>
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
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Licencia Federal</label>
              <input
                type="text"
                required
                placeholder="Número de licencia"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={licenciaFederal}
                onChange={(e) => setLicenciaFederal(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Tipo de Unidad</label>
            <select
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={tipoUnidad}
              onChange={(e) => setTipoUnidad(e.target.value)}
            >
              <option value="Tractocamión Quinta Rueda">Tractocamión Quinta Rueda</option>
              <option value="Torton / Redilas">Torton / Redilas</option>
              <option value="Camión Unitario Ligero">Camión Unitario Ligero</option>
              <option value="Full / Configuración Especial">Full / Configuración Especial</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Placas de la Unidad</label>
              <input
                type="text"
                required
                placeholder="Ej. 12-AB-34C"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
                value={placasUnidad}
                onChange={(e) => setPlacasUnidad(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Número de Serie (VIN / Chasis)</label>
              <input
                type="text"
                required
                placeholder="Código de 17 dígitos del chasis"
                className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all uppercase"
                value={numChasis}
                onChange={(e) => setNumChasis(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-3 text-zinc-400">Configuración de Ejes / Remolque</label>
            <select
              className="w-full px-5 py-3 rounded-full bg-zinc-900 border border-zinc-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 transition-all"
              value={configuracionEjes}
              onChange={(e) => setConfiguracionEjes(e.target.value)}
            >
              <option value="Full (Tractocamión + 2 Semirremolques)">Full (Tractocamión + 2 Semirremolques)</option>
              <option value="Sencillo (Tractocamión + 1 Semirremolque)">Sencillo (Tractocamión + 1 Semirremolque)</option>
              <option value="Unidad Rígida (Torton / C3)">Unidad Rígida (Torton / C3)</option>
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
