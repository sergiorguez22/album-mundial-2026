-- Schema del Álbum Virtual Mundial 2026
-- Ejecutar en Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  name          text not null,
  password_hash text,
  role          text not null default 'user'    check (role   in ('admin', 'user')),
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at    timestamptz not null default now(),
  approved_at   timestamptz,
  activated_at  timestamptz
);

create index if not exists users_status_idx on public.users (status);
create index if not exists users_role_idx   on public.users (role);

-- RLS desactivado: el acceso pasa siempre por el server con service_role key,
-- nunca desde el navegador con anon key. Si en algún sprint exponemos lecturas
-- desde el cliente, activarlo y añadir políticas.
alter table public.users disable row level security;
