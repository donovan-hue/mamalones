# Mamalones / Kronos-space

Plataforma logística (Next.js + Supabase) para fleteras: anticipos, telemetría **privada**, Carta Porte, acuerdos, SOS, off-grid, combustible, liquidación POD, NOM-087, firma digital, reputación, peaje y expediente.

## Arranque

```bash
cp .env.example .env.local
# pega URL y anon key de tu proyecto en https://supabase.com/dashboard/org/dgecxydigzwhoiyynilk
npm install
npm run dev
```

En Supabase → SQL Editor ejecuta `supabase/schema.sql` (tablas + RLS: la telemetría solo la ven solicitante y dueño).

## Módulos

| Ruta | Qué hace |
|---|---|
| `/anticipos` | Viáticos + diésel + casetas antes de arrancar |
| `/rastreo` | GPS privado (RLS) |
| `/credenciales` | Intercambio de licencia al postularse |
| `/negociacion` | Horas CEDIS y tarifa neta |
| `/seguridad` | Botón SOS |
| `/offgrid` | SMS/satélite cifrado |
| `/rendimiento` | Combustible vs peso |
| `/billetera` | Liquidación al POD |
| `/inspeccion` | Fotos pre-arranque |
| `/bitacora` | NOM-087 |
| `/contratos` | Firma SHA-256 |
| `/reputacion` | Calificación cruzada |
| `/peaje` | TAG/IAVE |
| `/expediente` | Docs y caducidad |
| `/clima` | Bloqueos y clima |

No puedo entrar a tu org de Supabase desde aquí: crea un proyecto, corre el SQL y pon las keys en `.env.local`.
