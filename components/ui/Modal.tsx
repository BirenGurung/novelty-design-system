"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { Text } from "./Text";

/** Figma: Small 400px, Default 600px, Large 800px, XL 1000px. */
export type ModalSize = "small" | "default" | "large" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Primary action label (e.g. "Save") */
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  /** Secondary/cancel label. Default "Cancel" */
  cancelLabel?: string;
  /** Figma: small 400px, default 600px, large 800px, xl 1000px. */
  size?: ModalSize;
  className?: string;
}

const sizeConfig: Record<ModalSize, { maxWidth: string; headerPadding: string; bodyPadding: string; titleVariant: "body-lg" | "h6" }> = {
  small: {
    maxWidth: "max-w-[var(--size-modal-sm)]",
    headerPadding: "px-2 py-2",
    bodyPadding: "p-2",
    titleVariant: "body-lg",
  },
  default: {
    maxWidth: "max-w-[var(--size-modal-md)]",
    headerPadding: "px-4 py-3",
    bodyPadding: "p-4",
    titleVariant: "h6",
  },
  large: {
    maxWidth: "max-w-[var(--size-modal-lg)]",
    headerPadding: "px-4 py-3",
    bodyPadding: "p-4",
    titleVariant: "h6",
  },
  xl: {
    maxWidth: "max-w-[var(--size-modal-xl)]",
    headerPadding: "px-4 py-3",
    bodyPadding: "p-4",
    titleVariant: "h6",
  },
};

export function Modal({
  open,
  onClose,
  title,
  children,
  primaryActionLabel,
  onPrimaryAction,
  cancelLabel = "Cancel",
  size = "default",
  className = "",
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const config = sizeConfig[size];

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

  const overlay = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 ${className}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`flex max-h-[90vh] w-full flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] ${config.maxWidth}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between border-b border-[var(--color-border)] ${config.headerPadding}`}>
          <Text
            id="modal-title"
            variant={config.titleVariant}
            as="h2"
            className="font-medium text-[var(--color-text-darker)]"
          >
            {title}
          </Text>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-primary-lighter)] hover:text-[var(--color-primary)]"
            aria-label="Close"
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className={`flex-1 overflow-auto font-[family-name:var(--font-body)] text-[var(--color-text)] ${config.bodyPadding}`}>
          {children}
        </div>
        {/* Figma Action Bar: Cancel left, primary right (justify-between); padding spacing-2 (8px). */}
        <div className="flex items-center justify-between gap-4 border-t border-[var(--color-border)] bg-[var(--color-table-header-fill)] px-[var(--spacing-2)] py-[var(--spacing-2)]">
          <Button variant="text" size={size === "small" ? "small" : "medium"} onClick={onClose}>
            {cancelLabel}
          </Button>
          {primaryActionLabel && onPrimaryAction ? (
            <Button variant="filled" size={size === "small" ? "small" : "medium"} onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") {
    return createPortal(overlay, document.body);
  }
  return overlay;
}
