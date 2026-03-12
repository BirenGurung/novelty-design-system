"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useId } from "react";
import { Icon } from "./Icon";

/** Figma Novelty: State=Default/Expanded, Variant=Default (chevron end) / Alt (chevron start, header shadow when open). */
export type AccordionVariant = "default" | "alt";

export interface AccordionProps {
  /** Allow multiple items open at once. */
  allowMultiple?: boolean;
  /** Visual variant: default (chevron right) or alt (chevron left, shadow when expanded). */
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
        className={`flex flex-col gap-[var(--spacing-2)] ${className}`}
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
  /** Optional caption/subtitle below the title (small text). */
  caption?: string;
  /** Optional badge(s) inline with the title (e.g. "On Payment Plan"). */
  titleBadge?: ReactNode;
  /** Optional trailing badge(s) before the chevron (e.g. "Active" status). */
  badge?: ReactNode;
  /** Optional trailing actions (e.g. menu trigger icon) before the chevron. */
  actions?: ReactNode;
  /** Panel content. */
  children: ReactNode;
  className?: string;
}

export function AccordionItem({
  value,
  title,
  caption,
  titleBadge,
  badge,
  actions,
  children,
  className = "",
}: AccordionItemProps) {
  const ctx = useContext(AccordionContext);
  const headerId = useId();
  const panelId = useId();
  const isOpen = ctx?.openKeys.has(value) ?? false;
  const variant = ctx?.variant ?? "default";

  const chevronEnd = variant === "default";
  const headerBase =
    "flex w-full items-center gap-[var(--spacing-3)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-left font-[family-name:var(--font-body)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)] font-medium text-[var(--color-text-darker)] bg-[var(--color-table-header-fill)] transition-[box-shadow,color] duration-[var(--duration-standard)] [transition-timing-function:var(--ease-out-expo)] hover:bg-[var(--color-primary-lighter)]";
  const headerRounded = isOpen ? "rounded-t-[var(--radius-sm)]" : "rounded-[var(--radius-sm)]";
  const headerShadow = variant === "alt" && isOpen ? "shadow-[var(--shadow-sm)]" : "";

  const titleBlock = (
    <span className="flex min-w-0 flex-1 flex-col gap-[var(--spacing-1)]">
      <span className="flex flex-wrap items-center gap-[var(--spacing-1)]">
        <span>{title}</span>
        {titleBadge != null ? titleBadge : null}
      </span>
      {caption != null && caption !== "" ? (
        <span className="font-normal text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)] text-[var(--color-text-darker)]">
          {caption}
        </span>
      ) : null}
    </span>
  );

  return (
    <div
      className={`overflow-hidden rounded-[var(--radius-sm)] ${isOpen ? "border border-[var(--color-primary)]" : ""} ${className}`}
      data-state={isOpen ? "open" : "closed"}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => ctx?.toggle(value)}
          className={`${headerBase} ${headerRounded} ${headerShadow}`}
        >
          {!chevronEnd && (
            <span
              className="shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-standard)] [transition-timing-function:var(--ease-out-expo)]"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              aria-hidden
            >
              <Icon name="chevron-down" size={16} />
            </span>
          )}
          {titleBlock}
          {badge != null ? <span className="shrink-0">{badge}</span> : null}
          {actions != null ? <span className="shrink-0">{actions}</span> : null}
          {chevronEnd && (
            <span
              className="shrink-0 text-[var(--color-text-muted)] transition-transform duration-[var(--duration-standard)] [transition-timing-function:var(--ease-out-expo)]"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              aria-hidden
            >
              <Icon name="chevron-down" size={16} />
            </span>
          )}
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
          <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--spacing-3)]">
            <div className="border border-[var(--color-border)] px-[var(--spacing-3)] py-[var(--spacing-3)] font-[family-name:var(--font-body)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)] text-[var(--color-text)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
