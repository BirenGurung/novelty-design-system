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

/** Token-based typography: font, size, line from theme; no inline styles. */
const variantClasses: Record<TextVariant, string> = {
  hero: "font-[family-name:var(--font-heading)] text-[length:var(--text-hero-size)] leading-[var(--text-hero-line)]",
  h1: "font-[family-name:var(--font-heading)] text-[length:var(--text-h1-size)] leading-[var(--text-h1-line)]",
  h2: "font-[family-name:var(--font-heading)] text-[length:var(--text-h2-size)] leading-[var(--text-h2-line)]",
  h3: "font-[family-name:var(--font-heading)] text-[length:var(--text-h3-size)] leading-[var(--text-h3-line)]",
  h4: "font-[family-name:var(--font-heading)] text-[length:var(--text-h4-size)] leading-[var(--text-h4-line)]",
  h5: "font-[family-name:var(--font-heading)] text-[length:var(--text-h5-size)] leading-[var(--text-h5-line)]",
  h6: "font-[family-name:var(--font-heading)] text-[length:var(--text-h6-size)] leading-[var(--text-h6-line)]",
  "body-lg":
    "font-[family-name:var(--font-body)] text-[length:var(--text-body-lg-size)] leading-[var(--text-body-lg-line)]",
  "body-md":
    "font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)]",
  "body-sm":
    "font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)]",
};

const weightClasses: Record<TextWeight, string> = {
  regular: "font-[weight:var(--font-weight-regular)]",
  medium: "font-[weight:var(--font-weight-medium)]",
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
  const Tag = as ?? defaultTag(variant);
  const typographyClass = `${variantClasses[variant]} ${weightClasses[weight]}`.trim();

  return (
    <Tag id={id} className={typographyClass ? `${typographyClass} ${className}`.trim() : className}>
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
