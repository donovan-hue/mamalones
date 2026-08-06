"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Fuel } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function BasculaPage() {
  const [pesoBruto, setPesoBruto] = useState<number | "">("");
  const [pesoTara, setPesoTara] = useState<number | "">("");
  const [litrosDiesel, setLitrosDiesel] = useState<number | "">("");

  const pesoNeto = typeof pesoBruto === "number" && typeof pesoTara === "number" ? pesoBruto - pesoTara : 0;
  const mermaKg = typeof litrosDiesel === "number" ? (litrosDiesel * 0.835).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">REGISTRO TÉCNICO</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">BÁSCULA & DIÉSEL</h1>
        </div>
      </div>

      <CyberCard badgeText="PESAJE MÓVIL">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Peso Bruto (KG)</label>
              <input
                type="number"
                placeholder="38000"
                value={pesoBruto}
                onChange={(e) => setPesoBruto(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#0a0b0d] border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-100 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Peso Tara (KG)</label>
              <input
                type="number"
                placeholder="10000"
                value={pesoTara}
                onChange={(e) => setPesoTara(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#0a0b0d] border border-slate-800 rounded-xl p-2.5 text-xs font-mono text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">PESO NETO CARGADO</span>
            <div className="text-2xl font-black font-mono text-slate-100 mt-0.5">
              {pesoNeto.toLocaleString()} <span className="text-xs text-slate-400 font-normal">KG</span>
            </div>
          </div>
        </div>
      </CyberCard>

      <CyberCard badgeText="CALCULADORA MERMA DIÉSEL">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Litros Recargados en Ruta</label>
            <div className="relative">
              <Fuel className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="number"
                placeholder="400"
                value={litrosDiesel}
                onChange={(e) => setLitrosDiesel(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-[#0a0b0d] border border-slate-800 rounded-xl p-2.5 pl-9 text-xs font-mono text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Descuento Merma (0.835 kg/L):</span>
            <span className="text-slate-200 font-black">{mermaKg} KG</span>
          </div>
        </div>
      </CyberCard>
    </div>
  );
}
