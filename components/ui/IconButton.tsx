"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

export type IconButtonVariant = "filled" | "outline" | "clear";
export type IconButtonSize = "small" | "medium" | "large";

/** For documentation/showcase: force the visual appearance of a state (no interaction). */
export type IconButtonVisualState = "default" | "hover" | "pressed";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  /** Bootstrap icon name (from Icon component). When set, renders Icon; otherwise uses children. */
  icon?: IconName;
  /** Documentation only: show hover or pressed appearance without interaction. */
  visualState?: IconButtonVisualState;
  "aria-label": string;
  children?: ReactNode;
  className?: string;
}

/* Dimensions and icon size from theme tokens for white-label and consistency. */
const sizeStyles: Record<IconButtonSize, string> = {
  small: "h-[var(--size-icon-button-sm)] w-[var(--size-icon-button-sm)] min-h-[var(--size-icon-button-sm)] min-w-[var(--size-icon-button-sm)] rounded-[var(--radius-full)] p-0 inline-flex items-center justify-center",
  medium: "h-[var(--size-icon-button-md)] w-[var(--size-icon-button-md)] min-h-[var(--size-icon-button-md)] min-w-[var(--size-icon-button-md)] rounded-[var(--radius-full)] p-0 inline-flex items-center justify-center",
  large: "h-[var(--size-icon-button-lg)] w-[var(--size-icon-button-lg)] min-h-[var(--size-icon-button-lg)] min-w-[var(--size-icon-button-lg)] rounded-[var(--radius-full)] p-0 inline-flex items-center justify-center",
};

const iconSizeStyles: Record<IconButtonSize, string> = {
  small: "size-4",
  medium: "size-6",
  large: "size-7",
};

const pressedShadowClass = "active:shadow-[var(--shadow-button-pressed)]";

const variantStyles: Record<IconButtonVariant, string> = {
  filled:
    "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:bg-[var(--color-button-disabled)] disabled:text-[var(--color-white)] disabled:cursor-not-allowed",
  outline:
    "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:border-[var(--color-button-disabled)] disabled:text-[var(--color-button-disabled)] disabled:cursor-not-allowed",
  clear:
    "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:text-[var(--color-button-disabled)] disabled:cursor-not-allowed",
};

/** Classes to force hover/pressed look for showcase (visualState prop). */
const visualStateOverrides: Record<IconButtonVisualState, Partial<Record<IconButtonVariant, string>>> = {
  default: {},
  hover: {
    filled: "!bg-[var(--color-primary-lighter)]",
    outline: "!bg-[var(--color-primary-lighter)]",
    clear: "!bg-[var(--color-primary-lighter)]",
  },
  pressed: {
    filled: "!bg-[var(--color-primary-muted)] !shadow-[var(--shadow-button-pressed)]",
    outline: "!bg-[var(--color-primary-muted)] !shadow-[var(--shadow-button-pressed)]",
    clear: "!bg-[var(--color-primary-muted)]",
  },
};

export function IconButton({
  variant = "filled",
  size = "medium",
  icon,
  visualState = "default",
  children,
  className = "",
  disabled,
  ...rest
}: IconButtonProps) {
  const stateOverride = visualState !== "default" ? visualStateOverrides[visualState][variant] ?? "" : "";
  const content = icon != null ? (
    <Icon name={icon} className="size-full" />
  ) : (
    children
  );
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center shrink-0 transition-colors ${pressedShadowClass} ${sizeStyles[size]} ${variantStyles[variant]} ${stateOverride} ${className}`}
      suppressHydrationWarning
      {...rest}
    >
      <span className={`inline-flex shrink-0 [&>svg]:size-full ${iconSizeStyles[size]}`} aria-hidden suppressHydrationWarning>
        {content}
      </span>
    </button>
  );
}
