"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Menu, X, Search, Truck, MapPin, Scale, QrCode, 
  ShieldCheck, AlertTriangle, FileText, Utensils, 
  Plus, LogIn, UserPlus, ChevronRight 
} from "lucide-react";

const SECCIONES = [
  { nombre: "Mercado de Cargas", ruta: "/cargas", icono: Truck },
  { nombre: "Publicar Carga", ruta: "/publicar", icono: Plus },
  { nombre: "Rastreo GPS Telemetría", ruta: "/rastreo", icono: MapPin },
  { nombre: "Báscula & Diésel", ruta: "/bascula", icono: Scale },
  { nombre: "TAG & Casetas QR", ruta: "/caseta", icono: QrCode },
  { nombre: "Entrega & Bóveda Escrow", ruta: "/entrega", icono: ShieldCheck },
  { nombre: "Incidentes & Offline", ruta: "/incidentes", icono: AlertTriangle },
  { nombre: "Carta Porte SAT 3.1", ruta: "/fiscal", icono: FileText },
  { nombre: "Kronos Sushi", ruta: "/sushi", icono: Utensils },
  { nombre: "Iniciar Sesión", ruta: "/login", icono: LogIn },
  { nombre: "Registro de Unidad", ruta: "/registro", icono: UserPlus },
];

export function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");

  const seccionesFiltradas = SECCIONES.filter((s) =>
    s.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* HEADER SUPERIOR CON BÚSQUEDA Y BOTÓN DE MENÚ */}
      <header className="sticky top-0 z-50 bg-[#0a0b0d]/90 backdrop-blur-md border-b border-slate-800 p-3 max-w-md mx-auto flex items-center justify-between gap-2 font-sans">
        {/* LOGO INICIO */}
        <Link href="/" className="flex items-center gap-1.5 font-black text-xs text-slate-100 italic shrink-0">
          <div className="p-1.5 bg-slate-800 border border-slate-600 rounded-lg">
            <Truck className="w-4 h-4 text-slate-200" />
          </div>
          <span>KRONOS</span>
        </Link>

        {/* BARRA DE BÚSQUEDA RÁPIDA */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar sección..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setOpenMenu(true)}
            className="w-full bg-[#11141a] border border-slate-800 focus:border-slate-500 rounded-xl p-2 pl-8 text-[11px] text-slate-100 outline-none font-mono placeholder:text-slate-600"
          />
        </div>

        {/* BOTÓN MENÚ DESPLEGABLE */}
        <button
          onClick={() => setOpenMenu(!openMenu)}
          className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-200 hover:text-white transition-all active:scale-95 shrink-0 flex items-center gap-1"
        >
          {openMenu ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
        </button>
      </header>

      {/* PANEL MODAL DESPLEGABLE CON TODAS LAS SECCIONES */}
      {openMenu && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md max-w-md mx-auto flex flex-col justify-between p-4 pt-16 font-sans">
          <div className="space-y-3 overflow-y-auto max-h-[80vh] pr-1">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                DIRECTORIO DE SECCIONES ({seccionesFiltradas.length})
              </span>
              <button onClick={() => setOpenMenu(false)} className="text-xs text-slate-500 font-mono">
                [CERRAR]
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {seccionesFiltradas.map((sec) => {
                const Icon = sec.icono;
                return (
                  <Link
                    key={sec.ruta}
                    href={sec.ruta}
                    onClick={() => {
                      setOpenMenu(false);
                      setSearch("");
                    }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-[#11141a] to-slate-900 border border-slate-800 hover:border-slate-500 rounded-xl text-slate-200 font-bold text-xs transition-all active:scale-98 shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{sec.nombre}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-center">
            <span className="text-[10px] font-mono text-slate-500">KRONOS FLEET // SYSTEM NAVIGATION</span>
          </div>
        </div>
      )}
    </>
  );
}
