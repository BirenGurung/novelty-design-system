"use client";

import type { TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
}

export function TextArea({
  label,
  hint,
  error,
  className = "",
  id: idProp,
  ...textareaProps
}: TextAreaProps) {
  const id = idProp ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label ? (
        <label
          htmlFor={id}
          className="font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)]"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={id}
        className={`min-h-[calc(var(--text-body-md-line)*4)] rounded-[var(--radius-sm)] border bg-[var(--color-surface)] px-[var(--spacing-3)] py-[var(--spacing-2)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
          hasError ? "border-[var(--color-error)]" : "border-[var(--color-border)]"
        }`}
        aria-invalid={hasError}
        aria-describedby={hint ? `${id}-hint` : error ? `${id}-error` : undefined}
        {...textareaProps}
      />
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
