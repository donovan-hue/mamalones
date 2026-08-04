"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Download, Star, ShieldCheck } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function FiscalPage() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CUMPLIMIENTO</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">CARTA PORTE SAT 3.1</h1>
        </div>
      </div>

      <CyberCard badgeText="TIMBRADO FISCAL">
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">FOLIO FISCAL (UUID)</span>
            <span className="text-[11px] font-bold text-slate-200 break-all">4A92B1C8-9901-4D1E-B83A-12003F99201A</span>
          </div>

          <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all">
            <Download className="w-4 h-4 text-slate-400" />
            <span>Descargar PDF Carta Porte SAT</span>
          </button>
        </div>
      </CyberCard>

      <CyberCard badgeText="REPUTACIÓN DE OPERADOR">
        <div className="space-y-2 text-center py-2">
          <div className="flex justify-center gap-1 text-slate-200">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-slate-200 text-slate-200" />
            ))}
          </div>
          <p className="text-xs font-mono font-bold text-slate-200">SCORE: 5.0 / 5.0</p>
          <p className="text-[11px] text-slate-400">100% Puntualidad en entregas y cuidado de carga.</p>
        </div>
      </CyberCard>
    </div>
  );
}
