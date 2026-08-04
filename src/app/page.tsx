"use client";

import Link from "next/link";
import { LogIn, UserPlus, ShieldCheck, Cpu, ArrowRight, Radio, Search, CheckCircle2 } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function WelcomePage() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      
      {/* HEADER DE CENTRO DE MONITOREO */}
      <div className="pt-4 border-b border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#12151c] border border-slate-800 rounded-xl relative">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">MONITOREO AUTÓNOMO</span>
            <h1 className="text-lg font-bold text-white tracking-tight">KRONOS FLEET</h1>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
            100% SEGURO
          </span>
        </div>
      </div>

      {/* METRICAS DE SEGURIDAD DESDE EL INGRESO */}
      <CyberCard badgeText="CENTRO DE OPERACIONES Y GARANTÍA">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-[#0b0c0e] p-2.5 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-500 uppercase block">BÓVEDA ESCROW:</span>
              <span className="text-emerald-400 font-bold text-sm block">PAGOS BLINDADOS</span>
              <span className="text-[8px] text-slate-400 block mt-0.5">El pago se libera contra entrega comprobada.</span>
            </div>

            <div className="bg-[#0b0c0e] p-2.5 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-500 uppercase block">VALIDACIÓN SAT/SCT:</span>
              <span className="text-slate-200 font-bold text-sm block">CHOFERES OK</span>
              <span className="text-[8px] text-slate-400 block mt-0.5">Filtro de antecedentes y Carta Porte 3.1.</span>
            </div>
          </div>

          <div className="bg-[#0b0c0e] p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-slate-200 block">Sin Fatiga de Búsqueda</span>
                <span className="text-[10px] text-slate-400">El sistema conecta choferes con fletes verificados en automático.</span>
              </div>
            </div>
          </div>
        </div>
      </CyberCard>

      {/* RUTA RÁPIDA: BUSCAR CARGA O OFRECER UNIDAD */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">¿QUÉ REQUIERES HOY?</span>
        
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/cargas"
            className="p-3 bg-[#12151c] hover:bg-slate-800 border border-slate-800 rounded-xl flex flex-col justify-between h-24 transition-all active:scale-95"
          >
            <Search className="w-5 h-5 text-slate-300" />
            <div>
              <span className="text-xs font-bold text-white block">Soy Operador</span>
              <span className="text-[9px] text-slate-400 font-mono">Ver Fletes con Escrow</span>
            </div>
          </Link>

          <Link
            href="/publicar"
            className="p-3 bg-[#12151c] hover:bg-slate-800 border border-slate-800 rounded-xl flex flex-col justify-between h-24 transition-all active:scale-95"
          >
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-xs font-bold text-white block">Tengo Carga</span>
              <span className="text-[9px] text-slate-400 font-mono">Asignar Unidad Verificada</span>
            </div>
          </Link>
        </div>
      </div>

      {/* BOTONES PRINCIPALES DE ACCESO */}
      <div className="space-y-2.5 pt-2">
        <Link
          href="/login"
          className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg active:scale-98"
        >
          <LogIn className="w-4 h-4" />
          <span>Ingresar al Centro de Monitoreo</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/registro"
          className="w-full bg-[#12151c] hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold py-3.5 rounded-xl text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <UserPlus className="w-4 h-4 text-slate-400" />
          <span>Registrar Empresa / Permisionario</span>
        </Link>
      </div>

      {/* CERTIFICACIÓN DISCRETA */}
      <div className="text-center py-2 border-t border-slate-800/60">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500 uppercase">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>SISTEMA DE AUTOTRANSPORTE BLINDADO • SAT 3.1</span>
        </div>
      </div>

    </div>
  );
}
