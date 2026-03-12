import { Text } from "@/components";

export const metadata = {
  title: "Animations & Transitions — Novelty Design System",
  description: "Motion and interaction system: easing, duration tokens, and patterns for a tactile, elegant UI",
};

export default function AnimationsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <header className="space-y-2">
        <Text variant="h1" as="h1">Animations & Transitions</Text>
        <Text variant="body-lg" className="text-[var(--color-text-muted)]">
          A modern SaaS motion system that feels elegant, tactile, and lively. Motion makes the interface responsive and polished while keeping a professional tone.
        </Text>
      </header>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Motion principles</Text>
        <ul className="list-disc pl-6 space-y-2 text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          <li><strong>Tactile</strong> — Elements react to input like physical objects (subtle scale, elevation).</li>
          <li><strong>Elegant</strong> — Smooth motion with natural acceleration and deceleration.</li>
          <li><strong>Lively</strong> — Micro-interactions give feedback and a responsive experience.</li>
          <li><strong>Intentional</strong> — Motion communicates hierarchy, focus, and spatial relationships. Avoid long or distracting animations.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Easing</Text>
        <p className="text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Avoid linear easing. Use these curves for smooth, slightly spring-like motion without excessive bounce.
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
              <tr>
                <td className="px-4 py-3 font-mono text-[var(--color-primary)]">--ease-out-expo</td>
                <td className="px-4 py-3 font-mono text-[var(--color-text-muted)] text-xs">cubic-bezier(0.22, 1, 0.36, 1)</td>
                <td className="px-4 py-3 text-[var(--color-text)]">Primary easing for entrances and emphasis</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-[var(--color-primary)]">--ease-standard</td>
                <td className="px-4 py-3 font-mono text-[var(--color-text-muted)] text-xs">cubic-bezier(0.25, 0.1, 0.25, 1)</td>
                <td className="px-4 py-3 text-[var(--color-text)]">General transitions and hover states</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Duration tokens</Text>
        <p className="text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Reusable motion durations. Use the token name in <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">transition-duration</code> or animation keyframes.
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
                ["--duration-fast", "120ms", "Button hover/press, micro-interactions"],
                ["--duration-standard", "200ms", "Cards, dropdowns, comment entrance"],
                ["--duration-panel", "260ms", "Modals, panels, drawers"],
                ["--duration-page", "320ms", "Page and content transitions"],
                ["--duration-large", "420ms", "Large layout transitions"],
                ["--duration-toast", "220ms", "Toast notification in/out"],
                ["--duration-skeleton", "1400ms", "Skeleton shimmer cycle"],
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
        <Text variant="h2" as="h2">Live demo</Text>
        <p className="text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Buttons and cards using motion tokens. Hover and press to feel the tactile response.
        </p>
        <div className="flex flex-wrap gap-8 items-start">
          <div
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 shadow-[var(--shadow-sm)] w-48 cursor-default select-none text-center font-[family-name:var(--font-body)] font-medium text-[var(--color-text)] text-[length:var(--text-body-md-size)] [transition:transform_var(--duration-fast)_var(--ease-out-expo),box-shadow_var(--duration-fast)_var(--ease-standard)] hover:scale-[1.02] hover:shadow-[var(--shadow-md)] active:scale-[0.97] active:shadow-[var(--shadow-button-pressed)]"
          >
            Button (tactile)
          </div>
          <div
            className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-8 shadow-[var(--shadow-sm)] w-48 cursor-default select-none text-center font-[family-name:var(--font-body)] text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)] [transition:transform_160ms_var(--ease-out-expo),box-shadow_160ms_var(--ease-standard)] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[var(--shadow-lg)]"
          >
            Card (elevate)
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Motion hierarchy</Text>
        <p className="text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Intensity follows UI hierarchy: micro first, then components, layout, and navigation.
        </p>
        <ol className="list-decimal pl-6 space-y-1 text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          <li><strong>Micro interactions</strong> — Buttons, icons (~120ms)</li>
          <li><strong>Component motion</strong> — Cards, dropdowns (~160–200ms)</li>
          <li><strong>Layout motion</strong> — Panels, drawers (~240–260ms)</li>
          <li><strong>Navigation motion</strong> — Page transitions (~320ms)</li>
        </ol>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Patterns</Text>
        <p className="text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Apply these patterns with the motion tokens. Prefer <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">transform</code> and <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">opacity</code>; avoid animating width, height, top, or left when possible.
        </p>

        <div className="space-y-8">
          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Button</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Tactile: hover scale 1 → 1.02, shadow up; pressed 1.02 → 0.97, shadow compress. ~120ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`transition: transform var(--duration-fast) var(--ease-out-expo),
            box-shadow var(--duration-fast) var(--ease-standard);
hover: { transform: scale(1.02); box-shadow: var(--shadow-md); }
active: { transform: scale(0.97); box-shadow: var(--shadow-button-pressed); }`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Card</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Hover: translateY(-4px), scale(1.01), shadow deepens. ~160ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`transition: transform 160ms var(--ease-out-expo), box-shadow 160ms var(--ease-standard);
hover: { transform: translateY(-4px) scale(1.01); box-shadow: var(--shadow-lg); }`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Page transition</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Out: opacity 1→0, translateY(0→-8px). In: opacity 0→1, translateY(12px→0). ~320ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`/* Outgoing */ opacity: 0; transform: translateY(-8px);
/* Incoming */ opacity: 1; transform: translateY(0);
transition: opacity var(--duration-page) var(--ease-out-expo),
            transform var(--duration-page) var(--ease-out-expo);`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Panel / drawer</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Slide in: opacity 0→1, translateX(16px→0). ~240ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`transition: opacity 240ms var(--ease-out-expo), transform 240ms var(--ease-out-expo);
/* Enter */ opacity: 1; transform: translateX(0);`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Modal</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Open: scale(0.95→1), opacity 0→1, translateY(12px→0). Overlay fades. ~260ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`transition: opacity var(--duration-panel) var(--ease-out-expo),
            transform var(--duration-panel) var(--ease-out-expo);
/* Open */ opacity: 1; transform: scale(1) translateY(0);`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Comment / new item</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Entrance: scale(0.96→1), opacity 0→1, translateY(6px→0). ~200ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`animation or transition: ~200ms;
transform: scale(1) translateY(0); opacity: 1;`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Toast notification</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">In: translateX(24px→0), opacity 0→1. Out: translateX(0→24px), opacity 1→0. ~220ms.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`/* Enter */ transform: translateX(0); opacity: 1;
/* Exit */ transform: translateX(24px); opacity: 0;
transition: var(--duration-toast) var(--ease-out-expo);`}
            </pre>
          </div>

          <div>
            <Text variant="h3" as="h3" className="text-[var(--color-primary)]">Skeleton loader</Text>
            <p className="mt-1 text-[var(--color-text-muted)] text-[length:var(--text-body-sm-size)]">Shimmer: gradient sweep. Cycle ~1.4s.</p>
            <pre className="mt-2 p-4 rounded-[var(--radius-md)] bg-[var(--color-table-header-fill)] border border-[var(--color-border)] font-mono text-[length:var(--text-body-sm-size)] text-[var(--color-text)] overflow-x-auto">
{`animation: shimmer var(--duration-skeleton) ease-in-out infinite;
@keyframes shimmer { 0% → 100% gradient position sweep }`}
            </pre>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Performance</Text>
        <ul className="list-disc pl-6 space-y-2 text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          <li>Prefer GPU-friendly properties: <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">transform</code>, <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">opacity</code>.</li>
          <li>Avoid animating <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">width</code>, <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">height</code>, <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">top</code>, <code className="rounded bg-[var(--color-primary-lighter)] px-1 font-mono text-sm">left</code> when possible.</li>
          <li>Keep animations fast and responsive so the product feels refined, calm, modern, and premium.</li>
        </ul>
      </section>

      <section className="space-y-6">
        <Text variant="h2" as="h2">Overall style</Text>
        <p className="text-[var(--color-text)] font-[family-name:var(--font-body)] text-[length:var(--text-body-md-size)] leading-[length:var(--text-body-md-line)]">
          Motion should enhance clarity and interaction feedback rather than decorate. The product should feel <strong>refined</strong>, <strong>calm</strong>, <strong>modern</strong>, <strong>responsive</strong>, and <strong>premium</strong> — inspired by the interaction quality of products like Linear, Notion, and Stripe.
        </p>
      </section>
    </div>
  );
}
