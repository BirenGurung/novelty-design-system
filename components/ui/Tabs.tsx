"use client";

import { useCallback, useContext, useLayoutEffect, useId, useRef, useState, type ReactNode } from "react";
import { TabsContext } from "./tabs-context";
import { Tab, type TabStyle, type TabSize } from "./Tab";

export interface TabsProps {
  /** Controlled selected value. */
  value?: string | null;
  /** Uncontrolled default value. */
  defaultValue?: string | null;
  /** Called when selection changes. */
  onChange?: (value: string) => void;
  /** Visual style for tab triggers (border | filled | clear | outline). */
  style?: TabStyle;
  size?: TabSize;
  children: ReactNode;
  className?: string;
}

export function Tabs({
  value: controlledValue,
  defaultValue = null,
  onChange,
  style = "border",
  size = "large",
  children,
  className = "",
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue ?? null : uncontrolledValue;

  const tabListId = useId();
  const tabIdPrefix = useId();

  const onSelect = useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolledValue(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );

  const ctx = {
    value,
    onSelect,
    style,
    size,
    tabListId,
    tabIdPrefix,
  } as const;

  return (
    <TabsContext.Provider value={ctx}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

/** Flex row of tab triggers. Use inside Tabs. For style="border", renders a sliding underline indicator. */
export function TabList({ children, className = "" }: TabListProps) {
  const ctx = useContext(TabsContext);
  const id = ctx?.tabListId;
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useLayoutEffect(() => {
    if (!ctx || ctx.style !== "border" || ctx.value == null) {
      setIndicator(null);
      return;
    }
    const container = containerRef.current;
    if (!container) return;
    const selected = container.querySelector<HTMLButtonElement>(
      `[role="tab"][aria-selected="true"]`
    );
    if (!selected) {
      setIndicator(null);
      return;
    }
    setIndicator({
      left: selected.offsetLeft,
      width: selected.offsetWidth,
    });
  }, [ctx?.style, ctx?.value, children]);

  const showSlider = ctx?.style === "border" && indicator != null;

  return (
    <div
      ref={containerRef}
      id={id}
      role="tablist"
      className={`relative flex flex-wrap items-center gap-x-[var(--spacing-2)] gap-y-1 ${className}`}
    >
      {children}
      {showSlider && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 rounded-t-[var(--radius-sm)] bg-[var(--color-primary)] transition-[left_var(--duration-standard)_var(--ease-out-expo),width_var(--duration-standard)_var(--ease-out-expo)] [height:var(--size-tab-indicator-height)]"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}
    </div>
  );
}

export interface TabPanelProps {
  /** Value that matches the Tab which shows this panel. */
  value: string;
  children: ReactNode;
  className?: string;
}

/** Panel content shown when the tab with the same value is selected. */
export function TabPanel({ value, children, className = "" }: TabPanelProps) {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    return <div className={className}>{children}</div>;
  }
  const isSelected = ctx.value === value;
  if (!isSelected) return null;
  return (
    <div
      role="tabpanel"
      className={`pt-[var(--spacing-3)] ${className}`}
      aria-labelledby={value ? `${ctx.tabIdPrefix}-${value}` : undefined}
    >
      {children}
    </div>
  );
}

export { Tab };
export type { TabProps, TabStyle, TabSize };
