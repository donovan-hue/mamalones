'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function PerfilOperador() {
  const [seccion, setSeccion] = useState<'disponibles' | 'viaje_activo' | 'seguridad'>('disponibles')
  const [viajeSeleccionado, setViajeSeleccionado] = useState<any>(null)
  const [postuladoExitoso, setPostuladoExitoso] = useState(false)

  const handlePostularse = (viaje: any) => {
    setViajeSeleccionado(viaje)
    setPostuladoExitoso(true)
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 space-y-4">
      <header className="border-b border-zinc-800 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-xs font-black uppercase tracking-widest text-white">KRONOS-SPACE.COM</h1>
          <p className="text-[9px] text-zinc-500 uppercase tracking-wider">Portal del Operador | Asignaciones y Negociación</p>
        </div>
        <Link href="/registro" className="text-[10px] bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl font-bold hover:bg-zinc-800 transition-all">← Volver</Link>
      </header>

      {/* Submenú del Operador */}
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => { setSeccion('disponibles'); setPostuladoExitoso(false); }} className={`py-2 px-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all ${seccion === 'disponibles' && !postuladoExitoso ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          📋 Publicaciones
        </button>
        <button onClick={() => setSeccion('viaje_activo')} className={`py-2 px-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all ${seccion === 'viaje_activo' || postuladoExitoso ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          🤝 Negociación y Acuerdo
        </button>
        <button onClick={() => setSeccion('seguridad')} className={`py-2 px-2 rounded-xl text-[9px] font-bold uppercase tracking-wider border transition-all ${seccion === 'seguridad' && !postuladoExitoso ? 'bg-white text-black border-white' : 'bg-zinc-950 text-zinc-400 border-zinc-800'}`}>
          🛡️ Protocolos
        </button>
      </div>

      {/* Contenido Dinámico del Operador */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl">
        
        {postuladoExitoso ? (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center">
              <p className="text-xs font-bold text-emerald-400 uppercase">⚡ ¡Postulación Enviada con Éxito!</p>
              <p className="text-[10px] text-zinc-400 mt-1">Tus datos y credenciales han sido enlazados automáticamente con la empresa solicitante.</p>
            </div>

            <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3 text-xs">
              <h2 className="text-xs font-black uppercase text-white tracking-wider border-b border-zinc-800 pb-2">Acuerdo de Carga & Itinerario</h2>
              
              <div className="flex justify-between">
                <span className="text-zinc-400">Empresa Solicitante:</span>
                <span className="font-bold text-white">Industrial del Norte S.A. de C.V.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Ruta:</span>
                <span className="font-bold text-white">{viajeSeleccionado?.origen} ➔ {viajeSeleccionado?.destino}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Fecha y Hora de Carga:</span>
                <span className="font-bold text-emerald-400">Mañana, 08:00 AM (Bodega GDL)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Fecha y Hora de Entrega:</span>
                <span className="font-bold text-white">14 de Agosto, 04:00 PM (CEDIS MTY)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800">
                <span className="text-zinc-400">Anticipo para Gastos (Diesel/Casetas):</span>
                <span className="font-bold text-white">$13,500 MXN (30%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tarifa Total Neta a Pagar:</span>
                <span className="font-bold text-emerald-400">{viajeSeleccionado?.tarifa}</span>
              </div>

              <div className="pt-2">
                <p className="text-[10px] text-zinc-500 italic">*Mensajería cifrada activa con el dueño de la fletera y el generador de carga para validación de Carta Porte.</p>
              </div>
            </div>

            <button onClick={() => setPostuladoExitoso(false)} className="w-full py-3 bg-zinc-900 border border-zinc-700 text-xs font-bold uppercase rounded-xl hover:bg-zinc-800">
              ← Volver al Muro de Publicaciones
            </button>
          </div>
        ) : (
          <>
            {seccion === 'disponibles' && (
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Muro de Cargas Publicadas</h2>
                
                <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Guadalajara, Jal. ➔ Monterrey, N.L.</span>
                    <span className="text-emerald-400 font-black">$45,000 MXN</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Caja Seca 53' • 28 Toneladas • Anticipo de diésel inmediato.</p>
                  <div className="pt-1">
                    <button 
                      onClick={() => handlePostularse({ origen: 'Guadalajara, Jal.', destino: 'Monterrey, N.L.', tarifa: '$45,000 MXN' })} 
                      className="w-full py-2 bg-white text-black font-bold rounded-lg text-[10px] uppercase hover:bg-zinc-200 transition-all"
                    >
                      Aceptar Viaje y Postularse
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">Manzanillo, Col. ➔ CDMX</span>
                    <span className="text-emerald-400 font-black">$38,000 MXN</span>
                  </div>
                  <p className="text-[10px] text-zinc-400">Contenedor 40ft • Pago seguro contra entrega de documento (POD).</p>
                  <div className="pt-1">
                    <button 
                      onClick={() => handlePostularse({ origen: 'Manzanillo, Col.', destino: 'CDMX', tarifa: '$38,000 MXN' })} 
                      className="w-full py-2 bg-white text-black font-bold rounded-lg text-[10px] uppercase hover:bg-zinc-200 transition-all"
                    >
                      Aceptar Viaje y Postularse
                    </button>
                  </div>
                </div>
              </div>
            )}

            {seccion === 'viaje_activo' && (
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Detalles de Mi Viaje En Curso</h2>
                <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2 text-xs">
                  <p className="text-zinc-400">Selecciona una carga del muro de publicaciones y haz clic en postularte para ver el acuerdo de itinerario y tarifas aquí.</p>
                </div>
              </div>
            )}

            {seccion === 'seguridad' && (
              <div className="space-y-3">
                <h2 className="text-xs font-black uppercase text-zinc-300 tracking-wider">Protocolos de Seguridad y Beneficios</h2>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p className="font-bold text-white">🛰️ GPS Satelital y Monitoreo 24/7</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Acompañamiento constante desde el centro de control durante todo tu trayecto.</p>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p className="font-bold text-white">🚨 Botón de Alerta Temprana</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Acceso directo a reporte de incidencias viales y asistencia en carretera.</p>
                  </div>
                  <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <p className="font-bold text-white">⛽ Anticipos Garantizados</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Depósitos oportunos para combustible y casetas antes de arrancar.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}
