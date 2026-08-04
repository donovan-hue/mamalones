"use client";

import { useState } from "react";
import { Truck, MapPin, DollarSign, Package, Plus, ChevronRight, Filter, ShieldCheck } from "lucide-react";

const FREIGHT_LIST = [
  {
    id: "FLT-9901",
    origin: "Guadalajara, JAL",
    destination: "Culiacán, SIN",
    cargo: "Maíz Blanco (28 Toneladas)",
    truckType: "Torton Cajas Secas",
    price: 34500,
    status: "published",
    date: "Hoy, 14:00 hrs",
  },
  {
    id: "FLT-9902",
    origin: "Mazatlán, SIN",
    destination: "Monterrey, NL",
    cargo: "Producto Congelado (22 Toneladas)",
    truckType: "Tráiler Termo 53ft",
    price: 52000,
    status: "funded",
    date: "Ayer, 18:30 hrs",
  },
  {
    id: "FLT-9903",
    origin: "Tlaquepaque, JAL",
    destination: "Querétaro, QRO",
    cargo: "Abarrotes en Tarima (18 Toneladas)",
    truckType: "Jaula / Rabón",
    price: 21000,
    status: "published",
    date: "Hace 2 horas",
  },
];

export default function TableroCargasPage() {
  const [selectedTab, setSelectedTab] = useState("all");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-500 font-bold tracking-wider">
            Mercado Abierto
          </span>
          <h1 className="text-lg font-extrabold text-white">Tablero de Cargas</h1>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-1 text-xs">
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Publicar</span>
        </button>
      </div>

      {/* FILTROS RÁPIDOS */}
      <div className="flex gap-2 text-xs">
        <button
          onClick={() => setSelectedTab("all")}
          className={`px-3 py-1.5 rounded-xl border transition-all ${
            selectedTab === "all"
              ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setSelectedTab("funded")}
          className={`px-3 py-1.5 rounded-xl border transition-all ${
            selectedTab === "funded"
              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
              : "bg-slate-900 border-slate-800 text-slate-400"
          }`}
        >
          Con Escrow Activo
        </button>
      </div>

      {/* LISTADO DE CARGAS */}
      <div className="space-y-3">
        {FREIGHT_LIST.map((freight) => (
          <div
            key={freight.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-slate-700 transition-all shadow-lg"
          >
            {/* ENCABEZADO Y PRECIO */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-mono text-slate-400">{freight.id}</span>
                <p className="text-xs text-slate-400">{freight.date}</p>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  ${freight.price.toLocaleString("es-MX")} MXN
                </span>
                {freight.status === "funded" && (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 justify-end mt-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Pago en Custodia</span>
                  </div>
                )}
              </div>
            </div>

            {/* RUTA */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">{freight.origin}</span>
              </div>
              <div className="border-l-2 border-dashed border-slate-800 ml-2 h-3" />
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">{freight.destination}</span>
              </div>
            </div>

            {/* DETALLES DE CARGA Y UNIDAD */}
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-slate-500" />
                <span>{freight.cargo}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-500" />
                <span>{freight.truckType}</span>
              </div>
            </div>

            {/* BOTÓN POSTULARSE */}
            <button className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1 group">
              <span>Postular mi Unidad</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
