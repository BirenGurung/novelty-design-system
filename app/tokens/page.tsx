import { Text } from "@/components";
import { RadiusValue } from "./radius-value";

export const metadata = {
  title: "Tokens — Novelty Design System",
  description: "Design tokens for spacing, radius, and shadow",
};

export default function TokensPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header className="space-y-2">
        <Text variant="h1" as="h1">Tokens</Text>
        <Text variant="body-lg" className="text-[var(--color-text-muted)]">
          Design tokens are named design decisions: spacing, border radius, and shadow. They keep the system consistent and make it easy to theme or scale.
        </Text>
      </header>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Spacing</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          We use a 4px base unit. Components and layouts use these tokens instead of arbitrary values so spacing stays predictable and themable.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary-lighter)]/30">
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Token</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Value</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ["--spacing-1", "4px", "Tight gaps, icon padding"],
                ["--spacing-2", "8px", "Inline spacing, small padding"],
                ["--spacing-3", "12px", "Compact gaps"],
                ["--spacing-4", "16px", "Default padding, gaps"],
                ["--spacing-5", "20px", "Medium padding"],
                ["--spacing-6", "24px", "Section spacing"],
                ["--spacing-8", "32px", "Large gaps"],
                ["--spacing-10", "40px", "Section padding"],
                ["--spacing-12", "48px", "Large section spacing"],
                ["--spacing-16", "64px", "Hero / large blocks"],
              ].map(([token, value, use]) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono text-[var(--color-primary)]">{token}</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">{value}</td>
                  <td className="px-4 py-3 text-[var(--color-text)]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Border radius</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Radius tokens define roundness for buttons, inputs, cards, and overlays. Figma uses <span className="font-mono text-[var(--color-primary)]">--border-radius-1</span> (4px) and <span className="font-mono text-[var(--color-primary)]">--border-radius-2</span> (8px); the theme aliases these to <span className="font-mono text-[var(--color-primary)]">--radius-sm</span> and <span className="font-mono text-[var(--color-primary)]">--radius-md</span>.
        </p>
        <div className="flex flex-wrap gap-8 items-end">
          {[
            { token: "--radius-sm", use: "Badges, small chips" },
            { token: "--radius-md", use: "Buttons, inputs, cards" },
            { token: "--radius-lg", use: "Modals, large panels" },
            { token: "--radius-xl", use: "Large overlays, hero cards" },
            { token: "--radius-full", use: "Pills, avatars" },
          ].map(({ token, use }) => (
            <div key={token} className="flex flex-col gap-2 items-center">
              <div
                className="h-16 w-16 bg-[var(--color-primary-lighter)] border border-[var(--color-border)]"
                style={{ borderRadius: `var(${token})` }}
              />
              <span className="font-mono text-sm text-[var(--color-primary)]">{token}</span>
              <span className="text-xs text-[var(--color-text-muted)]">
                <RadiusValue token={token} />
              </span>
              <span className="text-xs text-[var(--color-text)] text-center max-w-[100px]">{use}</span>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary-lighter)]/30">
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Token</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Value</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ["--radius-sm", "Badges, small chips"],
                ["--radius-md", "Buttons, inputs, cards"],
                ["--radius-lg", "Modals, large panels"],
                ["--radius-xl", "Large overlays, hero cards"],
                ["--radius-full", "Pills, avatars"],
              ].map(([token, use]) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono text-[var(--color-primary)]">{token}</td>
                  <td className="px-4 py-3">
                    <RadiusValue token={token} />
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text)]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Shadow</Text>
        <p className="text-[var(--color-text)] font-[var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Elevation is expressed through shadow tokens. Use them to show hierarchy (e.g. cards, dropdowns, modals) without hard-coding values.
        </p>
        <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-primary-lighter)]/30">
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Token</th>
                <th className="px-4 py-3 font-medium text-[var(--color-text)]">Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {[
                ["--shadow-sm", "Subtle elevation (inputs, badges)"],
                ["--shadow-md", "Cards, dropdowns"],
                ["--shadow-lg", "Modals, overlays"],
              ].map(([token, use]) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono text-[var(--color-primary)]">{token}</td>
                  <td className="px-4 py-3 text-[var(--color-text)]">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
