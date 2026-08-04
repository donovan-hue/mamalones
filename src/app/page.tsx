"use client";

import Link from "next/link";
import { LogIn, UserPlus, Truck, ArrowRight } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0b0c0e] text-slate-100 p-5 max-w-md mx-auto flex flex-col justify-between font-sans">
      
      {/* HEADER MINIMALISTA */}
      <div className="pt-8 space-y-2">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#12151c] border border-slate-800 rounded-lg">
            <Truck className="w-4 h-4 text-slate-300" />
          </div>
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
            KRONOS FLEET
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Plataforma de Control Logístico
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Telemetría en tiempo real, gestión de fletes y Bóveda Escrow.
        </p>
      </div>

      {/* TARJETA DE ESTADO DE RED */}
      <div className="my-auto space-y-4">
        <CyberCard badgeText="RED OPERATIVA">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center font-mono">
              <span className="text-slate-400">Servidor Central:</span>
              <span className="text-emerald-400 font-bold">ONLINE</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-slate-400">Protección Escrow:</span>
              <span className="text-slate-200 font-bold">HABILITADA</span>
            </div>
            <div className="flex justify-between items-center font-mono">
              <span className="text-slate-400">Sincronización SAT 3.1:</span>
              <span className="text-slate-200 font-bold">ACTIVA</span>
            </div>
          </div>
        </CyberCard>

        {/* BOTONES DE ACCESO */}
        <div className="space-y-2.5 pt-2">
          <Link
            href="/login"
            className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
          >
            <LogIn className="w-4 h-4" />
            <span>Iniciar Sesión</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/registro"
            className="w-full bg-[#12151c] hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold py-3.5 rounded-xl text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <UserPlus className="w-4 h-4 text-slate-400" />
            <span>Registrar Unidad o Chofer</span>
          </Link>
        </div>
      </div>

      {/* FOOTER DISCRETO */}
      <div className="text-center py-4 border-t border-slate-800/40">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          SYSTEM ARCHITECTURE • v2.4.0
        </span>
      </div>
    </div>
  );
}
