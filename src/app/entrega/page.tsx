"use client";

import { useState } from "react";
import { QrCode, Camera, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function EscaneoEntrega() {
  const [freightId, setFreightId] = useState("");
  const [scannedQr, setScannedQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirmDelivery = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const { data: freight, error: freightError } = await supabase
          .from("freights")
          .select("id, delivery_qr_code")
          .eq("id", freightId)
          .single();

        if (freightError || !freight) {
          alert("Error: Flete no encontrado");
          setLoading(false);
          return;
        }

        if (freight.delivery_qr_code !== scannedQr) {
          alert("🚨 Código QR Incorrecto. El QR no corresponde a este pedido.");
          setLoading(false);
          return;
        }

        await supabase.from("freight_evidences").insert([
          {
            freight_id: freightId,
            uploader_id: "00000000-0000-0000-0000-000000000000",
            evidence_type: "delivery_qr_scan",
            image_url: "https://ejemplo.com/evidencia_qr.jpg",
            captured_lat: lat,
            captured_lng: lng,
          },
        ]);

        await supabase
          .from("freights")
          .update({ status: "completed" })
          .eq("id", freightId);

        await supabase
          .from("escrow_payments")
          .update({
            payment_status: "released",
            released_at: new Date().toISOString(),
          })
          .eq("freight_id", freightId);

        setLoading(false);
        setSuccess(true);
      },
      (error) => {
        alert("Error al obtener GPS obligatorio: " + error.message);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex items-center justify-center">
      <div className="max-w-md w-full bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <h1 className="text-xl font-bold">Confirmación de Entrega</h1>
        </div>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">¡Entrega Confirmada!</h2>
            <p className="text-sm text-slate-400">
              El pago ha sido liberado de la Bóveda Escrow hacia la cuenta de la fletera.
            </p>
            <a
              href="/cargas"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm mt-4"
            >
              Volver al Tablero
            </a>
          </div>
        ) : (
          <form onSubmit={handleConfirmDelivery} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">ID del Flete</label>
              <input
                type="text"
                required
                placeholder="Ingresa el ID del flete"
                value={freightId}
                onChange={(e) => setFreightId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                Código QR de Recepción (Mostrado por el cliente/bodega)
              </label>
              <div className="relative">
                <QrCode className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Escanea o escribe el código QR"
                  value={scannedQr}
                  onChange={(e) => setScannedQr(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 flex items-center gap-3 text-xs text-slate-400">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <span>Se capturará la coordenada GPS exacta en tiempo real al confirmar.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Camera className="w-5 h-5" />
              {loading ? "Validando GPS y QR..." : "Confirmar Entrega y Liberar Pago"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
