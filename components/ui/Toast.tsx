"use client";

import type { ReactNode } from "react";
import { Icon } from "./Icon";

type ToastVariant = "success" | "warning" | "error" | "info" | "default";

const variantStyles: Record<ToastVariant, string> = {
  success: "bg-[var(--color-success)] text-[var(--color-white)]",
  warning: "bg-[var(--color-warning)] text-[var(--color-text-darker)]",
  error: "bg-[var(--color-error)] text-[var(--color-white)]",
  info: "bg-[var(--color-info)] text-[var(--color-white)]",
  default: "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] shadow-[var(--shadow-md)]",
};

export interface ToastProps {
  variant?: ToastVariant;
  message: ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export function Toast({ variant = "info", message, onDismiss, className = "" }: ToastProps) {
  return (
    <div
      role="status"
      className={`flex items-center justify-between gap-4 rounded-[var(--radius-sm)] px-4 py-3 shadow-[var(--shadow-md)] ${variantStyles[variant]} ${className}`}
    >
      <p className="min-w-0 flex-1 font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]">
        {message}
      </p>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded p-1 hover:opacity-80"
          aria-label="Dismiss"
        >
          <Icon name="x" size={16} />
        </button>
      ) : null}
    </div>
  );
}
