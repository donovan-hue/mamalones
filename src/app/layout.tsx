import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kronos Fleet - Cyber Industrial",
  description: "Plataforma Logística y Telemetría de Carga",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
