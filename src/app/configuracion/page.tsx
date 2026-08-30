"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Settings, UserCheck, Route, FileUp, 
  Trash2, Edit3, Save, Plus, AlertCircle, CheckCircle2, Upload
} from "lucide-react";
import { CyberCard } from "@/components/CyberCard";

export default function ConfiguracionPage() {
  // ESTADOS DE EDICIÓN DEL CLIENTE
  const [razonSocial, setRazonSocial] = useState("Comercializadora de Granos S.A. de C.V.");
  const [telefono, setTelefono] = useState("3331234567");
  const [rfc, setRfc] = useState("CGR990101XYZ");

  // ESTADOS DE EDICIÓN DE RUTA
  const [origenRuta, setOrigenRuta] = useState("Guadalajara, JAL");
  const [destinoRuta, setDestinoRuta] = useState("Culiacán, SIN");
  const [paradaExtra, setParadaExtra] = useState("Mazatlán, SIN (Descarga Parcial)");

  // ESTADO DE GUARDADO
  const [guardado, setGuardado] = useState(false);
  const [archivoSubido, setArchivoSubido] = useState<string | null>(null);

  const handleGuardarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivoSubido(e.target.files[0].name);
    }
  };

  const handleEliminarRuta = () => {
    if (confirm("¿Estás seguro de cancelar y eliminar esta ruta del sistema?")) {
      setOrigenRuta("");
      setDestinoRuta("");
      setParadaExtra("");
      alert("Ruta eliminada con éxito.");
    }
  };

  return (
    <div className="min-h-screen text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-24 font-sans">
      {/* HEADER */}
      <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
        <Link href="/cargas" className="p-2 bg-slate-900 border border-slate-700/80 rounded-xl text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">CONTROL & AJUSTES</span>
          <h1 className="text-lg font-black tracking-wider text-slate-100 italic">CONFIGURACIÓN & CRUD</h1>
        </div>
      </div>

      {guardado && (
        <CyberCard badgeText="SISTEMA">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold py-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>¡Información actualizada correctamente en la base de datos!</span>
          </div>
        </CyberCard>
      )}

      {/* 1. EDITAR INFORMACIÓN DEL CLIENTE / PERFIL */}
      <CyberCard badgeText="DATOS DEL CLIENTE / EMPRESA">
        <form onSubmit={handleGuardarCliente} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Razón Social / Cliente</label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 pl-9 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Teléfono Contacto</label>
              <input
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 text-xs text-slate-100 outline-none font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">RFC Fiscal</label>
              <input
                type="text"
                value={rfc}
                onChange={(e) => setRfc(e.target.value)}
                className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 text-xs text-slate-100 outline-none font-mono uppercase"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 text-slate-950 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/40 active:scale-98"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>Guardar Cambios del Cliente</span>
          </button>
        </form>
      </CyberCard>

      {/* 2. MODIFICAR RUTA / AÑADIR O ELIMINAR PARADAS */}
      <CyberCard badgeText="MODIFICAR RUTA ACTIVA">
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Origen de Carga</label>
            <input
              type="text"
              value={origenRuta}
              onChange={(e) => setOrigenRuta(e.target.value)}
              className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 text-xs text-slate-100 outline-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Destino Final</label>
            <input
              type="text"
              value={destinoRuta}
              onChange={(e) => setDestinoRuta(e.target.value)}
              className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 text-xs text-slate-100 outline-none font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">Parada Intermedia / Escala</label>
            <input
              type="text"
              value={paradaExtra}
              onChange={(e) => setParadaExtra(e.target.value)}
              className="w-full bg-[#0a0b0d] border border-slate-800 focus:border-slate-400 rounded-xl p-2.5 text-xs text-slate-100 outline-none font-mono"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              onClick={handleGuardarCliente}
              className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Actualizar Ruta</span>
            </button>

            <button
              onClick={handleEliminarRuta}
              className="bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 text-rose-300 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </CyberCard>

      {/* 3. SUBIR Y ADJUNTAR ARCHIVOS/DOCUMENTOS */}
      <CyberCard badgeText="SUBIR DOCUMENTOS & FACTURAS">
        <div className="space-y-3 font-mono text-xs">
          <div className="border-2 border-dashed border-slate-700 hover:border-slate-400 rounded-xl p-4 text-center cursor-pointer transition-colors relative bg-[#0a0b0d]">
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
            <p className="text-slate-300 font-bold">Haz clic o arrastra un archivo aquí</p>
            <p className="text-[10px] text-slate-500">Soporta PDF, PNG, JPG (Carta Porte, Facturas, Acuses)</p>
          </div>

          {archivoSubido && (
            <div className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between text-slate-200">
              <span className="truncate">{archivoSubido}</span>
              <span className="text-emerald-400 font-bold text-[10px]">[SUBIDO]</span>
            </div>
          )}
        </div>
      </CyberCard>
    </div>
  );
}
