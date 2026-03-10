"use client";

import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  className?: string;
}

export function SearchInput({
  label,
  className = "",
  id: idProp,
  placeholder = "Search",
  ...inputProps
}: SearchInputProps) {
  const id = idProp ?? `search-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className={className}>
      {label ? (
        <label
          htmlFor={id}
          className="mb-1 block font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] text-[var(--color-text)]"
        >
          {label}
        </label>
      ) : null}
      <div className="flex items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 focus-within:border-[var(--color-primary)] focus-within:ring-2 focus-within:ring-[var(--color-primary)]">
        <Icon name="search" className="size-4 shrink-0 text-[var(--color-text-muted)]" />
        <input
          type="search"
          id={id}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent py-0 font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
          {...inputProps}
        />
      </div>
    </div>
  );
}
