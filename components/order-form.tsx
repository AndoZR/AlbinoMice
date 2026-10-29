"use client";

import { useMemo, useState } from "react";
import { saveOrder } from "@/app/actions";
import { MousePortrait } from "@/components/mouse-portrait";
import { QtyStepper } from "@/components/qty-stepper";
import { cn, formatRupiah, generateOrderCode } from "@/lib/format";
import { feederTier, feederUnitPrice, feederUpsell } from "@/lib/order";
import type { FeederSizeRow, PetProduct } from "@/lib/types";
import { buildOrderMessage, waLink } from "@/lib/whatsapp";

type Selection = { refId: string; code: string; name: string; qty: number; price: number };

export function OrderForm({
  products,
  feeders,
}: {
  products: PetProduct[];
  feeders: FeederSizeRow[];
}) {
  const [petQty, setPetQty] = useState<Record<string, number>>({});
  const [feederQty, setFeederQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Jember");
  const [address, setAddress] = useState("");
  const [shipDate, setShipDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ code: string; link: string } | null>(null);

  const selections: Selection[] = useMemo(() => {
    const out: Selection[] = [];
    for (const p of products) {
      const qty = petQty[p.id] ?? 0;
      if (qty > 0) out.push({ refId: p.id, code: p.code, name: `${p.name} (peliharaan)`, qty, price: p.price });
    }
    for (const f of feeders) {
      const qty = feederQty[f.size] ?? 0;
      if (qty > 0)
        out.push({
          refId: `feeder-${f.size}`,
          code: `FD-${f.size.toUpperCase()}`,
          name: `Feeder ${f.size} (${feederTier(qty)})`,
          qty,
          price: Math.round(feederUnitPrice(f, qty)),
        });
    }
    return out;
  }, [petQty, feederQty, products, feeders]);

  const totalQty = selections.reduce((s, l) => s + l.qty, 0);
  const subtotal = selections.reduce((s, l) => s + l.qty * l.price, 0);
  const feederHint = useMemo(() => {
    const biggest = feeders
      .map((f) => feederQty[f.size] ?? 0)
      .sort((a, b) => b - a)[0];
    return biggest ? feederUpsell(biggest) : null;
  }, [feederQty, feeders]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selections.length === 0) return setError("Pilih minimal satu produk dulu.");
    if (name.trim().length < 2) return setError("Isi nama kamu.");
    if (city.trim().length < 2) return setError("Isi kota tujuan.");
    setError("");

    const code = generateOrderCode();
    const message = buildOrderMessage({
      orderCode: code,
      customerName: name.trim(),
      phone: phone.trim() || undefined,
      city: city.trim(),
      address: address.trim() || undefined,
      shipDate: shipDate || undefined,
      lines: selections,
      notes: notes.trim(),
    });
    const link = waLink(message);
    setDone({ code, link });
    window.open(link, "_blank", "noopener,noreferrer");

    void saveOrder({
      code,
      customerName: name.trim(),
      phone: phone.trim(),
      city: city.trim(),
      address: address.trim(),
      shipDate,
      notes: notes.trim(),
      items: selections,
    }).catch(() => undefined);
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-white/70 px-3 py-2.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-pink";

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
      <div className="space-y-8">
        {/* Pet */}
        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="font-display text-2xl">Tikus peliharaan</h2>
            <span className="text-xs text-muted">Tikus putih hidup</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {products.map((p) => {
              const qty = petQty[p.id] ?? 0;
              const soldOut = p.status === "soldout" || p.stock <= 0;
              return (
                <article
                  key={p.id}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-4xl border bg-white/50 transition",
                    qty > 0 ? "border-ink/40 shadow-soft" : "border-line",
                    soldOut && "opacity-60",
                  )}
                >
                  <div className="relative aspect-[5/3] bg-cream">
                    <MousePortrait tone={p.tone} variant={p.name.length} label={p.name} />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      {p.badges.map((b) => (
                        <span
                          key={b}
                          className="rounded-full bg-ivory/90 px-2.5 py-1 text-[0.62rem] font-semibold text-ink-soft backdrop-blur"
                        >
                          {b}
                        </span>
                      ))}
                      {soldOut && (
                        <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[0.62rem] font-semibold text-ivory">
                          Stok habis
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-lg leading-tight">{p.name}</h3>
                      <span className="font-mono text-[0.62rem] tracking-wider text-muted">{p.code}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">{p.contents}</p>
                    <p className="mt-1.5 text-[0.68rem] text-muted">Stok: {p.stock} paket</p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <p className="font-display text-xl">{formatRupiah(p.price)}</p>
                      {p.compareAt && (
                        <p className="text-xs text-muted line-through">{formatRupiah(p.compareAt)}</p>
                      )}
                    </div>
                    <div className="mt-3 flex justify-end">
                      <QtyStepper
                        label={p.name}
                        value={qty}
                        max={Math.max(p.stock, 0)}
                        onChange={(next) => {
                          setPetQty((prev) => ({ ...prev, [p.id]: next }));
                          setDone(null);
                        }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Feeder */}
        <section>
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-2xl">Feeder untuk reptil</h2>
            <span className="text-xs text-muted">Hidup · harga mengikuti tier otomatis</span>
          </div>
          <div className="overflow-hidden rounded-4xl border border-line bg-white/50">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-[0.68rem] uppercase tracking-wider text-muted">
                    <th className="px-4 py-3 font-medium">Ukuran</th>
                    <th className="px-3 py-3 text-right font-medium">Ecer</th>
                    <th className="px-3 py-3 text-right font-medium">10+</th>
                    <th className="px-3 py-3 text-right font-medium">50+</th>
                    <th className="px-3 py-3 text-right font-medium">100+</th>
                    <th className="px-4 py-3 text-right font-medium">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {feeders.map((f) => {
                    const qty = feederQty[f.size] ?? 0;
                    const unit = Math.round(feederUnitPrice(f, qty || 1));
                    return (
                      <tr
                        key={f.size}
                        className={cn("border-b border-line/60 last:border-0", qty > 0 && "bg-pink-soft/25")}
                      >
                        <td className="px-4 py-3.5">
                          <p className="font-medium">{f.size}</p>
                          <p className="text-xs text-muted">
                            {f.ageLabel} · {f.weightLabel} · stok {f.stock}
                          </p>
                        </td>
                        {[f.unitPrice, f.price10 / 10, f.price50 / 50, f.price100 / 100].map((v, i) => (
                          <td key={i} className="whitespace-nowrap px-3 py-3.5 text-right text-xs tabular-nums text-ink-soft">
                            {formatRupiah(Math.round(v))}
                          </td>
                        ))}
                        <td className="px-4 py-3.5">
                          <div className="ml-auto w-fit">
                            <QtyStepper
                              label={`Feeder ${f.size}`}
                              value={qty}
                              max={f.stock}
                              onChange={(next) => {
                                setFeederQty((prev) => ({ ...prev, [f.size]: next }));
                                setDone(null);
                              }}
                            />
                          </div>
                          {qty > 0 && (
                            <p className="mt-1 text-right text-[0.65rem] text-muted">
                              {formatRupiah(unit)}/ekor · {formatRupiah(Math.round(unit * qty))}
                            </p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {feederHint && (
            <p className="mt-2 text-xs text-ink-soft">
              <span className="font-semibold">Tips hemat:</span> {feederHint}
            </p>
          )}
        </section>
      </div>

      {/* Ringkasan */}
      <form onSubmit={handleSubmit} className="rounded-4xl border border-line bg-ivory p-5 lg:sticky lg:top-24">
        <p className="eyebrow">Ringkasan pesanan</p>

        {selections.length === 0 ? (
          <p className="mt-3 rounded-2xl bg-cream/60 px-4 py-3 text-xs leading-relaxed text-muted">
            Belum ada yang dipilih. Atur jumlah di daftar produk — total dihitung otomatis di sini.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {selections.map((l) => (
              <li key={l.refId} className="flex items-start justify-between gap-3">
                <span className="text-ink-soft">
                  {l.name} <span className="text-muted">×{l.qty}</span>
                </span>
                <span className="shrink-0 tabular-nums">{formatRupiah(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 border-t border-line pt-3">
          <div className="flex items-baseline justify-between text-sm text-muted">
            <span>Total ekor</span>
            <span className="font-semibold text-ink tabular-nums">{totalQty}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-sm text-muted">Subtotal</span>
            <span className="font-display text-2xl tabular-nums">{formatRupiah(subtotal)}</span>
          </div>
          <p className="mt-1 text-[0.66rem] text-muted">Belum termasuk ongkir hewan hidup.</p>
        </div>

        <div className="mt-5 space-y-2">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama kamu *" className={inputCls} />
          <div className="grid grid-cols-2 gap-2">
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="No. WA" inputMode="tel" className={inputCls} />
            <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Kota *" className={inputCls} />
          </div>
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat lengkap / patokan" className={inputCls} />
          <label className="block">
            <span className="mb-1 block text-xs text-muted">Minta dikirim tanggal</span>
            <input type="date" value={shipDate} onChange={(e) => setShipDate(e.target.value)} className={inputCls} />
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Catatan: COD / ambil langsung / ukuran khusus…"
            className={cn(inputCls, "resize-none")}
          />
        </div>

        {error && <p className="mt-2 text-xs text-pink-deep">{error}</p>}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-ink px-5 py-3.5 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
        >
          Kirim pesanan ke WhatsApp
        </button>

        {done && (
          <div className="mt-3 rounded-xl bg-sage-soft/60 px-3 py-2.5 text-[0.7rem] leading-relaxed text-ink-soft">
            Pesanan <strong>{done.code}</strong> disiapkan.{" "}
            <a href={done.link} target="_blank" rel="noopener noreferrer" className="underline">
              Buka WhatsApp
            </a>{" "}
            kalau tab tidak terbuka otomatis.
          </div>
        )}

        <p className="mt-3 text-[0.66rem] leading-relaxed text-muted">
          Stok dan ongkir dikonfirmasi manual lewat WhatsApp sebelum pembayaran.
        </p>
      </form>
    </div>
  );
}
