import type { Metadata } from "next";
import Link from "next/link";
import { MousePortrait } from "@/components/mouse-portrait";
import { formatRupiah } from "@/lib/format";
import { getPetProducts } from "@/lib/repo";
import { waLink } from "@/lib/whatsapp";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tikus putih peliharaan",
  description:
    "Tikus putih hidup untuk peliharaan: Satuan Rp 60.000, Sepasang Rp 110.000, Trio Rp 160.000. Sehat, jinak, garansi sehat 7 hari. COD Jember.",
};

export default async function PetPage() {
  const products = await getPetProducts();

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Tikus peliharaan</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Tikus putih yang jinak dan sehat
        </h1>
        <p className="mt-4 text-ink-soft">
          Yang penting sehat, jinak, dan aktif makan. Semua
          tikus melewati pemeriksaan kulit, mata, dan pernapasan sebelum dijual, dengan garansi
          sehat 7 hari.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {products.map((p) => {
          const soldOut = p.status === "soldout" || p.stock <= 0;
          return (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-4xl border border-line bg-white/55 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-cream">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
                  <MousePortrait
                    tone={p.tone}
                    variant={p.name.length}
                    label={`Ilustrasi ${p.name}`}
                  />
                </div>
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {p.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-ivory/90 px-2.5 py-1 text-[0.65rem] font-semibold text-ink-soft backdrop-blur"
                    >
                      {b}
                    </span>
                  ))}
                  {soldOut && (
                    <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[0.65rem] font-semibold text-ivory">
                      Stok habis
                    </span>
                  )}
                </div>
                <span className="absolute right-3 top-3 rounded-full bg-white/70 px-2.5 py-1 font-mono text-[0.62rem] tracking-wider text-ink-soft backdrop-blur">
                  {p.code}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-2xl">{p.name}</h2>
                <p className="mt-0.5 text-xs text-muted">{p.contents}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{p.description}</p>

                <div className="mt-4 flex items-baseline gap-2">
                  <p className="font-display text-2xl">{formatRupiah(p.price)}</p>
                  {p.compareAt && (
                    <p className="text-sm text-muted line-through">{formatRupiah(p.compareAt)}</p>
                  )}
                </div>
                <p className="mt-1 text-[0.68rem] text-muted">Stok: {p.stock} paket</p>

                <div className="mt-4 flex gap-2">
                  <Link
                    href="/order"
                    className="flex-1 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-ivory transition hover:bg-pink-deep"
                  >
                    Pesan
                  </Link>
                  <a
                    href={waLink(`Halo AlbinoMice, saya mau tanya paket ${p.name} (${p.code}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-full border border-ink/20 px-4 py-2.5 text-center text-sm font-semibold transition hover:border-ink/50"
                  >
                    Tanya dulu
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-4xl border border-sage/30 bg-sage-soft/40 p-6">
          <h2 className="font-display text-xl">Garansi sehat 7 hari</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Kalau tikus menunjukkan gejala sakit dalam seminggu, kami tanggung pengobatan atau ganti
            unit. Syaratnya satu: video unboxing tanpa jeda saat paket dibuka.
          </p>
        </div>
        <div className="rounded-4xl border border-line bg-cream/40 p-6">
          <h2 className="font-display text-xl">Butuh pakan reptil?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Kami juga menjual feeder hidup per ukuran dengan harga grosir untuk keeper reptil.
          </p>
          <Link
            href="/feeder"
            className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
          >
            Lihat feeder
          </Link>
        </div>
      </div>
    </div>
  );
}
