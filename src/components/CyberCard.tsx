import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
  badgeText?: string;
}

export function CyberCard({ children, className = "", badgeText }: CyberCardProps) {
  return (
    <div className={`vercel-card rounded-lg p-4 w-full ${className}`}>
      {badgeText && (
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#222222]">
          <span className="text-[11px] font-mono tracking-tight text-[#888888] uppercase">
            {badgeText}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#555555]" />
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
