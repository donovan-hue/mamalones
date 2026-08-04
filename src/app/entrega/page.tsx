"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2, QrCode, Lock, FileCheck } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function EntregaPage() {
  const [liberado, setLiberado] = useState(false);

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CIERRE DE VIAJE</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">ENTREGA & ESCROW</h1>
        </div>
      </div>

      <CyberCard badgeText="CUSTODIA FINANCIERA">
        <div className="space-y-4 text-center">
          <div className="p-3 bg-slate-900 border border-slate-700 rounded-2xl inline-block shadow-xl">
            {liberado ? (
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            ) : (
              <Lock className="w-10 h-10 text-slate-200" />
            )}
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
              ESTATUS DE BÓVEDA
            </span>
            <span className="text-base font-black font-mono text-slate-100">
              {liberado ? "FONDOS LIBERADOS A CLABE" : "$34,500.00 MXN EN CUSTODIA"}
            </span>
          </div>

          <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800 text-xs font-mono space-y-1 text-left">
            <div className="flex justify-between text-slate-400">
              <span>Folio Flete:</span>
              <span className="text-slate-200">FLT-9901</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Bodega Receptora:</span>
              <span className="text-slate-200">Culiacán Central</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Acuse de Recibo:</span>
              <span className="text-emerald-400 font-bold">FIRMA DIGITAL OK</span>
            </div>
          </div>

          {!liberado ? (
            <button
              onClick={() => setLiberado(true)}
              className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-100 hover:to-slate-300 text-slate-950 font-black py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-xl border border-white/40 active:scale-98"
            >
              Liberar Pago a Transportista
            </button>
          ) : (
            <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-400 text-xs font-mono font-bold">
              Depósito transferido exitosamente a cuenta CLABE.
            </div>
          )}
        </div>
      </CyberCard>
    </div>
  );
}
