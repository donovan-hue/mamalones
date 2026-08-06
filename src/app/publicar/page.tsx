"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, MapPin, Package, ShieldCheck, CheckCircle2 } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function PublicarCargaProduccion() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [monto, setMonto] = useState("");
  const [producto, setProducto] = useState("");
  const [unidad, setUnidad] = useState("Torton Cajas Secas");
  const [escrow, setEscrow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setExito(false);

    try {
      const { error } = await supabase.from("cargas").insert([
        {
          origen,
          destino,
          monto: parseFloat(monto),
          producto,
          unidad_requerida: unidad,
          escrow_activo: escrow,
          estatus: "disponible",
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      setExito(true);
      setOrigen("");
      setDestino("");
      setMonto("");
      setProducto("");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Verifica tu conexión";
      alert("Error al publicar la carga: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">NUEVA OFERTA</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">PUBLICAR FLETE</h1>
        </div>
      </div>

      {exito && (
        <CyberCard badgeText="CONFIRMACIÓN">
          <div className="text-center py-4 space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h2 className="text-sm font-extrabold text-slate-100">¡Carga Publicada con Éxito!</h2>
            <p className="text-xs text-slate-400">Ya se encuentra disponible en el tablero de fletes en vivo.</p>
            <Link
              href="/cargas"
              className="inline-block mt-2 bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs"
            >
              Ir al Tablero
            </Link>
          </div>
        </CyberCard>
      )}

      <CyberCard badgeText="DATOS DE CARGA">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Origen</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Ej. Tlaquepaque, JAL"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Destino</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Ej. Culiacán, SIN"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Tarifa (MXN)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  required
                  placeholder="35000"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Tipo Unidad</label>
              <select
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 text-xs text-slate-100 outline-none font-mono"
              >
                <option value="Torton Cajas Secas">Torton Cajas Secas</option>
                <option value="Tráiler Thermo 53ft">Tráiler Thermo 53ft</option>
                <option value="Jaula Granelera">Jaula Granelera</option>
                <option value="Rabón">Rabón</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Mercancía / Toneladas</label>
            <div className="relative">
              <Package className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Ej. 9.5 Toneladas Trigo Comercial"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0a0b0d] border border-slate-800 rounded-xl">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-slate-300">Protección Escrow</span>
            </div>
            <input
              type="checkbox"
              checked={escrow}
              onChange={(e) => setEscrow(e.target.checked)}
              className="w-4 h-4 accent-slate-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-black py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-xl border border-white/40 disabled:opacity-50 mt-2"
          >
            {loading ? "Registrando en Red..." : "Publicar Cargas en Mercado"}
          </button>
        </form>
      </CyberCard>
    </div>
  );
}
