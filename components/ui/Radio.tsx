"use client";

import type { InputHTMLAttributes } from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  size?: "medium" | "large";
  className?: string;
}

export function Radio({
  label,
  size = "large",
  className = "",
  id: idProp,
  ...inputProps
}: RadioProps) {
  const id = idProp ?? `radio-${Math.random().toString(36).slice(2, 9)}`;
  const isLarge = size === "large";
  /* Control size from typography token (no fixed pixel). */
  const dotSize = isLarge
    ? "h-[var(--text-body-lg-line)] w-[var(--text-body-lg-line)] min-h-[var(--text-body-lg-line)] min-w-[var(--text-body-lg-line)]"
    : "h-[var(--text-body-md-line)] w-[var(--text-body-md-line)] min-h-[var(--text-body-md-line)] min-w-[var(--text-body-md-line)]";

  return (
    <label
      htmlFor={id}
      className={`inline-flex cursor-pointer items-center gap-3 font-[family-name:var(--font-body)] text-[var(--color-text)] ${className}`}
    >
      <input type="radio" id={id} className="peer sr-only" {...inputProps} />
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-border)] ${dotSize} transition-colors before:rounded-full before:bg-[var(--color-primary)] before:content-[''] peer-checked:border-[var(--color-primary)] peer-checked:before:block peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-disabled:opacity-50 ${
          isLarge ? "before:size-3" : "before:size-2.5"
        }`}
        aria-hidden
      />
      <span className={isLarge ? "text-[length:var(--text-body-lg-size)]" : "text-[length:var(--text-body-md-size)]"}>
        {label}
      </span>
    </label>
  );
}
