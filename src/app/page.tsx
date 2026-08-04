"use client";

import Link from "next/link";
import { 
  Truck, Scale, ShieldCheck, QrCode, MapPin, 
  FileText, Radio, WifiOff, UserCheck, Flame, 
  ChevronRight, Activity, DollarSign 
} from "lucide-react";

const MODULES = [
  { name: "Tablero de Cargas", path: "/cargas", icon: Truck, desc: "Fletes y ofertas en tiempo real", badge: "Mercado" },
  { name: "Rastreo & Geocercas", path: "/rastreo", icon: Radio, desc: "Telemetría y GPS en vivo", badge: "GPS" },
  { name: "Báscula & Diésel", path: "/bascula", icon: Scale, desc: "Mermas (0.835 kg/L) y sellos", badge: "Control" },
  { name: "Casetas QR / TAG", path: "/caseta", icon: QrCode, desc: "Pago exprés en autopista", badge: "TAG" },
  { name: "Confirmar Entrega", path: "/entrega", icon: ShieldCheck, desc: "Escáner QR y recibo final", badge: "Escrow" },
  { name: "Incidentes & Offline", path: "/incidentes", icon: WifiOff, desc: "Estadías y fallas sin señal", badge: "Offline" },
  { name: "Expediente Chofer", path: "/registro", icon: UserCheck, desc: "Alta de unidad y seguro", badge: "Validado" },
  { name: "Carta Porte & SAT", path: "/fiscal", icon: FileText, desc: "UUID fiscal y score de red", badge: "SAT 3.1" },
  { name: "Kronos Sushi", path: "/sushi", icon: Flame, desc: "Menú exclusivo de la casa", badge: "Special" },
];

export default function DashboardCyberIndustrial() {
  return (
    <div 
      className="min-h-screen text-slate-100 p-4 max-w-md mx-auto relative pb-20 shadow-2xl font-sans"
      style={{
        backgroundColor: "#0a0c10",
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.12), transparent 75%),
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 20px 20px, 20px 20px",
      }}
    >
      {/* HEADER COCKPIT */}
      <div className="bg-slate-900/90 border border-amber-500/30 p-4 rounded-2xl shadow-lg backdrop-blur-md flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-500/40 text-amber-400">
            <Truck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-[0.2em] text-amber-500 font-bold uppercase">
              CENTRO DE MANDO
            </span>
            <h1 className="text-xl font-black text-white tracking-wide">
              KRONOS <span className="text-amber-400 font-mono">FLEET</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-400">
          <Activity className="w-3.5 h-3.5" />
          <span>ONLINE</span>
        </div>
      </div>

      {/* METRICAS RAPIDAS DE TELEMETRIA */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Unidad Activa</span>
          <p className="text-sm font-bold text-white font-mono mt-0.5">KW-T680 (88-AA-1B)</p>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Estado Flete</span>
          <p className="text-sm font-bold text-amber-400 font-mono mt-0.5">$34,500 en Escrow</p>
        </div>
      </div>

      {/* TITULO SECCION */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
          Módulos de Control
        </h2>
        <span className="text-[10px] font-mono text-amber-500/80">12/12 Operativos</span>
      </div>

      {/* GRID DE MODULOS */}
      <div className="space-y-3">
        {MODULES.map((mod) => {
          const IconComponent = mod.icon;
          return (
            <Link
              key={mod.path}
              href={mod.path}
              className="group block bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-3.5 rounded-2xl transition-all duration-200 shadow-lg active:scale-98"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-amber-500/40 text-amber-400 group-hover:text-amber-300 transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {mod.name}
                      </h3>
                      <span className="text-[9px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded">
                        {mod.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{mod.desc}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
