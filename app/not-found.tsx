import Link from "next/link";
import { MousePortrait } from "@/components/mouse-portrait";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[65vh] flex-col items-center justify-center py-16 text-center">
      <div className="size-40 opacity-80">
        <MousePortrait tone="sand" />
      </div>
      <p className="eyebrow mt-2">404</p>
      <h1 className="mt-2 font-display text-4xl">Halaman ini tidak ada</h1>
      <p className="mt-3 max-w-md text-sm text-ink-soft">
        Alamat yang kamu buka sudah berubah. Coba mulai dari beranda atau langsung ke halaman order.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          href="/order"
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
        >
          Order tikus
        </Link>
        <Link
          href="/"
          className="rounded-full border border-line px-5 py-3 text-sm font-semibold transition hover:border-ink/40"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
