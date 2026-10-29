/** Auth dashboard admin: password tunggal + cookie sesi httpOnly.
 *
 * Bukan auth bank-grade — cukup untuk dashboard internal satu penjual.
 * Jangan pernah mengekspos ADMIN_PASSWORD ke client.
 */

export const ADMIN_SESSION_COOKIE = "am_admin";

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Nilai cookie sesi yang valid untuk secret saat ini. */
export function sessionValue(secret: string): Promise<string> {
  return sha256Hex(`am-admin:${secret}`);
}

/** Cek apakah nilai cookie cocok dengan ADMIN_PASSWORD. */
export async function isValidSession(
  cookieValue: string | undefined,
): Promise<boolean> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !cookieValue) return false;
  return cookieValue === (await sessionValue(secret));
}
