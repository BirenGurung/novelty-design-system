"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useContext } from "react";
import { TabsContext } from "./tabs-context";
import { Icon } from "./Icon";
import type { IconName } from "./Icon";

/** Figma Tab: Style=Border (underline), Filled, Clear (text color active), Outline (border + fill). Size=Large (body-lg), Medium (body-md). Optional icon. */
export type TabStyle = "border" | "filled" | "clear" | "outline";
export type TabSize = "large" | "medium";

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Value when used inside Tabs (for selection state and onChange). */
  value?: string;
  /** Visual style: underline (border), solid (filled), text-only (clear), bordered (outline). */
  style?: TabStyle;
  size?: TabSize;
  /** Whether this tab is selected (when used standalone; when inside Tabs, derived from value). */
  selected?: boolean;
  /** Optional icon name (e.g. "house"). Rendered before label. */
  icon?: IconName;
  /** Tab label. */
  children: ReactNode;
  className?: string;
}

const sizeStyles: Record<TabSize, string> = {
  large:
    "gap-[var(--spacing-2)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]",
  medium:
    "gap-[var(--spacing-1)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]",
};

const iconSizeByTabSize: Record<TabSize, number> = {
  large: 20,
  medium: 16,
};

/** Base: font and transition. Variant styles add bg, border, text. */
function getStyleClasses(style: TabStyle, selected: boolean): string {
  switch (style) {
    case "border": {
      /* Underline is the sliding indicator in TabList; tab only has text/bg. */
      if (selected) {
        return "text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary-lighter)] rounded-tl-[var(--radius-sm)] rounded-tr-[var(--radius-sm)]";
      }
      return "bg-transparent text-[var(--color-text-muted)] rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-lighter)]";
    }
    case "filled": {
      if (selected) {
        return "bg-[var(--color-primary)] text-[var(--color-white)] border-none rounded-[var(--radius-sm)]";
      }
      return "bg-[var(--color-table-header-fill)] text-[var(--color-text-muted)] border-none rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-lighter)]";
    }
    case "clear": {
      if (selected) {
        return "bg-[var(--color-primary-lighter)] text-[var(--color-primary)] border-none rounded-[var(--radius-sm)]";
      }
      return "bg-transparent text-[var(--color-text-muted)] border-none rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-lighter)]";
    }
    case "outline": {
      if (selected) {
        return "bg-[var(--color-primary-lighter)] text-[var(--color-primary)] border border-[var(--color-primary)] rounded-[var(--radius-sm)]";
      }
      return "bg-[var(--color-table-header-fill)] text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-[var(--radius-sm)] hover:bg-[var(--color-primary-lighter)] hover:border-[var(--color-border)]";
    }
    default:
      return "";
  }
}

export function Tab({
  value: tabValue,
  style: styleProp,
  size: sizeProp,
  selected: selectedProp,
  icon,
  children,
  className = "",
  type = "button",
  onClick,
  ...rest
}: TabProps) {
  const ctx = useContext(TabsContext);
  const style = ctx ? ctx.style : (styleProp ?? "border");
  const size = ctx ? ctx.size : (sizeProp ?? "large");
  const selected = ctx && tabValue !== undefined ? ctx.value === tabValue : (selectedProp ?? false);
  const handleClick = ctx && tabValue !== undefined
    ? (e: React.MouseEvent<HTMLButtonElement>) => {
        ctx.onSelect(tabValue);
        onClick?.(e);
      }
    : onClick;

  const styleClasses = getStyleClasses(style, selected);
  const iconSize = iconSizeByTabSize[size];

  return (
    <button
      type={type}
      role="tab"
      aria-selected={selected}
      id={ctx && tabValue !== undefined ? `${ctx.tabIdPrefix}-${tabValue}` : undefined}
      className={`inline-flex items-center justify-center font-[family-name:var(--font-body)] font-[weight:var(--font-weight-medium)] transition-colors ${sizeStyles[size]} ${styleClasses} ${className}`}
      onClick={handleClick}
      {...rest}
    >
      {icon && (
        <span className="shrink-0 text-[length:inherit]" aria-hidden>
          <Icon name={icon} size={iconSize} />
        </span>
      )}
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}
