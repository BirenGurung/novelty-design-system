import { Text } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <header className="space-y-4">
        <Text variant="hero" as="h1" className="text-[var(--color-primary)]">
          Novelty Design System
        </Text>
        <Text variant="body-lg" className="text-[var(--color-text-muted)]">
          A portable design system built on design tokens and semantic theming. Use it in any app or connect this repo to AI app builders for consistent UI.
        </Text>
      </header>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Foundations</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Foundations define the visual language: tokens, colors, and typography. They ensure consistency and make theming and white-labeling straightforward.
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--color-text-muted)] font-[var(--font-body)] text-[length:var(--text-body-md-size)]">
          <li><Link href="/tokens" className="text-[var(--color-primary)] hover:underline">Tokens</Link> — Spacing, radius, and shadow scales</li>
          <li><Link href="/colors" className="text-[var(--color-primary)] hover:underline">Colors</Link> — Palette and semantic roles</li>
          <li><Link href="/typography" className="text-[var(--color-primary)] hover:underline">Typography</Link> — Type scale and usage</li>
        </ul>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Components</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          UI components are built on these foundations. Each component follows the theme contract so you can swap themes without changing code.
        </p>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          <Link href="/components" className="text-[var(--color-primary)] font-medium hover:underline">Browse components</Link> — buttons, inputs, feedback, data display, and overlays — with usage guidelines and examples.
        </p>
      </section>

      <footer className="border-t border-[var(--color-border)] pt-8">
        <Text variant="body-sm" className="text-[var(--color-text-muted)]">
          Tokens: <code className="rounded bg-[var(--color-primary-lighter)] px-1">styles/tokens</code> and <code className="rounded bg-[var(--color-primary-lighter)] px-1">styles/themes</code>. Components: <code className="rounded bg-[var(--color-primary-lighter)] px-1">components/ui</code>.
        </Text>
      </footer>
    </div>
  );
}
