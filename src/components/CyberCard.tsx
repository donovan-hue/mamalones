import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export function CyberCard({ children, className = "", badgeText }: CyberCardProps) {
  return (
    <div className={`rounded-xl bg-[#12151c] border border-slate-800/80 p-4 shadow-sm w-full ${className}`}>
      {badgeText && (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800/60">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
            {badgeText}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
