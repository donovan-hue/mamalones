"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = "/cargas";
    }, 1000);
  };

  return (
    <div className="min-h-screen text-slate-100 p-5 max-w-md mx-auto flex flex-col justify-between relative font-sans">
      <div className="pt-6 text-center space-y-2">
        <div className="inline-flex p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 border border-slate-500/60 rounded-2xl shadow-xl">
          <Cpu className="w-8 h-8 text-slate-200" />
        </div>
        <h1 className="text-xl font-black tracking-widest text-slate-200 italic">
          ACCESO AL SISTEMA
        </h1>
        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
          Autenticación de Operador
        </p>
      </div>

      <div className="my-auto">
        <CyberCard badgeText="AUTHENTICATION">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="operador@kronos.space"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 hover:from-slate-100 hover:to-slate-300 text-slate-950 font-extrabold py-3 rounded-xl text-xs tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 active:scale-98 border border-white/40 mt-2"
            >
              {loading ? (
                <span className="font-mono animate-pulse">Accediendo...</span>
              ) : (
                <>
                  <span>Ingresar al Sistema</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link href="/registro" className="text-xs text-slate-400 hover:text-slate-200 transition-colors">
                ¿Sin cuenta? <span className="text-slate-200 font-bold underline">Registrar unidad</span>
              </Link>
            </div>
          </form>
        </CyberCard>
      </div>

      <div className="text-center py-4 border-t border-slate-800/80">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>SECURE ACCESS • KRONOS FLEET</span>
        </div>
      </div>
    </div>
  );
}
