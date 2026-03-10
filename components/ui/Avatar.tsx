"use client";

import type { ReactNode } from "react";

/** Figma: Small 32px, Medium 44px, Large 64px, Extra Large 128px. */
export type AvatarSize = "small" | "medium" | "large" | "extra-large";

/** Figma sizes and initials typography: small=body-sm, medium=body-lg, large=h6, extra-large=h3. */
const sizeConfig: Record<
  AvatarSize,
  { dimension: string; textSize: string; lineHeight: string }
> = {
  small: {
    dimension: "h-8 w-8 min-h-8 min-w-8",
    textSize: "text-[length:var(--text-body-sm-size)]",
    lineHeight: "leading-[var(--text-body-sm-line)]",
  },
  medium: {
    dimension: "h-11 w-11 min-h-11 min-w-11",
    textSize: "text-[length:var(--text-body-lg-size)]",
    lineHeight: "leading-[var(--text-body-lg-line)]",
  },
  large: {
    dimension: "h-16 w-16 min-h-16 min-w-16",
    textSize: "text-[length:var(--text-h6-size)]",
    lineHeight: "leading-[var(--text-h6-line)]",
  },
  "extra-large": {
    dimension: "h-32 w-32 min-h-32 min-w-32",
    textSize: "text-[length:var(--text-h3-size)]",
    lineHeight: "leading-[var(--text-h3-line)]",
  },
};

export interface AvatarProps {
  /** Initials (e.g. "SM") when no src */
  initials?: string;
  /** Image src for picture variant */
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  /** When true, shows a loading skeleton (no initials or image) */
  loading?: boolean;
  className?: string;
}

export function Avatar({
  initials,
  src,
  alt = "",
  size = "medium",
  loading = false,
  className = "",
}: AvatarProps) {
  const config = sizeConfig[size];
  const isPicture = Boolean(src) && !loading;

  if (loading) {
    return (
      <div
        className={`inline-flex shrink-0 animate-pulse rounded-[var(--radius-full)] bg-[var(--color-border)] ${config.dimension} ${className}`}
        aria-busy="true"
        aria-label="Loading"
      />
    );
  }

  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-full)] bg-[var(--color-primary)] font-[family-name:var(--font-body)] font-medium text-[var(--color-white)] ${config.dimension} ${config.textSize} ${config.lineHeight} ${className}`}
      role={isPicture ? "img" : undefined}
      aria-label={isPicture ? alt : undefined}
    >
      {isPicture ? (
        <img src={src!} alt={alt} className="size-full object-cover" />
      ) : (
        <span className="truncate px-0.5 leading-none">{initials ?? "?"}</span>
      )}
    </div>
  );
}
