import type { FeederSizeRow } from "./types";

/** Harga per ekor mengikuti tier terbaik berdasarkan jumlah. */
export function feederUnitPrice(row: FeederSizeRow, qty: number): number {
  if (qty >= 100) return row.price100 / 100;
  if (qty >= 50) return row.price50 / 50;
  if (qty >= 10) return row.price10 / 10;
  return row.unitPrice;
}

export function feederTier(qty: number): string {
  if (qty >= 100) return "100+";
  if (qty >= 50) return "50+";
  if (qty >= 10) return "10+";
  return "ecer";
}

/** Saran upsell ke tier berikutnya, atau null kalau sudah tier terbaik. */
export function feederUpsell(qty: number): string | null {
  if (qty <= 0) return null;
  if (qty < 10) return `Tambah ${10 - qty} ekor lagi untuk harga grosir 10+.`;
  if (qty < 50) return `Tambah ${50 - qty} ekor lagi untuk tier 50+.`;
  if (qty < 100) return `Tambah ${100 - qty} ekor lagi untuk tier 100+.`;
  return "Kamu sudah di tier harga terbaik.";
}
