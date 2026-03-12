# Design system audit

This document summarizes alignment with the theme contract (`docs/theme-contract.md`) and Novelty design system. Use design tokens for all UI styling; avoid hardcoded colors, spacing, radii, or typography in components.

## Rules (from theme contract)

- **Colors:** Use `var(--color-*)` only. No hex/rgb in component UI; raw values belong in theme files.
- **Spacing:** 4px grid — use `var(--spacing-1)` … `var(--spacing-16)`.
- **Radius:** Use `var(--radius-sm|md|lg|xl|full)`.
- **Typography:** Use `--font-body`, `--text-*-size`, `--text-*-line`, `--color-text`, `--color-text-muted`, `--color-text-darker`.
- **Inline styles:** Only for dynamic values (e.g. measured position, open/close transforms). Everything else via tokens in class names.

---

## Fixes applied (this audit)

| Location | Issue | Fix |
|----------|--------|-----|
| `app/globals.css` | `--foreground` fallback `#171717` didn’t match theme `--color-text` (#2d2d2d) | Use `var(--color-text)` / `var(--color-surface)` only (no fallbacks) |
| `components/ui/Checkbox.tsx` | Checkmark SVG used `text-white` | `text-[var(--color-white)]` |
| `components/docs/Sidebar.tsx` | `rounded-md`, `px-3`, `py-2`, `text-sm`, `text-xs`, raw spacing | `rounded-[var(--radius-md)]`, `px-[var(--spacing-3)]`, `py-[var(--spacing-2)]`, typography tokens, `ml-[var(--spacing-3)]`, etc. |
| `components/ui/Select.tsx` | `px-3 py-2` | `px-[var(--spacing-3)] py-[var(--spacing-2)]` |
| `components/ui/SearchInput.tsx` | `gap-2`, `px-3 py-2` | `gap-[var(--spacing-2)]`, `px-[var(--spacing-3)] py-[var(--spacing-2)]` |
| `components/ui/TextArea.tsx` | `px-3 py-2` | `px-[var(--spacing-3)] py-[var(--spacing-2)]` |
| `components/ui/IconButton.tsx` | `rounded-full` | `rounded-[var(--radius-full)]` |

---

## Remaining / acceptable deviations

### Doc and app layout pages

Pages under `app/` (tokens, colors, typography, animations, components) use Tailwind utilities for **layout and tables** (e.g. `space-y-6`, `px-4 py-3`, `rounded-lg`, `text-sm`, `max-w-3xl`). These are documentation layout choices, not reusable UI components. Aligning every doc page to tokens is optional; prefer tokens for any shared layout component or when copying patterns into `components/ui`.

### Chip

`Chip` uses `px-2 py-1`, `px-3 py-1`, `px-4 py-2` for sizes. Design system uses a 4px grid; theme has `--spacing-1` (4px), `--spacing-2` (8px), `--spacing-3` (16px). For strict alignment, these could be mapped to `px-[var(--spacing-2)] py-[var(--spacing-1)]` etc.; current values are close (Tailwind 2=8px, 3=12px, 4=16px). Consider switching to spacing tokens in a future pass.

### Card / Alert / Toast

Some layout spacing uses Tailwind classes (`p-4`, `gap-2`, `gap-4`, `px-4 py-2`). Prefer `var(--spacing-*)` when touching these components.

### Drawer / Modal

`max-h-[90vh]` is hardcoded; acceptable as a viewport-relative cap. Optionally add `--size-bottom-sheet-max-height: 90vh` (and similar for modal) if you want it themeable.

### Tooltip

Uses `px-4 py-2`; could use `px-[var(--spacing-4)] py-[var(--spacing-2)]` for consistency.

---

## Checklist for new or updated components

- [ ] No hex/rgb/color names; use `var(--color-*)`.
- [ ] No raw `px` for spacing; use `var(--spacing-*)`.
- [ ] No raw radius; use `var(--radius-*)`.
- [ ] Typography via `--font-body`, `--text-*-size`, `--text-*-line`, `--color-text*`.
- [ ] Inline styles only for truly dynamic values (e.g. `transform`, `left`/`top` from measurement).
- [ ] Overlays (modal, drawer, popover) portal to `document.body` and use a consistent z-index.
