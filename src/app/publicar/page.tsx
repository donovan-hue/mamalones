"use client";

import { useState } from "react";
import { Truck, MapPin, Weight, DollarSign, Package } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PublicarFlete() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    weight: "",
    cargoType: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("freights").insert([
      {
        origin: formData.origin,
        destination: formData.destination,
        weight: formData.weight,
        cargo_type: formData.cargoType,
        price: Number(formData.price),
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error al publicar la carga: " + error.message);
    } else {
      alert("¡Flete publicado con éxito en Supabase!");
      window.location.href = "/cargas";
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex justify-center items-center">
      <div className="max-w-xl w-full bg-slate-800 rounded-xl p-8 border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Truck className="w-8 h-8 text-amber-500" />
          <h1 className="text-2xl font-bold">Publicar Carga / Flete</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Origen</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ej. Guadalajara, Jal."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Destino</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ej. Monterrey, N.L."
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Peso (Tons / Kg)</label>
              <div className="relative">
                <Weight className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ej. 9.5 Tons"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Precio Ofrecido (MXN)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="Ej. 15000"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Tipo de Mercancía</label>
            <div className="relative">
              <Package className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="Ej. Abarrotes / Tarimas / Semillas"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-lg transition-colors mt-6"
          >
            {loading ? "Guardando..." : "Publicar Carga"}
          </button>
        </form>
      </div>
    </div>
  );
}
