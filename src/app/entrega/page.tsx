"use client";

import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, UserCheck, QrCode, CheckCircle2 } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function FichaIdentidadUnidad() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/" className="p-2 bg-[#12151c] border border-slate-800 rounded-xl text-slate-300">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1 font-bold">
            <Lock className="w-3 h-3" /> ACCESO RESTRINGIDO
          </span>
          <h1 className="text-lg font-bold text-white">VERIFICACIÓN DE UNIDAD</h1>
        </div>
      </div>

      {/* AVISO DE IDENTIFICACIÓN */}
      <div className="bg-[#12151c] p-3 rounded-xl border border-emerald-500/30 flex items-center gap-2 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-[11px] text-slate-300 font-mono">
          <strong className="text-white block font-bold">IDENTIDAD VERIFICADA SCT/SAT</strong>
          Verifique que los datos de la unidad y la cara del operador coincidan antes de permitir la carga en rampa.
        </span>
      </div>

      {/* FICHA OPERADOR ASIGNADO */}
      <CyberCard badgeText="OPERADOR AUTORIZADO">
        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-3 bg-[#0b0c0e] p-2.5 rounded-lg border border-slate-800">
            <div className="w-12 h-12 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 font-bold text-base shrink-0">
              <UserCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-slate-100 font-bold block text-sm">Donovan Gaspar Ávila</span>
              <span className="text-[10px] text-slate-400 block">Licencia Federal: SCT-8839201-A</span>
              <span className="text-[9px] text-emerald-400 font-bold block mt-0.5">✔ Antecedentes & INE Validados</span>
            </div>
          </div>
        </div>
      </CyberCard>

      {/* FICHA TÉCNICA DE LA UNIDAD */}
      <CyberCard badgeText="DATOS DEL VEHÍCULO DE CARGA">
        <div className="space-y-2 text-xs font-mono">
          <div className="bg-[#0b0c0e] p-3 rounded-lg border border-slate-800 space-y-1.5">
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span className="text-slate-400">Tipo de Vehículo:</span>
              <span className="text-slate-100 font-bold">Torton 3 Ejes Cajas Secas</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span className="text-slate-400">Placas Tractor:</span>
              <span className="text-emerald-400 font-bold">88-AA-3B (MEX)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-1">
              <span className="text-slate-400">Placas Remolque:</span>
              <span className="text-slate-200 font-bold">99-BB-4C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Póliza Seguro GNP:</span>
              <span className="text-slate-300">#GNP-883920-A (Vigente)</span>
            </div>
          </div>
        </div>
      </CyberCard>

      {/* CÓDIGO QR DE AUTORIZACIÓN EN BODEGA */}
      <CyberCard badgeText="PASE DE ACCESO & ESCANEO EN BODEGA">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg shrink-0">
            <QrCode className="w-16 h-16 text-slate-950" />
          </div>
          <div className="space-y-1 flex-1 text-xs">
            <span className="font-mono text-slate-400 text-[10px] block">CÓDIGO DE AUTORIZACIÓN:</span>
            <span className="font-mono text-white font-bold block text-sm">KRN-TAG-991823-MX</span>
            <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Permiso Activo para Cargar
            </span>
          </div>
        </div>
      </CyberCard>

    </div>
  );
}
