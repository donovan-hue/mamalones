"use client";

import Link from "next/link";
import { LogIn, UserPlus, Cpu, ShieldCheck } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function WelcomePage() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto flex flex-col justify-between relative font-sans">
      
      {/* HEADER EMBLEMA */}
      <div className="pt-6 text-center space-y-3 relative z-10">
        <div className="inline-flex p-4 bg-gradient-to-b from-slate-400 via-slate-700 to-slate-950 rounded-2xl p-[2px] shadow-2xl">
          <div className="bg-[#0b0d12] p-3 rounded-[14px] border border-slate-700">
            <Cpu className="w-8 h-8 text-slate-200 stroke-[2.2]" />
          </div>
        </div>

        {/* TITULO METÁLICO EN RELIEVE IGUAL A LA PLACA */}
        <div>
          <h1 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
            CARBON FIBER
          </h1>
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-[0.35em] italic font-bold">
            KRONOS FLEET // TECHNOLOGY
          </p>
        </div>
      </div>

      {/* TARJETA PLACA METÁLICA CENTRAL */}
      <div className="my-auto space-y-4 relative z-10">
        <CyberCard badgeText="HIGH PERFORMANCE">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest bg-slate-950 border border-slate-700/80 px-3 py-1 rounded-full inline-block shadow-inner">
              SYSTEM ONLINE // 100%
            </span>

            <h2 className="text-base font-black text-slate-100 italic tracking-wide">
              CONTROL LOGÍSTICO Y TELEMETRÍA
            </h2>

            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Plataforma de alta precisión con Bóveda Escrow, timbrado Carta Porte SAT y pesaje por báscula.
            </p>
          </div>
        </CyberCard>

        {/* BOTONES ESTILO TITANIO Y CARBONO */}
        <div className="space-y-3">
          <Link
            href="/login"
            className="w-full bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 hover:from-white hover:to-slate-300 text-slate-950 font-black py-4 rounded-2xl text-xs tracking-widest uppercase transition-all shadow-[0_10px_25px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 active:scale-98 border-t border-white"
          >
            <LogIn className="w-4 h-4 stroke-[3]" />
            <span>Iniciar Sesión</span>
          </Link>

          <Link
            href="/registro"
            className="w-full bg-gradient-to-b from-slate-900 to-slate-950 hover:bg-slate-800 border border-slate-700/80 text-slate-300 font-bold py-4 rounded-2xl text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 active:scale-98 shadow-lg"
          >
            <UserPlus className="w-4 h-4 text-slate-400" />
            <span>Crear Cuenta / Registrar Unidad</span>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-4 relative z-10">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>ENCRYPTED PROTOCOL • HIGH PERFORMANCE</span>
        </div>
      </div>
    </div>
  );
}
