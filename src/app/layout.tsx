import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Kronos Fleet - Dark Minimalist",
  description: "Plataforma Logística y Telemetría de Carga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-[#0b0c0e] text-slate-100 relative">
        <Navbar />
        <main className="pb-20">{children}</main>
      </body>
    </html>
  );
}
