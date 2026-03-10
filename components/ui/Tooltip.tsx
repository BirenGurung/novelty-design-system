"use client";

import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ content, position = "top", children, className = "" }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const positionClasses: Record<TooltipPosition, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses: Record<TooltipPosition, string> = {
    top: "left-1/2 -translate-x-1/2 top-full border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[var(--color-text-darker)]",
    bottom: "left-1/2 -translate-x-1/2 bottom-full border-l-[6px] border-r-[6px] border-b-[6px] border-transparent border-b-[var(--color-text-darker)]",
    left: "left-full top-1/2 h-3 w-0 -translate-y-1/2 border-t-[6px] border-b-[6px] border-l-[6px] border-transparent border-l-[var(--color-text-darker)]",
    right: "right-full top-1/2 h-3 w-0 -translate-y-1/2 border-t-[6px] border-b-[6px] border-r-[6px] border-transparent border-r-[var(--color-text-darker)]",
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible ? (
        <div
          role="tooltip"
          className={`absolute z-50 flex px-4 py-2 rounded-[var(--radius-sm)] bg-[var(--color-text-darker)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)] text-[var(--color-white)] whitespace-nowrap ${positionClasses[position]}`}
        >
          {content}
          <span className={`absolute h-0 w-0 ${arrowClasses[position]}`} />
        </div>
      ) : null}
    </div>
  );
}
