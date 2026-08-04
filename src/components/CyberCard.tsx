import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export function CyberCard({ children, className = "", badgeText }: CyberCardProps) {
  return (
    <div className={`relative rounded-2xl p-0.5 bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 shadow-2xl ${className}`}>
      {/* CUERPO INTERNO CON FIBRA Y BORDE METALICO */}
      <div 
        className="rounded-[14px] p-4 bg-[#11141a] relative overflow-hidden border border-slate-700/60"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.4) 100%),
            radial-gradient(circle at 50% 0%, rgba(148, 163, 184, 0.1), transparent 75%)
          `
        }}
      >
        {children}

        {/* INSIGNIA INFERIOR ESTILO HIGH PERFORMANCE */}
        {badgeText && (
          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            <span className="text-slate-500 font-bold">{"<<<"}</span>
            <span className="bg-slate-900 border border-slate-700/80 px-2.5 py-0.5 rounded-md text-slate-300 font-extrabold italic">
              {badgeText} // KRONOS
            </span>
            <span className="text-slate-500 font-bold">{">>>"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
