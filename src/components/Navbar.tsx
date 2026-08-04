"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Search, Truck, MapPin, Scale, QrCode, 
  ShieldCheck, AlertTriangle, FileText, Utensils, 
  Plus, LogIn, UserPlus, Settings, LayoutGrid, X
} from "lucide-react";

const SECCIONES = [
  { nombre: "Mercado de Cargas", ruta: "/cargas", icono: Truck },
  { nombre: "Publicar Carga", ruta: "/publicar", icono: Plus },
  { nombre: "Configuración (CRUD)", ruta: "/configuracion", icono: Settings },
  { nombre: "Rastreo GPS", ruta: "/rastreo", icono: MapPin },
  { nombre: "Báscula & Diésel", ruta: "/bascula", icono: Scale },
  { nombre: "Casetas QR", ruta: "/caseta", icono: QrCode },
  { nombre: "Entrega Escrow", ruta: "/entrega", icono: ShieldCheck },
  { nombre: "Incidentes Offline", ruta: "/incidentes", icono: AlertTriangle },
  { nombre: "Carta Porte SAT", ruta: "/fiscal", icono: FileText },
  { nombre: "Kronos Sushi", ruta: "/sushi", icono: Utensils },
  { nombre: "Iniciar Sesión", ruta: "/login", icono: LogIn },
  { nombre: "Registro Unidad", ruta: "/registro", icono: UserPlus },
];

export function Navbar() {
  const [openTransform, setOpenTransform] = useState(false);
  const [search, setSearch] = useState("");

  const seccionesFiltradas = SECCIONES.filter((s) =>
    s.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#0b0c0e]/90 backdrop-blur-md border-b border-slate-800/80 p-3 max-w-md mx-auto flex items-center justify-between gap-2 font-sans">
        <Link href="/" className="flex items-center gap-2 font-bold text-xs text-white shrink-0">
          <div className="p-1.5 bg-[#12151c] border border-slate-800 rounded-lg">
            <Truck className="w-4 h-4 text-slate-300" />
          </div>
          <span className="tracking-tight">KRONOS</span>
        </Link>

        {/* BUSCADOR */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpenTransform(true)}
            className="w-full bg-[#12151c] border border-slate-800/80 focus:border-slate-600 rounded-lg p-2 pl-8 text-[11px] text-slate-100 outline-none font-mono placeholder:text-slate-600"
          />
        </div>
      </header>

      {/* OVERLAY DE MÓDULOS */}
      {openTransform && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md max-w-md mx-auto flex flex-col justify-end p-4 pb-20 font-sans">
          <div className="bg-[#12151c] border border-slate-800 rounded-2xl p-4 space-y-3 mb-2 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                DIRECTORIO DE SECCIONES ({seccionesFiltradas.length})
              </span>
              <button 
                onClick={() => setOpenTransform(false)}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300"
              >
                [CERRAR]
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 max-h-[55vh] overflow-y-auto">
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
                    className="flex flex-col items-center justify-center p-3 bg-[#0b0c0e] border border-slate-800/80 hover:border-slate-600 rounded-xl text-slate-200 transition-all active:scale-95"
                  >
                    <Icon className="w-4 h-4 text-slate-400 mb-1" />
                    <span className="text-[10px] font-mono text-slate-300 text-center truncate w-full">
                      {sec.nombre}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE INFERIOR DISCRETO */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setOpenTransform(!openTransform)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#12151c] hover:bg-slate-800 border border-slate-700/80 rounded-full shadow-lg text-slate-200 text-xs font-mono font-medium transition-all active:scale-95"
        >
          {openTransform ? (
            <>
              <X className="w-4 h-4 text-slate-400" />
              <span>Cerrar</span>
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4 text-slate-400" />
              <span>Menú</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
