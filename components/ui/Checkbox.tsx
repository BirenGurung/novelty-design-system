"use client";

import { useEffect, useRef } from "react";
import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  size?: "medium" | "large";
  /** When true, shows indeterminate state (e.g. "some selected"). Syncs to input.indeterminate. */
  indeterminate?: boolean;
  className?: string;
}

export function Checkbox({
  label,
  size = "large",
  indeterminate = false,
  className = "",
  id: idProp,
  ...inputProps
}: CheckboxProps) {
  const id = idProp ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const isLarge = size === "large";
  /* Control size from typography token (no fixed pixel). */
  const boxSize = isLarge ? "h-[var(--text-body-lg-line)] w-[var(--text-body-lg-line)] min-h-[var(--text-body-lg-line)] min-w-[var(--text-body-lg-line)]" : "h-[var(--text-body-md-line)] w-[var(--text-body-md-line)] min-h-[var(--text-body-md-line)] min-w-[var(--text-body-md-line)]";

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      data-indeterminate={indeterminate ? "true" : undefined}
      className={`group inline-flex cursor-pointer items-center gap-3 font-[family-name:var(--font-body)] text-[var(--color-text)] ${className}`}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        className="peer sr-only"
        {...inputProps}
      />
      <span
        className={`flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-2 border-[var(--color-border)] ${boxSize} transition-colors peer-checked:border-[var(--color-primary)] peer-checked:bg-[var(--color-primary)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-primary)] peer-disabled:opacity-50 group-data-[indeterminate=true]:border-[var(--color-primary)] group-data-[indeterminate=true]:bg-[var(--color-primary)]`}
        aria-hidden
      >
        <svg className="hidden size-3.5 text-white group-has-[:checked]:block group-data-[indeterminate=true]:!hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="hidden size-3.5 text-white group-data-[indeterminate=true]:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={isLarge ? "text-[length:var(--text-body-lg-size)]" : "text-[length:var(--text-body-md-size)]"}>
        {label}
      </span>
    </label>
  );
}
