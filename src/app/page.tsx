"use client";

import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-black text-[#f3f3f3] p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      
      {/* HEADER TIPO VERCEL */}
      <div className="pt-6 pb-2 border-b border-[#222222] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white text-black font-black text-xs flex items-center justify-center rounded">
            ▲
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-white">KRONOS FLEET</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#333333] text-[#888888] bg-[#0a0a0a]">
          v2.4.0
        </span>
      </div>

      {/* TITULO SOBRIO */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Control Logístico Autónomo
        </h1>
        <p className="text-xs text-[#888888] leading-relaxed font-mono">
          Telemetría en tiempo real, Bóveda Escrow y Carta Porte SAT 3.1.
        </p>
      </div>

      {/* TARJETA VERCEL STYLE */}
      <CyberCard badgeText="ESTADO DE LA RED">
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between items-center py-1 border-b border-[#1a1a1a]">
            <span className="text-[#888888]">Protección Escrow:</span>
            <span className="text-emerald-400 font-medium">100% ACTIVA</span>
          </div>
          <div className="flex justify-between items-center py-1 border-b border-[#1a1a1a]">
            <span className="text-[#888888]">Validación SAT / SCT:</span>
            <span className="text-white font-medium">VERIFICADA</span>
          </div>
          <div className="flex justify-between items-center py-1">
            <span className="text-[#888888]">Canal Privado:</span>
            <span className="text-white font-medium">ENCRIPTADO AES-256</span>
          </div>
        </div>
      </CyberCard>

      {/* ACCIONES PRINCIPALES */}
      <div className="space-y-2 pt-2">
        <Link
          href="/cargas"
          className="w-full bg-white hover:bg-[#eee] text-black font-semibold py-3 rounded-lg text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Buscar Fletes Disponibles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href="/publicar"
          className="w-full bg-[#0a0a0a] hover:bg-[#111111] border border-[#222222] text-[#ccc] hover:text-white font-medium py-3 rounded-lg text-xs transition-all flex items-center justify-center gap-2"
        >
          <Cpu className="w-3.5 h-3.5 text-[#888888]" />
          <span>Publicar Carga</span>
        </Link>
      </div>

      {/* FOOTER DISCRETO */}
      <div className="pt-6 text-center border-t border-[#111111]">
        <span className="text-[10px] font-mono text-[#555555]">
          SECURE PROTOCOL • END-TO-END ENCRYPTION
        </span>
      </div>

    </div>
  );
}
