"use client";

import { useState, useEffect } from "react";
import { Clock, AlertTriangle, Wifi, WifiOff, MapPin, Truck, ShieldAlert, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function IncidentesYEstadiasPage() {
  const [isOnline, setIsOnline] = useState(true);
  const [freightId, setFreightId] = useState("FLT-8842");
  const [waitingHours, setWaitingHours] = useState(3.5);
  const [extraFee, setExtraFee] = useState(0);
  const [incidentType, setIncidentType] = useState("mecanico");
  const [incidentNotes, setIncidentNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    // Calculo automatico de tarifa de estadia (después de 3 hrs libres, $350 MXN/hr)
    if (waitingHours > 3) {
      setExtraFee((waitingHours - 3) * 350);
    } else {
      setExtraFee(0);
    }

    // Detector de conexion offline/online
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [waitingHours]);

  const handleReportIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const payload = {
          freight_id: freightId,
          incident_type: incidentType,
          notes: incidentNotes,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          created_at: new Date().toISOString(),
        };

        if (isOnline) {
          await supabase.from("freight_evidences").insert([
            {
              freight_id: freightId,
              uploader_id: "00000000-0000-0000-0000-000000000000",
              evidence_type: "cargo_condition",
              image_url: "https://ejemplo.com/incidente.jpg",
              captured_lat: payload.lat,
              captured_lng: payload.lng,
            },
          ]);
        } else {
          // Guardado en memoria local si no hay red
          const offlineReports = JSON.parse(localStorage.getItem("offline_incidents") || "[]");
          offlineReports.push(payload);
          localStorage.setItem("offline_incidents", JSON.stringify(offlineReports));
        }

        setLoading(false);
        setReported(true);
      },
      (error) => {
        alert("Error de GPS: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 max-w-md mx-auto space-y-4">
      {/* HEADER DE ESTADO DE CONEXIÓN */}
      <div className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
        isOnline ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-amber-500/10 border-amber-500/30 text-amber-400"
      }`}>
        <div className="flex items-center gap-2">
          {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          <span>{isOnline ? "Conexión en Línea (Sincronizado)" : "Modo Sin Señal (Guardando en memoria local)"}</span>
        </div>
      </div>

      {/* MODULO 1: CONTADOR DE ESTADÍAS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-sm">Tiempo en Bodega / Carga</h2>
          </div>
          <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-md text-slate-300 font-mono">
            {waitingHours} hrs
          </span>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-slate-400">Tolerancia Libre: 3.0 hrs</span>
          <span className="text-slate-400">Tarifa: $350 MXN/hr extra</span>
        </div>

        {extraFee > 0 ? (
          <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center justify-between">
            <span className="text-xs text-amber-300 font-medium">Cargo por Estadía Generado:</span>
            <span className="text-base font-extrabold text-amber-400">${extraFee.toFixed(2)} MXN</span>
          </div>
        ) : (
          <div className="bg-slate-950 p-2.5 rounded-xl text-center text-xs text-slate-400">
            Dentro del tiempo tolerado de espera.
          </div>
        )}
      </div>

      {/* MODULO 2: BOTÓN DE INCIDENTES Y AUXILIO VIAL */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h2 className="font-bold text-sm text-white">Reportar Incidente en Ruta</h2>
        </div>

        {reported ? (
          <div className="text-center py-6 space-y-2 bg-slate-950 rounded-xl p-4 border border-slate-800">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <p className="font-bold text-sm text-white">Incidente Registrado</p>
            <p className="text-xs text-slate-400">
              {isOnline ? "Notificación enviada a la central y al cliente." : "Guardado localmente. Se enviará en cuanto haya red."}
            </p>
            <button
              onClick={() => setReported(false)}
              className="text-xs text-amber-400 underline pt-2 inline-block"
            >
              Nuevo reporte
            </button>
          </div>
        ) : (
          <form onSubmit={handleReportIncident} className="space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-slate-300">Tipo de Incidente</label>
              <select
                value={incidentType}
                onChange={(e) => setIncidentType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-amber-500"
              >
                <option value="mecanico">Falla Mecánica / Ponchadura</option>
                <option value="termo">Variación de Temperatura (Thermo)</option>
                <option value="reten">Retén / Retraso Carretero</option>
                <option value="accidente">Siniestro / Accidente</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1 text-slate-300">Detalles adicionales</label>
              <textarea
                rows={3}
                placeholder="Describe la situación..."
                value={incidentNotes}
                onChange={(e) => setIncidentNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg text-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              {loading ? "Registrando Ubicación GPS..." : "Enviar Alerta con GPS"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
