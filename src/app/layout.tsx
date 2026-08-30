import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'kronos-space.com | Gestión Logística',
  description: 'Plataforma corporativa de gestión y trazabilidad de transporte pesado',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white min-h-screen antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
