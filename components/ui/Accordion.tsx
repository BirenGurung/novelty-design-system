"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useId } from "react";
import { Icon } from "./Icon";

/** Figma: State=Default/Expanded, Variant=Default/Alt. Single or multiple sections open. */
export type AccordionVariant = "default" | "alt";

export interface AccordionProps {
  /** Allow multiple items open at once. */
  allowMultiple?: boolean;
  /** Visual variant: default (bordered) or alt (subtle). */
  variant?: AccordionVariant;
  children: ReactNode;
  className?: string;
}

type AccordionContextValue = {
  openKeys: Set<string>;
  toggle: (key: string) => void;
  variant: AccordionVariant;
  allowMultiple: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function Accordion({
  allowMultiple = false,
  variant = "default",
  children,
  className = "",
}: AccordionProps) {
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else {
        if (!allowMultiple) next.clear();
        next.add(key);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider
      value={{ openKeys, toggle, variant, allowMultiple }}
    >
      <div
        className={`flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] ${className}`}
        data-variant={variant}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  /** Unique key for this item (for open state). */
  value: string;
  /** Header label (trigger). */
  title: string;
  /** Panel content. */
  children: ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  title,
  children,
  className = "",
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  const headerId = useId();
  const panelId = useId();
  const isOpen = ctx?.openKeys.has(value) ?? false;
  const variant = ctx?.variant ?? "default";

  const borderBg =
    variant === "alt"
      ? "border-[var(--color-border)] bg-[var(--color-table-header-fill)]"
      : "border-[var(--color-border)] bg-[var(--color-surface)]";

  return (
    <div
      className={`border-b border-[var(--color-border)] last:border-b-0 ${className}`}
      data-state={isOpen ? "open" : "closed"}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => ctx?.toggle(value)}
          className={`flex w-full items-center justify-between gap-[var(--spacing-2)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-left font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-primary-lighter)] ${borderBg}`}
        >
          <span className="min-w-0 flex-1">{title}</span>
          <span
            className="shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-standard)] [transition-timing-function:var(--ease-out-expo)]"
            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            aria-hidden
          >
            <Icon name="chevron-down" size={20} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className="grid transition-[grid-template-rows_var(--duration-standard)_var(--ease-out-expo)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-[var(--color-border)] px-[var(--spacing-3)] py-[var(--spacing-2)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] text-[var(--color-text)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
