import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export function CyberCard({ children, className = "", badgeText }: CyberCardProps) {
  return (
    <div className={`rounded-2xl bg-[#12151c] border border-slate-800 p-5 shadow-2xl w-full ${className}`}>
      {badgeText && (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
            {badgeText}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
