"use client";

import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type InputStatus = "default" | "error" | "warning" | "success";
export type InputVariant = "default" | "filled";
export type InputSize = "default" | "large";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  /** Visual status: error (red), warning (amber), success (green). Error prop takes precedence. */
  status?: InputStatus;
  /** Visual variant: default (outline) or filled (solid background). */
  variant?: InputVariant;
  size?: InputSize;
  /** Optional leading content (e.g. icon) inside the input wrapper */
  leading?: ReactNode;
  /** Optional trailing content (e.g. icon) inside the input wrapper */
  trailing?: ReactNode;
  className?: string;
  inputClassName?: string;
}

export function Input({
  label,
  hint,
  error,
  status = "default",
  variant = "default",
  size = "default",
  leading,
  trailing,
  className = "",
  inputClassName = "",
  id: idProp,
  disabled,
  ...inputProps
}: InputProps) {
  const generatedId = useId();
  const id = idProp ?? `input-${generatedId.replace(/:/g, "")}`;
  const resolvedStatus = error ? "error" : status;
  const hasError = resolvedStatus === "error";
  const isLarge = size === "large";
  const isFilled = variant === "filled";

  const wrapperBg = isFilled ? "bg-[var(--color-primary-lighter)]" : "bg-[var(--color-surface)]";
  const borderByStatus =
    resolvedStatus === "error"
      ? "border-[var(--color-error)]"
      : resolvedStatus === "warning"
        ? "border-[var(--color-warning)]"
        : resolvedStatus === "success"
          ? "border-[var(--color-success)]"
          : "border-[var(--color-border)]";
  const focusBorder = hasError ? "" : "focus-within:border-[var(--color-primary)]";
  const hoverBorder = disabled ? "" : "hover:border-[var(--color-text-muted)]";
  /* Height from line-height + vertical padding (no fixed min-height). Default = body-md, Large = body-lg. */
  const inputHeightStyles = isLarge
    ? "py-[var(--spacing-2)] leading-[var(--text-body-lg-line)] text-[length:var(--text-body-lg-size)]"
    : "py-[var(--spacing-2)] leading-[var(--text-body-md-line)] text-[length:var(--text-body-md-size)]";

  return (
    <div className={`flex flex-col gap-[var(--spacing-1)] ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className="font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)]"
        >
          {label}
        </label>
      ) : null}
      <div
        className={`flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-sm)] border ${wrapperBg} font-[family-name:var(--font-body)] transition-colors ${borderByStatus} ${hoverBorder} ${focusBorder} ${disabled ? "opacity-70" : ""}`}
      >
        {leading ? <span className="pl-[var(--spacing-3)] text-[var(--color-text-muted)]">{leading}</span> : null}
        <input
          id={id}
          disabled={disabled}
          className={`flex-1 bg-transparent px-[var(--spacing-3)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none ${inputHeightStyles} ${leading ? "pl-0" : ""} ${trailing ? "pr-0" : ""} ${inputClassName}`}
          aria-invalid={hasError}
          aria-describedby={hint ? `${id}-hint` : error ? `${id}-error` : undefined}
          {...inputProps}
        />
        {trailing ? <span className="pr-[var(--spacing-3)] text-[var(--color-text-muted)]">{trailing}</span> : null}
      </div>
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-[length:var(--text-body-sm-size)] text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
