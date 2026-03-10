import { Text } from "@/components";

export const metadata = {
  title: "Colors — Novelty Design System",
  description: "Color palette and semantic roles",
};

const colorGroups = [
  {
    title: "Primary",
    description: "Primary brand color. Use for main actions, links, and key UI elements.",
    tokens: [
      { name: "primary", var: "--color-primary", desc: "Default" },
      { name: "primary-hover", var: "--color-primary-hover", desc: "Hover state" },
      { name: "primary-pressed", var: "--color-primary-pressed", desc: "Pressed/active" },
      { name: "primary-lighter", var: "--color-primary-lighter", desc: "Light background" },
    ],
  },
  {
    title: "Secondary",
    description: "Secondary brand color. Use for secondary actions and accents.",
    tokens: [
      { name: "secondary", var: "--color-secondary", desc: "Default" },
      { name: "secondary-lighter", var: "--color-secondary-lighter", desc: "Light background" },
    ],
  },
  {
    title: "Neutrals",
    description: "Text, borders, and surfaces. Keep contrast accessible.",
    tokens: [
      { name: "text", var: "--color-text", desc: "Body text" },
      { name: "text-muted", var: "--color-text-muted", desc: "Secondary text" },
      { name: "border", var: "--color-border", desc: "Borders, dividers" },
      { name: "surface", var: "--color-surface", desc: "Page/card background" },
    ],
  },
  {
    title: "Semantic",
    description: "Success, warning, error, and info. Use for feedback and status.",
    tokens: [
      { name: "success", var: "--color-success", desc: "Success states" },
      { name: "warning", var: "--color-warning", desc: "Warnings" },
      { name: "error", var: "--color-error", desc: "Errors" },
      { name: "info", var: "--color-info", desc: "Informational" },
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
          <ul className="grid gap-4 sm:grid-cols-2">
            {group.tokens.map(({ name, var: token, desc }) => (
              <li
                key={token}
                className="flex flex-col overflow-hidden rounded-lg border border-[var(--color-border)]"
              >
                <div
                  className="h-20 w-full"
                  style={{ backgroundColor: `var(${token})` }}
                />
                <div className="p-3">
                  <span className="font-mono text-sm text-[var(--color-primary)]">{token}</span>
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
