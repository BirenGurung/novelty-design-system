"use client";

import type { ReactNode } from "react";

/** Figma: Compact (24px row), Default (36px), Large (56px). */
export type TableSize = "compact" | "default" | "large";
/** Figma: Data Table (white header) vs Data Table Filled (gray header, row hover). */
export type TableStyle = "default" | "filled";

export interface TableProps {
  /** Header row cells */
  headers: ReactNode[];
  /** Data rows: each row is an array of cells */
  rows: ReactNode[][];
  /** Row density and typography: compact (body-sm), default (body-md), large (body-lg). */
  size?: TableSize;
  /** default = white header; filled = gray header + row hover highlight. */
  style?: TableStyle;
  className?: string;
}

/** Figma: Th padding spacing-2 (8px) default, spacing-1 (4px) compact; Td same. Large uses more padding. */
const sizeStyles = {
  compact: {
    cell: "px-2 py-1",
    th: "text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)]",
    td: "text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)]",
  },
  default: {
    cell: "px-2 py-2",
    th: "text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]",
    td: "text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]",
  },
  large: {
    cell: "px-3 py-3",
    th: "text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]",
    td: "text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]",
  },
} as const;

export function Table({
  headers,
  rows,
  size = "default",
  style = "default",
  className = "",
}: TableProps) {
  const sizes = sizeStyles[size];
  const isFilled = style === "filled";
  const headerBg = isFilled ? "bg-[var(--color-table-header-fill)]" : "bg-[var(--color-surface)]";
  const rowHover = isFilled ? "hover:bg-[var(--color-primary-lighter)]" : "";

  return (
    <div
      className={`overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--color-border)] ${className}`}
    >
      <table className="w-full border-collapse font-[family-name:var(--font-body)]">
        <thead>
          <tr className={`border-b border-[var(--color-border)] ${headerBg}`}>
            {headers.map((cell, i) => (
              <th
                key={i}
                className={`${sizes.cell} ${sizes.th} text-left font-medium text-[var(--color-text-darker)]`}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-[var(--color-border)] bg-[var(--color-surface)] last:border-b-0 transition-colors ${rowHover}`}
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className={`${sizes.cell} ${sizes.td} text-[var(--color-text)]`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
