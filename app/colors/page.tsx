import { Text } from "@/components";

export const metadata = {
  title: "Colors — Novelty Design System",
  description: "Color palette and semantic roles",
};

/** 5 shades per color (1 = darkest, 5 = lightest). Figma-aligned palette. */
const colorGroups = [
  {
    title: "Primary",
    description: "Primary brand color. Use for main actions, links, and key UI elements. Five shades from darkest to lightest.",
    tokens: [
      { name: "primary-1", var: "--color-primary-1", desc: "Darkest" },
      { name: "primary-2", var: "--color-primary-2", desc: "Dark (hover/pressed)" },
      { name: "primary-3", var: "--color-primary-3", desc: "Main" },
      { name: "primary-4", var: "--color-primary-4", desc: "Light" },
      { name: "primary-5", var: "--color-primary-5", desc: "Lightest (backgrounds)" },
    ],
  },
  {
    title: "Secondary",
    description: "Secondary brand color. Use for secondary actions and accents.",
    tokens: [
      { name: "secondary-1", var: "--color-secondary-1", desc: "Darkest" },
      { name: "secondary-2", var: "--color-secondary-2", desc: "Dark" },
      { name: "secondary-3", var: "--color-secondary-3", desc: "Main" },
      { name: "secondary-4", var: "--color-secondary-4", desc: "Light" },
      { name: "secondary-5", var: "--color-secondary-5", desc: "Lightest" },
    ],
  },
  {
    title: "Neutrals",
    description: "Text, borders, and surfaces. Five shades for consistent gray scale.",
    tokens: [
      { name: "neutral-1", var: "--color-neutral-1", desc: "Darkest (text-darker)" },
      { name: "neutral-2", var: "--color-neutral-2", desc: "Text muted" },
      { name: "neutral-3", var: "--color-neutral-3", desc: "Mid gray" },
      { name: "neutral-4", var: "--color-neutral-4", desc: "Borders" },
      { name: "neutral-5", var: "--color-neutral-5", desc: "Lightest (surfaces)" },
    ],
  },
  {
    title: "Success",
    description: "Success states, confirmations, and positive feedback.",
    tokens: [
      { name: "success-1", var: "--color-success-1", desc: "Darkest" },
      { name: "success-2", var: "--color-success-2", desc: "Dark" },
      { name: "success-3", var: "--color-success-3", desc: "Main" },
      { name: "success-4", var: "--color-success-4", desc: "Light" },
      { name: "success-5", var: "--color-success-5", desc: "Lightest" },
    ],
  },
  {
    title: "Warning",
    description: "Warnings and caution states.",
    tokens: [
      { name: "warning-1", var: "--color-warning-1", desc: "Darkest" },
      { name: "warning-2", var: "--color-warning-2", desc: "Dark" },
      { name: "warning-3", var: "--color-warning-3", desc: "Main" },
      { name: "warning-4", var: "--color-warning-4", desc: "Light" },
      { name: "warning-5", var: "--color-warning-5", desc: "Lightest" },
    ],
  },
  {
    title: "Error",
    description: "Errors, destructive actions, and validation.",
    tokens: [
      { name: "error-1", var: "--color-error-1", desc: "Darkest" },
      { name: "error-2", var: "--color-error-2", desc: "Dark" },
      { name: "error-3", var: "--color-error-3", desc: "Main" },
      { name: "error-4", var: "--color-error-4", desc: "Light" },
      { name: "error-5", var: "--color-error-5", desc: "Lightest" },
    ],
  },
  {
    title: "Info",
    description: "Informational messages and neutral status.",
    tokens: [
      { name: "info-1", var: "--color-info-1", desc: "Darkest" },
      { name: "info-2", var: "--color-info-2", desc: "Dark" },
      { name: "info-3", var: "--color-info-3", desc: "Main" },
      { name: "info-4", var: "--color-info-4", desc: "Light" },
      { name: "info-5", var: "--color-info-5", desc: "Lightest" },
    ],
  },
] as const;

export default function ColorsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header className="space-y-2">
        <Text variant="h1" as="h1">Colors</Text>
        <Text variant="body-lg" className="text-[var(--color-text-muted)]">
          Colors are defined as semantic tokens so themes can change the palette without changing component code. Use tokens, not raw hex values.
        </Text>
      </header>

      {colorGroups.map((group) => (
        <section key={group.title} className="space-y-4">
          <Text variant="h2" as="h2">{group.title}</Text>
          <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
            {group.description}
          </p>
          <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {group.tokens.map(({ name, var: token, desc }) => (
              <li
                key={token}
                className="flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)]"
              >
                {/* Inline style only here: token name is dynamic; UI components use no inline styles. */}
                <div
                  className="h-20 w-full shrink-0"
                  style={{ backgroundColor: `var(${token})` }}
                />
                <div className="p-3 min-w-0">
                  <span className="font-mono text-sm text-[var(--color-primary)] break-all">{token}</span>
                  <p className="mt-1 text-sm text-[var(--color-text)]">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="space-y-4">
        <Text variant="h2" as="h2">Usage</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          In CSS or Tailwind, reference tokens with <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">var(--color-*)</code>. For a full list of theme tokens, see <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">docs/theme-contract.md</code>.
        </p>
      </section>
    </div>
  );
}
