"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Truck, MapPin, Scale, QrCode, 
  ShieldCheck, AlertTriangle, FileText, Utensils, 
  Plus, LogIn, UserPlus, Settings, Cpu, X
} from "lucide-react";

const SECCIONES = [
  { nombre: "Mercado", ruta: "/cargas", icono: Truck },
  { nombre: "Publicar", ruta: "/publicar", icono: Plus },
  { nombre: "Config (CRUD)", ruta: "/configuracion", icono: Settings },
  { nombre: "GPS", ruta: "/rastreo", icono: MapPin },
  { nombre: "Báscula", ruta: "/bascula", icono: Scale },
  { nombre: "Casetas QR", ruta: "/caseta", icono: QrCode },
  { nombre: "Escrow", ruta: "/entrega", icono: ShieldCheck },
  { nombre: "Offline", ruta: "/incidentes", icono: AlertTriangle },
  { nombre: "SAT 3.1", ruta: "/fiscal", icono: FileText },
  { nombre: "Sushi", ruta: "/sushi", icono: Utensils },
  { nombre: "Ingresar", ruta: "/login", icono: LogIn },
  { nombre: "Registro", ruta: "/registro", icono: UserPlus },
];

export function Navbar() {
  const [openTransform, setOpenTransform] = useState(false);
  const [search, setSearch] = useState("");

  const seccionesFiltradas = SECCIONES.filter((s) =>
    s.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER SUPERIOR LIMPIO */}
      <header className="sticky top-0 z-40 bg-[#0a0b0d]/90 backdrop-blur-md border-b border-slate-800/80 p-3 max-w-md mx-auto flex items-center justify-between gap-2 font-sans">
        <Link href="/" className="flex items-center gap-1.5 font-black text-xs text-slate-100 italic shrink-0">
          <div className="p-1.5 bg-gradient-to-b from-slate-600 to-slate-900 border border-slate-500 rounded-lg shadow-md">
            <Truck className="w-4 h-4 text-slate-200" />
          </div>
          <span className="tracking-wider">KRONOS</span>
        </Link>

        {/* BARRA DE BÚSQUEDA TÁCTICA */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar sección o módulo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpenTransform(true)}
            className="w-full bg-[#11141a] border border-slate-800 focus:border-slate-500 rounded-xl p-2 pl-8 text-[11px] text-slate-100 outline-none font-mono placeholder:text-slate-600 shadow-inner"
          />
        </div>
      </header>

      {/* OVERLAY Y DESPLIEGUE MODULO TRANSFORMER */}
      {openTransform && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg max-w-md mx-auto flex flex-col justify-end p-4 pb-24 font-sans animate-in fade-in duration-200">
          
          {/* MATRIZ DE MÓDULOS RECONFIGURADOS */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                <Cpu className="w-3.5 h-3.5 text-slate-400 animate-spin" />
                <span>CORE TRANSFORM // MÓDULOS ACTIVOS</span>
              </div>
              <button 
                onClick={() => setOpenTransform(false)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md"
              >
                [CERRAR]
              </button>
            </div>

            {/* BOTONES DESPLEGADOS EN GRID TÁCTICO */}
            <div className="grid grid-cols-3 gap-2.5 max-h-[60vh] overflow-y-auto p-1">
              {seccionesFiltradas.map((sec) => {
                const Icon = sec.icono;
                return (
                  <Link
                    key={sec.ruta}
                    href={sec.ruta}
                    onClick={() => {
                      setOpenTransform(false);
                      setSearch("");
                    }}
                    className="flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#161922] via-[#0d0f14] to-[#08090c] border border-slate-700/80 hover:border-slate-400 rounded-2xl text-slate-200 transition-all active:scale-90 shadow-[0_8px_20px_rgba(0,0,0,0.8)] group"
                  >
                    <div className="p-2 bg-slate-900/90 border border-slate-700/60 rounded-xl mb-1.5 group-hover:border-slate-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-300 text-center leading-tight truncate w-full">
                      {sec.nombre}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* BOTÓN NÚCLEO TRANSFORMER CENTRAL ABAJO */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="relative">
          {/* ANILLO EXTERNO DE ENERGÍA */}
          <div className={`absolute -inset-1 rounded-full bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 opacity-60 blur-sm transition-all duration-300 ${openTransform ? 'scale-125 opacity-100 animate-pulse' : ''}`} />
          
          {/* BOTÓN CENTRAL NÚCLEO */}
          <button
            onClick={() => setOpenTransform(!openTransform)}
            className={`relative flex items-center justify-center w-14 h-14 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-900 border-2 border-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.9)] text-slate-950 transition-all duration-300 active:scale-90 ${openTransform ? 'rotate-180 bg-slate-900 text-white border-slate-400' : ''}`}
          >
            {openTransform ? (
              <X className="w-7 h-7 text-white stroke-[2.5]" />
            ) : (
              <Cpu className="w-7 h-7 text-slate-950 stroke-[2.5]" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
