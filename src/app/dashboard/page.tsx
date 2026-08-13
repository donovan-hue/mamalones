'use client'

import { useState } from 'react'

export default function DashboardPage() {
  // Estado persistente del Dashboard
  const [origen, setOrigen] = useState('Guadalajara, Jal.')
  const [destino, setDestino] = useState('Monterrey, N.L.')
  const [puntosPaso, setPuntosPaso] = useState(['San Luis Potosí, SLP', 'Saltillo, Coah.'])
  
  // Estados de UI
  const [editando, setEditando] = useState(false)
  const [tempPuntos, setTempPuntos] = useState(puntosPaso.join(', '))
  const [seccionActiva, setSeccionActiva] = useState('flota')

  const guardarRuta = () => {
    setPuntosPaso(tempPuntos.split(',').map(s => s.trim()).filter(s => s !== ""))
    setEditando(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header Fijo */}
      <header className="mb-6 border-b border-zinc-800 pb-4">
        <h1 className="text-xl font-black uppercase">KRONOS-SPACE.COM</h1>
        <p className="text-[10px] text-zinc-500 uppercase">Panel Logístico</p>
      </header>

      {/* Tabs para no navegar fuera */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setSeccionActiva('flota')} className={`px-4 py-2 rounded-full text-[10px] font-bold ${seccionActiva === 'flota' ? 'bg-white text-black' : 'bg-zinc-900'}`}>FLOTA</button>
        <button onClick={() => setSeccionActiva('ruta')} className={`px-4 py-2 rounded-full text-[10px] font-bold ${seccionActiva === 'ruta' ? 'bg-white text-black' : 'bg-zinc-900'}`}>PLANIFICAR RUTA</button>
      </div>

      {seccionActiva === 'ruta' ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
          <h2 className="text-xs font-bold uppercase mb-4 text-white border-l-2 border-white pl-3">Ruta Activa</h2>
          
          <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold">{origen}</span>
              </div>
              {puntosPaso.map((punto, i) => (
                <div key={i} className="flex items-center gap-3 ml-0.5">
                  <div className="w-0.5 h-6 bg-zinc-700"></div>
                  <span className="text-[10px] text-zinc-400 font-medium italic">{punto}</span>
                </div>
              ))}
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white"></div>
                <span className="text-xs font-bold">{destino}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setEditando(true)}
              className="mt-6 w-full py-3 border border-zinc-700 rounded-xl text-[10px] font-bold uppercase hover:bg-zinc-800 transition-all"
            >
              Editar Ciudades de Paso
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-600 text-xs uppercase tracking-widest">
          Panel de Flota en desarrollo...
        </div>
      )}

      {/* Modal - Renderizado dentro de la misma página */}
      {editando && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-3xl w-full max-w-sm">
            <h3 className="text-xs font-bold uppercase mb-4">Ciudades de Paso (separadas por coma)</h3>
            <textarea 
              value={tempPuntos} 
              onChange={(e) => setTempPuntos(e.target.value)}
              className="w-full h-24 bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-white"
            />
            <div className="flex gap-2 mt-4">
              <button onClick={() => setEditando(false)} className="w-1/2 py-3 text-xs font-bold bg-zinc-800 rounded-xl">CANCELAR</button>
              <button 
                onClick={guardarRuta}
                className="w-1/2 py-3 text-xs font-bold bg-white text-black rounded-xl"
              >
                GUARDAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
