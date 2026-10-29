export function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Umur dalam minggu dari tanggal lahir. */
export function ageInWeeks(birthDate: string): number {
  const diff = Date.now() - new Date(birthDate).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24 * 7)));
}

export function ageLabel(birthDate: string): string {
  const days = Math.floor(
    (Date.now() - new Date(birthDate).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days < 14) return `${days} hari`;
  const weeks = Math.floor(days / 7);
  if (weeks < 8) return `${weeks} minggu`;
  const months = Math.floor(days / 30);
  return `${months} bulan`;
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Kode pesanan sederhana: AM-2026-XXXX */
export function generateOrderCode(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AM-${year}-${rand}`;
}
