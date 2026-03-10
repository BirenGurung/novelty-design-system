"use client";

import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function Select({
  label,
  hint,
  error,
  options,
  placeholder = "Select option",
  className = "",
  id: idProp,
  ...selectProps
}: SelectProps) {
  const id = idProp ?? `select-${Math.random().toString(36).slice(2, 9)}`;
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
      <select
        id={id}
        className={`rounded-[var(--radius-sm)] border bg-[var(--color-surface)] px-3 py-2 font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] ${
          hasError ? "border-[var(--color-error)]" : "border-[var(--color-border)]"
        }`}
        aria-invalid={hasError}
        {...selectProps}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error ? (
        <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-text-muted)]">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-[length:var(--text-body-sm-size)] text-[var(--color-error)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
