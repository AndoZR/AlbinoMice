import type {
  FeederSizeRow,
  PetProduct,
  ShippingZone,
  Testimonial,
} from "./types";

/**
 * Data contoh (seed). Dipakai otomatis kalau Supabase belum dikonfigurasi.
 * Begitu NEXT_PUBLIC_SUPABASE_URL + ANON_KEY diisi, lib/repo.ts akan
 * membaca dari tabel `products`, `feeder_sizes`, `shipping_zones`, dst.
 *
 * Harga bisa diubah kapan saja lewat dashboard admin (/admin).
 */

export const petProducts: PetProduct[] = [
  {
    id: "pet-satuan",
    code: "PET-01",
    name: "Satuan",
    contents: "1 ekor tikus putih hidup (jantan atau betina)",
    price: 60000,
    stock: 24,
    status: "available",
    tone: "pink",
    badges: ["Paling laris"],
    description:
      "Satu ekor tikus putih sehat untuk peliharaan. Kami pilihkan yang jinak dan aktif makan. Cocok kalau kamu baru mau coba atau menambah teman untuk tikus yang sudah ada di rumah.",
  },
  {
    id: "pet-sepasang",
    code: "PET-02",
    name: "Sepasang",
    contents: "1 jantan + 1 betina tikus putih hidup",
    price: 110000,
    compareAt: 120000,
    stock: 12,
    status: "available",
    tone: "sage",
    badges: ["Hemat Rp 10.000"],
    description:
      "Sepasang jantan dan betina yang tidak sedarah, siap jadi teman sekandang atau calon indukan. Tikus adalah hewan sosial — dua ekor jauh lebih bahagia daripada satu.",
  },
  {
    id: "pet-trio",
    code: "PET-03",
    name: "Trio",
    contents: "1 jantan + 2 betina tikus putih hidup",
    price: 160000,
    compareAt: 180000,
    stock: 6,
    status: "available",
    tone: "sand",
    badges: ["Hemat Rp 20.000", "Untuk calon breeder"],
    description:
      "Paket awal untuk yang serius mau breeding: satu jantan dan dua betina dari garis berbeda. Kami sertakan catatan garis keturunan supaya kamu bisa menghindari perkawinan sedarah.",
  },
];

export const feederSizes: FeederSizeRow[] = [
  {
    size: "Pinky",
    ageLabel: "0–3 hari",
    weightLabel: "1–3 g",
    unitPrice: 8000,
    price10: 75000,
    price50: 350000,
    price100: 650000,
    stock: 120,
    note: "Untuk ular muda dan gecko kecil.",
  },
  {
    size: "Fuzzy",
    ageLabel: "4–7 hari",
    weightLabel: "4–6 g",
    unitPrice: 10000,
    price10: 95000,
    price50: 450000,
    price100: 850000,
    stock: 90,
    note: "Paling sering dipesan untuk ball python juvenile.",
  },
  {
    size: "Hopper",
    ageLabel: "8–14 hari",
    weightLabel: "7–12 g",
    unitPrice: 13000,
    price10: 120000,
    price50: 600000,
    price100: 1150000,
    stock: 64,
    note: "Sudah berbulu, mulai bergerak aktif.",
  },
  {
    size: "Weaner",
    ageLabel: "15–24 hari",
    weightLabel: "13–20 g",
    unitPrice: 15000,
    price10: 140000,
    price50: 675000,
    price100: 1300000,
    stock: 48,
    note: "Untuk ular ukuran medium dan biawak.",
  },
  {
    size: "Adult",
    ageLabel: "25+ hari",
    weightLabel: "21–35 g",
    unitPrice: 20000,
    price10: 190000,
    price50: 900000,
    price100: 1700000,
    stock: 30,
    note: "Stok terbatas, pesan 2 hari sebelumnya.",
  },
];

