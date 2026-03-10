"use client";

import type { ReactNode } from "react";

type TextVariant =
  | "hero"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-lg"
  | "body-md"
  | "body-sm";
type TextWeight = "regular" | "medium";

const variantStyles: Record<
  TextVariant,
  { size: string; line: string; font: string }
> = {
  hero: {
    size: "var(--text-hero-size)",
    line: "var(--text-hero-line)",
    font: "var(--font-heading)",
  },
  h1: {
    size: "var(--text-h1-size)",
    line: "var(--text-h1-line)",
    font: "var(--font-heading)",
  },
  h2: {
    size: "var(--text-h2-size)",
    line: "var(--text-h2-line)",
    font: "var(--font-heading)",
  },
  h3: {
    size: "var(--text-h3-size)",
    line: "var(--text-h3-line)",
    font: "var(--font-heading)",
  },
  h4: {
    size: "var(--text-h4-size)",
    line: "var(--text-h4-line)",
    font: "var(--font-heading)",
  },
  h5: {
    size: "var(--text-h5-size)",
    line: "var(--text-h5-line)",
    font: "var(--font-heading)",
  },
  h6: {
    size: "var(--text-h6-size)",
    line: "var(--text-h6-line)",
    font: "var(--font-heading)",
  },
  "body-lg": {
    size: "var(--text-body-lg-size)",
    line: "var(--text-body-lg-line)",
    font: "var(--font-body)",
  },
  "body-md": {
    size: "var(--text-body-md-size)",
    line: "var(--text-body-md-line)",
    font: "var(--font-body)",
  },
  "body-sm": {
    size: "var(--text-body-sm-size)",
    line: "var(--text-body-sm-line)",
    font: "var(--font-body)",
  },
};

export interface TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  children: ReactNode;
  as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
  className?: string;
  id?: string;
}

export function Text({
  variant = "body-md",
  weight = "regular",
  children,
  as,
  className = "",
  id,
}: TextProps) {
  const style = variantStyles[variant];
  const fontWeight =
    weight === "medium" ? "var(--font-weight-medium)" : "var(--font-weight-regular)";
  const Tag = as ?? defaultTag(variant);

  return (
    <Tag
      id={id}
      className={className}
      style={{
        fontFamily: style.font,
        fontSize: style.size,
        lineHeight: style.line,
        fontWeight,
      }}
    >
      {children}
    </Tag>
  );
}

type TextTag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";

function defaultTag(v: TextVariant): TextTag {
  if (v === "hero" || v === "h1") return "h1";
  if (v === "h2") return "h2";
  if (v === "h3") return "h3";
  if (v === "h4") return "h4";
  if (v === "h5") return "h5";
  if (v === "h6") return "h6";
  return "p";
}
