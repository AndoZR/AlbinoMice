"use server";

import { getSupabase } from "@/lib/supabase";
import type { OrderStatus } from "@/lib/types";

export interface SaveOrderInput {
  code: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  shipDate: string;
  notes: string;
  items: { refId: string; code: string; name: string; qty: number; price: number }[];
}

/**
 * Menyimpan draft pesanan supaya tidak hilang di chat WhatsApp.
 * Kalau Supabase belum dikonfigurasi, pesanan tetap jalan lewat WA —
 * hanya tidak tersimpan di dashboard admin.
 */
export async function saveOrder(input: SaveOrderInput) {
  const supabase = getSupabase();
  if (!supabase) return { saved: false as const, reason: "supabase-not-configured" };

  const subtotal = input.items.reduce((s, i) => s + i.price * i.qty, 0);

  const { data, error } = await supabase
    .from("orders")
    .insert({
      code: input.code,
      customer_name: input.customerName,
      phone: input.phone,
      city: input.city,
      address: input.address,
      ship_date: input.shipDate || null,
      status: "draft" satisfies OrderStatus,
      subtotal,
      notes: input.notes,
    })
    .select("id")
    .single();

  if (error || !data) {
    console.error("saveOrder gagal:", error?.message);
    return { saved: false as const, reason: "insert-failed" };
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    input.items.map((i) => ({
      order_id: data.id,
      ref_id: i.refId,
      ref_code: i.code,
      name: i.name,
      qty: i.qty,
      unit_price: i.price,
    })),
  );

  if (itemsError) console.error("saveOrder items gagal:", itemsError.message);

  return { saved: true as const, orderId: data.id as string };
}
