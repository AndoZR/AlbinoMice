import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AlbinoMice — Feeder tikus putih & tikus peliharaan dari Jember",
    template: "%s · AlbinoMice",
  },
  description:
    "Jual tikus putih hidup: feeder per ukuran (pinky–adult) untuk keeper reptil dan tikus peliharaan mulai Rp 60.000. COD Jember, kirim se-Jawa Timur. Order langsung via WhatsApp.",
  keywords: [
    "tikus putih",
    "tikus albino",
    "jual tikus putih",
    "feeder tikus",
    "pakan reptil Jember",
    "tikus peliharaan Jember",
    "breeder tikus Jember",
  ],
  openGraph: {
    title: "AlbinoMice — Feeder tikus putih & peliharaan dari Jember",
    description:
      "Feeder hidup ukuran seragam, harga grosir jelas. Tikus peliharaan mulai Rp 60.000. Order langsung via WhatsApp.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          Lompat ke konten
        </a>
        <SiteHeader />
        <main id="konten">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
