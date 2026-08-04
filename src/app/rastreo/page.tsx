"use client";

import Link from "next/link";
import { ArrowLeft, Navigation, AlertCircle, Clock, MapPin, Zap, ShieldCheck } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function TelemetriaGPSSistema() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/" className="p-2 bg-[#12151c] border border-slate-800 rounded-xl text-slate-300">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">TELEMETRÍA EN VIVO</span>
          <h1 className="text-lg font-bold text-white">RASTREO GPS & TRAYECTO</h1>
        </div>
      </div>

      {/* MAPA VECTORIAL DE VÍAS Y RUTAS */}
      <CyberCard badgeText="MAPA DE RUTA // CARRETERA Y VÍAS LIBRES">
        <div className="relative w-full h-56 bg-[#07080a] rounded-xl border border-slate-800 overflow-hidden p-3 font-mono">
          
          {/* RED DE CARRETERAS (GRID SIMULADO) */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* VÍA LIBRE Y AUTOPISTA DIBUJADAS */}
          <svg className="absolute inset-0 w-full h-full stroke-slate-700 fill-none stroke-2" viewBox="0 0 300 200">
            {/* Carretera Libre (Gris Punteado) */}
            <path d="M 30 170 Q 80 140 150 110 T 270 30" strokeDasharray="4 4" className="stroke-slate-600" />
            {/* Autopista Cuota / Trayecto Real (Verde Táctico) */}
            <path d="M 30 170 L 90 120 L 170 90 L 270 30" className="stroke-emerald-500 stroke-[3]" />
            
            {/* MARCADORES DE EVENTOS EN MAPA */}
            {/* Salida Guadalajara */}
            <circle cx="30" cy="170" r="5" className="fill-slate-100" />
            {/* Evento Parada Rampa Tepic */}
            <circle cx="90" cy="120" r="6" className="fill-amber-500 animate-ping" />
            <circle cx="90" cy="120" r="4" className="fill-amber-400" />
            {/* Evento Exceso de Velocidad */}
            <circle cx="170" cy="90" r="5" className="fill-rose-500" />
            {/* Destino Culiacán */}
            <circle cx="270" cy="30" r="5" className="fill-emerald-400" />
          </svg>

          {/* ETIQUETAS FLOTANTES SOBRE EL MAPA */}
          <div className="absolute top-2 left-2 bg-[#12151c]/90 px-2 py-1 rounded border border-slate-800 text-[9px] text-slate-300">
            ORIGEN: GDL
          </div>
          <div className="absolute bottom-2 right-2 bg-[#12151c]/90 px-2 py-1 rounded border border-slate-800 text-[9px] text-emerald-400 font-bold">
            DESTINO: CULIACÁN
          </div>
          <div className="absolute top-1/2 left-1/3 bg-amber-950/80 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded text-[8px]">
            PARADA: 42 MIN
          </div>
        </div>
      </CyberCard>

      {/* METRICAS DE TELEMETRIA EN TIEMPO REAL */}
      <div className="grid grid-cols-2 gap-2">
        <CyberCard badgeText="VELOCIDAD ACTUAL">
          <div className="text-center">
            <span className="text-2xl font-black font-mono text-white">86 <span className="text-xs font-sans text-slate-400">km/h</span></span>
            <span className="text-[10px] text-emerald-400 font-mono block mt-1">Estable en Autopista</span>
          </div>
        </CyberCard>

        <CyberCard badgeText="BATERÍA & RADARES">
          <div className="text-center">
            <span className="text-2xl font-black font-mono text-emerald-400">98%</span>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">GPS Principal // OK</span>
          </div>
        </CyberCard>
      </div>

      {/* TABLA LATERAL / HISTORIAL DE PARADAS Y VELOCIDAD */}
      <CyberCard badgeText="REGISTRO DE PARADAS Y TELEMETRÍA DETALLADA">
        <div className="space-y-2 text-xs font-mono">
          <div className="bg-[#0b0c0e] p-2.5 rounded-lg border border-slate-800 space-y-2">
            
            {/* REGISTRO 1 */}
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-1.5">
              <div>
                <span className="text-slate-200 font-bold block">Caseta Tepic (Parada)</span>
                <span className="text-[10px] text-slate-500">Km 142 • Autopista Libramiento</span>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-bold block">42 MIN</span>
                <span className="text-[9px] text-slate-500">Carga Diésel</span>
              </div>
            </div>

            {/* REGISTRO 2 */}
            <div className="flex justify-between items-center border-b border-slate-800/80 pb-1.5">
              <div>
                <span className="text-slate-200 font-bold block">Punto de Exceso Velocidad</span>
                <span className="text-[10px] text-slate-500">Km 210 • Tramo Mazatlán</span>
              </div>
              <div className="text-right">
                <span className="text-rose-400 font-bold block">104 KM/H</span>
                <span className="text-[9px] text-slate-500">Alerta 3 MIN</span>
              </div>
            </div>

            {/* REGISTRO 3 */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-slate-200 font-bold block">Revisión de Báscula SCT</span>
                <span className="text-[10px] text-slate-500">Km 88 • Rampa Inspección</span>
              </div>
              <div className="text-right">
                <span className="text-slate-300 font-bold block">15 MIN</span>
                <span className="text-[9px] text-emerald-400">Peso Aprobado</span>
              </div>
            </div>

          </div>
        </div>
      </CyberCard>

    </div>
  );
}
