"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function SushiPage() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">MENÚ EXPRÉS</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">KRONOS SUSHI</h1>
        </div>
      </div>

      <CyberCard badgeText="PEDIDO EN RUTA">
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 bg-[#0a0b0d] border border-slate-800 rounded-xl space-y-1">
            <p className="text-slate-200 font-bold">Combo Roll Operador</p>
            <p className="text-[10px] text-slate-500">Roll empanizado + Bebida para viaje</p>
            <p className="text-slate-100 font-black mt-1">$180 MXN</p>
          </div>

          <button className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-xl border border-white/40">
            Ordenar para Recoger en Caseta
          </button>
        </div>
      </CyberCard>
    </div>
  );
}
