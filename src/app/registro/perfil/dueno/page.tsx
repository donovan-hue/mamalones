'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PerfilDueno() {
  const [seccion, setSeccion] = useState<'unidad' | 'ofertas' | 'seguridad' | 'bitacora'>('unidad')

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-4">
      <header className="border-b border-zinc-800 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-xs font-black uppercase tracking-widest text-white">KRONOS-SPACE.COM</h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Panel Propietario | Dueño - Operador</p>
        </div>
        <Link href="/registro" className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl font-bold hover:bg-zinc-800 transition-all">← Volver</Link>
      </header>

      {/* Submenú de configuraciones para el Dueño-Operador */}
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => setSeccion('unidad')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'unidad' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          🚚 Mi Unidad Activa
        </button>
        <button onClick={() => setSeccion('ofertas')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'ofertas' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          💼 Cargas y Ofertas
        </button>
        <button onClick={() => setSeccion('seguridad')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'seguridad' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          🛡️ Protocolos y Alertas
        </button>
        <button onClick={() => setSeccion('bitacora')} className={`py-2.5 px-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${seccion === 'bitacora' ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          ⛽ Anticipos y Gastos
        </button>
      </div>

      {/* Contenido Dinámico del Dueño-Operador */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl">
        
        {seccion === 'unidad' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Estado de Mi Unidad Propietaria</h2>
            <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Económico / Tracto:</span>
                <span className="font-bold text-white">Kenworth T680 (ECO-01)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Estado de Ruta:</span>
                <span className="font-bold text-emerald-400">En Tránsito (Privado)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Telemetría GPS:</span>
                <span className="font-bold text-white">Conectado (Visible solo tú y cliente)</span>
              </div>
            </div>
            <button className="w-full py-3 bg-white text-black font-black uppercase text-xs rounded-xl hover:bg-zinc-200 transition-all">
              Actualizar Estatus de Viaje
            </button>
          </div>
        )}

        {seccion === 'ofertas' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Bolsa de Cargas y Propuestas de Tarifa</h2>
            <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">GDL ➔ MTY (Caja Seca 53&apos;)</span>
                <span className="text-emerald-400 font-black">$45,000 MXN</span>
              </div>
              <p className="text-[10px] text-zinc-400">Generador: Empresa Industrial del Norte. Pago de anticipo del 30% inmediato.</p>
              <div className="flex gap-2 pt-1">
                <button className="flex-1 py-2 bg-white text-black font-bold rounded-lg text-[10px] uppercase">Aceptar y Tomar Carga</button>
                <button className="flex-1 py-2 bg-zinc-800 text-zinc-300 font-bold rounded-lg text-[10px] uppercase">Enviar Contraoferta</button>
              </div>
            </div>
          </div>
        )}

        {seccion === 'seguridad' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Protocolos de Seguridad Vial</h2>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Botón de Pánico / Alerta Silenciosa</p>
                  <p className="text-[10px] text-zinc-400">Notifica de inmediato al cliente y autoridades en ruta de emergencia.</p>
                </div>
                <span className="px-2 py-1 bg-red-950 text-red-400 text-[9px] font-bold rounded-lg border border-red-800">ACTIVO</span>
              </div>
              <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Verificación de Paradas Seguras</p>
                  <p className="text-[10px] text-zinc-400">Restringe paradas no autorizadas en tramos carreteros peligrosos.</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-white" />
              </div>
            </div>
          </div>
        )}

        {seccion === 'bitacora' && (
          <div className="space-y-3">
            <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Control de Anticipos y Diesel</h2>
            <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Anticipo Recibido (Combustible):</span>
                <span className="font-bold text-white">$13,500 MXN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Saldo Pendiente al Descargar (POD):</span>
                <span className="font-bold text-emerald-400">$31,500 MXN</span>
              </div>
              <button className="w-full mt-2 py-2 bg-zinc-800 text-white font-bold rounded-xl text-[10px] uppercase">
                Subir Comprobante de Gastos
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
