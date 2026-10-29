import type { Metadata } from "next";
import { OrderForm } from "@/components/order-form";
import { getFeederSizes, getPetProducts } from "@/lib/repo";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Order tikus putih",
  description:
    "Pesan tikus putih peliharaan atau feeder untuk reptil. Pilih produk, isi data, kirim langsung ke WhatsApp kami. COD Jember, kirim se-Jawa Timur.",
};

export default async function OrderPage() {
  const [products, feeders] = await Promise.all([
    getPetProducts(),
    getFeederSizes(),
  ]);

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Order</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Pilih, isi data, kirim ke WhatsApp
        </h1>
        <p className="mt-4 text-ink-soft">
          Tidak perlu daftar akun. Atur jumlah produk di bawah, isi nama dan kota, lalu satu tombol
          membuka WhatsApp dengan pesananmu yang sudah rapi. Kami balas untuk konfirmasi stok dan
          ongkir.
        </p>
      </div>

      <div className="mt-8">
        <OrderForm products={products} feeders={feeders} />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Tanpa DP di awal",
            body: "Kami tidak meminta pembayaran sebelum stok dan jadwal kirim disepakati di chat.",
          },
          {
            title: "Garansi hidup-sampai (feeder)",
            body: "Lapor maksimal 2 jam setelah paket tiba dengan video unboxing. Ganti unit atau refund.",
          },
          {
            title: "Garansi sehat 7 hari (pet)",
            body: "Tikus peliharaan yang sakit dalam seminggu kami tanggung pengobatan atau ganti unit.",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-4xl border border-line bg-white/40 p-5">
            <h2 className="font-display text-lg">{c.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
