-- 2) Storage  +  4) RLS cerrado
-- Pegar en SQL Editor y Run.

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

-- Participante del viaje
create or replace function public.es_participante(vid uuid)
returns boolean language sql stable as $$
  select exists (
    select 1 from public.viajes v
    where v.id = vid
      and (v.solicitante_id = auth.uid() or v.dueno_id = auth.uid() or v.operador_id = auth.uid())
  );
$$;

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
    if exists (select 1 from information_schema.tables where table_schema='public' and table_name=t) then
      execute format('alter table public.%I enable row level security', t);
      execute format('drop policy if exists %I on public.%I', t||'_sel', t);
      execute format('drop policy if exists %I on public.%I', t||'_ins', t);
      execute format(
        'create policy %I on public.%I for select using (auth.uid() is not null)',
        t||'_sel', t
      );
      execute format(
        'create policy %I on public.%I for insert with check (auth.uid() is not null)',
        t||'_ins', t
      );
      execute format('drop policy if exists %I on public.%I', t||'_upd', t);
      execute format(
        'create policy %I on public.%I for update using (auth.uid() is not null)',
        t||'_upd', t
      );
    end if;
  end loop;
end $$;

-- Telemetría: ver solo dueño/solicitante; insertar operador o participantes
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
    and (
      viaje_id is null
      or public.es_participante(viaje_id)
    )
  );
