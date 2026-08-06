"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, WifiOff } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function IncidentesPage() {
  const [reportado, setReportado] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">SOPORTE EN RUTA</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">INCIDENTES & ESTADÍAS</h1>
        </div>
      </div>

      <CyberCard badgeText="MODO SIN COBERTURA">
        <div className="flex items-center gap-3 p-3 bg-[#0a0b0d] border border-slate-800 rounded-xl text-xs font-mono">
          <WifiOff className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="text-slate-200 font-bold">Sincronización Offline Activa</p>
            <p className="text-[10px] text-slate-500">Los reportes se guardarán localmente y se enviarán al reconectar.</p>
          </div>
        </div>
      </CyberCard>

      <CyberCard badgeText="REPORTE DE ESTADÍAS">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Horas de Retraso en Rampa</label>
            <input
              type="number"
              placeholder="Ej. 3 hrs"
              className="w-full bg-[#0a0b0d] border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-100 outline-none"
            />
          </div>

          <button
            onClick={() => setReportado(true)}
            className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-black py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-xl border border-white/40 active:scale-98"
          >
            {reportado ? "¡Estadía Registrada!" : "Registrar Cobro de Estadía"}
          </button>
        </div>
      </CyberCard>
    </div>
  );
}
