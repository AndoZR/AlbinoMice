import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/data";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Pertanyaan umum",
  description:
    "Jawaban soal umur tikus putih, pembelian satuan, garansi, COD Jember, dan pesanan feeder.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-2xl">
        <p className="eyebrow">FAQ</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Pertanyaan yang paling sering masuk
        </h1>
        <p className="mt-4 text-ink-soft">
          Kalau jawaban di bawah belum menjawab, chat kami. Kami lebih suka menjawab satu pertanyaan
          panjang daripada pembeli yang menyesal kemudian.
        </p>
      </div>

      <div className="mt-10 divide-y divide-line rounded-4xl border border-line bg-white/45">
        {faqs.map((f, i) => (
          <details key={f.q} className="group px-5 py-5 sm:px-7" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium">
              <span className="font-display text-lg leading-snug">{f.q}</span>
              <span className="mt-1 shrink-0 text-muted transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-4xl border border-line bg-cream/40 p-6">
          <h2 className="font-display text-xl">Belum yakin harus mulai dari mana?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Mulai dari panduan perawatan untuk pemula. Isinya daftar belanja, ukuran kandang, dan
            rutinitas harian 10 menit.
          </p>
          <Link
            href="/care/panduan-merawat-tikus-putih-untuk-pemula"
            className="mt-4 inline-flex text-sm font-semibold underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
          >
            Baca panduan pemula
          </Link>
        </div>
        <div className="rounded-4xl border border-line bg-sage-soft/40 p-6">
          <h2 className="font-display text-xl">Mau order atau tanya stok?</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Buka halaman order, atur jumlah produk, dan kirim langsung ke WhatsApp kami. Kami balas
            untuk konfirmasi stok dan jadwal kirim.
          </p>
          <Link
            href="/order"
            className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
          >
            Buka halaman order
          </Link>
        </div>
      </div>
    </div>
  );
}
