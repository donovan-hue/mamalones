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
