import type { Metadata } from "next";
import Link from "next/link";
import { faqs } from "@/lib/data";
import { formatRupiah } from "@/lib/format";
import { getShippingZones } from "@/lib/repo";
import { waLink } from "@/lib/whatsapp";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Cara order & pengiriman tikus hidup",
  description:
    "Alur pemesanan tikus putih dari Jember: pilih produk, order via WhatsApp, packing berventilasi, zona pengiriman se-Jawa Timur, dan kebijakan garansi.",
};

const steps = [
  {
    n: "01",
    title: "Pilih produk",
    body: "Buka halaman order, atur jumlah paket pet atau ukuran feeder. Total dan tier grosir dihitung otomatis — tidak perlu menawar lewat chat.",
  },
  {
    n: "02",
    title: "Isi data & kirim",
    body: "Isi nama, kota, dan tanggal kirim yang kamu mau, lalu tekan satu tombol. Pesananmu terbuka di WhatsApp dalam format yang sudah rapi.",
  },
  {
    n: "03",
    title: "Konfirmasi & bayar",
    body: "Kami balas untuk konfirmasi stok dan ongkir. Pembayaran via transfer bank atau e-wallet setelah semuanya disepakati — tanpa DP di awal.",
  },
  {
    n: "04",
    title: "Packing, kirim, unboxing",
    body: "Dikirim pagi hari supaya tiba sebelum malam. Rekam video unboxing tanpa jeda sebagai dasar garansi hidup-sampai dan garansi sehat.",
  },
];

const packing = [
  "Box karton dilubangi empat sisi, bukan hanya atas",
  "Alas sekam steril 2 cm untuk menyerap urin",
  "Potongan apel atau wortel sebagai sumber air selama perjalanan",
  "Cool pack dibungkus kain untuk rute Surabaya–Malang (tidak menempel langsung ke tikus)",
  "Label besar: HEWAN HIDUP — JANGAN DIBALIK",
];

export default async function ShippingPage() {
  const zones = await getShippingZones();

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Cara order</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Dari kandang kami ke kandangmu
        </h1>
        <p className="mt-4 text-ink-soft">
          Mengirim hewan hidup tidak sama dengan mengirim barang. Alur di bawah ini kami susun supaya
          kamu tahu persis apa yang terjadi di setiap langkah — termasuk apa yang kami tidak janjikan.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="rounded-4xl border border-line bg-white/40 p-5">
            <span className="font-mono text-xs text-pink-deep">{s.n}</span>
            <h2 className="mt-2 font-display text-lg">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/order"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
        >
          Mulai order sekarang
        </Link>
      </div>

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h2 className="font-display text-2xl">Zona pengiriman</h2>
          <div className="mt-4 overflow-hidden rounded-3xl border border-line">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-cream/60">
                <tr className="text-left text-[0.66rem] uppercase tracking-wider text-muted">
                  <th className="px-4 py-2.5 font-medium">Wilayah</th>
                  <th className="px-4 py-2.5 font-medium">Estimasi</th>
                  <th className="px-4 py-2.5 text-right font-medium">Ongkir</th>
                </tr>
              </thead>
              <tbody>
                {zones.map((z) => (
                  <tr key={z.label} className="border-t border-line/70">
                    <td className="px-4 py-3">
                      <p className="font-medium">{z.label}</p>
                      <p className="mt-0.5 text-[0.7rem] leading-relaxed text-muted">{z.notes}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-ink-soft">{z.eta}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm tabular-nums">
                      {!z.liveAnimalAllowed ? (
                        <span className="text-muted">—</span>
                      ) : z.price === 0 ? (
                        <span className="text-sage">Gratis</span>
                      ) : (
                        formatRupiah(z.price)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Tarif di atas untuk maksimal 10 ekor feeder atau 3 paket pet per box. Pesanan lebih
            banyak dihitung terpisah karena butuh box lebih besar dan lebih banyak ruang gerak.
          </p>
        </div>

        <div className="rounded-4xl border border-line bg-cream/50 p-6">
          <h2 className="font-display text-xl">Isi paket standar</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {packing.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-muted">
            Kami tidak mengirim pada hari Jumat dan Minggu untuk menghindari paket tertahan di gudang
            ekspedisi.
          </p>
        </div>
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="rounded-4xl border border-sage/30 bg-sage-soft/40 p-6 sm:p-8">
          <h2 className="font-display text-xl">Garansi sehat 7 hari (pet)</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>• Berlaku untuk paket tikus peliharaan.</li>
            <li>• Wajib video unboxing tanpa jeda, memperlihatkan kondisi box.</li>
            <li>• Ganti unit setara atau refund penuh termasuk ongkir.</li>
            <li>• Tanpa video unboxing, klaim tidak dapat diproses.</li>
          </ul>
        </div>
        <div className="rounded-4xl border border-line bg-white/40 p-6 sm:p-8">
          <h2 className="font-display text-xl">Garansi hidup-sampai (feeder)</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Feeder dikirim hidup dan dijamin hidup saat diterima. Yang kami jamin adalah jumlah dan
            kondisi saat diterima, diklaim maksimal 2 jam setelah paket tiba dengan video unboxing.
          </p>
          <Link
            href="/feeder"
            className="mt-4 inline-flex text-xs font-semibold underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
          >
            Buka halaman feeder
          </Link>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl">Pertanyaan yang sering muncul</h2>
        <div className="mt-4 divide-y divide-line rounded-3xl border border-line bg-white/40">
          {faqs.slice(0, 4).map((f) => (
            <details key={f.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium">
                {f.q}
                <span className="text-muted transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
        <Link
          href="/faq"
          className="mt-4 inline-flex text-xs font-semibold underline decoration-pink decoration-2 underline-offset-4 hover:text-pink-deep"
        >
          Lihat semua FAQ
        </Link>
      </section>

      <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-[2rem] bg-ink px-6 py-8 text-ivory sm:flex-row sm:items-center sm:px-10">
        <div>
          <p className="font-display text-2xl">Masih ada yang ingin ditanyakan?</p>
          <p className="mt-1 text-sm text-ivory/70">
            Kami balas pada jam 08.00–21.00 WIB.
          </p>
        </div>
        <a
          href={waLink("Halo AlbinoMice, saya mau tanya soal pengiriman hewan hidup.")}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ivory px-6 py-3 text-sm font-semibold text-ink transition hover:bg-pink hover:text-white"
        >
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}
