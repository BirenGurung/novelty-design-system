"use client";

import type { ReactNode } from "react";
import { Button } from "./Button";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

type AlertVariant = "success" | "warning" | "error" | "info" | "default";
/** Figma: Default (light bg + colored text), Banner (solid bg + white text). */
export type AlertType = "default" | "banner";
/** Figma: Default (padding 16px, title body-lg), Compact (padding 8px, title body-md). */
export type AlertSize = "default" | "compact";

const defaultVariantStyles: Record<AlertVariant, { bg: string; text: string; icon: string }> = {
  default: {
    bg: "bg-[var(--color-surface)] border border-[var(--color-border)]",
    text: "text-[var(--color-text)]",
    icon: "text-[var(--color-text-muted)]",
  },
  success: {
    bg: "bg-[var(--color-success-lighter)]",
    text: "text-[var(--color-success)]",
    icon: "text-[var(--color-success)]",
  },
  warning: {
    bg: "bg-[var(--color-warning-lighter)]",
    text: "text-[var(--color-warning)]",
    icon: "text-[var(--color-warning)]",
  },
  error: {
    bg: "bg-[var(--color-error-lighter)]",
    text: "text-[var(--color-error)]",
    icon: "text-[var(--color-error)]",
  },
  info: {
    bg: "bg-[var(--color-info-lighter)]",
    text: "text-[var(--color-info)]",
    icon: "text-[var(--color-info)]",
  },
};

/** Banner: solid background, light text (Figma Type=Banner). */
const bannerVariantStyles: Record<AlertVariant, { bg: string; text: string; icon: string }> = {
  default: {
    bg: "bg-[var(--color-text-muted)]",
    text: "text-[var(--color-white)]",
    icon: "text-[var(--color-white)]",
  },
  success: {
    bg: "bg-[var(--color-success)]",
    text: "text-[var(--color-white)]",
    icon: "text-[var(--color-white)]",
  },
  warning: {
    bg: "bg-[var(--color-warning)]",
    text: "text-[var(--color-text-darker)]",
    icon: "text-[var(--color-text-darker)]",
  },
  error: {
    bg: "bg-[var(--color-error)]",
    text: "text-[var(--color-white)]",
    icon: "text-[var(--color-white)]",
  },
  info: {
    bg: "bg-[var(--color-info)]",
    text: "text-[var(--color-white)]",
    icon: "text-[var(--color-white)]",
  },
};

const variantIconName: Record<AlertVariant, IconName> = {
  default: "info-circle",
  success: "check-circle-fill",
  warning: "exclamation-triangle",
  error: "exclamation-circle",
  info: "info-circle",
};

export interface AlertProps {
  variant?: AlertVariant;
  /** Default = light bg + colored text; Banner = solid bg + white text (Figma Type=Banner). */
  type?: AlertType;
  /** Default = larger padding and title; Compact = tighter padding, body-md title (Figma Size). */
  size?: AlertSize;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  variant = "info",
  type = "default",
  size = "default",
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  className = "",
}: AlertProps) {
  const style = type === "banner" ? bannerVariantStyles[variant] : defaultVariantStyles[variant];
  const isCompact = size === "compact";
  const paddingClass = isCompact ? "p-2" : "p-4";
  const gapClass = isCompact ? "gap-2" : "gap-4";
  const titleClass = isCompact
    ? "font-[family-name:var(--font-body)] font-medium text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]"
    : "font-[family-name:var(--font-body)] font-medium text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]";
  const descriptionColor = type === "banner" ? style.text : "text-[var(--color-text)]";

  return (
    <div
      role="alert"
      className={`flex items-center justify-between ${gapClass} rounded-[var(--radius-sm)] ${paddingClass} ${style.bg} ${className}`}
    >
      <div className={`flex min-w-0 flex-1 ${gapClass}`}>
        <span className={`shrink-0 ${style.icon}`} aria-hidden>
          <Icon name={variantIconName[variant]} className="size-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`${titleClass} ${style.text}`}>
            {title}
          </p>
          {description ? (
            <p className={`font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] ${descriptionColor} ${isCompact ? "mt-0" : "mt-1"}`}>
              {description}
            </p>
          ) : null}
          {actionLabel && onAction ? (
            <div className="mt-2">
              <Button variant="filled" size="small" onClick={onAction}>
                {actionLabel}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className={`shrink-0 rounded-full p-2 transition-opacity hover:opacity-80 ${style.text}`}
          aria-label="Dismiss"
        >
          <Icon name="x" size={20} />
        </button>
      ) : null}
    </div>
  );
}
