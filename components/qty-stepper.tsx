"use client";

export function QtyStepper({
  value,
  onChange,
  max = 999,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  label: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-ivory">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="grid size-8 place-items-center rounded-full text-lg text-ink-soft transition hover:text-pink-deep disabled:opacity-30"
        aria-label={`Kurangi ${label}`}
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="grid size-8 place-items-center rounded-full text-lg text-ink-soft transition hover:text-pink-deep disabled:opacity-30"
        aria-label={`Tambah ${label}`}
      >
        +
      </button>
    </div>
  );
}
