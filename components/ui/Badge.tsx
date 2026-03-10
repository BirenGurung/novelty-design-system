"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";

/** Figma State: color semantic. Use "outline" for neutral outline (same as appearance="outline" + default color). */
export type BadgeVariant = "default" | "primary" | "success" | "error" | "info" | "warning" | "outline";
/** Figma: Default (body-md font/leading), Small (body-sm font/leading). Height from typography + padding. */
export type BadgeSize = "small" | "default";
/** Figma Type: Pill (fully rounded), Tag (rectangular radius), Icon (icon-only). */
export type BadgeType = "pill" | "tag" | "icon";
/** Figma Variant: Default (solid fill) or Outline (border + text). */
export type BadgeAppearance = "default" | "outline";

type BadgeColorVariant = Exclude<BadgeVariant, "outline">;

const filledStyles: Record<BadgeColorVariant, string> = {
  default: "bg-[var(--color-text-muted)] text-[var(--color-white)]",
  primary: "bg-[var(--color-primary)] text-[var(--color-white)]",
  success: "bg-[var(--color-success)] text-[var(--color-white)]",
  error: "bg-[var(--color-error)] text-[var(--color-white)]",
  info: "bg-[var(--color-info)] text-[var(--color-white)]",
  warning: "bg-[var(--color-warning)] text-[var(--color-text-darker)]",
};

const outlineStyles: Record<BadgeColorVariant, string> = {
  default: "bg-transparent border border-[var(--color-text-muted)] text-[var(--color-text-muted)]",
  primary: "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)]",
  success: "bg-transparent border border-[var(--color-success)] text-[var(--color-success)]",
  error: "bg-transparent border border-[var(--color-error)] text-[var(--color-error)]",
  info: "bg-transparent border border-[var(--color-info)] text-[var(--color-info)]",
  warning: "bg-transparent border border-[var(--color-warning)] text-[var(--color-warning)]",
};

export interface BadgeProps {
  children?: ReactNode;
  variant?: BadgeVariant;
  /** Solid fill (default) or outline. */
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  type?: BadgeType;
  onDismiss?: () => void;
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  appearance,
  size = "default",
  type = "pill",
  onDismiss,
  className = "",
}: BadgeProps) {
  const isOutlineVariant = variant === "outline";
  const effectiveAppearance = appearance ?? (isOutlineVariant ? "outline" : "default");
  const effectiveVariant = isOutlineVariant ? "default" : variant;
  const colorStyles = effectiveAppearance === "outline" ? outlineStyles[effectiveVariant as BadgeColorVariant] : filledStyles[effectiveVariant as BadgeColorVariant];
  const isSmall = size === "small";
  const typeStyles = type === "pill" ? "rounded-full" : type === "tag" ? "rounded-[var(--radius-sm)]" : "rounded-full";
  /* Design: height from font size + line-height (no fixed height). Default = Body Text Medium (14px/20px), Small = Small Text (12px/16px). Icon uses same line-height token for size. */
  const sizeStyles =
    type === "icon"
      ? isSmall
        ? "h-[var(--text-body-sm-line)] w-[var(--text-body-sm-line)] p-0 inline-flex items-center justify-center shrink-0"
        : "h-[var(--text-body-md-line)] w-[var(--text-body-md-line)] p-0 inline-flex items-center justify-center shrink-0"
      : isSmall
        ? "px-1.5 py-0 inline-flex items-center text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)]"
        : "px-2 py-0 inline-flex items-center text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]";

  return (
    <span
      className={`inline-flex items-center gap-1 font-[family-name:var(--font-body)] font-normal ${typeStyles} ${sizeStyles} ${colorStyles} ${className}`}
    >
      {children}
      {onDismiss && type !== "icon" ? (
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex shrink-0 rounded-full p-0.5 hover:opacity-80"
          aria-label="Remove"
        >
          <Icon name="x" size={12} />
        </button>
      ) : null}
    </span>
  );
}
