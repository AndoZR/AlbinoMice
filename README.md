# AlbinoMice

Website penjualan tikus putih dari Jember untuk pasar **feeder** (pakan reptil, utama) dan
**peliharaan** (sekunder). Dibangun dengan Next.js 15 (App Router), Tailwind CSS v4, dan
opsional Supabase.

Filosofi produk: feeder **hidup** per ukuran dengan harga grosir tertulis, tikus peliharaan
dalam 3 paket sederhana. Tikus tidak diberi nama individu — yang dijual adalah standar:
sehat, jinak, aktif makan, ukuran sesuai.

---

## Menjalankan

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Buka http://localhost:3000

Tanpa Supabase pun situs langsung jalan memakai data contoh di `lib/data.ts` (banner
"Mode demo" tampil di dashboard). Isi `NEXT_PUBLIC_WA_NUMBER` (format `628...`) agar
semua tombol WhatsApp mengarah ke nomor kamu, dan ganti `ADMIN_PASSWORD`.

## Struktur halaman

| Rute | Isi |
| --- | --- |
| `/` | Landing feeder-first: tabel harga, paket pet, standar, testimoni, lokasi + peta |
| `/feeder` | Feeder hidup 5 ukuran + order form + garansi hidup-sampai |
| `/pet` | 3 paket peliharaan (Satuan 60rb / Sepasang 110rb / Trio 160rb) + garansi 7 hari |
| `/order` | Satu halaman order: pilih produk + isi data + satu tombol ke WhatsApp |
| `/care` + `/care/[slug]` | 5 artikel perawatan (sumber traffic organik) |
| `/shipping` | Alur order, zona kirim Jawa Timur, packing, garansi |
| `/about`, `/faq` | Cerita breeder Jember, FAQ (FAQPage JSON-LD) |
| `/admin` | Dashboard ber-password: stok & harga, pesanan, pengaturan (noindex) |

## Alur checkout WhatsApp

1. Pembeli atur jumlah di `/order` (tier grosir feeder dihitung otomatis).
2. Isi nama/kota/alamat/tanggal kirim → klik **Kirim pesanan ke WhatsApp**.
3. `app/actions.ts` → `saveOrder()` menyimpan draft ke tabel `orders` (kalau Supabase aktif).
4. Browser membuka `wa.me` dengan pesan terformat + kode pesanan `AM-2026-XXXX`.

Tidak ada payment gateway. Konfirmasi stok, ongkir, dan pembayaran dilakukan manual — memang
disengaja, karena hewan hidup butuh pengecekan jadwal kirim.

## Mengaktifkan Supabase

1. Buat project di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, jalankan isi `supabase/migrations/0002_feeder_first.sql`
   (sudah mencakup tabel `products`, `shipping_zones`, kolom baru `orders`, dan seed).
   Kalau project lama sudah menjalankan `0001_init.sql`, jalankan 0002 setelahnya.
3. Salin URL + anon key ke `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ADMIN_PASSWORD=password-kuat-di-sini
```

4. Restart `npm run dev`. Indikator di `/admin` akan berubah menjadi "Terhubung ke Supabase".

Kalau tabel kosong, situs tetap menampilkan data contoh (`lib/repo.ts` melakukan fallback),
sehingga tidak pernah muncul katalog kosong saat pertama kali setup.

### Catatan keamanan

RLS di migrasi mengizinkan **publik hanya membaca** katalog/konten dan **menulis draft pesanan**.
Dashboard admin dilindungi password (`ADMIN_PASSWORD` + cookie sesi httpOnly via `middleware.ts`)
— cukup untuk dashboard internal satu penjual, bukan auth bank-grade. Untuk produksi yang lebih
ketat, aktifkan Supabase Auth dan batasi policy `insert/update` ke role `authenticated`, atau
jalankan mutasi lewat server dengan service-role key yang tidak pernah dikirim ke browser.

## Struktur kode

```
app/
  layout.tsx            font, metadata, header/footer
  page.tsx              landing feeder-first
  feeder/ pet/ order/   halaman produk + order
  care/                 index & artikel
  shipping/ about/ faq/
  admin/                login + dashboard + server actions
  actions.ts            simpan draft pesanan
middleware.ts           proteksi /admin via cookie sesi
components/
  mouse-portrait.tsx    ilustrasi SVG tikus (pengganti foto sementara)
  order-form.tsx        form order + kalkulator tier (client)
  qty-stepper.tsx       stepper jumlah
lib/
  data.ts               seed produk pet, feeder, zona, testimoni, FAQ
  articles.ts           konten panduan
  repo.ts               akses data (Supabase → fallback seed)
  order.ts              logika tier grosir feeder
  whatsapp.ts           formatting pesan & link wa.me, alamat
  admin-auth.ts         sesi cookie admin
supabase/migrations/0002_feeder_first.sql
```

## Ganti ilustrasi dengan foto asli

Ilustrasi SVG dipakai supaya situs tidak menampilkan gambar stok. Untuk memakai foto:

1. Upload foto ke Supabase Storage bucket `mice` (public).
2. Tambahkan kolom `cover_url` pada `products` (atau tabel gambar terpisah).
3. Ganti blok `<MousePortrait … />` di `app/pet/page.tsx`, `app/page.tsx`, dan
   `app/feeder/page.tsx` dengan `<Image src={...} … />`.

## Deploy

Vercel: import repo → set environment variables (`NEXT_PUBLIC_WA_NUMBER`,
`NEXT_PUBLIC_SITE_URL`, Supabase URL/key, `ADMIN_PASSWORD`) → deploy.
Halaman katalog memakai ISR (`revalidate = 60`), sehingga stok segar tanpa rebuild penuh.

## Yang sengaja belum dibuat

- Payment gateway / DP online (alur WA lebih jujur untuk hewan hidup).
- Akun pembeli & riwayat pesanan.
- Multi-seller / afiliasi breeder.
- Kalkulasi ongkir otomatis (tarif per zona diisi manual karena paket hewan hidup biasanya
  memakai ekspedisi khusus).