export const shippingZones: ShippingZone[] = [
  {
    label: "Jember kota (COD)",
    price: 0,
    eta: "Hari yang sama",
    liveAnimalAllowed: true,
    notes:
      "COD atau ambil langsung di Jalan Melon V-F3, Patrang. Gratis untuk belanja minimal Rp 100.000.",
  },
  {
    label: "Kabupaten Jember",
    price: 15000,
    eta: "Hari yang sama",
    liveAnimalAllowed: true,
    notes: "Diantar dengan motor, dikirim pagi atau sore agar tidak kepanasan.",
  },
  {
    label: "Bondowoso & Lumajang",
    price: 30000,
    eta: "6–12 jam",
    liveAnimalAllowed: true,
    notes: "Kurir instan antar kota. Packing box berventilasi + alas sekam.",
  },
  {
    label: "Banyuwangi & Probolinggo",
    price: 45000,
    eta: "1 hari",
    liveAnimalAllowed: true,
    notes: "Ekspedisi darat. Dikirim pagi supaya tiba sebelum malam.",
  },
  {
    label: "Surabaya & Malang",
    price: 65000,
    eta: "1–2 hari",
    liveAnimalAllowed: true,
    notes:
      "Wajib tambah cool pack Rp 10.000 pada bulan panas. Maksimal 10 ekor per box.",
  },
  {
    label: "Luar Jawa Timur",
    price: 0,
    eta: "Belum dilayani",
    liveAnimalAllowed: false,
    notes:
      "Feeder hidup belum kami kirim ke luar Jawa Timur. Hubungi kami untuk jadwal khusus.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Rani P.",
    city: "Jember",
    quote:
      "COD-an langsung di Patrang, tikusnya aktif dan bersih. Ini pertama kali saya beli hewan hidup online dan ternyata tidak seseram yang saya bayangkan.",
    bought: "Sepasang tikus putih, September 2026",
    rating: 5,
  },
  {
    name: "Dimas A.",
    city: "Surabaya",
    quote:
      "Pesan feeder 50 ekor untuk ball python, ukurannya seragam dan semuanya hidup sampai. Packing-nya rapi, ada lubang ventilasi dan alas sekam.",
    bought: "Feeder fuzzy 50 ekor, Agustus 2026",
    rating: 5,
  },
  {
    name: "Keluarga Wibowo",
    city: "Jember",
    quote:
      "Beli untuk anak yang minta peliharaan. Penjualnya sabar menjelaskan cara pegang, kandang, dan pakan lewat voice note. Tikusnya jinak, anak jadi berani.",
    bought: "Satuan tikus putih, Juli 2026",
    rating: 5,
  },
  {
    name: "Yoga S.",
    city: "Malang",
    quote:
      "Packing-nya rapi, box ada ventilasi dan alas sekam, tidak bau sama sekali. Satu ekor agak stres saat tiba tapi pulih dalam sehari setelah diberi air gula.",
    bought: "Trio tikus putih, Oktober 2026",
    rating: 4,
  },
];

export const faqs = [
  {
    q: "Apakah tikus albino aman untuk anak-anak?",
    a: "Aman, dengan pendampingan orang tua. Tikus putih yang sudah jinak jarang menggigit, tapi anak perlu diajari cara menggendong dengan dua tangan dan tidak mengagetkan hewan saat tidur. Kami menyarankan anak usia 8 tahun ke atas.",
  },
  {
    q: "Berapa lama tikus putih hidup?",
    a: "Rata-rata 1,5–2,5 tahun dengan perawatan baik. Faktor terbesar adalah kebersihan kandang, pakan berkualitas, dan suhu ruangan yang tidak terlalu panas.",
  },
  {
    q: "Boleh beli satuan atau harus sepasang?",
    a: "Boleh satuan. Tapi tikus adalah hewan sosial, jadi kami menyarankan minimal dua ekor dari jenis kelamin yang sama agar tidak kesepian. Paket Sepasang dan Trio lebih hemat dan sudah disiapkan dari garis berbeda.",
  },
  {
    q: "Bagaimana kalau tikus mati saat pengiriman?",
    a: "Untuk tikus peliharaan berlaku garansi sehat 7 hari. Untuk feeder berlaku garansi hidup-sampai: laporkan maksimal 2 jam setelah paket diterima dengan video unboxing tanpa jeda. Kami ganti dengan unit setara atau refund penuh, termasuk ongkir. Tanpa video unboxing, klaim tidak dapat kami proses.",
  },
  {
    q: "Apakah bisa COD?",
    a: "Bisa untuk area Jember kota — COD atau ambil langsung di Jalan Melon V-F3, Patrang. Gratis ongkir untuk belanja minimal Rp 100.000. Untuk luar Jember kami kirim dengan kurir, detail lengkap ada di halaman Cara Order & Pengiriman.",
  },
  {
    q: "Feeder dijual hidup atau beku?",
    a: "Hidup. Feeder kami dijual dalam keadaan hidup per ukuran (pinky sampai adult) karena keeper reptil di wilayah kami umumnya memberi pakan hidup. Ukuran dan jumlah dijamin seragam sesuai pesanan.",
  },
  {
    q: "Apakah tikusnya sudah bebas kutu dan jamur?",
    a: "Ya. Semua tikus melewati pemeriksaan kulit, mata, dan pernapasan sebelum masuk daftar jual. Yang menunjukkan gejala apa pun tidak akan kami jual sampai sembuh.",
  },
  {
    q: "Bisa langganan feeder rutin?",
    a: "Bisa. Untuk pesanan 50 ekor ke atas per bulan, kami sediakan jadwal kirim tetap (mingguan atau dua mingguan) dengan diskon 10% dari tier yang berlaku. Hubungi WhatsApp dengan kata kunci LANGGANAN.",
  },
];
