"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";

const DRAWER_DURATION_MS = 380;

/** Drawer slides in from an edge. Bottom placement acts as a bottom sheet. Uses --duration-drawer; open/close are kept consistent via forced reflow and transitionend. */
export type DrawerPlacement = "left" | "right" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Slide from left, right, or bottom (bottom sheet). */
  placement?: DrawerPlacement;
  /** Optional title; if provided, header with close button is rendered. */
  title?: string;
  children: ReactNode;
  className?: string;
}

const placementStyles: Record<
  DrawerPlacement,
  { panel: string; translateClosed: string; translateOpen: string; overlayFlex: string; rounded: string }
> = {
  left: {
    panel: "left-0 top-0 bottom-0 w-[var(--size-drawer-width)]",
    translateClosed: "-translate-x-full",
    translateOpen: "translate-x-0",
    overlayFlex: "justify-start",
    rounded: "rounded-[var(--radius-md)]",
  },
  right: {
    panel: "right-0 top-0 bottom-0 w-[var(--size-drawer-width)]",
    translateClosed: "translate-x-full",
    translateOpen: "translate-x-0",
    overlayFlex: "justify-end",
    rounded: "rounded-[var(--radius-md)]",
  },
  bottom: {
    panel: "left-0 right-0 bottom-0 h-[var(--size-bottom-sheet-height)] max-h-[90vh]",
    translateClosed: "translate-y-full",
    translateOpen: "translate-y-0",
    overlayFlex: "items-end justify-center",
    rounded: "rounded-t-[var(--radius-md)]",
  },
};

export function Drawer({
  open,
  onClose,
  placement = "right",
  title,
  children,
  className = "",
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(typeof document !== "undefined");
  }, []);

  // When open becomes true: mount content with visible=false, then after a painted frame set visible=true so the slide-in transition runs.
  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setVisible(false);
      document.body.style.overflow = "hidden";
    } else {
      setVisible(false);
      document.body.style.overflow = "";
    }
  }, [open]);

  // After we've painted with visible=false, force reflow then set visible=true so the open transition is always consistent.
  useEffect(() => {
    if (!open || !shouldRender || visible) return;
    const rafId = requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (panel) panel.offsetHeight; // force reflow so closed state is applied
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(rafId);
  }, [open, shouldRender, visible]);

  // When closing: unmount only after the panel's transform transition ends so the close animation always completes. Fallback timeout if transitionend doesn't fire.
  useEffect(() => {
    if (open || !shouldRender) return;
    const panel = panelRef.current;
    const onEnd = (e: TransitionEvent) => {
      if (e.target !== panel || e.propertyName !== "transform") return;
      setShouldRender(false);
    };
    const fallback = setTimeout(() => setShouldRender(false), DRAWER_DURATION_MS + 50);
    if (panel) {
      panel.addEventListener("transitionend", onEnd as EventListener, { once: true });
      return () => {
        clearTimeout(fallback);
        panel.removeEventListener("transitionend", onEnd as EventListener);
      };
    }
    return () => clearTimeout(fallback);
  }, [open, shouldRender]);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const { panel: panelPlacement, translateClosed, translateOpen, overlayFlex, rounded } = placementStyles[placement];

  if (!mounted || !shouldRender) return null;

  const overlay = (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Drawer"}
      className={`fixed inset-0 z-[100] flex ${overlayFlex} ${className}`}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-[var(--color-overlay)] flex-1 min-h-0 transition-opacity duration-[var(--duration-drawer)] [transition-timing-function:var(--ease-out-expo)] ${placement === "bottom" ? "absolute inset-0" : ""} ${visible ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      />
      <div
        ref={panelRef}
        className={`fixed ${panelPlacement} flex flex-col overflow-hidden ${rounded} border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-lg)] transition-transform duration-[var(--duration-drawer)] [transition-timing-function:var(--ease-out-expo)] ${visible ? translateOpen : translateClosed}`}
        onClick={(e) => e.stopPropagation()}
      >
        {title != null ? (
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-[var(--spacing-3)] py-[var(--spacing-2)]">
            <h2 className="m-0 font-[family-name:var(--font-body)] text-[length:var(--text-h6-size)] leading-[var(--text-h6-line)] font-medium text-[var(--color-text-darker)]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded p-[var(--spacing-2)] text-[var(--color-text-muted)] hover:bg-[var(--color-primary-lighter)] hover:text-[var(--color-primary)]"
            >
              <Icon name="x" size={20} />
            </button>
          </div>
        ) : null}
        <div className="flex-1 overflow-auto p-[var(--spacing-3)] font-[family-name:var(--font-body)] text-[var(--color-text)]">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
