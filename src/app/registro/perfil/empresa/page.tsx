'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PerfilEmpresa() {
  const [seccion, setSeccion] = useState<'publicar' | 'ofertas' | 'seguridad' | 'pagos'>('publicar')

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-4">
      <header className="border-b border-zinc-800 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-xs font-black uppercase tracking-widest text-white">KRONOS-SPACE.COM</h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Panel Corporativo | Empresa / Generador</p>
        </div>
        <Link href="/registro" className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl font-bold hover:bg-zinc-800 transition-all">← Volver</Link>
      </header>

      {/* Submenú de configuración y detalles empresariales */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setSeccion('publicar')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'publicar' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          📦 Publicar Carga
        </button>
        <button onClick={() => setSeccion('ofertas')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'ofertas' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          💰 Ofertas y Tarifas
        </button>
        <button onClick={() => setSeccion('seguridad')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'seguridad' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          🛡️ Seguridad y Custodia
        </button>
        <button onClick={() => setSeccion('pagos')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'pagos' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          💳 Depósitos y Pagos
        </button>
      </div>

      {/* Contenido Dinámico de la Empresa */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl">
        
        {seccion === 'publicar' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Detalles de Solicitud de Carga Masiva</h2>
            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-bold">Ruta (Origen ➔ Destino)</label>
                <input type="text" placeholder="Ej. Guadalajara, Jal. ➔ Monterrey, N.L." className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white text-xs focus:outline-none focus:border-zinc-600" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Tipo de Unidad</label>
                  <select className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white text-xs">
                    <option>Tráiler 53&apos; (Caja Seca)</option>
                    <option>Full / Doble Semirremolque</option>
                    <option>Plataforma 40&apos;</option>
                    <option>Torton / Redilas</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 uppercase font-bold">Peso Neto (Ton)</label>
                  <input type="text" placeholder="Ej. 28 Toneladas" className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white text-xs" />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-zinc-500 uppercase font-bold">Folio de Carta Porte / Requisitos</label>
                <input type="text" placeholder="Número de CFDI / XML Complemento Carta Porte" className="w-full mt-1 bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white text-xs" />
              </div>
              <button className="w-full py-3 bg-white text-black font-black uppercase text-xs rounded-xl mt-2 hover:bg-zinc-200 transition-all">
                Publicar Viaje en Red Logística
              </button>
            </div>
          </div>
        )}

        {seccion === 'ofertas' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Ofertas Recibidas de Fleteras / Chóferes</h2>
            <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Fletera Transportes del Norte</span>
                <span className="text-emerald-400 font-black">$45,000 MXN</span>
              </div>
              <p className="text-[10px] text-zinc-400">Unidad asignada: Kenworth T680 (ECO-12) con operador verificado.</p>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 py-2 bg-white text-black font-bold rounded-lg text-[10px] uppercase">Aceptar Oferta</button>
                <button className="flex-1 py-2 bg-zinc-800 text-zinc-300 font-bold rounded-lg text-[10px] uppercase">Contraofertar</button>
              </div>
            </div>
          </div>
        )}

        {seccion === 'seguridad' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Protocolos y Custodia de Ruta</h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Custodia Armada Opcional</p>
                  <p className="text-[10px] text-zinc-400">Acompañamiento táctico satelital en tramos de alto riesgo.</p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-white" />
              </div>
              <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Monitoreo Estricto de Paradas</p>
                  <p className="text-[10px] text-zinc-400">Alerta automática si la unidad se detiene fuera de ruta autorizada.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-white" />
              </div>
            </div>
          </div>
        )}

        {seccion === 'pagos' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Gestión de Anticipos y Depósitos</h2>
            <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Anticipo Liberado (Diesel/Casetas):</span>
                <span className="font-bold text-white">30% ($13,500 MXN)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Depósito en Garantía (Escrow):</span>
                <span className="font-bold text-emerald-400">Retenido en plataforma</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800">
                <span className="text-zinc-400">Saldo Contra Entrega (POD):</span>
                <span className="font-bold text-white">70% ($31,500 MXN)</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
