-- AlbinoMice — migrasi 0002: skema feeder-first
-- Jalankan di Supabase SQL Editor SETELAH 0001_init.sql (atau langsung file ini saja di project baru).
--
-- Perubahan dari 0001:
--   - tabel `products` (3 paket pet) menggantikan katalog `mice` per individu
--   - tabel `shipping_zones` baru (zona Jember / Jawa Timur)
--   - tabel `orders` dapat kolom `address` + `ship_date`
--   - tabel lama `mice`, `mouse_images`, `lineages` diarsipkan (tidak dihapus agar data lama aman)

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────
-- Produk pet: 3 paket (Satuan / Sepasang / Trio)
-- ─────────────────────────────────────────────
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  name        text not null,
  contents    text not null default '',
  price       integer not null,
  compare_at  integer,
  stock       integer not null default 0,
  status      text not null default 'available'
              check (status in ('available', 'soldout')),
  sort        integer not null default 0,
  tone        text not null default 'pink',
  badges      text[] not null default '{}',
  description text not null default '',
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- Zona kirim (Jember → Jawa Timur)
-- ─────────────────────────────────────────────
create table if not exists public.shipping_zones (
  id                  uuid primary key default gen_random_uuid(),
  label               text unique not null,
  sort                integer not null default 0,
  price               integer not null default 0,
  eta                 text not null default '',
  live_animal_allowed boolean not null default true,
  notes               text not null default ''
);

-- ─────────────────────────────────────────────
-- Orders: tambah alamat + tanggal kirim
-- ─────────────────────────────────────────────
alter table public.orders
  add column if not exists address text not null default '';
alter table public.orders
  add column if not exists ship_date date;

-- ─────────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────────
alter table public.products       enable row level security;
alter table public.shipping_zones enable row level security;

drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products
  for select using (status = 'available');

drop policy if exists "zones public read" on public.shipping_zones;
create policy "zones public read" on public.shipping_zones for select using (true);

-- ─────────────────────────────────────────────
-- Seed: 3 paket pet
-- ─────────────────────────────────────────────
insert into public.products (code, name, contents, price, compare_at, stock, status, sort, tone, badges, description)
values
  ('PET-01', 'Satuan', '1 ekor tikus putih hidup (jantan atau betina)', 60000, null, 24, 'available', 1, 'pink',
    array['Paling laris'],
    'Satu ekor tikus putih sehat untuk peliharaan. Kami pilihkan yang jinak dan aktif makan.'),
  ('PET-02', 'Sepasang', '1 jantan + 1 betina tikus putih hidup', 110000, 120000, 12, 'available', 2, 'sage',
    array['Hemat Rp 10.000'],
    'Sepasang jantan dan betina yang tidak sedarah, siap jadi teman sekandang atau calon indukan.'),
  ('PET-03', 'Trio', '1 jantan + 2 betina tikus putih hidup', 160000, 180000, 6, 'available', 3, 'sand',
    array['Hemat Rp 20.000', 'Untuk calon breeder'],
    'Paket awal untuk yang serius mau breeding: satu jantan dan dua betina dari garis berbeda.')
on conflict (code) do update set
  name = excluded.name,
  contents = excluded.contents,
  price = excluded.price,
  compare_at = excluded.compare_at,
  stock = excluded.stock,
  status = excluded.status,
  sort = excluded.sort,
  tone = excluded.tone,
  badges = excluded.badges,
  description = excluded.description;

-- ─────────────────────────────────────────────
-- Seed: zona kirim
-- ─────────────────────────────────────────────
insert into public.shipping_zones (label, sort, price, eta, live_animal_allowed, notes)
values
  ('Jember kota (COD)', 1, 0, 'Hari yang sama', true,
    'COD atau ambil langsung di Jalan Melon V-F3, Patrang. Gratis untuk belanja minimal Rp 100.000.'),
  ('Kabupaten Jember', 2, 15000, 'Hari yang sama', true,
    'Diantar dengan motor, dikirim pagi atau sore agar tidak kepanasan.'),
  ('Bondowoso & Lumajang', 3, 30000, '6–12 jam', true,
    'Kurir instan antar kota. Packing box berventilasi + alas sekam.'),
  ('Banyuwangi & Probolinggo', 4, 45000, '1 hari', true,
    'Ekspedisi darat. Dikirim pagi supaya tiba sebelum malam.'),
  ('Surabaya & Malang', 5, 65000, '1–2 hari', true,
    'Wajib tambah cool pack Rp 10.000 pada bulan panas. Maksimal 10 ekor per box.'),
  ('Luar Jawa Timur', 6, 0, 'Belum dilayani', false,
    'Feeder hidup belum kami kirim ke luar Jawa Timur. Hubungi kami untuk jadwal khusus.')
on conflict (label) do update set
  sort = excluded.sort,
  price = excluded.price,
  eta = excluded.eta,
  live_animal_allowed = excluded.live_animal_allowed,
  notes = excluded.notes;

-- ─────────────────────────────────────────────
-- Seed: feeder (sinkron dengan lib/data.ts)
-- ─────────────────────────────────────────────
insert into public.feeder_sizes (size, sort, age_label, weight_label, unit_price, price_10, price_50, price_100, stock, note)
values
  ('Pinky',  1, '0–3 hari',   '1–3 g',   8000,  75000,  350000,  650000,  120, 'Untuk ular muda dan gecko kecil.'),
  ('Fuzzy',  2, '4–7 hari',   '4–6 g',  10000,  95000,  450000,  850000,   90, 'Paling sering dipesan untuk ball python juvenile.'),
  ('Hopper', 3, '8–14 hari',  '7–12 g', 13000, 120000,  600000, 1150000,   64, 'Sudah berbulu, mulai bergerak aktif.'),
  ('Weaner', 4, '15–24 hari', '13–20 g',15000, 140000,  675000, 1300000,   48, 'Untuk ular ukuran medium dan biawak.'),
  ('Adult',  5, '25+ hari',   '21–35 g',20000, 190000,  900000, 1700000,   30, 'Stok terbatas, pesan 2 hari sebelumnya.')
on conflict (size) do update set
  sort = excluded.sort,
  age_label = excluded.age_label,
  weight_label = excluded.weight_label,
  unit_price = excluded.unit_price,
  price_10 = excluded.price_10,
  price_50 = excluded.price_50,
  price_100 = excluded.price_100,
  stock = excluded.stock,
  note = excluded.note;
