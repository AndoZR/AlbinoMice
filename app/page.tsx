import type { Metadata } from "next";
import Link from "next/link";
import { MousePortrait } from "@/components/mouse-portrait";
import { articles } from "@/lib/articles";
import { testimonials } from "@/lib/data";
import { formatRupiah } from "@/lib/format";
import { getFeederSizes, getPetProducts } from "@/lib/repo";
import { ADDRESS, waLink } from "@/lib/whatsapp";

export const revalidate = 60;

const stats = [
  { value: "5", label: "ukuran feeder tersedia" },
  { value: "4,9/5", label: "dari 87 ulasan" },
  { value: "7 hari", label: "garansi sehat pet" },
  { value: "−10%", label: "diskon langganan" },
];

const quality = [
  {
    title: "Ukuran disortir, bukan asal comot",
    body: "Setiap ukuran feeder disortir ulang sebelum packing. Yang meleset jauh dari standar berat tidak ikut dikirim — diganti, bukan dinego.",
    icon: <path d="M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm2 5h6M9 12h6M9 16h3" />,
  },
  {
    title: "Jumlah dijamin saat diterima",
    body: "Feeder dikirim hidup dan dijamin hidup saat diterima. Klaim maksimal 2 jam setelah paket tiba dengan video unboxing tanpa jeda.",
    icon: <path d="M3 7h11v10H3V7Zm11 3 7-4v12l-7-4" />,
  },
  {
    title: "Packing untuk hewan hidup",
    body: "Box berventilasi empat sisi, alas sekam steril, cool pack saat panas. Dikirim pagi supaya tiba sebelum malam — tidak dikirim Jumat dan Minggu.",
    icon: <path d="M3 8l9-4 9 4-9 4-9-4Zm0 0v8l9 4 9-4V8M12 12v8" />,
  },
  {
    title: "Harga grosir tertulis",
    body: "Tier 10, 50, dan 100 ekor tertulis di tabel dan dihitung otomatis di halaman order. Tidak perlu menawar lewat chat.",
    icon: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4" />,
  },
];

const mapQuery = encodeURIComponent("Jalan Melon V, Patrang, Jember, Jawa Timur");

