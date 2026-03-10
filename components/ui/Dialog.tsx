"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Button } from "./Button";
import { Text } from "./Text";

/** Figma: Basic Dialog (no icon, left-aligned) vs Dialog Icon (with icon, centered). */
export type DialogVariant = "basic" | "icon";
/** Figma: Default (h6 title, body-lg) vs Compact (body-lg title, body-md). */
export type DialogSize = "default" | "compact";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Optional icon above title (variant=icon). Figma: 48px default, 32px compact. */
  icon?: ReactNode;
  /** Primary action label (e.g. "Confirm") */
  actionLabel: string;
  onAction: () => void;
  cancelLabel?: string;
  /** basic = no icon, left-aligned; icon = with icon, centered (Figma Variant). */
  variant?: DialogVariant;
  /** default = larger typography; compact = tighter (Figma Type). */
  size?: DialogSize;
  className?: string;
}

const sizeConfig = {
  default: {
    contentPadding: "p-4",
    titleVariant: "h6" as const,
    bodySize: "text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]",
    iconWrapper: "size-12",
  },
  compact: {
    contentPadding: "p-4",
    titleVariant: "body-lg" as const,
    bodySize: "text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]",
    iconWrapper: "size-8",
  },
} as const;

export function Dialog({
  open,
  onClose,
  title,
  children,
  icon,
  actionLabel,
  onAction,
  cancelLabel = "Cancel",
  variant = "icon",
  size = "default",
  className = "",
}: DialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const config = sizeConfig[size];
  const isIconVariant = variant === "icon";

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 ${className}`}
      onClick={handleOverlayClick}
    >
      <div
        className="flex w-full max-w-[400px] flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex flex-col ${config.contentPadding} ${isIconVariant ? "items-center gap-4 text-center" : "items-start gap-2"}`}
        >
          {isIconVariant && icon ? (
            <div className={`flex shrink-0 items-center justify-center text-[var(--color-success)] ${config.iconWrapper}`}>
              {icon}
            </div>
          ) : null}
          <div className="w-full">
            <Text
              id="dialog-title"
              variant={config.titleVariant}
              as="h2"
              className={isIconVariant ? "text-center" : ""}
            >
              {title}
            </Text>
            <div
              className={`mt-2 font-[family-name:var(--font-body)] text-[var(--color-text)] ${config.bodySize} ${isIconVariant ? "text-center" : ""}`}
            >
              {children}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 border-t border-[var(--color-border)] bg-[var(--color-table-header-fill)] px-2 py-2">
          <Button variant="outline" size={size === "compact" ? "small" : "medium"} onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button variant="filled" size={size === "compact" ? "small" : "medium"} onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
