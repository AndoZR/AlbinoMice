export type FeederSize = "Pinky" | "Fuzzy" | "Hopper" | "Weaner" | "Adult";
export type MouseTone = "pink" | "sage" | "sand" | "sky" | "lilac";
export type ProductStatus = "available" | "soldout";

/** Produk pet: paket tikus putih hidup, tanpa nama individu. */
export interface PetProduct {
  id: string;
  code: string;
  name: string;
  contents: string;
  price: number;
  compareAt?: number;
  stock: number;
  status: ProductStatus;
  tone: MouseTone;
  badges: string[];
  description: string;
}

export interface FeederSizeRow {
  size: FeederSize;
  ageLabel: string;
  weightLabel: string;
  unitPrice: number;
  price10: number;
  price50: number;
  price100: number;
  stock: number;
  note: string;
}

export interface ShippingZone {
  label: string;
  price: number;
  eta: string;
  liveAnimalAllowed: boolean;
  notes: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: "Perawatan" | "Pemula" | "Kesehatan" | "Breeding";
  readingMinutes: number;
  publishedAt: string;
  tone: MouseTone;
  body: string;
}

export interface Testimonial {
  name: string;
  city: string;
  quote: string;
  bought: string;
  rating: number;
}

export type OrderStatus =
  | "draft"
  | "confirmed"
  | "paid"
  | "shipped"
  | "done"
  | "cancelled";

export interface OrderItemInput {
  refId: string;
  code: string;
  name: string;
  qty: number;
  price: number;
}

export interface OrderRow {
  id: string;
  code: string;
  customer_name: string;
  phone: string;
  city: string;
  address: string;
  ship_date: string;
  channel: string;
  status: OrderStatus;
  subtotal: number;
  notes: string;
  created_at: string;
}
