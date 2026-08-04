"use client";

import { useEffect, useState } from "react";
import { Truck, MapPin, Weight, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Freight {
  id: string;
  origin: string;
  destination: string;
  weight: string;
  cargo_type: string;
  price: number;
}

export default function TableroCargas() {
  const [cargas, setCargas] = useState<Freight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFreights() {
      const { data, error } = await supabase
        .from("freights")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setCargas(data);
      }
      setLoading(false);
    }

    fetchFreights();
  }, []);

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

        {loading ? (
          <div className="text-center py-10 text-slate-400">Cargando fletes...</div>
        ) : cargas.length === 0 ? (
          <div className="text-center py-10 text-slate-400">No hay cargas publicadas aún.</div>
        ) : (
          <div className="grid gap-4">
            {cargas.map((carga) => (
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
                    <span>{carga.cargo_type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                  <div className="text-xl font-bold text-emerald-400">
                    ${carga.price.toLocaleString("es-MX")} MXN
                  </div>
                  <button
                    onClick={() => alert(`Postulado a la carga ID: ${carga.id}`)}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Postularme
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
