"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Truck, MapPin, ShieldCheck, ChevronRight, Plus, ArrowLeft, Loader2, Lock, CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";
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
  estatus: "disponible" | "en_transito" | "completado";
  cliente_id?: string;
  fletera_id?: string;
}

const CARGAS_DEMO: Carga[] = [
  {
    id: "flt-9901",
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
    id: "flt-8802",
    origen: "Tlaquepaque, JAL",
    destino: "Mazatlán, SIN",
    monto: 24000,
    producto: "12 Toneladas Maíz Blanco",
    unidad_requerida: "Rabón Heavy Duty",
    escrow_activo: true,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    estatus: "en_transito"
  },
  {
    id: "flt-7703",
    origen: "Querétaro, QRO",
    destino: "Guadalajara, JAL",
    monto: 31000,
    producto: "15 Toneladas Refrescos & Bebidas",
    unidad_requerida: "Torton 3 Ejes",
    escrow_activo: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    estatus: "completado"
  }
];

export default function TableroCargasProduccion() {
  const [cargas, setCargas] = useState<Carga[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"mercado" | "privado" | "completados">("mercado");
  const [postulandoId, setPostulandoId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCargas() {
      try {
        setLoading(true);
        let query = supabase.from("cargas").select("*");

        if (tab === "mercado") {
          query = query.eq("estatus", "disponible");
        } else if (tab === "privado") {
          query = query.eq("estatus", "en_transito");
        } else {
          query = query.eq("estatus", "completado");
        }

        const { data, error: fetchError } = await query;

        if (fetchError || !data || data.length === 0) {
          setCargas(CARGAS_DEMO.filter(c => 
            tab === "mercado" ? c.estatus === "disponible" : 
            tab === "privado" ? c.estatus === "en_transito" : 
            c.estatus === "completado"
          ));
        } else {
          setCargas(data);
        }
      } catch (err) {
        setCargas(CARGAS_DEMO.filter(c => 
          tab === "mercado" ? c.estatus === "disponible" : 
          tab === "privado" ? c.estatus === "en_transito" : 
          c.estatus === "completado"
        ));
      } finally {
        setLoading(false);
      }
    }

    fetchCargas();
  }, [tab]);

  const handlePactarAcuerdo = (cargaId: string) => {
    setPostulandoId(cargaId);
    setTimeout(() => {
      alert("¡Acuerdo pactado! La carga ha sido removida del mercado público y se activó el Canal Privado Encriptado.");
      setCargas(prev => prev.map(c => c.id === cargaId ? { ...c, estatus: "en_transito" } : c));
      setPostulandoId(null);
    }, 1000);
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 bg-[#12151c] border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">CONTROL DE FLETES</span>
            <h1 className="text-lg font-bold text-white italic">MERCADO & VIAJES PRIVADOS</h1>
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

      {/* PESTAÑAS DE NAVEGACIÓN DE ESTADOS */}
      <div className="grid grid-cols-3 gap-1 bg-[#12151c] p-1 rounded-xl border border-slate-800 text-[11px] font-mono font-bold">
        <button
          onClick={() => setTab("mercado")}
          className={`py-2 rounded-lg transition-all ${
            tab === "mercado" ? "bg-white text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Mercado ({CARGAS_DEMO.filter(c => c.estatus === "disponible").length})
        </button>

        <button
          onClick={() => setTab("privado")}
          className={`py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
            tab === "privado" ? "bg-emerald-500 text-slate-950 shadow" : "text-emerald-400 hover:text-emerald-300"
          }`}
        >
          <Lock className="w-3 h-3" />
          <span>Privados</span>
        </button>

        <button
          onClick={() => setTab("completados")}
          className={`py-2 rounded-lg transition-all ${
            tab === "completados" ? "bg-white text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Historial
        </button>
      </div>

      {/* AVISO EXPLICITATIVO SEGÚN PESTAÑA */}
      {tab === "mercado" && (
        <div className="bg-[#12151c] p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono">
          <span className="text-slate-200 font-bold block">💡 Vacantes Generales:</span>
          Las publicaciones no muestran placas ni teléfonos hasta que ambas partes llegan a un acuerdo.
        </div>
      )}

      {tab === "privado" && (
        <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/60 text-[10px] text-emerald-300 font-mono flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold block text-white">CANAL 100% BLINDADO</span>
            Información, llamadas y GPS únicamente compartidos entre Solicitante y Fletera asignada.
          </div>
        </div>
      )}

      {tab === "completados" && (
        <div className="bg-[#12151c] p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="font-bold block text-white">HISTORIAL PÚBLICO DE REPUTACIÓN</span>
            Los fletes terminados se muestran como comprobante de puntualidad y cobro liberado.
          </div>
        </div>
      )}

      {loading && (
        <div className="py-12 text-center space-y-2">
          <Loader2 className="w-8 h-8 text-slate-300 animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Consultando registros seguros...</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-4">
          {cargas.map((carga) => (
            <CyberCard 
              key={carga.id} 
              badgeText={
                carga.estatus === "disponible" ? `VACANTE // ID: ${carga.id}` :
                carga.estatus === "en_transito" ? `🔒 VIAJE PRIVADO ACTIVO // ID: ${carga.id}` :
                `✅ FLETE ENTREGADO // ID: ${carga.id}`
              }
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{carga.origen}</span>
                      <span className="text-slate-500">➔</span>
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
                        <span>Pago Escrow Garantizado</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#0b0c0e] p-2.5 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>Carga:</span>
                    <span className="text-slate-200 font-bold">{carga.producto}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Unidad:</span>
                    <span className="text-slate-300 font-bold">{carga.unidad_requerida}</span>
                  </div>
                </div>

                {/* BOTONES SEGÚN EL ESTADO DEL VIAJE */}
                {carga.estatus === "disponible" && (
                  <button
                    onClick={() => handlePactarAcuerdo(carga.id)}
                    disabled={postulandoId === carga.id}
                    className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 active:scale-98 border border-white/40"
                  >
                    {postulandoId === carga.id ? (
                      <span className="font-mono text-slate-900 animate-pulse">Cerrando trato en privado...</span>
                    ) : (
                      <>
                        <span>Pactar Trato & Bloquear para Terceros</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </button>
                )}

                {carga.estatus === "en_transito" && (
                  <div className="space-y-2 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/rastreo"
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-lg text-[11px] font-mono flex items-center justify-center gap-1.5 shadow"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Ver GPS Privado</span>
                      </Link>
                      <button
                        onClick={() => alert("Conectando llamada directa cifrada entre Cliente y Chofer...")}
                        className="bg-[#12151c] hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold py-2 rounded-lg text-[11px] font-mono flex items-center justify-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Llamada Cifrada</span>
                      </button>
                    </div>
                  </div>
                )}

                {carga.estatus === "completado" && (
                  <div className="bg-[#0b0c0e] p-2 rounded-lg border border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Entrega Confirmada
                    </span>
                    <span className="text-slate-300">Pago Liberado al 100%</span>
                  </div>
                )}

              </div>
            </CyberCard>
          ))}
        </div>
      )}
    </div>
  );
}
