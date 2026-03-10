"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";

/** Figma: color semantic. "outline" = neutral outline (border + text). */
export type ChipVariant = "default" | "primary" | "success" | "error" | "info" | "warning" | "outline";
/** Figma: Default (solid), Outline (border), Soft (lighter bg + darker text). */
export type ChipAppearance = "default" | "outline" | "soft";
export type ChipSize = "small" | "medium" | "large";

const filledStyles: Record<Exclude<ChipVariant, "outline">, string> = {
  default: "bg-[var(--color-text-muted)] text-[var(--color-white)]",
  primary: "bg-[var(--color-primary)] text-[var(--color-white)]",
  success: "bg-[var(--color-success)] text-[var(--color-white)]",
  error: "bg-[var(--color-error)] text-[var(--color-white)]",
  info: "bg-[var(--color-info)] text-[var(--color-white)]",
  warning: "bg-[var(--color-warning)] text-[var(--color-text-darker)]",
};

const outlineStyles: Record<Exclude<ChipVariant, "outline">, string> = {
  default: "bg-transparent border border-[var(--color-text-muted)] text-[var(--color-text-muted)]",
  primary: "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)]",
  success: "bg-transparent border border-[var(--color-success)] text-[var(--color-success)]",
  error: "bg-transparent border border-[var(--color-error)] text-[var(--color-error)]",
  info: "bg-transparent border border-[var(--color-info)] text-[var(--color-info)]",
  warning: "bg-transparent border border-[var(--color-warning)] text-[var(--color-warning)]",
};

const softStyles: Record<Exclude<ChipVariant, "outline">, string> = {
  default: "bg-[var(--color-primary-lighter)] text-[var(--color-text)]",
  primary: "bg-[var(--color-primary-lighter)] text-[var(--color-primary)]",
  success: "bg-[var(--color-success-lighter)] text-[var(--color-success)]",
  error: "bg-[var(--color-error-lighter)] text-[var(--color-error)]",
  info: "bg-[var(--color-info-lighter)] text-[var(--color-info)]",
  warning: "bg-[var(--color-warning-lighter)] text-[var(--color-warning)]",
};

/* Design: height from font size + line-height + vertical padding (no fixed height). Small/Medium: py spacing-1, Large: py spacing-2. */
const sizeStyles: Record<ChipSize, string> = {
  small:
    "px-2 py-1 inline-flex items-center text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)] rounded-full",
  medium:
    "px-3 py-1 inline-flex items-center text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] rounded-full",
  large:
    "px-4 py-2 inline-flex items-center text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)] rounded-full",
};

export interface ChipProps {
  children: ReactNode;
  variant?: ChipVariant;
  /** Solid (default), outline, or soft (lighter background). */
  appearance?: ChipAppearance;
  size?: ChipSize;
  onDismiss?: () => void;
  className?: string;
}

export function Chip({
  children,
  variant = "default",
  appearance,
  size = "medium",
  onDismiss,
  className = "",
}: ChipProps) {
  const isOutlineVariant = variant === "outline";
  const effectiveVariant = isOutlineVariant ? "default" : variant;
  const effectiveAppearance = appearance ?? (isOutlineVariant ? "outline" : "default");
  const colorStyles =
    effectiveAppearance === "outline"
      ? outlineStyles[effectiveVariant as Exclude<ChipVariant, "outline">]
      : effectiveAppearance === "soft"
        ? softStyles[effectiveVariant as Exclude<ChipVariant, "outline">]
        : filledStyles[effectiveVariant as Exclude<ChipVariant, "outline">];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-[family-name:var(--font-body)] font-normal ${sizeStyles[size]} ${colorStyles} ${className}`}
    >
      {children}
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex shrink-0 rounded p-0.5 hover:opacity-80"
          aria-label="Remove"
        >
          <Icon name="x" size={14} />
        </button>
      ) : null}
    </span>
  );
}
