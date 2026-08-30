-- KRONOS / Mamalones — script completo (se puede correr más de una vez)
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
  viaje_id uuid,
  carga_id uuid,
  latitud double precision not null,
  longitud double precision not null,
  fuente text default 'celular',
  created_at timestamptz default now()
);
alter table public.rastreo_ubicaciones add column if not exists viaje_id uuid;
alter table public.rastreo_ubicaciones add column if not exists carga_id uuid;
alter table public.rastreo_ubicaciones add column if not exists fuente text default 'celular';

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
  canal text,
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
  tipo text,
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

create table if not exists public.bascula_registros (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid,
  carga_id uuid,
  peso_entrada numeric,
  peso_salida numeric,
  peso_neto numeric,
  created_at timestamptz default now()
);

create table if not exists public.caseta_registros (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid,
  carga_id uuid,
  tipo_evento text,
  observaciones text,
  created_at timestamptz default now()
);

create table if not exists public.cartas_porte (
  id uuid primary key default gen_random_uuid(),
  viaje_id uuid,
  rfc_remitente text,
  rfc_destinatario text,
  fraccion text,
  created_at timestamptz default now()
);

insert into storage.buckets (id, name, public)
values ('evidencias', 'evidencias', true)
on conflict (id) do nothing;

drop policy if exists "evidencias_auth_rw" on storage.objects;
create policy "evidencias_auth_rw" on storage.objects
  for all using (
    bucket_id = 'evidencias' and auth.uid() is not null
  ) with check (
    bucket_id = 'evidencias' and auth.uid() is not null
  );

create or replace function public.es_participante(vid uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.viajes v
    where v.id = vid
      and (v.solicitante_id = auth.uid() or v.dueno_id = auth.uid() or v.operador_id = auth.uid())
  );
$$;

alter table public.viajes enable row level security;
alter table public.rastreo_ubicaciones enable row level security;
alter table public.anticipos enable row level security;
alter table public.alertas_emergencia enable row level security;
alter table public.perfiles enable row level security;

drop policy if exists "viajes_participantes" on public.viajes;
create policy "viajes_participantes" on public.viajes
  for select using (
    solicitante_id = auth.uid() or dueno_id = auth.uid() or operador_id = auth.uid()
  );

drop policy if exists "viajes_insert" on public.viajes;
create policy "viajes_insert" on public.viajes
  for insert with check (
    auth.uid() is not null
    and (solicitante_id = auth.uid() or dueno_id = auth.uid() or operador_id = auth.uid())
  );

drop policy if exists "viajes_update" on public.viajes;
create policy "viajes_update" on public.viajes
  for update using (
    solicitante_id = auth.uid() or dueno_id = auth.uid() or operador_id = auth.uid()
  );

drop policy if exists "perfiles_own" on public.perfiles;
create policy "perfiles_own" on public.perfiles
  for all using (id = auth.uid()) with check (id = auth.uid());

drop policy if exists "telemetria_privada" on public.rastreo_ubicaciones;
create policy "telemetria_privada" on public.rastreo_ubicaciones
  for select using (
    exists (
      select 1 from public.viajes v
      where (v.id = rastreo_ubicaciones.viaje_id or v.id = rastreo_ubicaciones.carga_id)
        and (v.solicitante_id = auth.uid() or v.dueno_id = auth.uid())
    )
  );

drop policy if exists "rastreo_insert" on public.rastreo_ubicaciones;
create policy "rastreo_insert" on public.rastreo_ubicaciones
  for insert with check (
    auth.uid() is not null
    and (viaje_id is null or public.es_participante(viaje_id))
  );

do $$
declare t text;
begin
  foreach t in array array[
    'anticipos','credenciales_intercambio','negociaciones','alertas_emergencia',
    'balizas_offgrid','rendimiento_combustible','liquidaciones','inspecciones_prearranque',
    'bitacora_horas','contratos_digitales','calificaciones','peajes','expediente_docs',
    'alertas_viales','bascula_registros','caseta_registros','cartas_porte'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists %I on public.%I', t||'_sel', t);
    execute format('drop policy if exists %I on public.%I', t||'_ins', t);
    execute format('drop policy if exists %I on public.%I', t||'_upd', t);
    execute format('create policy %I on public.%I for select using (auth.uid() is not null)', t||'_sel', t);
    execute format('create policy %I on public.%I for insert with check (auth.uid() is not null)', t||'_ins', t);
    execute format('create policy %I on public.%I for update using (auth.uid() is not null)', t||'_upd', t);
  end loop;
end $$;
