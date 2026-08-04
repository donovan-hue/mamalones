"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, MapPin, ShieldCheck, ChevronRight, Plus, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Carga {
  id: string;
  origen: string;
  destino: string;
  monto: number;
  producto: string;
  unidad_requerida: string;
  escrow_activo: boolean;
  created_at: string;
  estatus: string;
}

export default function TableroCargasProduccion() {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todas" | "escrow">("todas");
  const [postulandoId, setPostulandoId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCargas() {
      try {
        setLoading(true);
        setError(null);

        let query = supabase
          .from("cargas")
          .select("*")
          .eq("estatus", "disponible")
          .order("created_at", { ascending: false });

        if (filter === "escrow") {
          query = query.eq("escrow_activo", true);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setCargas(data || []);
      } catch (err: any) {
        setError(err.message || "Error al conectar con la base de datos.");
      } finally {
        setLoading(false);
      }
    }

    fetchCargas();
  }, [filter]);

  const handlePostular = async (cargaId: string) => {
    setPostulandoId(cargaId);
    try {
      const { error: postularError } = await supabase.from("postulaciones").insert([
        {
          carga_id: cargaId,
          fecha_postulacion: new Date().toISOString(),
          estatus: "pendiente",
        },
      ]);

      if (postularError) throw postularError;
      alert("¡Postulación enviada con éxito! El cliente revisará tu expediente.");
    } catch (err: any) {
      alert("Error al postular: " + (err.message || "Verifica tu conexión"));
    } finally {
      setPostulandoId(null);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">MERCADO EN VIVO</span>
            <h1 className="text-lg font-black tracking-wider text-slate-100 italic">TABLERO DE CARGAS</h1>
          </div>
        </div>
        <Link
          href="/publicar"
          className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-100 hover:to-slate-300 text-slate-950 font-black px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg border border-white/40 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Publicar</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("todas")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
            filter === "todas"
              ? "bg-slate-200 text-slate-950 border-white"
              : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("escrow")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
            filter === "escrow"
              ? "bg-slate-200 text-slate-950 border-white"
              : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Con Escrow Activo
        </button>
      </div>

      {loading && (
        <div className="py-12 text-center space-y-2">
          <Loader2 className="w-8 h-8 text-slate-300 animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Consultando mercado en tiempo real...</p>
        </div>
      )}

      {error && (
        <CyberCard badgeText="ERROR DB">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-mono">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        </CyberCard>
      )}

      {!loading && !error && cargas.length === 0 && (
        <CyberCard badgeText="SIN CARGAS">
          <div className="text-center py-6 space-y-2">
            <Truck className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs font-bold text-slate-300">No hay fletes disponibles en este momento.</p>
            <p className="text-[11px] text-slate-500">Sé el primero en publicar una carga para asignar unidad.</p>
            <Link
              href="/publicar"
              className="inline-block mt-2 bg-slate-800 border border-slate-700 text-slate-200 font-bold px-4 py-2 rounded-xl text-xs"
            >
              Publicar Carga
            </Link>
          </div>
        </CyberCard>
      )}

      {!loading && !error && cargas.length > 0 && (
        <div className="space-y-4">
          {cargas.map((carga) => (
            <CyberCard key={carga.id} badgeText={`ID: ${carga.id.slice(0, 8)}`}>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800/80 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(carga.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} hrs
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{carga.origen}</span>
                      <span className="text-slate-600">➔</span>
                      <span>{carga.destino}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-slate-100 font-mono tracking-tight">
                      ${carga.monto.toLocaleString("es-MX")} MXN
                    </span>
                    {carga.escrow_activo && (
                      <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 justify-end">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Pago en Custodia</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#0a0b0d] p-2.5 rounded-xl border border-slate-800/80 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Producto:</span>
                    <span className="text-slate-200 font-bold">{carga.producto}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Unidad requerida:</span>
                    <span className="text-slate-300 font-bold">{carga.unidad_requerida}</span>
                  </div>
                </div>

                <button
                  onClick={() => handlePostular(carga.id)}
                  disabled={postulandoId === carga.id}
                  className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-100 hover:to-slate-300 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 active:scale-98 border border-white/40 disabled:opacity-50"
                >
                  {postulandoId === carga.id ? (
                    <span className="font-mono text-slate-900 animate-pulse">Enviando postulación...</span>
                  ) : (
                    <>
                      <span>Postular mi Unidad</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>
            </CyberCard>
          ))}
        </div>
      )}
    </div>
  );
}
