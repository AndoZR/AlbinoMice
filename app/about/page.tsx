import type { Metadata } from "next";
import Link from "next/link";
import { MousePortrait } from "@/components/mouse-portrait";
import { ADDRESS, waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tentang AlbinoMice",
  description:
    "Kami breeder tikus putih di Jember yang menjual feeder hidup ukuran seragam dan tikus peliharaan sehat. Ini cara kami bekerja dan hal yang kami tidak lakukan.",
};

const principles = [
  {
    title: "Kami menolak menjual ke pembeli yang belum siap",
    body: "Kalau kamu belum punya kandang atau belum yakin bisa merawat 2 tahun ke depan, kami akan bilang tunggu. Kehilangan satu penjualan jauh lebih murah daripada menerima tikus kembali dalam kondisi buruk.",
  },
  {
    title: "Tanpa nama, tanpa gimmick",
    body: "Tikus kami tidak diberi nama individu karena yang kami jual adalah standar: sehat, jinak, aktif makan, ukuran sesuai. Ilustrasi di situs ini mewakili produknya, bukan janji soal satu ekor tertentu.",
  },
  {
    title: "Sortir ulang sebelum packing",
    body: "Feeder disortir ulang per ukuran sebelum masuk box. Yang meleset jauh dari standar berat tidak ikut dikirim. Jumlah dan kondisi dijamin saat diterima.",
  },
  {
    title: "Satu halaman order, tanpa drama",
    body: "Harga tertulis di tabel, total dihitung otomatis, pesanan terkirim ke WhatsApp dalam format rapi. Kami balas untuk konfirmasi stok dan ongkir — tanpa DP di awal.",
  },
];

const timeline = [
  { year: "2023", text: "Mulai dari 4 ekor tikus peliharaan di kamar kos. Semua anakan dibagikan ke teman." },
  { year: "2024", text: "Mulai mencatat berat mingguan dan sortir ukuran. Penjualan pertama lewat status WhatsApp." },
  { year: "2025", text: "Menetapkan SOP packing hewan hidup dan kebijakan garansi." },
  { year: "2026", text: "Membuka katalog online feeder-first dengan halaman order langsung ke WhatsApp." },
];

export default function AboutPage() {
  return (
    <div className="container-page py-10 lg:py-14">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Tentang kami</p>
          <h1 className="mt-2 font-display text-4xl leading-[1.08] sm:text-5xl">
            Kami mulai dari empat ekor tikus di kamar kos.
          </h1>
          <p className="mt-5 text-ink-soft">
            AlbinoMice bukan toko besar. Kandang kami ada di {ADDRESS}, dikelola dua orang, dan
            setiap tikus yang dijual pernah kami pegang sendiri. Kami menulis katalog dengan cara
            yang sama seperti kami bicara ke pembeli di WhatsApp — apa adanya, termasuk hal yang
            tidak enak didengar.
          </p>
          <p className="mt-3 text-ink-soft">
            Fokus kami sekarang adalah feeder hidup untuk keeper reptil: ukuran seragam, jumlah
            dijamin, harga grosir tertulis. Sampingannya, kami menjual tikus peliharaan dalam tiga
            paket sederhana mulai Rp 60.000.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={waLink("Halo AlbinoMice, saya mau kenalan dan tanya-tanya dulu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
            >
              Sapa kami di WhatsApp
            </a>
            <Link
              href="/order"
              className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold transition hover:border-ink/40"
            >
              Lihat halaman order
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 overflow-hidden rounded-[2rem] bg-[#FBEAEB]">
              <div className="aspect-[16/9]">
                <MousePortrait tone="pink" label="Ilustrasi kandang" />
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] bg-[#E8EFEA]">
              <div className="aspect-square">
                <MousePortrait tone="sage" variant={1} />
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.5rem] bg-[#F6EEE2]">
              <div className="aspect-square">
                <MousePortrait tone="sand" variant={3} />
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-[0.68rem] text-muted">
            Ilustrasi produk, bukan foto stok.
          </p>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-3xl">Cara kami bekerja</h2>
        <div className="mt-3 h-px w-full bg-line" />
        <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="flex gap-4">
              <span className="mt-1 font-mono text-xs text-pink-deep">0{i + 1}</span>
              <div>
                <h3 className="font-display text-xl leading-snug">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-[2rem] border border-line bg-cream/40 p-6 sm:p-10">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Perjalanan</p>
            <h2 className="mt-2 font-display text-2xl">Tiga tahun, satu arah</h2>
          </div>
          <ol className="relative space-y-6 border-l border-line pl-6">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[1.9rem] top-1.5 size-2.5 rounded-full border-2 border-ivory bg-pink" />
                <p className="font-display text-lg">{t.year}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mt-16 rounded-[2rem] border border-line bg-ivory p-6 sm:p-10">
        <h2 className="font-display text-2xl">Soal etika, kami tidak netral</h2>
        <div className="mt-4 grid gap-6 text-sm leading-relaxed text-ink-soft md:grid-cols-2">
          <p>
            Kami menolak pesanan “peliharaan” yang polanya menunjukkan pembelian massal untuk
            keperluan lain, dan menolak pesanan feeder dari pembeli di bawah umur. Pesanan yang
            mencurigakan kami batalkan tanpa pemberitahuan panjang lebar.
          </p>
          <p>
            Untuk lini feeder, kami hanya melayani pengiriman ke wilayah yang mengizinkan perdagangan
            hewan hidup. Feeder dijual hidup, disortir per ukuran, dan dijamin hidup saat diterima.
          </p>
        </div>
      </section>
    </div>
  );
}
