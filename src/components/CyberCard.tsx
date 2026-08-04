import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export function CyberCard({ children, className = "", badgeText }: CyberCardProps) {
  return (
    <div className={`relative rounded-2xl p-[1.5px] bg-gradient-to-b from-slate-400 via-slate-600 to-slate-900 shadow-2xl ${className}`}>
      {/* CUERPO METALICO CON TEXTURA */}
      <div className="rounded-[14px] p-5 bg-[#0f1117] relative overflow-hidden border border-slate-700/80 shadow-inner">
        {/* BRILLO REFLEJO METALICO */}
        <div className="absolute -top-12 -left-12 w-40 h-40 bg-slate-300/10 rounded-full blur-2xl pointer-events-none" />

        {children}

        {/* INSIGNIA BARRAS Y FLECHAS INFERIORES ESTILO CARBON FIBER */}
        {badgeText && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="text-slate-500 font-extrabold tracking-tighter">{"<<<"}</span>
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-600/60 px-3 py-1 rounded-md text-slate-200 font-black italic tracking-wider">
              {badgeText} // EST. 2026
            </span>
            <span className="text-slate-500 font-extrabold tracking-tighter">{">>>"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
