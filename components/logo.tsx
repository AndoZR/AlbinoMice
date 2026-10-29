import Link from "next/link";
import { cn } from "@/lib/format";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label="AlbinoMice — beranda"
    >
      <span className="relative flex size-10 items-center justify-center rounded-full bg-ink text-ivory transition-colors group-hover:bg-pink-deep">
        <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
          <circle cx="12" cy="9" r="5" fill="currentColor" opacity="0.9" />
          <circle cx="23" cy="11" r="4" fill="currentColor" opacity="0.75" />
          <ellipse cx="17" cy="20" rx="9" ry="8" fill="currentColor" />
          <circle cx="12.5" cy="17.5" r="1.7" fill="#E3868F" />
          <path d="M8 22 L3 21 M8.5 25 L3.5 27" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] tracking-tight">AlbinoMice</span>
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Breeder Jember
        </span>
      </span>
    </Link>
  );
}
