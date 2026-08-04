"use client";

import Link from "next/link";
import { ShieldCheck, ArrowRight, UserPlus, LogIn, Cpu } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function WelcomePage() {
  return (
    <div className="min-h-screen text-slate-100 p-5 max-w-md mx-auto flex flex-col justify-between relative font-sans">
      {/* HEADER EMBLEMA TITANIO */}
      <div className="pt-8 text-center space-y-2 relative z-10">
        <div className="inline-flex p-4 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border border-slate-500/60 rounded-2xl shadow-2xl">
          <Cpu className="w-10 h-10 text-slate-200 stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 italic">
            CARBON FIBER
          </h1>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em]">
            KRONOS FLEET // TECHNOLOGY
          </p>
        </div>
      </div>

      {/* TARJETA PRINCIPAL BARRAS Y TITANIO */}
      <div className="my-auto space-y-4 relative z-10">
        <CyberCard badgeText="HIGH PERFORMANCE">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-900 border border-slate-700 px-2.5 py-0.5 rounded-full inline-block">
              SYSTEM ONLINE // 100%
            </span>
            <h2 className="text-base font-extrabold text-slate-100 italic tracking-wide">
              CONTROL LOGÍSTICO Y TELEMETRÍA
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Plataforma de alta precisión con Bóveda Escrow, timbrado Carta Porte SAT y pesaje por báscula.
            </p>
          </div>
        </CyberCard>

        {/* BOTONES METÁLICOS */}
        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-100 hover:to-slate-300 text-slate-950 font-black py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 active:scale-98 border border-white/40"
          >
            <LogIn className="w-4 h-4 stroke-[2.5]" />
            <span>Iniciar Sesión</span>
          </Link>

          <Link
            href="/registro"
            className="w-full bg-gradient-to-b from-slate-900 to-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
          >
            <UserPlus className="w-4 h-4 text-slate-400" />
            <span>Crear Cuenta / Registrar Unidad</span>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-4 relative z-10 border-t border-slate-800/80">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>ENCRYPTED PROTOCOL • HIGH PERFORMANCE</span>
        </div>
      </div>
    </div>
  );
}
