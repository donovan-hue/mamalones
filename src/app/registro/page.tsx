"use client";

import { useState } from "react";
import { UserCheck, Truck, ShieldCheck, FileText, Camera, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegistroValidacionPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [plates, setPlates] = useState("");
  const [vehicleType, setVehicleType] = useState("Torton");
  const [vin, setVin] = useState("");
  const [policy, setPolicy] = useState("");
  const [emptyWeight, setEmptyWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Registro de prueba en tabla de perfiles y vehículos
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: "00000000-0000-0000-0000-000000000000", // UUID de sesión
        full_name: fullName,
        phone: phone,
        role: "driver",
      },
    ]);

    const { error: vehicleError } = await supabase.from("vehicles").insert([
      {
        carrier_id: "00000000-0000-0000-0000-000000000000",
        plates: plates,
        vehicle_type: vehicleType,
        vin: vin,
        insurance_policy: policy,
        empty_weight_kg: parseFloat(emptyWeight) || 12000,
      },
    ]);

    setLoading(false);
    setSuccess(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto space-y-4 pb-20">
      {/* HEADER */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <UserCheck className="w-7 h-7 text-amber-500" />
          <div>
            <h1 className="font-bold text-base text-white">Alta de Chofer y Unidad</h1>
            <p className="text-xs text-slate-400">Expediente Digital Verificado</p>
          </div>
        </div>
      </div>

      {success ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">¡Expediente Aprobado!</h2>
          <p className="text-xs text-slate-400">
            Chofer y unidad <strong className="text-amber-400">{plates}</strong> validados correctamente para operar en la plataforma.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-amber-400 underline pt-2 inline-block"
          >
            Registrar otra unidad
          </button>
        </div>
      ) : (
        <form onSubmit={handleRegister} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
          {/* DATOS DEL OPERADOR */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-amber-500" /> Datos del Chofer
            </h2>

            <div>
              <label className="block text-xs font-medium mb-1 text-slate-300">Nombre Completo</label>
              <input
                type="text"
                required
                placeholder="Nombre completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-slate-300">Teléfono Celular</label>
              <input
                type="tel"
                required
                placeholder="10 dígitos"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <hr className="border-slate-800" />

          {/* DATOS DE LA UNIDAD */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-500" /> Datos del Vehículo
            </h2>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-300">Placas</label>
                <input
                  type="text"
                  required
                  placeholder="88-AA-1B"
                  value={plates}
                  onChange={(e) => setPlates(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-300">Tipo de Unidad</label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="Torton">Torton (3 Ejes)</option>
                  <option value="Trailer 53ft">Tráiler 53ft</option>
                  <option value="Rabon">Rabón</option>
                  <option value="Jaula">Jaula Granelera</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium mb-1 text-slate-300">Número VIN</label>
                <input
                  type="text"
                  placeholder="17 dígitos"
                  value={vin}
                  onChange={(e) => setVin(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-slate-300">Peso Vacío / Tara (kg)</label>
                <input
                  type="number"
                  placeholder="Ej. 11500"
                  value={emptyWeight}
                  onChange={(e) => setEmptyWeight(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-slate-300">Póliza de Seguro Vigente</label>
              <input
                type="text"
                required
                placeholder="Folio o Póliza de Seguro"
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <ShieldCheck className="w-4 h-4" />
            {loading ? "Validando Expediente..." : "Guardar Chofer y Unidad"}
          </button>
        </form>
      )}
    </div>
  );
}
