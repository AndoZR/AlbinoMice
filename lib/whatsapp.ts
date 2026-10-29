export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER?.replace(/[^0-9]/g, "") || "6281216532315";

export const ADDRESS = "Jalan Melon V-F3, Patrang, Jember, Jawa Timur";

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface OrderLine {
  name: string;
  code: string;
  qty: number;
  price: number;
}

interface OrderMessageInput {
  orderCode: string;
  customerName: string;
  phone?: string;
  city: string;
  address?: string;
  shipDate?: string;
  lines: OrderLine[];
  notes?: string;
}

/** Pesan pesanan dari halaman /order — langsung terkirim ke WhatsApp penjual. */
export function buildOrderMessage({
  orderCode,
  customerName,
  phone,
  city,
  address,
  shipDate,
  lines,
  notes,
}: OrderMessageInput): string {
  const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
  const items = lines
    .map(
      (l, i) =>
        `${i + 1}. ${l.name} (${l.code}) — ${l.qty} ekor × Rp ${l.price.toLocaleString("id-ID")}`,
    )
    .join("\n");

  return [
    `Halo AlbinoMice, saya mau pesan.`,
    ``,
    `Kode pesanan: ${orderCode}`,
    `Nama: ${customerName}`,
    phone ? `No. WA: ${phone}` : null,
    `Kota: ${city}`,
    address ? `Alamat: ${address}` : null,
    shipDate ? `Minta dikirim: ${shipDate}` : null,
    ``,
    `Rincian:`,
    items,
    ``,
    `Subtotal: Rp ${total.toLocaleString("id-ID")}`,
    notes ? `Catatan: ${notes}` : `Catatan: -`,
    ``,
    `Mohon konfirmasi stok dan jadwal pengiriman. Terima kasih.`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
