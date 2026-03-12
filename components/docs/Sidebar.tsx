"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "@/components";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/tokens", label: "Tokens" },
  { href: "/colors", label: "Colors" },
  { href: "/typography", label: "Typography" },
  { href: "/animations", label: "Animations & Transitions" },
  {
    href: "/components",
    label: "Components",
    children: [
      { href: "/components#buttons", label: "Button" },
      { href: "/components#buttons", label: "Icon button" },
      { href: "/components#tabs", label: "Tabs" },
      { href: "/components#inputs", label: "Input" },
      { href: "/components#inputs", label: "Text area" },
      { href: "/components#inputs", label: "Checkbox & Radio" },
      { href: "/components#inputs", label: "Select" },
      { href: "/components#inputs", label: "Search input" },
      { href: "/components#feedback", label: "Alert" },
      { href: "/components#feedback", label: "Toast" },
      { href: "/components#feedback", label: "Badge & Chip" },
      { href: "/components#data-display", label: "Table" },
      { href: "/components#data-display", label: "Card" },
      { href: "/components#data-display", label: "Avatar" },
      { href: "/components#data-display", label: "Accordion" },
      { href: "/components#overlays", label: "Tooltip" },
      { href: "/components#overlays", label: "Drawer" },
      { href: "/components#overlays", label: "Popover" },
      { href: "/components#overlays", label: "Modal & Dialog" },
    ],
  },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const isComponents = pathname === "/components" || pathname.startsWith("/components");

  return (
    <aside
      className="w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-label="Documentation navigation"
    >
      <nav className="sticky top-0 p-[var(--spacing-4)] space-y-1 overflow-y-auto max-h-screen">
        <Link
          href="/"
          className="block py-1"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <Text
            variant="h6"
            as="span"
            className={
              pathname === "/"
                ? "text-[var(--color-primary)] font-medium"
                : "text-[var(--color-text)]"
            }
          >
            Novelty
          </Text>
        </Link>
        <ul className="mt-6 space-y-1">
          {nav.map((item) => {
            if ("children" in item && item.children) {
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-[var(--radius-md)] px-[var(--spacing-3)] py-[var(--spacing-2)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] transition-colors ${
                      isActive
                        ? "bg-[var(--color-primary-lighter)] text-[var(--color-primary)] font-medium"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary-lighter)] hover:text-[var(--color-text)]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    aria-expanded={isComponents}
                  >
                    {item.label}
                  </Link>
                  <ul className="ml-[var(--spacing-3)] mt-[var(--spacing-1)] space-y-0.5 border-l border-[var(--color-border)] pl-[var(--spacing-2)]">
                    {item.children.map((child) => (
                      <li key={child.href + child.label}>
                        <Link
                          href={child.href}
                          className="block rounded-[var(--radius-sm)] py-[var(--spacing-2)] px-[var(--spacing-2)] font-[family-name:var(--font-body)] text-[length:var(--text-body-sm-size)] leading-[var(--text-body-sm-line)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-lighter)]/50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-[var(--radius-md)] px-[var(--spacing-3)] py-[var(--spacing-2)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[var(--text-body-md-line)] transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary-lighter)] text-[var(--color-primary)] font-medium"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary-lighter)] hover:text-[var(--color-text)]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
