import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article-body";
import { MousePortrait } from "@/components/mouse-portrait";
import { articles, getArticle } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="container-page py-8 lg:py-12">
      <nav aria-label="Breadcrumb" className="text-xs text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-ink">Beranda</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/care" className="hover:text-ink">Panduan</Link>
          </li>
          <li aria-hidden>/</li>
          <li className="truncate text-ink">{article.title}</li>
        </ol>
      </nav>

      <header className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow">{article.category}</p>
        <h1 className="mt-2 font-display text-3xl leading-tight sm:text-[2.9rem] sm:leading-[1.1]">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-line py-3 text-xs text-muted">
          <span>{formatDate(article.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span>{article.readingMinutes} menit baca</span>
          <span aria-hidden>·</span>
          <span>Ditulis oleh tim AlbinoMice</span>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="mb-8 aspect-[16/8] overflow-hidden rounded-[1.75rem] bg-cream">
          <MousePortrait tone={article.tone} variant={article.title.length} label={article.title} />
        </div>

        <ArticleBody body={article.body} />

        <div className="mt-10 rounded-4xl border border-line bg-cream/50 p-6 sm:p-8">
          <p className="font-display text-xl">Ada pertanyaan spesifik soal tikusmu?</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Kami membalas pertanyaan perawatan walaupun kamu belum pernah membeli dari kami. Sertakan
            foto kandang atau video singkat kalau bisa — jauh lebih cepat dijawab.
          </p>
          <a
            href={waLink(`Halo, saya baca artikel "${article.title}" dan mau tanya sesuatu.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
          >
            Tanya lewat WhatsApp
          </a>
        </div>
      </div>

      <section className="mx-auto mt-16 max-w-5xl border-t border-line pt-10">
        <h2 className="font-display text-2xl">Bacaan lain</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {related.map((a) => (
            <Link
              key={a.slug}
              href={`/care/${a.slug}`}
              className="group rounded-3xl border border-line bg-white/40 p-5 transition hover:bg-white/70"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-pink-deep">
                {a.category}
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug group-hover:text-pink-deep">
                {a.title}
              </h3>
              <p className="mt-2 text-xs text-muted">{a.readingMinutes} menit baca</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
