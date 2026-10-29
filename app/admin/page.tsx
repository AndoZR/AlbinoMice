import type { Metadata } from "next";
import Link from "next/link";
import {
  updateFeeder,
  updateOrderStatus,
  updateProduct,
  updateSetting,
  updateZone,
} from "@/app/admin/actions";
import { formatRupiah, shortDate } from "@/lib/format";
import {
  getFeederSizes,
  getPetProducts,
  getSettings,
  getShippingZones,
  isSupabaseConfigured,
} from "@/lib/repo";
import { getSupabase } from "@/lib/supabase";
import type { OrderStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard penjual",
  robots: { index: false, follow: false },
};

const statuses: OrderStatus[] = [
  "draft",
  "confirmed",
  "paid",
  "shipped",
  "done",
  "cancelled",
];

const statusLabel: Record<OrderStatus, string> = {
  draft: "Draft",
  confirmed: "Dikonfirmasi",
  paid: "Lunas",
  shipped: "Dikirim",
  done: "Selesai",
  cancelled: "Batal",
};

type AdminOrder = {
  id: string;
  code: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  ship_date: string | null;
  status: string;
  subtotal: number;
  notes: string;
  created_at: string;
};

const numberCls =
  "w-full rounded-lg border border-line bg-white/80 px-2 py-1.5 text-xs tabular-nums outline-none focus:border-pink";
