-- AlbinoMice — skema awal
-- Jalankan di Supabase SQL Editor (atau `supabase db push`).

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- Katalog
-- ─────────────────────────────────────────────
create table if not exists public.mice (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  slug          text unique not null,
  name          text not null,
  category      text not null default 'pet' check (category in ('pet', 'feeder')),
  sex           text not null default 'Betina',
  birth_date    date not null default current_date,
  weight_g      integer not null default 20,
  morph         text not null default 'Albino klasik',
  eye_color     text not null default 'Merah delima',
  temperament   text not null default 'Belum dinilai',
  health_notes  text not null default '',
  price         integer not null,
  stock         integer not null default 0,
  status        text not null default 'available'
                check (status in ('draft', 'available', 'reserved', 'sold')),
  size_category text,
  traits        text[] not null default '{}',
  sire          text,
  dam           text,
  location      text not null default 'Depok',
  tone          text not null default 'pink',
  description   text not null default '',
  created_at    timestamptz not null default now()
);

create index if not exists mice_category_status_idx on public.mice (category, status);

create table if not exists public.mouse_images (
  id        uuid primary key default gen_random_uuid(),
  mouse_id  uuid references public.mice (id) on delete cascade,
  url       text not null,
  sort      integer not null default 0
);

create table if not exists public.lineages (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  code            text unique not null,
  role            text not null check (role in ('Sire', 'Dam')),
  morph           text not null default 'Albino klasik',
  born            date not null,
  notes           text not null default '',
  paired_with     text not null default '—',
  offspring_count integer not null default 0,
  tone            text not null default 'pink'
);

create table if not exists public.feeder_sizes (
  id           uuid primary key default gen_random_uuid(),
  size         text unique not null,
  sort         integer not null default 0,
  age_label    text not null,
  weight_label text not null,
  unit_price   integer not null,
  price_10     integer not null,
  price_50     integer not null,
  price_100    integer not null,
  stock        integer not null default 0,
  note         text not null default ''
);

-- ─────────────────────────────────────────────
-- Pesanan (draft dari tombol WhatsApp)
-- ─────────────────────────────────────────────
create table if not exists public.orders (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,
  customer_name text not null,
  phone         text not null default '',
  city          text not null default '',
  channel       text not null default 'pet' check (channel in ('pet', 'feeder')),
  status        text not null default 'draft'
                check (status in ('draft', 'confirmed', 'paid', 'shipped', 'done', 'cancelled')),
  subtotal      integer not null default 0,
  notes         text not null default '',
  created_at    timestamptz not null default now()
);

create table if not exists public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid references public.orders (id) on delete cascade,
  ref_id     text not null,
  ref_code   text not null,
  name       text not null,
  qty        integer not null default 1,
  unit_price integer not null default 0
);

-- ─────────────────────────────────────────────
-- Konten & pengaturan
-- ─────────────────────────────────────────────
create table if not exists public.articles (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text not null default '',
  body_md      text not null default '',
  cover        text,
  category     text not null default 'Perawatan',
  tone         text not null default 'pink',
  reading_min  integer not null default 5,
  published_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id            uuid primary key default gen_random_uuid(),
  customer_name text not null,
  city          text not null default '',
  rating        integer not null default 5 check (rating between 1 and 5),
  body          text not null default '',
  photo_url     text,
  mouse_id      uuid references public.mice (id) on delete set null,
  published     boolean not null default false,
  created_at    timestamptz not null default now()
);

create table if not exists public.settings (
  key   text primary key,
  value text not null
);

-- ─────────────────────────────────────────────
-- Row Level Security
-- ─────────────────────────────────────────────
alter table public.mice          enable row level security;
alter table public.mouse_images  enable row level security;
alter table public.lineages      enable row level security;
alter table public.feeder_sizes  enable row level security;
alter table public.orders        enable row level security;
alter table public.order_items   enable row level security;
alter table public.articles      enable row level security;
alter table public.reviews       enable row level security;
alter table public.settings      enable row level security;

-- Bacaan publik: katalog & konten.
drop policy if exists "mice public read" on public.mice;
create policy "mice public read" on public.mice
  for select using (status <> 'draft');

drop policy if exists "images public read" on public.mouse_images;
create policy "images public read" on public.mouse_images for select using (true);

drop policy if exists "lineage public read" on public.lineages;
create policy "lineage public read" on public.lineages for select using (true);

drop policy if exists "feeder public read" on public.feeder_sizes;
create policy "feeder public read" on public.feeder_sizes for select using (true);

drop policy if exists "articles public read" on public.articles;
create policy "articles public read" on public.articles for select using (true);

drop policy if exists "reviews public read" on public.reviews;
create policy "reviews public read" on public.reviews for select using (published = true);

-- Pembeli boleh menulis draft pesanan, tapi tidak boleh membacanya.
drop policy if exists "orders anon insert" on public.orders;
create policy "orders anon insert" on public.orders for insert with check (true);

drop policy if exists "order items anon insert" on public.order_items;
create policy "order items anon insert" on public.order_items for insert with check (true);

-- Catatan: dashboard admin memakai anon key untuk demo. Untuk produksi,
-- pindahkan admin ke Supabase Auth + policy role 'authenticated' atau
-- gunakan service role key hanya di server.

-- ─────────────────────────────────────────────
-- Seed ringan (boleh dihapus)
-- ─────────────────────────────────────────────
insert into public.feeder_sizes (size, sort, age_label, weight_label, unit_price, price_10, price_50, price_100, stock, note)
values
  ('Pinky',  1, '0–3 hari',   '1–3 g',   8000,  75000,  350000,  650000,  120, 'Untuk ular muda dan gecko kecil.'),
  ('Fuzzy',  2, '4–7 hari',   '4–6 g',  10000,  95000,  440000,  820000,   90, 'Paling sering dipesan untuk ball python juvenile.'),
  ('Hopper', 3, '8–14 hari',  '7–12 g', 13000, 125000,  580000, 1080000,   64, 'Sudah berbulu, mulai bergerak aktif.'),
  ('Weaner', 4, '15–24 hari', '13–20 g',15000, 145000,  680000, 1260000,   48, 'Untuk ular medium dan monitor.'),
  ('Adult',  5, '25+ hari',   '21–35 g',20000, 190000,  890000, 1680000,   30, 'Stok terbatas, pesan 2 hari sebelumnya.')
on conflict (size) do nothing;

insert into public.lineages (name, code, role, morph, born, notes, paired_with, offspring_count, tone)
values
  ('Rendang', 'S-2019', 'Sire', 'Albino klasik', '2025-11-03', 'Temperamen paling stabil; menurunkan sifat jinak.', 'Seroja, Embun', 64, 'sand'),
  ('Kapas',   'S-2021', 'Sire', 'Albino mata ruby', '2026-01-19', 'Postur tegap, mata ruby pekat.', 'Pandan, Seroja', 51, 'lilac'),
  ('Seroja',  'D-3012', 'Dam',  'Albino klasik', '2025-12-08', 'Produktif, rata-rata 8–10 anakan per kelahiran.', 'Rendang, Kapas', 58, 'pink')
on conflict (code) do nothing;

-- Storage untuk foto tikus (opsional).
-- insert into storage.buckets (id, name, public) values ('mice', 'mice', true)
-- on conflict (id) do nothing;
