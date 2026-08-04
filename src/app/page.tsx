"use client";

import Link from "next/link";
import { Truck, ShieldCheck, ArrowRight, UserPlus, LogIn, Activity } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 p-6 max-w-md mx-auto flex flex-col justify-between relative overflow-hidden font-sans">
      {/* LUZ DE FONDO ÁMBAR */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER LOGO */}
      <div className="pt-6 text-center space-y-3 relative z-10">
        <div className="inline-flex p-3.5 bg-[#121620] border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-500/10">
          <Truck className="w-12 h-12 text-amber-400 animate-pulse stroke-[2.2]" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-wider text-white">
            KRONOS <span className="text-amber-400 font-mono">FLEET</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-mono uppercase tracking-[0.25em] mt-1">
            Plataforma Logística Cyber-Industrial
          </p>
        </div>
      </div>

      {/* TARJETA DE ACCESO RÁPIDO */}
      <div className="my-auto space-y-4 relative z-10">
        <CyberCard className="space-y-3 text-center border-amber-500/30">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-widest">
            <Activity className="w-3.5 h-3.5" />
            <span>Red Operativa Online</span>
          </div>
          <h2 className="text-lg font-extrabold text-white">
            Control Total de Carga y Telemetría
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Plataforma con custodia Escrow, timbrado Carta Porte SAT, validación por QR y pesaje inteligente.
          </p>
        </CyberCard>

        {/* BOTONES DE ACCESO */}
        <div className="space-y-2.5">
          <Link
            href="/login"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-98"
          >
            <LogIn className="w-4 h-4 stroke-[2.5]" />
            <span>Iniciar Sesión</span>
          </Link>

          <Link
            href="/registro"
            className="w-full bg-[#121620] hover:bg-slate-900 border border-[#1e2638] hover:border-amber-500/40 text-slate-200 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <UserPlus className="w-4 h-4 text-amber-400" />
            <span>Crear Cuenta / Registrar Unidad</span>
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-4 relative z-10 border-t border-[#1e2638]/50">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encriptación SSL • Protocolo Escrow Activo</span>
        </div>
      </div>
    </div>
  );
}
