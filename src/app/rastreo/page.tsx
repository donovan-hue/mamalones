"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Navigation, BatteryCharging, Gauge, MapPin, Radio } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function RastreoPage() {
  const [speed, setSpeed] = useState(82);
  const [lat, setLat] = useState(20.6597);
  const [lng, setLng] = useState(-103.3496);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(78 + Math.random() * 10));
      setLat((prev) => prev + 0.0001);
      setLng((prev) => prev - 0.0001);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">TELEMETRÍA EN VIVO</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">RASTREO GPS</h1>
        </div>
      </div>

      <CyberCard badgeText="RADAR SATELEITAL">
        <div className="space-y-4">
          <div className="relative h-44 bg-[#0a0b0d] rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            <div className="relative z-10 text-center space-y-1">
              <div className="p-3 bg-slate-900/90 border border-slate-700 rounded-full inline-block shadow-2xl animate-pulse">
                <Navigation className="w-8 h-8 text-slate-200 rotate-45" />
              </div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                GEOCERCA: RUTA GUADALAJARA ➔ CULIACÁN
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
                <Gauge className="w-3.5 h-3.5 text-slate-300" />
                <span>VELOCIDAD</span>
              </div>
              <div className="text-xl font-black font-mono text-slate-100 mt-1">
                {speed} <span className="text-xs font-normal text-slate-400">KM/H</span>
              </div>
            </div>

            <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-mono">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                <span>BATERÍA GPS</span>
              </div>
              <div className="text-xl font-black font-mono text-slate-100 mt-1">
                98% <span className="text-xs font-normal text-emerald-400">ONLINE</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0b0d] p-3 rounded-xl border border-slate-800/80 text-xs font-mono space-y-1">
            <div className="flex justify-between text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> LATITUD:</span>
              <span className="text-slate-200">{lat.toFixed(4)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> LONGITUD:</span>
              <span className="text-slate-200">{lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
      </CyberCard>
    </div>
  );
}
