import type { Metadata } from "next";
import { ADMIN_SESSION_COOKIE, sessionValue } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Masuk admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  async function login(formData: FormData) {
    "use server";
    const { cookies } = await import("next/headers");
    const { redirect: go } = await import("next/navigation");

    const password = String(formData.get("password") ?? "");
    const secret = process.env.ADMIN_PASSWORD;

    if (!secret) {
      go("/admin/login?error=config");
    }
    if (password !== secret) {
      go("/admin/login?error=salah");
    }

    (await cookies()).set(ADMIN_SESSION_COOKIE, await sessionValue(secret), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });
    go("/admin");
  }

  return (
    <div className="container-page flex min-h-[65vh] items-center justify-center py-16">
      <form
        action={login}
        className="w-full max-w-sm rounded-4xl border border-line bg-white/60 p-6 sm:p-8"
      >
        <p className="eyebrow">Dashboard</p>
        <h1 className="mt-2 font-display text-2xl">Masuk sebagai penjual</h1>
        <p className="mt-1.5 text-sm text-ink-soft">
          Halaman ini hanya untuk pemilik. Pembeli tidak butuh akun — langsung order lewat
          WhatsApp.
        </p>

        <label className="mt-5 block">
          <span className="mb-1 block text-xs text-muted">Password admin</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-line bg-white/70 px-3 py-2.5 text-sm outline-none transition placeholder:text-muted/70 focus:border-pink"
          />
        </label>

        {error === "salah" && (
          <p className="mt-2 text-xs text-pink-deep">Password salah. Coba lagi.</p>
        )}
        {error === "config" && (
          <p className="mt-2 text-xs text-pink-deep">
            ADMIN_PASSWORD belum diset di environment. Isi dulu di .env.local.
          </p>
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-ivory transition hover:bg-pink-deep"
        >
          Masuk
        </button>

        <p className="mt-3 text-center text-[0.68rem] text-muted">
          Lupa password? Ganti ADMIN_PASSWORD lalu restart server.
        </p>
      </form>
    </div>
  );
}
