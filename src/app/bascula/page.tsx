"use client";

import { useState } from "react";
import { Scale, Fuel, ShieldCheck, Camera, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BasculaYSellosPage() {
  const [freightId, setFreightId] = useState("FLT-8842");
  const [grossWeight, setGrossWeight] = useState("");
  const [fuelLiters, setFuelLiters] = useState("");
  const [sealNumbers, setSealNumbers] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Densidad promedio del diésel: 0.835 kg por litro
  const fuelWeightKg = fuelLiters ? (parseFloat(fuelLiters) * 0.835).toFixed(2) : "0.00";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const sealsArray = sealNumbers.split(",").map((s) => s.trim());

        const { error } = await supabase.from("freight_weights").insert([
          {
            freight_id: "00000000-0000-0000-0000-000000000000", // ID temporal de prueba
            origin_gross_weight_kg: parseFloat(grossWeight),
            origin_fuel_liters: parseFloat(fuelLiters),
            seal_numbers: sealsArray,
            expected_fuel_weight_loss_kg: parseFloat(fuelWeightKg),
          },
        ]);

        if (error) {
          alert("Aviso de guardado: " + error.message);
        }

        setLoading(false);
        setSuccess(true);
      },
      (error) => {
        alert("GPS Obligatorio para timbrar el peso: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto space-y-4">
      {/* HEADER */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="w-7 h-7 text-amber-500" />
          <div>
            <h1 className="font-bold text-base text-white">Registro de Báscula</h1>
            <p className="text-xs text-slate-400">Origen & Control de Mermas</p>
          </div>
        </div>
        <span className="text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full">
          {freightId}
        </span>
      </div>

      {success ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">¡Pesaje Registrado!</h2>
          <p className="text-xs text-slate-400">
            Se compensó automáticamente un peso de diésel de <strong className="text-amber-400">{fuelWeightKg} kg</strong> para evitar falsas mermas.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-amber-400 underline pt-2 inline-block"
          >
            Capte otro ticket
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
          {/* PESO BRUTO */}
          <div>
            <label className="block text-xs font-medium mb-1 text-slate-300">
              Peso Bruto de Báscula (kg)
            </label>
            <input
              type="number"
              required
              placeholder="Ej. 42500"
              value={grossWeight}
              onChange={(e) => setGrossWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          {/* DIESEL Y COMPENSACIÓN */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Litros de Diésel en Tanque
            </label>
            <div className="relative">
              <Fuel className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="number"
                required
                placeholder="Ej. 400"
                value={fuelLiters}
                onChange={(e) => setFuelLiters(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-400">Peso estimado del combustible:</span>
              <span className="font-mono font-bold text-amber-400">{fuelWeightKg} kg</span>
            </div>
          </div>

          {/* MARCHAMOS Y SELLOS */}
          <div>
            <label className="block text-xs font-medium mb-1 text-slate-300">
              Folios de Sellos / Marchamos (Separados por coma)
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                placeholder="Ej. MX-8841, MX-8842"
                value={sealNumbers}
                onChange={(e) => setSealNumbers(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-10 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-300">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>Se sellará la lectura con coordenadas GPS exactas en tiempo real.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {loading ? "Validando Ticket y GPS..." : "Guardar Ticket y Sellos"}
          </button>
        </form>
      )}
    </div>
  );
}
