import type { MouseTone } from "@/lib/types";
import { cn } from "@/lib/format";

const palettes: Record<
  MouseTone,
  { blobA: string; blobB: string; body: string; shade: string; ear: string; ground: string }
> = {
  pink: {
    blobA: "#FBEAEB",
    blobB: "#F4CED2",
    body: "#FFFDFB",
    shade: "#F0DFDA",
    ear: "#EFB3B9",
    ground: "#E3C4C6",
  },
  sage: {
    blobA: "#E8EFEA",
    blobB: "#D3E1D8",
    body: "#FEFDFA",
    shade: "#E1E7DE",
    ear: "#E7B4B9",
    ground: "#C9D6CC",
  },
  sand: {
    blobA: "#F6EEE2",
    blobB: "#EBDCC8",
    body: "#FFFDF8",
    shade: "#EFE1CD",
    ear: "#E9B0B5",
    ground: "#DCCAB2",
  },
  sky: {
    blobA: "#E7EEF2",
    blobB: "#D2E0E8",
    body: "#FDFDFC",
    shade: "#DEE7E9",
    ear: "#E8B2B8",
    ground: "#C6D5DC",
  },
  lilac: {
    blobA: "#EFEAF2",
    blobB: "#DDD4E4",
    body: "#FFFDFD",
    shade: "#E6DEE9",
    ear: "#E9B0BC",
    ground: "#D3C9D8",
  },
};

interface MousePortraitProps {
  tone?: MouseTone;
  className?: string;
  /** Variasi kecil supaya tiap tikus tidak terlihat identik. */
  variant?: number;
  label?: string;
}

/**
 * Ilustrasi tikus albino (SVG). Dipakai sebagai pengganti foto selama
 * foto asli belum diunggah lewat admin/Supabase Storage.
 */
export function MousePortrait({
  tone = "pink",
  className,
  variant = 0,
  label,
}: MousePortraitProps) {
  const p = palettes[tone];
  const tilt = [-6, -3, -8, -4, -7][variant % 5];
  const earLift = [0, -4, 2, -2, 3][variant % 5];

  return (
    <svg
      viewBox="0 0 420 340"
      className={cn("h-full w-full", className)}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <ellipse cx="210" cy="172" rx="158" ry="138" fill={p.blobB} opacity="0.55" />
      <ellipse cx="196" cy="150" rx="128" ry="112" fill={p.blobA} opacity="0.9" />

      {/* bayangan lantai */}
      <ellipse cx="214" cy="292" rx="128" ry="16" fill={p.ground} opacity="0.45" />
      <ellipse cx="214" cy="291" rx="86" ry="9" fill={p.ground} opacity="0.35" />

      {/* ekor */}
      <path
        d="M318 226 C 372 236 396 190 370 156 C 356 138 336 142 334 160"
        stroke={p.shade}
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M318 226 C 372 236 396 190 370 156 C 356 138 336 142 334 160"
        stroke={p.body}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* badan */}
      <ellipse cx="250" cy="206" rx="94" ry="70" fill={p.body} />
      <ellipse cx="250" cy="212" rx="94" ry="64" fill={p.shade} opacity="0.35" />
      <ellipse cx="236" cy="176" rx="66" ry="38" fill="#ffffff" opacity="0.75" />

      {/* telinga belakang */}
      <g transform={`translate(258 ${104 + earLift}) rotate(${tilt})`}>
        <circle r="40" fill={p.body} />
        <circle r="27" fill={p.ear} opacity="0.85" />
      </g>

      {/* kepala */}
      <g transform={`translate(168 180) rotate(${tilt})`}>
        <ellipse rx="66" ry="58" fill={p.body} />
        <ellipse cx="6" cy="10" rx="58" ry="46" fill={p.shade} opacity="0.22" />
      </g>

      {/* moncong */}
      <ellipse cx="112" cy="198" rx="36" ry="28" fill={p.body} />
      <ellipse cx="112" cy="204" rx="34" ry="20" fill={p.shade} opacity="0.18" />

      {/* telinga depan */}
      <g transform={`translate(196 ${126 + earLift}) rotate(${tilt / 2})`}>
        <circle r="34" fill={p.body} />
        <circle r="22" fill={p.ear} opacity="0.9" />
        <circle r="22" fill="#ffffff" opacity="0.15" />
      </g>

      {/* kumis */}
      <g stroke="#231f1c" strokeWidth="1.6" strokeLinecap="round" opacity="0.38">
        <path d="M92 188 L 44 172" />
        <path d="M90 197 L 40 198" />
        <path d="M94 206 L 48 224" />
        <path d="M126 186 L 128 162" opacity="0.5" />
      </g>

      {/* mata */}
      <circle cx="150" cy="172" r="9" fill="#C7515C" />
      <circle cx="150" cy="172" r="9" fill="none" stroke="#9E3941" strokeWidth="1.2" opacity="0.5" />
      <circle cx="147" cy="168.5" r="2.8" fill="#ffffff" opacity="0.95" />

      {/* hidung & mulut */}
      <ellipse cx="82" cy="196" rx="6.5" ry="5.5" fill="#D98B92" />
      <path
        d="M82 202 C 82 209 76 213 71 212 M82 202 C 82 209 88 213 93 212"
        stroke="#C58B90"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />

      {/* kaki */}
      <ellipse cx="214" cy="272" rx="22" ry="11" fill={p.body} />
      <ellipse cx="272" cy="272" rx="24" ry="12" fill={p.body} />
      <ellipse cx="214" cy="274" rx="22" ry="7" fill={p.shade} opacity="0.4" />
      <ellipse cx="272" cy="274" rx="24" ry="7" fill={p.shade} opacity="0.4" />
    </svg>
  );
}
