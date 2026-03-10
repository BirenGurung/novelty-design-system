import { Text } from "@/components";

export const metadata = {
  title: "Typography — Novelty Design System",
  description: "Type scale, font families, and usage",
};

export default function TypographyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header className="space-y-2">
        <Text variant="h1" as="h1">Typography</Text>
        <Text variant="body-lg" className="text-[var(--color-text-muted)]">
          Typography creates hierarchy and readability. We use a limited set of styles driven by design tokens so type stays consistent across the product.
        </Text>
      </header>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Type scale</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Each style has a token for size and line-height. Use the <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">Text</code> component with the right variant instead of ad-hoc classes.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary-lighter)]/30">
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Variant</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Token (size / line)</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ["hero", "72px / 80px", "Marketing hero, one per page"],
                ["h1", "40px / 48px", "Page title"],
                ["h2", "36px / 44px", "Section title"],
                ["h3", "32px / 40px", "Subsection"],
                ["h4", "28px / 36px", "Card title, small section"],
                ["h5", "24px / 32px", "List heading"],
                ["h6", "20px / 28px", "Label, overline"],
                ["body-lg", "16px / 24px", "Lead paragraph, emphasis"],
                ["body-md", "14px / 20px", "Default body"],
                ["body-sm", "12px / 16px", "Captions, hints"],
              ].map(([variant, tokens, use]) => (
                <tr key={variant}>
                  <td className="px-4 py-3 font-mono text-[var(--color-primary)]">{variant}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{tokens}</td>
                  <td className="px-4 py-3 text-[var(--color-text)]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Live scale</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Preview of each variant. Prefer one main heading per section and consistent body size for readability.
        </p>
        <div className="space-y-4 rounded-lg border border-[var(--color-border)] p-6">
          <Text variant="hero" as="p">Hero title</Text>
          <Text variant="h1" as="p">Heading 1</Text>
          <Text variant="h2" as="p">Heading 2</Text>
          <Text variant="h3" as="p">Heading 3</Text>
          <Text variant="h4" as="p">Heading 4</Text>
          <Text variant="h5" as="p">Heading 5</Text>
          <Text variant="h6" as="p">Heading 6</Text>
          <Text variant="body-lg">Body large — for lead text or emphasis.</Text>
          <Text variant="body-md">Body medium — default for paragraphs and UI.</Text>
          <Text variant="body-sm">Body small — captions, hints, secondary info.</Text>
        </div>
      </section>

      <section className="space-y-4">
        <Text variant="h2" as="h2">Font families</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Headings use <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">--font-heading</code> (e.g. Montserrat); body uses <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">--font-body</code> (e.g. Raleway). Set these in your app (e.g. via next/font) when loading the theme.
        </p>
      </section>
    </div>
  );
}
