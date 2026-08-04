"use client";

import { useState, useEffect } from "react";
import { Navigation, MapPin, ShieldCheck, BatteryCharging, Radio, Compass, AlertOctagon } from "lucide-react";

export default function RastreoGeocercaPage() {
  const [freightId, setFreightId] = useState("FLT-9901");
  const [location, setLocation] = useState({ lat: 20.6597, lng: -103.3496 });
  const [speed, setSpeed] = useState(82);
  const [insideGeofence, setInsideGeofence] = useState(false);

  useEffect(() => {
    // Simulacion de telemetria GPS activa
    const interval = setInterval(() => {
      setSpeed(Math.floor(78 + Math.random() * 8));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20">
      {/* HEADER DE TELEMETRÍA */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white">Monitoreo GPS en Vivo</h1>
            <p className="text-[11px] text-slate-400 font-mono">Unidad: Kenworth T680 (Placas: 88-AA-1B)</p>
          </div>
        </div>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-full font-bold">
          Ruta On-Track
        </span>
      </div>

      {/* MAPA INTERACTIVO (SIMULACIÓN VISUAL VECTORIAL) */}
      <div className="relative h-64 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between p-4">
        {/* FONDO MESH TIPO MAPA NOCTURNO */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px), radial-gradient(#f59e0b 1px, transparent 1px)`,
            backgroundSize: `20px 20px`,
            backgroundPosition: `0 0, 10px 10px`
          }}
        />

        {/* INDICADORES FLOTANTES DEL MAPA */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="bg-slate-950/90 backdrop-blur-md p-2 rounded-xl border border-slate-800 text-[10px] space-y-1">
            <div className="flex items-center gap-1 text-slate-300">
              <Compass className="w-3 h-3 text-amber-500" />
              <span>Lat: {location.lat.toFixed(4)}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-300">
              <Compass className="w-3 h-3 text-amber-500" />
              <span>Lng: {location.lng.toFixed(4)}</span>
            </div>
          </div>

          <div className="bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200">98% GPS</span>
          </div>
        </div>

        {/* MARCADOR DE UNIDAD EN MAPA */}
        <div className="relative z-10 mx-auto text-center space-y-1">
          <div className="inline-block bg-amber-500 text-slate-950 p-3 rounded-full shadow-lg shadow-amber-500/30 animate-bounce">
            <Navigation className="w-6 h-6 rotate-45 stroke-[2.5]" />
          </div>
          <p className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded-full border border-amber-500/40 text-amber-300 inline-block">
            {speed} km/h (Autopista)
          </p>
        </div>

        {/* ESTATUS DE GEOCERCA */}
        <div className="relative z-10 bg-slate-950/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span className="text-slate-300 text-[11px]">Geocerca Destino (Bodega Culiacán)</span>
          </div>
          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            A 142 km
          </span>
        </div>
      </div>

      {/* CHECKLIST DE RUTA Y SEGURIDAD */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Puntos de Control Automático</h2>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-300">Salida de Bodega Origen</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Detectado
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-300">Casetas Autorizadas (TAG QR)</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 3 de 3 Pagadas
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-300">Alerta por Desvío de Ruta</span>
            <span className="text-slate-400 font-bold">Sin anomalías</span>
          </div>
        </div>
      </div>
    </div>
  );
}
