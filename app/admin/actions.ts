"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";

function noDb() {
  return { ok: false as const, message: "Supabase belum dikonfigurasi." };
}

/* ── Produk pet: stok & harga ─────────────────────────────────── */

export async function updateProduct(formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return noDb();

  const id = String(formData.get("id") ?? "");
  const price = Number(formData.get("price") ?? NaN);
  const stock = Number(formData.get("stock") ?? NaN);
  if (!id) return { ok: false as const, message: "ID produk hilang." };
  if (!Number.isFinite(price) || price < 0)
    return { ok: false as const, message: "Harga tidak valid." };
  if (!Number.isFinite(stock) || stock < 0)
    return { ok: false as const, message: "Stok tidak valid." };

  const status = stock <= 0 ? "soldout" : "available";
  const { error } = await supabase
    .from("products")
    .update({ price, stock, status })
    .eq("id", id);

  if (error) return { ok: false as const, message: error.message };

  revalidatePath("/admin");
  revalidatePath("/pet");
  revalidatePath("/order");
  revalidatePath("/");
  return { ok: true as const, message: "Produk diperbarui." };
}

/* ── Feeder: stok & harga tier ────────────────────────────────── */

export async function updateFeeder(formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return noDb();

  const size = String(formData.get("size") ?? "");
  const num = (key: string) => Number(formData.get(key) ?? NaN);
  const unit = num("unit_price");
  const p10 = num("price_10");
  const p50 = num("price_50");
  const p100 = num("price_100");
  const stock = num("stock");

  if (!size) return { ok: false as const, message: "Ukuran hilang." };
  for (const [label, v] of [
    ["harga ecer", unit],
    ["harga 10+", p10],
    ["harga 50+", p50],
    ["harga 100+", p100],
    ["stok", stock],
  ] as const) {
    if (!Number.isFinite(v) || v < 0)
      return { ok: false as const, message: `${label} tidak valid.` };
  }

  const { error } = await supabase
    .from("feeder_sizes")
    .update({
      unit_price: unit,
      price_10: p10,
      price_50: p50,
      price_100: p100,
      stock,
    })
    .eq("size", size);

  if (error) return { ok: false as const, message: error.message };

  revalidatePath("/admin");
  revalidatePath("/feeder");
  revalidatePath("/order");
  revalidatePath("/");
  return { ok: true as const, message: `Feeder ${size} diperbarui.` };
}

/* ── Zona kirim ───────────────────────────────────────────────── */

export async function updateZone(formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return noDb();

  const label = String(formData.get("label") ?? "");
  const price = Number(formData.get("price") ?? NaN);
  const eta = String(formData.get("eta") ?? "").trim();
  const allowed = formData.get("live_animal_allowed") === "on";
  if (!label) return { ok: false as const, message: "Zona hilang." };
  if (!Number.isFinite(price) || price < 0)
    return { ok: false as const, message: "Ongkir tidak valid." };

  const { error } = await supabase
    .from("shipping_zones")
    .update({ price, eta, live_animal_allowed: allowed })
    .eq("label", label);

  if (error) return { ok: false as const, message: error.message };

  revalidatePath("/admin");
  revalidatePath("/shipping");
  revalidatePath("/order");
  return { ok: true as const, message: `Zona ${label} diperbarui.` };
}

/* ── Pesanan ──────────────────────────────────────────────────── */

export async function updateOrderStatus(formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return noDb();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const valid = ["draft", "confirmed", "paid", "shipped", "done", "cancelled"];
  if (!id || !valid.includes(status))
    return { ok: false as const, message: "Data status tidak lengkap." };

  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return { ok: false as const, message: error.message };

  revalidatePath("/admin");
  return { ok: true as const, message: "Status pesanan diperbarui." };
}

/* ── Pengaturan situs ─────────────────────────────────────────── */

export async function updateSetting(formData: FormData) {
  const supabase = getSupabase();
  if (!supabase) return noDb();

  const key = String(formData.get("key") ?? "").trim();
  const value = String(formData.get("value") ?? "");
  if (!key) return { ok: false as const, message: "Kunci pengaturan hilang." };

  const { error } = await supabase
    .from("settings")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) return { ok: false as const, message: error.message };

  revalidatePath("/admin");
  return { ok: true as const, message: "Pengaturan disimpan." };
}
