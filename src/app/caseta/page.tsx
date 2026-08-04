"use client";

import Link from "next/link";
import { ArrowLeft, QrCode } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function CasetaPage() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">PEAJE EXPRÉS</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">TAG & CASETAS QR</h1>
        </div>
      </div>

      <CyberCard badgeText="PASE DIGITAL ACEPTADO">
        <div className="text-center space-y-4 py-2">
          <div className="bg-white p-4 rounded-2xl inline-block shadow-2xl border-2 border-slate-400">
            <QrCode className="w-36 h-36 text-slate-950" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">FOLIO QR ENCRIPTADO</span>
            <span className="text-xs font-bold font-mono text-slate-200">KRN-TAG-991823-MX</span>
          </div>
        </div>
      </CyberCard>

      <CyberCard badgeText="SALDO & CASETAS">
        <div className="space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center p-3 bg-[#0a0b0d] border border-slate-800 rounded-xl">
            <span className="text-slate-400">Saldo Disponible TAG:</span>
            <span className="text-base font-black text-slate-100">$4,850 MXN</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-2.5 bg-[#0a0b0d] border border-slate-800/80 rounded-xl">
              <div>
                <p className="text-slate-200 font-bold">Caseta Tepic San Mateo</p>
                <p className="text-[10px] text-slate-500">Pagado hoy 10:15 AM</p>
              </div>
              <span className="text-slate-300 font-bold">$620 MXN</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#0a0b0d] border border-slate-800/80 rounded-xl">
              <div>
                <p className="text-slate-200 font-bold">Caseta Arenal</p>
                <p className="text-[10px] text-slate-500">Pagado hoy 08:30 AM</p>
              </div>
              <span className="text-slate-300 font-bold">$195 MXN</span>
            </div>
          </div>
        </div>
      </CyberCard>
    </div>
  );
}
