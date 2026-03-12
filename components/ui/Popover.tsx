"use client";

import type { ReactNode } from "react";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

export type PopoverPlacement = "top" | "bottom" | "left" | "right";

export interface PopoverProps {
  /** Trigger element (e.g. Button). Opens on click. */
  children: ReactNode;
  /** Popover content. */
  content: ReactNode;
  /** Preferred placement; may flip to fit viewport. */
  placement?: PopoverPlacement;
  /** Controlled open state. */
  open?: boolean;
  /** Called when open state changes (for controlled use). */
  onOpenChange?: (open: boolean) => void;
  /** Uncontrolled default open. */
  defaultOpen?: boolean;
  className?: string;
}

export function Popover({
  children,
  content,
  placement = "bottom",
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  className = "",
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setMounted(typeof document !== "undefined");
  }, []);

  const setOpen = (value: boolean) => {
    if (!isControlled) setUncontrolledOpen(value);
    onOpenChange?.(value);
  };

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return;
    const trigger = triggerRef.current.getBoundingClientRect();
    const panel = panelRef.current.getBoundingClientRect();
    const gap = 8;
    let top = 0;
    let left = 0;
    switch (placement) {
      case "bottom":
        top = trigger.bottom + gap;
        left = trigger.left + (trigger.width - panel.width) / 2;
        break;
      case "top":
        top = trigger.top - panel.height - gap;
        left = trigger.left + (trigger.width - panel.width) / 2;
        break;
      case "left":
        top = trigger.top + (trigger.height - panel.height) / 2;
        left = trigger.left - panel.width - gap;
        break;
      case "right":
        top = trigger.top + (trigger.height - panel.height) / 2;
        left = trigger.right + gap;
        break;
    }
    const padding = 8;
    const maxLeft = window.innerWidth - panel.width - padding;
    const maxTop = window.innerHeight - panel.height - padding;
    left = Math.max(padding, Math.min(left, maxLeft));
    top = Math.max(padding, Math.min(top, maxTop));
    setPosition({ top, left });
  }, [open, placement]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const el = e.target as Node;
      if (
        triggerRef.current?.contains(el) ||
        panelRef.current?.contains(el)
      )
        return;
      setOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!mounted) {
    return <div className={`inline-flex ${className}`}>{children}</div>;
  }

  const triggerEl = (
    <div
      ref={triggerRef}
      className="inline-flex cursor-pointer"
      onClick={() => setOpen(!open)}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-haspopup="dialog"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      }}
    >
      {children}
    </div>
  );

  const panelEl =
    open && mounted ? (
      createPortal(
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          className="fixed z-[100] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-[var(--spacing-3)] shadow-[var(--shadow-lg)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)] min-w-[160px] max-w-[min(360px,calc(100vw-var(--spacing-3)))]"
          style={{ top: position.top, left: position.left }}
        >
          {content}
        </div>,
        document.body
      )
    ) : null;

  return (
    <>
      <div className={`inline-flex ${className}`}>
        {triggerEl}
      </div>
      {panelEl}
    </>
  );
}