export default async function HomePage() {
  const [products, feeders] = await Promise.all([getPetProducts(), getFeederSizes()]);
  const cheapestFeeder = Math.min(...feeders.map((f) => f.unitPrice));
  const petFrom = Math.min(...products.map((p) => p.price));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-32 size-[34rem] rounded-full bg-pink-soft/50 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-24 size-[28rem] rounded-full bg-sage-soft/60 blur-3xl"
        />

        <div className="container-page relative grid gap-12 pb-16 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-24 lg:pt-20">
          <div className="animate-fade-up">
            <p className="eyebrow flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-pink" />
              Breeder tikus putih · Jember
            </p>

            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4.1rem]">
              Feeder hidup ukuran seragam.
              <br />
              Harga grosir
              <span className="relative mx-2 inline-block">
                <span className="relative z-10 italic text-pink-deep">tertulis jelas</span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 20"
                  className="absolute -bottom-1 left-0 h-3 w-full text-pink/50"
                  preserveAspectRatio="none"
                >
                  <path d="M2 14 C 80 4, 200 4, 298 12" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-ink-soft">
              Jual tikus putih untuk pakan reptil (pinky sampai adult) dan tikus peliharaan mulai{" "}
              {formatRupiah(petFrom)}. Stok dari koloni breeding kami sendiri — jumlah dan kondisi
              dijamin saat diterima.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/order"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
              >
                Order via WhatsApp
                <svg viewBox="0 0 20 20" className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/feeder"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ivory/70 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/40"
              >
                Lihat harga feeder
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-4 sm:gap-x-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl leading-none">{s.value}</dt>
                  <dd className="mt-1 text-[0.7rem] leading-tight text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero visual */}
          <div className="relative animate-fade-up [animation-delay:120ms]">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-pink-soft/70 via-transparent to-sage-soft/70 blur-xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/50 shadow-soft backdrop-blur">
                <div className="aspect-[4/3.4] bg-[#FBEAEB]">
                  <MousePortrait tone="pink" label="Ilustrasi tikus putih" />
                </div>
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                      Feeder mulai
                    </p>
                    <p className="font-display text-xl">{formatRupiah(cheapestFeeder)}/ekor</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted">Pet mulai</p>
                    <p className="font-display text-xl">{formatRupiah(petFrom)}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 top-6 animate-float rounded-2xl border border-line bg-ivory/95 px-3.5 py-2.5 shadow-soft backdrop-blur sm:-left-8">
                <p className="flex items-center gap-2 text-xs font-semibold">
                  <span className="grid size-5 place-items-center rounded-full bg-sage/20 text-sage">
                    <svg viewBox="0 0 20 20" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  Hidup & disortir per ukuran
                </p>
              </div>

              <div className="absolute -bottom-4 right-2 rounded-2xl border border-line bg-ivory/95 px-3.5 py-2.5 shadow-soft backdrop-blur sm:-right-6">
                <p className="text-[0.62rem] uppercase tracking-[0.14em] text-muted">COD Jember</p>
                <p className="text-xs font-semibold">Hari yang sama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HARGA FEEDER RINGKAS */}
      <section className="container-page py-8 lg:py-14">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Harga feeder</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Lima ukuran, satu tabel</h2>
            <p className="mt-2 max-w-md text-sm text-ink-soft">
              Harga per ekor turun otomatis mengikuti jumlah. Atur jumlah di halaman order untuk
              melihat totalnya.
            </p>
          </div>
          <Link
            href="/order"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
          >
            Order sekarang
            <svg viewBox="0 0 20 20" className="size-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 10h11M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="overflow-hidden rounded-4xl border border-line bg-white/50">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[0.68rem] uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-medium">Ukuran</th>
                  <th className="px-3 py-3 text-right font-medium">Ecer</th>
                  <th className="px-3 py-3 text-right font-medium">10+</th>
                  <th className="px-3 py-3 text-right font-medium">50+</th>
                  <th className="px-3 py-3 text-right font-medium">100+</th>
                  <th className="px-5 py-3 text-right font-medium">Stok</th>
                </tr>
              </thead>
              <tbody>
                {feeders.map((f) => (
                  <tr key={f.size} className="border-b border-line/60 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="font-medium">{f.size}</p>
                      <p className="text-xs text-muted">
                        {f.ageLabel} · {f.weightLabel}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3.5 text-right font-semibold tabular-nums">
                      {formatRupiah(f.unitPrice)}
                    </td>
                    {[f.price10 / 10, f.price50 / 50, f.price100 / 100].map((v, i) => (
                      <td key={i} className="whitespace-nowrap px-3 py-3.5 text-right text-xs tabular-nums text-ink-soft">
                        {formatRupiah(Math.round(v))}
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-5 py-3.5 text-right text-xs text-muted">
                      {f.stock} ekor
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted">
          Langganan 50 ekor/bulan ke atas: diskon 10% dari tier yang berlaku. Chat dengan kata kunci{" "}
          <strong>LANGGANAN</strong>.
        </p>
      </section>

      {/* PAKET PET */}
      <section className="border-y border-line bg-cream/40">
        <div className="container-page py-16 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Tikus peliharaan</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Tiga paket, tanpa ribet</h2>
            </div>
            <Link
              href="/pet"
              className="text-sm font-semibold underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
            >
              Detail paket
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex flex-col overflow-hidden rounded-4xl border border-line bg-ivory/80"
              >
                <div className="aspect-[16/8] bg-cream">
                  <MousePortrait tone={p.tone} variant={p.name.length} label={p.name} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <span className="font-mono text-[0.62rem] tracking-wider text-muted">{p.code}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted">{p.contents}</p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <p className="font-display text-2xl">{formatRupiah(p.price)}</p>
                    {p.compareAt && (
                      <p className="text-xs text-muted line-through">{formatRupiah(p.compareAt)}</p>
                    )}
                  </div>
                  <Link
                    href="/order"
                    className="mt-4 rounded-full bg-ink px-4 py-2.5 text-center text-sm font-semibold text-ivory transition hover:bg-pink-deep"
                  >
                    Pesan paket ini
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STANDAR KUALITAS */}
      <section className="container-page py-16 lg:py-24">
        <div className="max-w-xl">
          <p className="eyebrow">Standar kami</p>
          <h2 className="mt-2 font-display text-3xl sm:text-[2.6rem] sm:leading-[1.1]">
            Empat hal yang kami kerjakan berbeda.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {quality.map((r, i) => (
            <div
              key={r.title}
              className="group rounded-4xl border border-line bg-ivory/80 p-6 transition hover:border-ink/20 hover:bg-ivory"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-pink-soft/70 text-pink-deep transition group-hover:bg-pink group-hover:text-white">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {r.icon}
                  </svg>
                </span>
                <span className="font-mono text-xs text-muted/70">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-y border-line bg-cream/40">
        <div className="container-page py-16 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Kata pembeli</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Mereka sudah menerima tikusnya</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-line bg-white/60 px-4 py-2">
              <div className="flex text-pink-deep" aria-hidden>
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">{s}</span>
                ))}
              </div>
              <span className="text-xs text-muted">4,9 dari 87 ulasan</span>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-4xl border border-line bg-ivory/80 p-5"
              >
                <div className="mb-3 flex text-pink-deep/90" aria-label={`${t.rating} dari 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-3">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.city}</p>
                  <p className="mt-1 text-[0.68rem] text-muted/80">{t.bought}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section className="container-page py-16 lg:py-24">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Lokasi</p>
            <h2 className="mt-2 font-display text-3xl sm:text-[2.6rem] sm:leading-[1.1]">
              Mampir langsung juga boleh.
            </h2>
            <p className="mt-4 max-w-lg text-ink-soft">
              Kandang kami ada di <strong>{ADDRESS}</strong>. Kamu bisa COD, ambil langsung, atau
              sekadar lihat-lihat dulu sebelum memutuskan. Belanja minimal Rp 100.000, COD Jember
              kota gratis.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Buka setiap hari 08.00–21.00 WIB",
                "COD Jember kota hari yang sama",
                "Ambil langsung: kabari 1 jam sebelumnya",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-pink-soft text-pink-deep">
                    <svg viewBox="0 0 20 20" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
              >
                Buka di Google Maps
              </a>
              <a
                href={waLink("Halo AlbinoMice, saya mau COD / ambil langsung.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/15 px-5 py-3 text-sm font-semibold transition hover:border-ink/40"
              >
                Kabari dulu via WA
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-line shadow-soft">
            <iframe
              title="Peta lokasi AlbinoMice — Jalan Melon V, Patrang, Jember"
              src={`https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`}
              className="h-[22rem] w-full border-0 lg:h-full lg:min-h-[26rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CARE TEASER */}
      <section className="border-t border-line bg-cream/40">
        <div className="container-page py-16 lg:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Sebelum membeli</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl">Baca dulu, pelihara kemudian</h2>
            </div>
            <Link
              href="/care"
              className="text-sm font-semibold underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
            >
              Semua panduan
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/care/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-4xl border border-line bg-ivory/80 transition hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-cream">
                  <div className="absolute inset-0 opacity-90 transition group-hover:scale-105">
                    <MousePortrait tone={a.tone} variant={a.title.length} />
                  </div>
                  <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-soft">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg leading-snug group-hover:text-pink-deep">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{a.excerpt}</p>
                  <p className="mt-4 text-xs text-muted">{a.readingMinutes} menit baca</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-page py-12 lg:py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink px-6 py-14 text-ivory sm:px-12 lg:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-pink/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/3 size-96 rounded-full bg-sage/15 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-pink">
              Siap order?
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-[2.8rem]">
              Pilih produknya, satu tombol langsung ke WhatsApp.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ivory/75">
              Tidak perlu daftar akun. Total dihitung otomatis termasuk tier grosir — kami balas
              untuk konfirmasi stok dan ongkir.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/order"
                className="inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-pink hover:text-white"
              >
                Buka halaman order
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-6 py-3.5 text-sm font-semibold text-ivory transition hover:border-ivory/60"
              >
                Baca FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
