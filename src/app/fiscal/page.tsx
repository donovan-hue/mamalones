"use client";

import { useState } from "react";
import { FileText, Star, ShieldCheck, Download, QrCode, CheckCircle2 } from "lucide-react";

export default function FiscalReputacionPage() {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [rated, setRated] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20">
      {/* CARTA PORTE SAT */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-500" />
            <h1 className="font-bold text-sm text-white">Carta Porte 3.1 (SAT)</h1>
          </div>
          <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
            Timbrado XML/PDF
          </span>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Folio Fiscal UUID:</span>
            <span className="font-mono text-slate-200">4A89-B2C1-8891</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Ruta Registrada:</span>
            <span className="text-slate-200">Guadalajara ➔ Culiacán</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Estatus Tránsito Federal:</span>
            <span className="text-emerald-400 font-bold">Aprobado / Vigente</span>
          </div>
        </div>

        <button className="w-full bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all">
          <Download className="w-4 h-4" />
          <span>Descargar PDF Oficial Carta Porte</span>
        </button>
      </div>

      {/* SCORE Y REPUTACIÓN */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
          <h2 className="font-bold text-sm text-white">Calificación del Servicio</h2>
        </div>

        {rated ? (
          <div className="text-center py-4 space-y-2 bg-slate-950 rounded-xl p-4 border border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="font-bold text-xs text-white">¡Gracias por tu evaluación!</p>
            <p className="text-[11px] text-slate-400">El score de reputación ha sido actualizado en la red.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-300">Evalúa el desempeño de la entrega:</p>
            
            {/* ESTRELLAS */}
            <div className="flex justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform active:scale-125"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              rows={2}
              placeholder="Escribe un comentario sobre la puntualidad o la carga..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-amber-500"
            />

            <button
              onClick={() => setRated(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Enviar Calificación</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
