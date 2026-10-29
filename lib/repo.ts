import {
  feederSizes as seedFeederSizes,
  petProducts as seedProducts,
  shippingZones as seedZones,
} from "./data";
import { getSupabase, isSupabaseConfigured } from "./supabase";
import type {
  FeederSize,
  FeederSizeRow,
  PetProduct,
  ShippingZone,
} from "./types";

/* ── Produk pet ─────────────────────────────────────────────── */

type ProductRow = {
  id: string;
  code: string;
  name: string;
  contents: string;
  price: number;
  compare_at: number | null;
  stock: number;
  status: string;
  tone: string;
  badges: string[] | null;
  description: string;
};

function toProduct(row: ProductRow): PetProduct {
  return {
    id: String(row.id),
    code: row.code,
    name: row.name,
    contents: row.contents,
    price: Number(row.price),
    compareAt: row.compare_at == null ? undefined : Number(row.compare_at),
    stock: Number(row.stock),
    status: row.status === "soldout" ? "soldout" : "available",
    tone: (row.tone ?? "pink") as PetProduct["tone"],
    badges: row.badges ?? [],
    description: row.description ?? "",
  };
}

export async function getPetProducts(): Promise<PetProduct[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort", { ascending: true });

    if (!error && data?.length) {
      return (data as ProductRow[]).map(toProduct);
    }
  }

  return seedProducts;
}

/* ── Feeder ─────────────────────────────────────────────────── */

export async function getFeederSizes(): Promise<FeederSizeRow[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("feeder_sizes")
      .select("*")
      .order("sort", { ascending: true });

    if (!error && data?.length) {
      return data.map((row) => ({
        size: row.size as FeederSize,
        ageLabel: row.age_label,
        weightLabel: row.weight_label,
        unitPrice: Number(row.unit_price),
        price10: Number(row.price_10),
        price50: Number(row.price_50),
        price100: Number(row.price_100),
        stock: Number(row.stock),
        note: row.note,
      }));
    }
  }

  return seedFeederSizes;
}

/* ── Zona kirim ─────────────────────────────────────────────── */

export async function getShippingZones(): Promise<ShippingZone[]> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase
      .from("shipping_zones")
      .select("*")
      .order("sort", { ascending: true });

    if (!error && data?.length) {
      return data.map((row) => ({
        label: row.label,
        price: Number(row.price),
        eta: row.eta,
        liveAnimalAllowed: row.live_animal_allowed !== false,
        notes: row.notes,
      }));
    }
  }

  return seedZones;
}

/* ── Pengaturan situs ───────────────────────────────────────── */

export async function getSettings(): Promise<Record<string, string>> {
  const supabase = getSupabase();

  if (supabase) {
    const { data, error } = await supabase.from("settings").select("key, value");
    if (!error && data?.length) {
      return Object.fromEntries(data.map((row) => [row.key, row.value]));
    }
  }

  return {};
}

export { isSupabaseConfigured };
