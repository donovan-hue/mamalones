"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Download, ShieldCheck, CheckCircle2, QrCode } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function CartaPorteCompleta() {
  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/" className="p-2 bg-[#12151c] border border-slate-800 rounded-xl text-slate-300">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CUMPLIMIENTO SAT 3.1</span>
          <h1 className="text-lg font-bold text-white">CARTA PORTE & TIMBRADO</h1>
        </div>
      </div>

      {/* FOLIO FISCAL Y TIMBRE */}
      <CyberCard badgeText="DATOS DEL TIMBRE FISCAL (UUID)">
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-[#0b0c0e] p-2.5 rounded-lg border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 block">UUID / FOLIO FISCAL SAT:</span>
            <span className="text-slate-200 text-[11px] font-bold block break-all">
              4452B1C8-9101-4D1E-883A-12003F99201A
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500 block">Fecha Timbrado:</span>
              <span className="text-slate-300 font-bold">2026-08-03 14:22:05</span>
            </div>
            <div>
              <span className="text-slate-500 block">No. Certificado:</span>
              <span className="text-slate-300 font-bold">0000100000050892</span>
            </div>
          </div>
        </div>
      </CyberCard>

      {/* DESGLOSE FISCAL COMPLETO */}
      <CyberCard badgeText="DESGLOSE OPERATIVO DE CARGA">
        <div className="space-y-3 text-xs">
          {/* ACTORES */}
          <div className="border-b border-slate-800 pb-2 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">REMITENTE / DESTINATARIO</span>
            <div className="flex justify-between"><span className="text-slate-400">Emisor (RFC):</span><span className="font-mono text-slate-200">CG8990101XY2</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Razón Social:</span><span className="text-slate-200 font-medium">Comercializadora de Granos S.A.</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Receptor (RFC):</span><span className="font-mono text-slate-200">TLA920412AA1</span></div>
          </div>

          {/* VEHÍCULO Y CHOFER */}
          <div className="border-b border-slate-800 pb-2 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">AUTOTRANSPORTE FEDERAL</span>
            <div className="flex justify-between"><span className="text-slate-400">Permiso SCT:</span><span className="font-mono text-slate-200">SCT-TFR-00492</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Config. Vehicular:</span><span className="text-slate-200">C3 (Torton 3 Ejes)</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Placas Unidad:</span><span className="font-mono text-slate-200">88-AA-3B (MEX)</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Póliza Seguro:</span><span className="font-mono text-slate-200">GNP-883920-A</span></div>
          </div>

          {/* MERCANCÍAS */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">DETALLE DE MERCANCÍA (SAT)</span>
            <div className="bg-[#0b0c0e] p-2 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1">
              <div className="flex justify-between"><span className="text-slate-400">Clave ProdSAT:</span><span className="text-slate-200">10151500 (Trigo)</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Cantidad / Peso:</span><span className="text-slate-200">9,500 KG (Bruto)</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Material Peligroso:</span><span className="text-emerald-400">NO</span></div>
            </div>
          </div>
        </div>
      </CyberCard>

      {/* QR DE VERIFICACIÓN Y ACCIÓN */}
      <CyberCard badgeText="VERIFICACIÓN RÁPIDA SAT">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-lg shrink-0">
            <QrCode className="w-16 h-16 text-slate-950" />
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Timbrado Válido SAT</span>
            </div>
            <button
              onClick={() => alert("Descargando PDF y XML timbrado...")}
              className="w-full bg-white text-slate-950 font-bold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar XML / PDF</span>
            </button>
          </div>
        </div>
      </CyberCard>

    </div>
  );
}
