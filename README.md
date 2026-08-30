# Mamalones / Kronos-space

App Next.js + Supabase para fleteras: viajes, anticipos, GPS privado, evidencias, POD y liquidación.

## Local

```bash
cp .env.example .env.local   # o crea .env.local a mano
npm install
npm run dev
```

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://TU_PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

## Base de datos

En el SQL Editor de Supabase corre **una vez** `supabase/TODO_EN_UNO.sql`.

## Deploy

No uses GitHub Pages. Esta app necesita servidor (middleware). Publica en **Vercel** e inyecta las dos variables `NEXT_PUBLIC_*`.

El Action de GitHub solo comprueba `npm run build`.