const btnCls =
  "rounded-full bg-ink px-3 py-1.5 text-[0.68rem] font-semibold text-ivory transition hover:bg-pink-deep";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const { tab: tabParam } = (await searchParams) ?? {};
  const tab = tabParam === "orders" || tabParam === "settings" ? tabParam : "stock";

  const [products, feeders, zones, settings] = await Promise.all([
    getPetProducts(),
    getFeederSizes(),
    getShippingZones(),
    getSettings(),
  ]);

  let orders: AdminOrder[] = [];
  if (isSupabaseConfigured) {
    const supabase = getSupabase();
    const { data } = (await supabase!
      .from("orders")
      .select(
        "id, code, customer_name, phone, city, address, ship_date, status, subtotal, notes, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(50)) ?? { data: null };
    orders = (data as AdminOrder[] | null) ?? [];
  }

  const totalStockValue =
    products.reduce((s, p) => s + p.price * p.stock, 0) +
    feeders.reduce((s, f) => s + f.unitPrice * f.stock, 0);
  const pendingOrders = orders.filter((o) =>
    ["draft", "confirmed", "paid"].includes(o.status),
  ).length;

  const tabLink = (key: string, label: string) => (
    <Link
      key={key}
      href={`/admin${key === "stock" ? "" : `?tab=${key}`}`}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        tab === key
          ? "bg-ink text-ivory"
          : "border border-line text-ink-soft hover:border-ink/40 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="container-page py-10 lg:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 className="mt-2 font-display text-4xl">Kandang hari ini</h1>
          <p className="mt-2 text-sm text-ink-soft">
            Stok, harga, pesanan, dan pengaturan — semua di satu tempat.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs">
            <span
              className={`size-2 rounded-full ${isSupabaseConfigured ? "bg-sage" : "bg-pink"}`}
            />
            {isSupabaseConfigured ? "Terhubung ke Supabase" : "Mode demo (data statis)"}
          </span>
          <a
            href="/admin/logout"
            className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-ink/40 hover:text-ink"
          >
            Keluar
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Nilai stok (harga jual)", value: formatRupiah(totalStockValue) },
          { label: "Pesanan perlu tindakan", value: String(pendingOrders) },
          {
            label: "Total pesanan tersimpan",
            value: orders.length ? String(orders.length) : isSupabaseConfigured ? "0" : "—",
          },
        ].map((k) => (
          <div key={k.label} className="rounded-3xl border border-line bg-white/50 p-5">
            <p className="text-xs text-muted">{k.label}</p>
            <p className="mt-2 font-display text-2xl leading-none">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabLink("stock", "Stok & harga")}
        {tabLink("orders", `Pesanan${pendingOrders ? ` (${pendingOrders})` : ""}`)}
        {tabLink("settings", "Pengaturan")}
      </div>

      {!isSupabaseConfigured && (
        <div className="mt-6 rounded-3xl border border-pink/40 bg-pink-soft/30 p-5 text-sm">
          <p className="font-semibold">Mode demo — perubahan tidak tersimpan.</p>
          <p className="mt-1 text-ink-soft">
            Jalankan <code className="rounded bg-white/70 px-1">supabase/migrations/0002_feeder_first.sql</code> di
            SQL Editor Supabase, isi URL + anon key di <code className="rounded bg-white/70 px-1">.env.local</code>,
            lalu restart dev server. Lihat panduan di README.
          </p>
        </div>
      )}

      {tab === "stock" && (
        <div className="mt-6 space-y-8">
          {/* Produk pet */}
          <section className="overflow-hidden rounded-4xl border border-line bg-white/50">
            <div className="border-b border-line px-5 py-3.5">
              <h2 className="font-display text-lg">Tikus peliharaan (3 paket)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-sm">
                <thead>
                  <tr className="text-left text-[0.65rem] uppercase tracking-wider text-muted">
                    <th className="px-5 py-2.5 font-medium">Paket</th>
                    <th className="px-3 py-2.5 text-right font-medium">Harga (Rp)</th>
                    <th className="px-3 py-2.5 text-right font-medium">Stok</th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                    <th className="px-5 py-2.5 text-right font-medium">Simpan</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-line/60">
                      <td className="px-5 py-3">
                        <p className="font-medium">{p.name}</p>
                        <p className="text-[0.68rem] text-muted">{p.code} · {p.contents}</p>
                      </td>
                      <td colSpan={4} className="px-0 py-0">
                        <form
                          action={updateProduct}
                          className="grid grid-cols-[1fr_5rem_6.5rem_auto] items-center gap-2 px-3 py-2.5 sm:px-5"
                        >
                          <input type="hidden" name="id" value={p.id} />
                          <input
                            type="number"
                            name="price"
                            defaultValue={p.price}
                            min={0}
                            step={1000}
                            className={numberCls}
                            disabled={!isSupabaseConfigured}
                          />
                          <input
                            type="number"
                            name="stock"
                            defaultValue={p.stock}
                            min={0}
                            className={numberCls}
                            disabled={!isSupabaseConfigured}
                          />
                          <span className="text-xs text-muted">
                            {p.stock <= 0 ? "Habis" : "Tersedia"}
                          </span>
                          <button type="submit" className={btnCls} disabled={!isSupabaseConfigured}>
                            Simpan
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Feeder */}
          <section className="overflow-hidden rounded-4xl border border-line bg-white/50">
            <div className="border-b border-line px-5 py-3.5">
              <h2 className="font-display text-lg">Feeder (5 ukuran, harga tier)</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[52rem] border-collapse text-sm">
                <thead>
                  <tr className="text-left text-[0.65rem] uppercase tracking-wider text-muted">
                    <th className="px-5 py-2.5 font-medium">Ukuran</th>
                    <th className="px-2 py-2.5 text-right font-medium">Ecer</th>
                    <th className="px-2 py-2.5 text-right font-medium">10+</th>
                    <th className="px-2 py-2.5 text-right font-medium">50+</th>
                    <th className="px-2 py-2.5 text-right font-medium">100+</th>
                    <th className="px-2 py-2.5 text-right font-medium">Stok</th>
                    <th className="px-5 py-2.5 text-right font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {feeders.map((f) => (
                    <tr key={f.size} className="border-t border-line/60 align-top">
                      <td className="px-5 py-3">
                        <p className="font-medium">{f.size}</p>
                        <p className="text-[0.68rem] text-muted">{f.ageLabel} · {f.weightLabel}</p>
                      </td>
                      <td colSpan={6} className="px-0 py-0">
                        <form
                          action={updateFeeder}
                          className="grid grid-cols-[repeat(5,1fr)_4.5rem_auto] items-center gap-2 px-2 py-2.5 sm:px-5"
                        >
                          <input type="hidden" name="size" value={f.size} />
                          <input type="number" name="unit_price" defaultValue={f.unitPrice} min={0} step={500} className={numberCls} disabled={!isSupabaseConfigured} />
                          <input type="number" name="price_10" defaultValue={f.price10} min={0} step={1000} className={numberCls} disabled={!isSupabaseConfigured} />
                          <input type="number" name="price_50" defaultValue={f.price50} min={0} step={1000} className={numberCls} disabled={!isSupabaseConfigured} />
                          <input type="number" name="price_100" defaultValue={f.price100} min={0} step={1000} className={numberCls} disabled={!isSupabaseConfigured} />
                          <input type="number" name="stock" defaultValue={f.stock} min={0} className={numberCls} disabled={!isSupabaseConfigured} />
                          <button type="submit" className={btnCls} disabled={!isSupabaseConfigured}>
                            Simpan
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Zona kirim */}
          <section className="overflow-hidden rounded-4xl border border-line bg-white/50">
            <div className="border-b border-line px-5 py-3.5">
              <h2 className="font-display text-lg">Zona kirim</h2>
            </div>
            <div className="divide-y divide-line/60">
              {zones.map((z) => (
                <form
                  key={z.label}
                  action={updateZone}
                  className="grid items-center gap-2 px-5 py-3 sm:grid-cols-[1fr_7rem_8rem_auto_auto]"
                >
                  <input type="hidden" name="label" value={z.label} />
                  <div>
                    <p className="text-sm font-medium">{z.label}</p>
                    <p className="text-[0.68rem] text-muted">{z.liveAnimalAllowed ? "Hewan hidup OK" : "Belum dilayani"}</p>
                  </div>
                  <input type="number" name="price" defaultValue={z.price} min={0} step={1000} className={numberCls} disabled={!isSupabaseConfigured} aria-label={`Ongkir ${z.label}`} />
                  <input type="text" name="eta" defaultValue={z.eta} className={numberCls} disabled={!isSupabaseConfigured} aria-label={`Estimasi ${z.label}`} />
                  <label className="flex items-center gap-1.5 text-xs text-muted">
                    <input
                      type="checkbox"
                      name="live_animal_allowed"
                      defaultChecked={z.liveAnimalAllowed}
                      disabled={!isSupabaseConfigured}
                      className="size-4 accent-pink-deep"
                    />
                    Layani
                  </label>
                  <button type="submit" className={btnCls} disabled={!isSupabaseConfigured}>
                    Simpan
                  </button>
                </form>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === "orders" && (
        <section className="mt-6 overflow-hidden rounded-4xl border border-line bg-white/50">
          <div className="border-b border-line px-5 py-3.5">
            <h2 className="font-display text-lg">Pesanan masuk</h2>
          </div>
          {orders.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-ink-soft">Belum ada pesanan tersimpan.</p>
              <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-muted">
                Draft pesanan tercatat otomatis setiap pembeli menekan “Kirim pesanan ke
                WhatsApp”. Tanpa Supabase, pesanan hanya masuk ke chat.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-line/60">
              {orders.map((o) => (
                <div key={o.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="font-mono text-xs text-muted">{o.code} · {shortDate(o.created_at)}</p>
                    <p className="mt-0.5 text-sm font-semibold">
                      {o.customer_name}
                      <span className="font-normal text-muted"> · {o.city}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {o.phone && `${o.phone} · `}{o.address}
                      {o.ship_date && ` · kirim ${o.ship_date}`}
                    </p>
                    {o.notes && <p className="mt-1 text-xs text-ink-soft">“{o.notes}”</p>}
                    <p className="mt-1.5 text-sm font-semibold tabular-nums">{formatRupiah(o.subtotal)}</p>
                  </div>
                  <form action={updateOrderStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={o.id} />
                    <select
                      name="status"
                      defaultValue={o.status}
                      className="rounded-lg border border-line bg-white/80 px-2 py-1.5 text-xs outline-none focus:border-pink"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                    <button type="submit" className={btnCls}>
                      Update
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {tab === "settings" && (
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <form
            action={updateSetting}
            className="rounded-4xl border border-line bg-white/50 p-5"
          >
            <input type="hidden" name="key" value="announcement" />
            <h2 className="font-display text-lg">Pengumuman situs</h2>
            <p className="mt-1 text-xs text-muted">
              Teks singkat yang tampil di banner atas (opsional).
            </p>
            <textarea
              name="value"
              rows={3}
              defaultValue={settings.announcement ?? ""}
              placeholder="Contoh: Stok fuzzy menipis — order sebelum Jumat."
              disabled={!isSupabaseConfigured}
              className="mt-3 w-full rounded-xl border border-line bg-white/80 px-3 py-2 text-sm outline-none focus:border-pink"
            />
            <button type="submit" className={`${btnCls} mt-3`} disabled={!isSupabaseConfigured}>
              Simpan pengumuman
            </button>
          </form>

          <div className="rounded-4xl border border-line bg-cream/50 p-5">
            <h2 className="font-display text-lg">Nomor WhatsApp & alamat</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Nomor WA (<strong>6281216532315</strong>) dan alamat (
              <strong>Jalan Melon V-F3, Patrang, Jember</strong>) saat ini diambil dari environment
              dan kode, bukan database — supaya tidak bisa diubah sembarangan.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Untuk mengganti: edit <code className="rounded bg-white/70 px-1">NEXT_PUBLIC_WA_NUMBER</code> di{" "}
              <code className="rounded bg-white/70 px-1">.env.local</code>, dan konstanta{" "}
              <code className="rounded bg-white/70 px-1">ADDRESS</code> di{" "}
              <code className="rounded bg-white/70 px-1">lib/whatsapp.ts</code>.
            </p>
          </div>
        </section>
      )}

      <p className="mt-8 text-xs text-muted">
        Halaman ini tidak diindeks mesin pencari. Keluar setelah selesai memakai komputer bersama.
      </p>
    </div>
  );
}
