"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";

const nav = [
  { href: "/feeder", label: "Feeder" },
  { href: "/pet", label: "Tikus Peliharaan" },
  { href: "/care", label: "Perawatan" },
  { href: "/shipping", label: "Cara Order" },
  { href: "/about", label: "Tentang" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="hidden border-b border-line/70 bg-cream/60 md:block">
        <div className="container-page flex items-center justify-between py-2 text-[0.72rem] tracking-wide text-ink-soft">
          <p className="flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-sage" />
            Feeder hidup ukuran seragam · Stok diperbarui mingguan
          </p>
          <p>COD Jember kota · Kirim se-Jawa Timur</p>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/80 bg-ivory/85 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-sm transition-colors",
                    active
                      ? "bg-cream text-ink"
                      : "text-ink-soft hover:bg-cream/70 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={waLink("Halo AlbinoMice, saya mau tanya stok tikus.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-ink/15 bg-ivory px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/40 sm:inline-flex"
            >
              Tanya stok
            </a>

            <Link
              href="/order"
              className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-ivory transition hover:bg-pink-deep sm:px-5"
            >
              Order
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-line lg:hidden"
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-line bg-ivory lg:hidden">
            <nav className="container-page flex flex-col py-3" aria-label="Navigasi mobile">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-sm text-ink-soft transition hover:bg-cream hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/order"
                className="mt-1 rounded-xl bg-ink px-3 py-3 text-center text-sm font-semibold text-ivory"
              >
                Order sekarang
              </Link>
              <Link
                href="/faq"
                className="rounded-xl px-3 py-3 text-sm text-ink-soft transition hover:bg-cream hover:text-ink"
              >
                FAQ
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
