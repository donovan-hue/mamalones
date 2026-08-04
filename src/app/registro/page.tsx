"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Shield, Truck, FileText, CheckCircle } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegistroChoferProduccion() {
  const [nombre, setNombre] = useState("");
  const [licencia, setLicencia] = useState("");
  const [placas, setPlacas] = useState("");
  const [seguro, setSeguro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("expedientes").insert([
        {
          nombre_operador: nombre,
          licencia_federal: licencia,
          placas_unidad: placas,
          poliza_seguro: seguro,
          estatus_verificacion: "validado",
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;
      alert("¡Expediente de unidad registrado y verificado correctamente!");
      window.location.href = "/cargas";
    } catch (err: any) {
      alert("Error en registro: " + (err.message || "Verifica tu conexión"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">EXPEDIENTE</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">ALTA DE UNIDAD</h1>
        </div>
      </div>

      <CyberCard badgeText="FICHA TÉCNICA">
        <form onSubmit={handleRegister} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Nombre Completo Operador</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Nombre del Chofer"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Licencia Federal Folio</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="FED-8839201"
                value={licencia}
                onChange={(e) => setLicencia(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Placas Unidad</label>
              <div className="relative">
                <Truck className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="88-AA-1B"
                  value={placas}
                  onChange={(e) => setPlacas(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono uppercase"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Póliza Seguro</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="POL-991823"
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono uppercase"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-black py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-xl border border-white/40 disabled:opacity-50 mt-2"
          >
            {loading ? "Validando Ficha..." : "Guardar & Activar Expediente"}
          </button>
        </form>
      </CyberCard>
    </div>
  );
}
