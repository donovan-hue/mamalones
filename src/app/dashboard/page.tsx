'use client'
import { useState } from 'react'

export default function Dashboard() {
  // Simulamos el rol actual (en producción vendrá de la sesión/token del usuario)
  // Opciones: 'dueno' | 'empresa' | 'operador'
  const [rolActual, setRolActual] = useState<'dueno' | 'empresa' | 'operador'>('dueno')
  const [tab, setTab] = useState<'flota' | 'viajes' | 'ruta' | 'ajustes'>('flota')

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Selector rápido de prueba de roles */}
      <div className="mb-4 p-3 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between text-xs">
        <span className="text-zinc-400">Rol Activo (Simulación):</span>
        <select 
          value={rolActual} 
          onChange={(e) => setRolActual(e.target.value as any)}
          className="bg-zinc-900 border border-zinc-700 text-white px-2 py-1 rounded-lg text-xs font-bold"
        >
          <option value="dueno">Dueño - Operador</option>
          <option value="empresa">Empresa / Generador</option>
          <option value="operador">Operador Profesional</option>
        </select>
      </div>

      <header className="mb-6 border-b border-zinc-800 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-sm font-black uppercase tracking-widest text-white">KRONOS-SPACE.COM</h1>
          <p className="text-[10px] text-zinc-500 uppercase">Panel Logístico Privado</p>
        </div>
      </header>

      {/* Menú de navegación superior */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button onClick={() => setTab('flota')} className={`px-4 py-2 rounded-xl text-xs font-bold ${tab === 'flota' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>Flota</button>
        <button onClick={() => setTab('viajes')} className={`px-4 py-2 rounded-xl text-xs font-bold ${tab === 'viajes' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>Viajes</button>
        
        {/* RESTRICCIÓN: La pestaña 'Ruta / Telemetría' solo la ven el Dueño y la Empresa */}
        {rolActual !== 'operador' && (
          <button onClick={() => setTab('ruta')} className={`px-4 py-2 rounded-xl text-xs font-bold ${tab === 'ruta' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>
            Ruta Activa (GPS)
          </button>
        )}
        <button onClick={() => setTab('ajustes')} className={`px-4 py-2 rounded-xl text-xs font-bold ${tab === 'ajustes' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'}`}>Ajustes</button>
      </div>

      {/* Contenido según el rol y pestaña */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
        {rolActual === 'operador' ? (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-zinc-400">Mi Bitácora de Viaje Asignado</h2>
            <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs space-y-2">
              <p className="font-bold text-white">Destino: Monterrey, N.L.</p>
              <p className="text-zinc-400">Instrucciones de descarga y tiempos de descanso.</p>
              <p className="text-[10px] text-emerald-400 pt-2 border-t border-zinc-800">
                🔒 Ubicación transmitida de forma privada al dueño y solicitante.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase text-zinc-400">
              {rolActual === 'dueno' ? 'Monitoreo Satelital de Flota Propietaria' : 'Seguimiento de Carga Activa (Cliente)'}
            </h2>
            <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Unidad en Tránsito:</span>
                <span className="font-bold text-white">ECO-04</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Velocidad Actual:</span>
                <span className="font-bold text-emerald-400">85 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Ubicación Precisa:</span>
                <span className="font-bold text-white">Autopista Lagos - San Luis Potosí</span>
              </div>
              <p className="text-[10px] text-zinc-500 italic pt-2 border-t border-zinc-800">
                *Telemetría oculta para terceros. Acceso exclusivo del Dueño de la fletera y el Solicitante.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
