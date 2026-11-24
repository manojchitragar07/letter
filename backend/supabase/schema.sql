-- Supabase / PostgreSQL Schema for Dearly Letters Platform
create extension if not exists "uuid-ossp";

create table if not exists public.letters (
  id uuid primary key default uuid_generate_v4(),
  unique_slug text not null unique,
  secret_key text not null unique,
  sender_name text not null,
  recipient_name text not null,
  letter_title text,
  date text not null,
  salutation text,
  body text not null,
  closing text,
  signature_name text,
  signature_style text default 'signature',
  custom_signature_url text,
  design_configuration jsonb not null default '{}'::jsonb,
  asset_references jsonb default '[]'::jsonb,
  password_hash text,
  allow_reply boolean default true,
  is_published boolean default true,
  is_read boolean default false,
  read_at timestamp with time zone,
  read_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone
);

create index if not exists idx_letters_unique_slug on public.letters (unique_slug);
create index if not exists idx_letters_secret_key on public.letters (secret_key);
create index if not exists idx_letters_created_at on public.letters (created_at desc);

alter table public.letters enable row level security;

create policy "Public can view published letters by slug"
  on public.letters
  for select
  using (
    is_published = true 
    and (expires_at is null or expires_at > now())
  );

create policy "Anyone can create a new letter"
  on public.letters
  for insert
  with check (true);
