import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export function CyberCard({ children, className = "", badgeText }: CyberCardProps) {
  return (
    <div className={`relative rounded-[24px] p-[2px] bg-gradient-to-b from-slate-300 via-slate-600 to-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.9)] w-full ${className}`}>
      <div className="rounded-[22px] p-[1px] bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400">
        <div className="rounded-[21px] p-4 bg-[#090a0c] relative overflow-hidden shadow-[inner_0_2px_15px_rgba(0,0,0,1)] border border-black">
          
          {/* PATRON 3D TEJIDO CARBONO */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #181a20 25%, transparent 25%), 
                linear-gradient(-45deg, #181a20 25%, transparent 25%), 
                linear-gradient(45deg, transparent 75%, #181a20 75%), 
                linear-gradient(-45deg, transparent 75%, #181a20 75%)
              `,
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
            }}
          />

          {/* REFLEJO DIAGONAL */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-white/10 via-white/5 to-transparent rotate-45 pointer-events-none rounded-full blur-sm" />

          {/* CONTENIDO PRINCIPAL */}
          <div className="relative z-10">{children}</div>

          {/* PLACA INFERIOR GRABADA */}
          {badgeText && (
            <div className="relative z-10 mt-4 pt-2">
              <div className="bg-gradient-to-b from-slate-600 via-slate-800 to-slate-950 p-[1px] rounded-xl shadow-lg">
                <div className="bg-[#0f1117] px-3 py-1.5 rounded-[11px] flex items-center justify-between border border-slate-700/60 shadow-inner">
                  <div className="flex gap-0.5 text-slate-400 font-black tracking-tighter text-[10px] select-none">
                    <span>❮</span><span>❮</span><span>❮</span>
                  </div>

                  <span className="text-[9px] font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 tracking-[0.2em] uppercase italic">
                    {badgeText} // EST. 2026
                  </span>

                  <div className="flex gap-0.5 text-slate-400 font-black tracking-tighter text-[10px] select-none">
                    <span>❯</span><span>❯</span><span>❯</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
