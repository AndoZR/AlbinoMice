import type { Metadata } from "next";
import Link from "next/link";
import { MousePortrait } from "@/components/mouse-portrait";
import { articles } from "@/lib/articles";
import { shortDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Panduan perawatan tikus albino",
  description:
    "Artikel praktis soal kandang, pakan, kesehatan, dan breeding tikus putih. Ditulis dari pengalaman kandang kami sendiri, bukan salinan artikel luar.",
};

export default function CareIndexPage() {
  const [featured, ...rest] = articles;

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Panduan</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Baca dulu, pelihara kemudian
        </h1>
        <p className="mt-4 text-ink-soft">
          Kami menulis ini karena pertanyaan yang sama muncul setiap minggu di WhatsApp. Semuanya
          berdasarkan kandang kami sendiri — termasuk kesalahan yang pernah kami buat.
        </p>
      </div>

      <Link
        href={`/care/${featured.slug}`}
        className="group mt-10 grid overflow-hidden rounded-[2rem] border border-line bg-white/50 md:grid-cols-2"
      >
        <div className="relative aspect-[16/10] bg-[#FBEAEB] md:aspect-auto">
          <MousePortrait tone={featured.tone} label="" />
          <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-ink-soft">
            Mulai dari sini
          </span>
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-10">
          <p className="eyebrow">{featured.category}</p>
          <h2 className="mt-2 font-display text-2xl leading-snug group-hover:text-pink-deep sm:text-3xl">
            {featured.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{featured.excerpt}</p>
          <p className="mt-5 text-xs text-muted">
            {shortDate(featured.publishedAt)} · {featured.readingMinutes} menit baca
          </p>
        </div>
      </Link>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {rest.map((a) => (
          <Link
            key={a.slug}
            href={`/care/${a.slug}`}
            className="group flex gap-4 rounded-4xl border border-line bg-white/40 p-4 transition hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-soft"
          >
            <div className="size-24 shrink-0 overflow-hidden rounded-2xl bg-cream sm:size-28">
              <MousePortrait tone={a.tone} variant={a.title.length} />
            </div>
            <div className="min-w-0">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-pink-deep">
                {a.category}
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug group-hover:text-pink-deep">
                {a.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-soft">{a.excerpt}</p>
              <p className="mt-2 text-[0.68rem] text-muted">{a.readingMinutes} menit baca</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
