import React from "react";

interface CyberCardProps {
  children: React.ReactNode;
  className?: string;
}

export function CyberCard({ children, className = "" }: CyberCardProps) {
  return (
    <div className={`bg-[#121620]/90 border border-[#1e2638] hover:border-amber-500/40 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-all ${className}`}>
      {children}
    </div>
  );
}
