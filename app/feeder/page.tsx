import type { Metadata } from "next";
import Link from "next/link";
import { MousePortrait } from "@/components/mouse-portrait";
import { OrderForm } from "@/components/order-form";
import { getFeederSizes, getPetProducts } from "@/lib/repo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Feeder tikus putih untuk reptil",
  description:
    "Tikus putih hidup per ukuran (pinky, fuzzy, hopper, weaner, adult) dengan harga grosir 10/50/100 ekor. Ukuran seragam, jumlah dijamin. COD Jember, kirim se-Jawa Timur.",
};

export default async function FeederPage() {
  const [products, feeders] = await Promise.all([
    getPetProducts(),
    getFeederSizes(),
  ]);

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="eyebrow">AlbinoMice Feeder</p>
          <h1 className="mt-2 font-display text-4xl leading-[1.08] sm:text-5xl">
            Feeder hidup, ukuran seragam, harga jelas.
          </h1>
          <p className="mt-4 text-ink-soft">
            Untuk keeper reptil dan pet shop. Stok berasal dari koloni breeding kami sendiri di
            Jember — bukan dari pasar — sehingga ukuran dan berat lebih seragam. Pilih ukuran di
            bawah, total mengikuti tier grosir otomatis.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/order"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
            >
              Order sekarang
            </Link>
            <Link
              href="/shipping"
              className="rounded-full border border-ink/15 px-6 py-3 text-sm font-semibold transition hover:border-ink/40"
            >
              Zona & packing
            </Link>
          </div>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-5">
            {[
              ["5", "ukuran tersedia"],
              ["120+", "ekor stok mingguan"],
              ["10%", "diskon langganan"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl leading-none">{v}</dt>
                <dd className="mt-1 text-[0.7rem] leading-tight text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-pink-soft/70 via-transparent to-sage-soft/70 blur-xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 shadow-soft backdrop-blur">
            <div className="aspect-[4/3.4] bg-[#E8EFEA]">
              <MousePortrait tone="sage" variant={2} label="Ilustrasi tikus putih" />
            </div>
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">Mulai dari</p>
                <p className="font-display text-xl">Rp 8.000/ekor</p>
              </div>
              <div className="text-right">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">Grosir 100+</p>
                <p className="font-display text-xl">Rp 6.500/ekor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <OrderForm products={products} feeders={feeders} />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Ukuran dijamin seragam",
            body: "Setiap ukuran disortir ulang sebelum packing. Kalau ada yang ukurannya meleset jauh, kami ganti tanpa banyak tanya.",
          },
          {
            title: "Garansi hidup-sampai",
            body: "Feeder dikirim hidup dan dijamin hidup saat diterima. Lapor maksimal 2 jam setelah paket tiba dengan video unboxing.",
          },
          {
            title: "Langganan −10%",
            body: "Pesan 50 ekor ke atas per bulan dengan jadwal kirim tetap, dapat diskon 10% dari tier yang berlaku. Chat dengan kata kunci LANGGANAN.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-4xl border border-line bg-white/40 p-5">
            <h2 className="font-display text-lg">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
