-- Bloom CRM 3.0 profesional — arquitectura normalizada y privada
-- Ejecuta este archivo en Supabase > SQL Editor.
-- Authentication > URL Configuration:
-- Site URL: https://duna1986.github.io/bloomie-crm/
-- Redirect URLs:
--   https://duna1986.github.io/bloomie-crm/
--   http://localhost:3000

create extension if not exists pgcrypto;

create table if not exists bloom_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  nombre text,
  rol text default 'coordinacion',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_empresas (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  sector text,
  subsector text,
  ciudad text,
  isla text,
  web text,
  fuente text,
  acepta_practicas text,
  tipo_practicas text,
  ciclos_recomendados text,
  contacto text,
  telefono text,
  email text,
  estado text default 'nueva',
  prioridad text default 'media',
  notas text,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_alumnos (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  dni text,
  telefono text,
  email text,
  direccion text,
  nss text,
  curso text,
  estado text default 'sin asignar',
  empresa text,
  inicio date,
  fin date,
  tutor text,
  horas text,
  evaluacion text,
  notas text,
  foto_path text,
  cv_path text,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_convenios (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  empresa text,
  centro text default 'Centro educativo',
  inicio date,
  fin date,
  tutor_empresa text,
  tutor_centro text,
  estado text default 'pendiente',
  anexos jsonb default '[]'::jsonb,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_expedientes (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  alumno text,
  empresa text,
  convenio_id text,
  estado text default 'abierto',
  observaciones text,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_carpetas (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  color text,
  parent_id text,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_documentos (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  tipo text,
  estado text default 'pendiente',
  carpeta text,
  empresa text,
  alumno text,
  convenio_id text,
  storage_path text,
  mime_type text,
  size_bytes bigint,
  notas text,
  uploaded_by text,
  fecha date,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_seguimientos (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  empresa text,
  tipo text,
  fecha date default current_date,
  resultado text,
  proxima text,
  fecha_proxima date,
  responsable text,
  completada boolean default false,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_recordatorios (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  fecha date,
  hora text,
  estado text default 'pendiente',
  relacionado_tipo text,
  relacionado_id text,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_notificaciones (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  titulo text not null,
  mensaje text,
  tipo text,
  leida boolean default false,
  relacionado_tipo text,
  relacionado_id text,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table if not exists bloom_email_templates (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  asunto text,
  cuerpo text,
  adjuntos jsonb default '[]'::jsonb,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists bloom_reportes (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  nombre text not null,
  filtros jsonb default '{}'::jsonb,
  data jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table bloom_profiles enable row level security;
alter table bloom_empresas enable row level security;
alter table bloom_alumnos enable row level security;
alter table bloom_convenios enable row level security;
alter table bloom_expedientes enable row level security;
alter table bloom_carpetas enable row level security;
alter table bloom_documentos enable row level security;
alter table bloom_seguimientos enable row level security;
alter table bloom_recordatorios enable row level security;
alter table bloom_notificaciones enable row level security;
alter table bloom_email_templates enable row level security;
alter table bloom_reportes enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'bloom_empresas','bloom_alumnos','bloom_convenios','bloom_expedientes',
    'bloom_carpetas','bloom_documentos','bloom_seguimientos',
    'bloom_recordatorios','bloom_notificaciones','bloom_email_templates','bloom_reportes'
  ] loop
    execute format('drop policy if exists "owner select" on %I', t);
    execute format('drop policy if exists "owner insert" on %I', t);
    execute format('drop policy if exists "owner update" on %I', t);
    execute format('drop policy if exists "owner delete" on %I', t);
    execute format('create policy "owner select" on %I for select to authenticated using (user_id = auth.uid())', t);
    execute format('create policy "owner insert" on %I for insert to authenticated with check (user_id = auth.uid())', t);
    execute format('create policy "owner update" on %I for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid())', t);
    execute format('create policy "owner delete" on %I for delete to authenticated using (user_id = auth.uid())', t);
  end loop;
end $$;

drop policy if exists "profile select" on bloom_profiles;
drop policy if exists "profile insert" on bloom_profiles;
drop policy if exists "profile update" on bloom_profiles;

create policy "profile select" on bloom_profiles for select to authenticated using (id = auth.uid());
create policy "profile insert" on bloom_profiles for insert to authenticated with check (id = auth.uid());
create policy "profile update" on bloom_profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

insert into storage.buckets (id, name, public)
values ('bloom-crm-documents', 'bloom-crm-documents', false)
on conflict (id) do update set public = false;

drop policy if exists "private read bloom crm documents" on storage.objects;
drop policy if exists "private upload bloom crm documents" on storage.objects;
drop policy if exists "private update bloom crm documents" on storage.objects;
drop policy if exists "private delete bloom crm documents" on storage.objects;

create policy "private read bloom crm documents"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "private upload bloom crm documents"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "private update bloom crm documents"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "private delete bloom crm documents"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'bloom-crm-documents'
  and (storage.foldername(name))[1] = auth.uid()::text
);
