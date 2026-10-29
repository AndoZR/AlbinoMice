import Link from "next/link";
import { Logo } from "@/components/logo";
import { ADDRESS, waLink } from "@/lib/whatsapp";

const columns = [
  {
    title: "Belanja",
    links: [
      { href: "/feeder", label: "Feeder untuk reptil" },
      { href: "/pet", label: "Tikus peliharaan" },
      { href: "/order", label: "Order via WhatsApp" },
      { href: "/shipping", label: "Cara order & kirim" },
      { href: "/faq", label: "Pertanyaan umum" },
    ],
  },
  {
    title: "Belajar",
    links: [
      { href: "/care", label: "Panduan perawatan" },
      { href: "/care/panduan-merawat-tikus-putih-untuk-pemula", label: "Mulai dari sini" },
      { href: "/care/tanda-tikus-sakit", label: "Tanda tikus sakit" },
      { href: "/about", label: "Tentang breeder" },
    ],
  },
  {
    title: "Lainnya",
    links: [{ href: "/admin", label: "Dashboard penjual" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-cream/40">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              Breeder tikus putih di Jember. Feeder hidup ukuran seragam untuk keeper reptil, dan
              tikus peliharaan sehat untuk rumah. Jumlah dan kondisi dijamin saat diterima.
            </p>
            <p className="mt-4 text-sm text-ink-soft">
              <span className="font-semibold text-ink">{ADDRESS}</span>
            </p>
            <a
              href={waLink("Halo AlbinoMice, saya mau tanya-tanya dulu.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
            >
              WhatsApp kami
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 15L15 5M15 5H8M15 5v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-3">{col.title}</p>
              <ul className="space-y-2 text-sm text-ink-soft">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="transition hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AlbinoMice. Jember, Jawa Timur.</p>
          <p className="max-w-lg leading-relaxed">
            Penjualan hewan hidup tunduk pada peraturan daerah setempat. Kami tidak melayani
            pengiriman ke wilayah yang melarang perdagangan hewan hidup.
          </p>
        </div>
      </div>
    </footer>
  );
}
