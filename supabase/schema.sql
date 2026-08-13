-- Mamalones / Kronos-space — ejecutar en SQL Editor de Supabase
-- Org: https://supabase.com/dashboard/org/dgecxydigzwhoiyynilk

create extension if not exists "pgcrypto";

create table if not exists public.perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  rol text not null check (rol in ('dueno','empresa','operador')),
  nombre text,
  rfc text,
  created_at timestamptz default now()
);

create table if not exists public.viajes (
  id uuid primary key default gen_random_uuid(),
  folio text unique,
  solicitante_id uuid references auth.users(id),
  dueno_id uuid references auth.users(id),
  operador_id uuid references auth.users(id),
  origen text not null,
  destino text not null,
  peso_ton numeric,
  tarifa_neta numeric,
  estado text default 'pendiente',
  created_at timestamptz default now()
);

create table if not exists public.anticipos (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id) on delete cascade,
  km_estimados numeric,
  litros_diesel numeric,
  precio_diesel numeric,
  casetas numeric,
  viaticos numeric,
  total_deposito numeric,
  desglose jsonb,
  created_at timestamptz default now()
);

create table if not exists public.rastreo_ubicaciones (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id) on delete cascade,
  carga_id uuid,
  latitud double precision not null,
  longitud double precision not null,
  fuente text default 'celular' check (fuente in ('celular','satelital','sms_cifrado','baliza')),
  created_at timestamptz default now()
);

create table if not exists public.credenciales_intercambio (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id) on delete cascade,
  operador_id uuid references auth.users(id),
  empresa_id uuid references auth.users(id),
  licencia_federal text,
  tipo_licencia text,
  vigencia date,
  estado_validacion text default 'pendiente',
  payload_carta_porte jsonb,
  created_at timestamptz default now()
);

create table if not exists public.negociaciones (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id) on delete cascade,
  hora_carga timestamptz,
  hora_limite_cedis timestamptz,
  tarifa_propuesta numeric,
  tarifa_acordada numeric,
  mensajes jsonb default '[]'::jsonb,
  estado text default 'abierta',
  updated_at timestamptz default now()
);

create table if not exists public.alertas_emergencia (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  operador_id uuid references auth.users(id),
  tipo text default 'panico',
  latitud double precision,
  longitud double precision,
  nota text,
  estado text default 'abierta',
  created_at timestamptz default now()
);

create table if not exists public.balizas_offgrid (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  payload_cifrado text,
  canal text check (canal in ('sms','satelital','baliza')),
  created_at timestamptz default now()
);

create table if not exists public.rendimiento_combustible (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  peso_ton numeric,
  litros numeric,
  km numeric,
  desnivel_m numeric,
  km_por_litro numeric,
  anomalia boolean default false,
  nota text,
  created_at timestamptz default now()
);

create table if not exists public.liquidaciones (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  monto_flete numeric,
  anticipo_ya_pagado numeric,
  saldo numeric,
  canal text default 'fondeo',
  pod_url text,
  estado text default 'retenido',
  liberado_at timestamptz
);

create table if not exists public.inspecciones_prearranque (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  operador_id uuid,
  foto_mercancia text,
  foto_sellos text,
  foto_caja text,
  checklist jsonb,
  created_at timestamptz default now()
);

create table if not exists public.bitacora_horas (
  id uuid primary key default gen_random_uuid(),
  operador_id uuid references auth.users(id),
  viaje_id uuid references public.viajes(id),
  inicio timestamptz,
  fin timestamptz,
  tipo text check (tipo in ('volante','descanso','carga','descarga')),
  minutos integer
);

create table if not exists public.contratos_digitales (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  hash_sello text,
  firmante_empresa uuid,
  firmante_fletera uuid,
  tarifa_vinculante numeric,
  aceptado_at timestamptz default now()
);

create table if not exists public.calificaciones (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  de_usuario uuid,
  para_usuario uuid,
  rol_evaluado text,
  puntualidad int,
  manejo int,
  honestidad_carga int,
  rapidez_pago int,
  comentario text,
  created_at timestamptz default now()
);

create table if not exists public.peajes (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  casetas jsonb,
  total numeric,
  tag_iave text,
  saldo_tag numeric
);

create table if not exists public.expediente_docs (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid references auth.users(id),
  tipo text,
  url text,
  vigencia date,
  alerta_caducidad boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.alertas_viales (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid references public.viajes(id),
  tipo text,
  descripcion text,
  latitud double precision,
  longitud double precision,
  severidad text default 'media',
  created_at timestamptz default now()
);

alter table public.viajes enable row level security;
alter table public.rastreo_ubicaciones enable row level security;
alter table public.anticipos enable row level security;
alter table public.alertas_emergencia enable row level security;

-- Telemetría: solo solicitante o dueño de la fletera
create policy "telemetria_privada" on public.rastreo_ubicaciones
  for select using (
    exists (
      select 1 from public.viajes v
      where (v.id = rastreo_ubicaciones.viaje_id or v.id = rastreo_ubicaciones.carga_id)
        and (v.solicitante_id = auth.uid() or v.dueno_id = auth.uid())
    )
  );

create policy "viajes_participantes" on public.viajes
  for select using (
    solicitante_id = auth.uid() or dueno_id = auth.uid() or operador_id = auth.uid()
  );
