"use client";

import { Truck, MapPin, Weight, DollarSign, ArrowRight } from "lucide-react";

export default function TableroCargas() {
  const cargasEjemplo = [
    {
      id: "1",
      origin: "Guadalajara, Jal.",
      destination: "Monterrey, N.L.",
      weight: "9.5 Tons",
      cargoType: "Maíz / Semillas",
      price: "$18,500 MXN",
    },
    {
      id: "2",
      origin: "Tlaquepaque, Jal.",
      destination: "Querétaro, Qro.",
      weight: "4.0 Tons",
      cargoType: "Tarimas de Madera",
      price: "$9,000 MXN",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-amber-500" />
            <h1 className="text-2xl font-bold">Cargas Disponibles</h1>
          </div>
          <a
            href="/publicar"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm text-amber-500 font-semibold"
          >
            + Publicar Carga
          </a>
        </div>

        <div className="grid gap-4">
          {cargasEjemplo.map((carga) => (
            <div
              key={carga.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-white">
                  <span>{carga.origin}</span>
                  <ArrowRight className="w-5 h-5 text-amber-500" />
                  <span>{carga.destination}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Weight className="w-4 h-4 text-slate-500" /> {carga.weight}
                  </span>
                  <span>•</span>
                  <span>{carga.cargoType}</span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6">
                <div className="text-xl font-bold text-emerald-400">{carga.price}</div>
                <button
                  onClick={() => alert(`Postulado a la carga #${carga.id}`)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Postularme
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
