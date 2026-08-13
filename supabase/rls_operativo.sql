-- Pegar en SQL Editor DESPUÉS del schema. Permite insertar/actualizar con sesión.

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

drop policy if exists "anticipos_rw" on public.anticipos;
create policy "anticipos_rw" on public.anticipos
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "alertas_rw" on public.alertas_emergencia;
create policy "alertas_rw" on public.alertas_emergencia
  for all using (auth.uid() is not null) with check (auth.uid() is not null);

drop policy if exists "rastreo_insert" on public.rastreo_ubicaciones;
create policy "rastreo_insert" on public.rastreo_ubicaciones
  for insert with check (auth.uid() is not null);

alter table public.perfiles enable row level security;
drop policy if exists "perfiles_own" on public.perfiles;
create policy "perfiles_own" on public.perfiles
  for all using (id = auth.uid()) with check (id = auth.uid());

alter table public.credenciales_intercambio enable row level security;
drop policy if exists "cred_rw" on public.credenciales_intercambio;
create policy "cred_rw" on public.credenciales_intercambio
  for all using (auth.uid() is not null) with check (auth.uid() is not null);
