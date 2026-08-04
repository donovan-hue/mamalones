"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home, ArrowRight, Layers } from "lucide-react";

export function QuickNav() {
  const router = useRouter();

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 bg-[#0f1117]/95 border border-slate-700/80 rounded-2xl p-1.5 shadow-2xl backdrop-blur-md flex items-center gap-1 font-sans">
      <button
        onClick={() => router.back()}
        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono font-bold flex items-center gap-1 active:scale-95 transition-all"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Atrás</span>
      </button>

      <Link
        href="/"
        className="p-2 bg-gradient-to-r from-slate-200 to-slate-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center active:scale-95 transition-all shadow-md"
      >
        <Home className="w-4 h-4 stroke-[2.5]" />
      </Link>

      <Link
        href="/cargas"
        className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-300 text-xs font-mono font-bold flex items-center gap-1 active:scale-95 transition-all"
      >
        <span>Mercado</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
