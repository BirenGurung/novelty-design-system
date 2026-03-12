"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "filled" | "outline" | "text" | "danger";
type ButtonSize = "small" | "medium" | "large";

/** For documentation/showcase: force the visual appearance of a state (no interaction). */
export type ButtonVisualState = "default" | "hover" | "pressed";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Documentation only: show hover or pressed appearance without interaction. */
  visualState?: ButtonVisualState;
  children: ReactNode;
  /** Optional leading icon (e.g. plus). Rendered before children. */
  leadingIcon?: ReactNode;
  /** Optional trailing icon (e.g. chevron right). Rendered after children. */
  trailingIcon?: ReactNode;
  className?: string;
}

/* Height from font size + line-height + vertical padding. Spacing from design tokens (4px grid). */
const sizeStyles: Record<ButtonSize, string> = {
  small:
    "gap-[var(--spacing-1)] px-[var(--spacing-2)] py-[var(--spacing-1)] rounded-[var(--radius-sm)] text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)]",
  medium:
    "gap-[var(--spacing-2)] px-[var(--spacing-3)] py-[var(--spacing-2)] rounded-[var(--radius-sm)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]",
  large:
    "gap-[var(--spacing-2)] px-[var(--spacing-4)] py-[var(--spacing-3)] rounded-[var(--radius-md)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]",
};

/** Pressed state: inner shadow only. Transition so shadow is added/removed smoothly. */
const pressedShadowTransition =
  "transition-[box-shadow_var(--duration-fast)_var(--ease-standard)]";
const pressedActiveClass = "active:shadow-[var(--shadow-button-pressed)]";

const variantStyles: Record<ButtonVariant, string> = {
  filled:
    "bg-[var(--color-primary)] text-[var(--color-white)] font-medium hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-pressed)] disabled:bg-[var(--color-button-disabled)] disabled:text-[var(--color-white)] disabled:cursor-not-allowed",
  outline:
    "bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary-lighter)] active:bg-[var(--color-primary-muted)] disabled:border-[var(--color-button-disabled)] disabled:text-[var(--color-button-disabled)] disabled:cursor-not-allowed",
  text: "bg-transparent text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary-lighter)] hover:text-[var(--color-primary-hover)] active:bg-[var(--color-primary-lighter)] active:text-[var(--color-primary-pressed)] disabled:text-[var(--color-button-disabled)] disabled:cursor-not-allowed",
  danger:
    "bg-[var(--color-error)] text-[var(--color-white)] font-medium hover:bg-[var(--color-error-light)] active:bg-[var(--color-error)] disabled:bg-[var(--color-button-disabled)] disabled:text-[var(--color-white)] disabled:cursor-not-allowed",
};

/** Classes to force hover/pressed look for showcase (visualState prop). */
const visualStateOverrides: Record<ButtonVisualState, Partial<Record<ButtonVariant, string>>> = {
  default: {},
  hover: {
    filled: "!bg-[var(--color-primary-hover)]",
    outline: "!bg-[var(--color-primary-lighter)]",
    text: "!bg-[var(--color-primary-lighter)] !text-[var(--color-primary-hover)]",
    danger: "!bg-[var(--color-error-light)]",
  },
  pressed: {
    filled: "!bg-[var(--color-primary-pressed)] !shadow-[var(--shadow-button-pressed)]",
    outline: "!bg-[var(--color-primary-muted)] !shadow-[var(--shadow-button-pressed)]",
    text: "!text-[var(--color-primary-pressed)] !shadow-[var(--shadow-button-pressed)]",
    danger: "!bg-[var(--color-error)] !shadow-[var(--shadow-button-pressed)]",
  },
};

export function Button({
  variant = "filled",
  size = "medium",
  visualState = "default",
  children,
  leadingIcon,
  trailingIcon,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const stateOverride = visualState !== "default" ? visualStateOverrides[visualState][variant] ?? "" : "";
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center font-[family-name:var(--font-body)] transition-colors ${pressedShadowTransition} ${pressedActiveClass} ${sizeStyles[size]} ${variantStyles[variant]} ${stateOverride} ${className}`}
      {...rest}
    >
      {leadingIcon ? <span className="inline-flex shrink-0">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="inline-flex shrink-0">{trailingIcon}</span> : null}
    </button>
  );
}
