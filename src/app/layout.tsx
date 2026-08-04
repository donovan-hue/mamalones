import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { QuickNav } from "@/components/QuickNav";

export const metadata: Metadata = {
  title: "Kronos Fleet - High Performance",
  description: "Plataforma Logística y Telemetría de Carga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-slate-300 selection:text-black min-h-screen relative bg-[#0a0b0d]">
        {/* BARRA SUPERIOR Y BÚSQUEDA */}
        <Navbar />

        {/* CONTENIDO DE LA PANTALLA */}
        <main className="pb-16">{children}</main>

        {/* CONTROLES FLOTANTES ATRÁS/INICIO/ADELANTE */}
        <QuickNav />
      </body>
    </html>
  );
}
