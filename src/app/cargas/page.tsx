"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, MapPin, ShieldCheck, ChevronRight, Plus, ArrowLeft, Loader2, Lock } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";
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

const CARGAS_DEMO: Carga[] = [
  {
    id: "flt-9901-demo",
    origen: "Guadalajara, JAL",
    destino: "Culiacán, SIN",
    monto: 38500,
    producto: "9.5 Toneladas Trigo Comercial",
    unidad_requerida: "Torton Cajas Secas",
    escrow_activo: true,
    created_at: new Date().toISOString(),
    estatus: "disponible"
  },
  {
    id: "flt-8802-demo",
    origen: "Tlaquepaque, JAL",
    destino: "Mazatlán, SIN",
    monto: 24000,
    producto: "12 Toneladas Maíz Blanco",
    unidad_requerida: "Rabón Heavy Duty",
    escrow_activo: false,
    created_at: new Date().toISOString(),
    estatus: "disponible"
  }
];

export default function TableroCargasProduccion() {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"todas" | "escrow">("todas");
  const [postulandoId, setPostulandoId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCargas() {
      try {
        setLoading(true);

        // SOLO SE MUESTRAN CARGAS CON ESTATUS 'disponible'
        // Las cargas 'en_transito' o 'asignadas' se filtran automáticamente por seguridad del chofer
        let query = supabase
          .from("cargas")
          .select("*")
          .eq("estatus", "disponible")
          .order("created_at", { ascending: false });

        if (filter === "escrow") {
          query = query.eq("escrow_activo", true);
        }

        const { data, error: fetchError } = await query;

        if (fetchError || !data || data.length === 0) {
          setCargas(filter === "escrow" ? CARGAS_DEMO.filter(c => c.escrow_activo) : CARGAS_DEMO);
        } else {
          setCargas(data);
        }
      } catch (err) {
        setCargas(filter === "escrow" ? CARGAS_DEMO.filter(c => c.escrow_activo) : CARGAS_DEMO);
      } finally {
        setLoading(false);
      }
    }

    fetchCargas();
  }, [filter]);

  const handlePostular = (cargaId: string) => {
    setPostulandoId(cargaId);
    setTimeout(() => {
      alert("¡Postulación enviada en privado! Al ser aceptada, el viaje se bloqueará para terceros por seguridad.");
      setPostulandoId(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 bg-[#12151c] border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">MERCADO PÚBLICO // DISPONIBLES</span>
            <h1 className="text-lg font-bold text-white italic">TABLERO DE CARGAS</h1>
          </div>
        </div>
        <Link
          href="/publicar"
          className="bg-white text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Publicar</span>
        </Link>
      </div>

      <div className="bg-[#12151c] p-2.5 rounded-xl border border-slate-800 flex items-center gap-2 text-xs">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-[10px] text-slate-400 font-mono">
          <strong className="text-slate-200">Privacidad Operativa:</strong> Los viajes activos desaparecen del mercado y solo son visibles para chofer y cliente.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter("todas")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
            filter === "todas"
              ? "bg-white text-slate-950 border-white"
              : "bg-[#12151c] text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("escrow")}
          className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
            filter === "escrow"
              ? "bg-white text-slate-950 border-white"
              : "bg-[#12151c] text-slate-400 border-slate-800 hover:text-slate-200"
          }`}
        >
          Con Escrow Activo
        </button>
      </div>

      {loading && (
        <div className="py-12 text-center space-y-2">
          <Loader2 className="w-8 h-8 text-slate-300 animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Consultando vacantes en tiempo real...</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          {cargas.map((carga) => (
            <CyberCard key={carga.id} badgeText={`DISPONIBLE // ID: ${carga.id.slice(0, 8)}`}>
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
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
                    <span className="text-base font-bold text-white font-mono tracking-tight">
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

                <div className="bg-[#0b0c0e] p-2.5 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
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
                  className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 active:scale-98 border border-white/40 disabled:opacity-50"
                >
                  {postulandoId === carga.id ? (
                    <span className="font-mono text-slate-900 animate-pulse">Postulando en privado...</span>
                  ) : (
                    <>
                      <span>Postular mi Unidad (Privado)</span>
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
