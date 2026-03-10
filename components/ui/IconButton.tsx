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

/* Button: small 32px, medium 40px, large 60px. Icon: small 16px, medium 24px, large 28px. */
const sizeStyles: Record<IconButtonSize, string> = {
  small: "h-8 w-8 min-h-8 min-w-8 rounded-full p-0 inline-flex items-center justify-center",
  medium: "h-10 w-10 min-h-10 min-w-10 rounded-full p-0 inline-flex items-center justify-center",
  large: "h-[60px] w-[60px] min-h-[60px] min-w-[60px] rounded-full p-0 inline-flex items-center justify-center",
};

const iconSizeStyles: Record<IconButtonSize, string> = {
  small: "size-4",     /* 16px */
  medium: "size-6",    /* 24px */
  large: "size-[28px]", /* 28px */
};

/** Figma: Inner shadow on pressed — same as Button. */
const pressedInsetShadow = "active:shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]";

const variantStyles: Record<IconButtonVariant, string> = {
  filled:
    "bg-[var(--color-surface)] text-[var(--color-primary)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:bg-[var(--color-button-disabled,#9e9e9e)] disabled:text-[var(--color-white)] disabled:cursor-not-allowed",
  outline:
    "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:border-[var(--color-button-disabled,#9e9e9e)] disabled:text-[var(--color-button-disabled,#9e9e9e)] disabled:cursor-not-allowed",
  clear:
    "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:text-[var(--color-button-disabled,#9e9e9e)] disabled:cursor-not-allowed",
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
    filled: "!bg-[var(--color-primary-muted)] !shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]",
    outline: "!bg-[var(--color-primary-muted)] !shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]",
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
      className={`inline-flex items-center justify-center shrink-0 transition-colors ${pressedInsetShadow} ${sizeStyles[size]} ${variantStyles[variant]} ${stateOverride} ${className}`}
      {...rest}
    >
      <span className={`inline-flex shrink-0 [&>svg]:size-full ${iconSizeStyles[size]}`} aria-hidden>
        {content}
      </span>
    </button>
  );
}
