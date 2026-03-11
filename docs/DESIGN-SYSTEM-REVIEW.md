# Design system review — structure, tokens, and white-label

This document summarizes how the codebase aligns with design-system best practices: **atomic design**, **token-only styling** (fonts, sizes, spacing, colors), **no inline styles in UI components**, and **white-label readiness**.

---

## 1. Component structure

- **Pattern:** Flat **primitives** in `components/ui/` (Button, Input, Card, Badge, Chip, Text, etc.) plus `components/docs/` for doc-specific pieces (e.g. Sidebar). There are no formal **atoms / molecules / organisms** folders.
- **Rationale:** The system is **primitive-first**: each `ui/` component is a single-responsibility building block. Composed patterns (e.g. SearchBar = Input + Button) live in app or feature code. This keeps the design system layer small and themeable without forcing a strict atomic folder structure.
- **Recommendation:** For stricter atomic design, you could introduce `components/atoms/`, `components/molecules/`, `components/organisms/` and move or re-export from `ui/`. The current structure is already **scalable and white-label friendly** because:
  - All styling goes through theme tokens.
  - No business logic in primitives.
  - A new theme only replaces `styles/themes/*.css`.

---

## 2. Design tokens (base-level specs)

| Category   | Where defined              | Usage in components                                      |
|-----------|----------------------------|----------------------------------------------------------|
| **Colors** | `styles/themes/novelty.css` | `var(--color-primary)`, `var(--color-success-5)`, etc.  |
| **Typography** | Same theme + `app/layout.tsx` (fonts) | `Text` uses `--text-*-size`, `--text-*-line`, `--font-heading`, `--font-body`; `--font-weight-regular` / `--font-weight-medium` |
| **Spacing** | `styles/tokens/spacing.css` + theme overrides | `--spacing-1` … `--spacing-16`; components use `p-4`, `gap-2` (Tailwind maps to 4px grid where applicable) |
| **Radius** | Theme                      | `var(--radius-sm)`, `var(--radius-md)`, etc.            |
| **Shadow** | Theme                      | `var(--shadow-sm)`, `var(--shadow-md)`, `var(--shadow-button-pressed)` |
| **Component sizes** | Theme (white-label) | `--size-card-profile-width`, `--size-modal-sm`, `--size-tooltip-arrow`, etc. |

- **Fonts:** Set at app level (e.g. `layout.tsx` with next/font); theme only references `--font-heading` and `--font-body`.
- **Font sizes / line heights:** All from `--text-hero-size` through `--text-body-sm-*`; no hardcoded `px` for type in components.
- **Spacing:** Theme and `spacing.css` define the scale; components use Tailwind spacing classes or token-based values.
- **Colors:** All semantic and scale tokens (e.g. `--color-primary-5`, `--color-success`) come from the theme; no hex in `components/ui/`.

---

## 3. No inline styles in UI components

- **Text:** Typography is applied via **className** only (variant and weight map to Tailwind classes that use `var(--text-*)`, `var(--font-*)`, `var(--font-weight-*)`). No `style={{}}` in `components/ui/Text.tsx`.
- **Colors page (`app/colors/page.tsx`):** The only remaining `style={{}}` is for the **dynamic swatch background** (`style={{ backgroundColor: \`var(${token})\` }}`) because the token name is runtime-driven. This is confined to a **doc/showcase** page, not a reusable UI primitive. All other UI components are free of inline styles.

---

## 4. Hardcoded values removed (white-label)

The following have been moved to **theme tokens** so new themes can override without touching component code:

- **Button / IconButton:** Pressed state shadow uses `--shadow-button-pressed`; disabled state uses `--color-button-disabled` (no fallback hex).
- **Tooltip:** Arrow size uses `--size-tooltip-arrow`.
- **Card:** Profile width `--size-card-profile-width`, user card `--size-card-user-width`, content/media `--size-card-content-width`, media image height `--size-media-card-image-height`.
- **Modal:** Max widths use `--size-modal-sm`, `--size-modal-md`, `--size-modal-lg`, `--size-modal-xl`.
- **Dialog:** Max width uses `--size-modal-sm`.
- **Table:** Header background uses `--color-table-header-fill` without a fallback hex.

IconButton still uses fixed Tailwind size classes (e.g. `h-8`, `h-10`, `h-[60px]`) for dimensions; these could be tokenized later (e.g. `--size-icon-button-small`) if themes need to override them.

---

## 5. Theme contract and white-label

- **Single source of truth:** `docs/theme-contract.md` lists the semantic token names (colors, typography, spacing, radius, shadow). New themes (e.g. `styles/themes/brand-b.css`) must define the **same names** with different values.
- **No component changes:** Swapping the theme CSS file is enough to rebrand; no edits in `components/ui/`.
- **Optional tokens:** Component-size tokens (`--size-*`) and `--shadow-button-pressed` are optional in the contract; themes that don’t define them can rely on the default theme’s values if the default is loaded first.

---

## 6. Checklist for new components

When adding or changing UI components:

1. Use **only** design tokens for color, type, spacing, radius, shadow (e.g. `var(--color-*)`, `var(--text-*)`, `var(--spacing-*)`, `var(--radius-*)`, `var(--shadow-*)`).
2. Avoid **inline styles**; use className and Tailwind (or utility classes) that reference tokens.
3. Avoid **hardcoded px/hex** for layout or color; introduce a `--size-*` or `--color-*` token if a theme might need to override it.
4. Use the **Text** component for copy so typography stays token-driven.
5. Document any new token in `docs/theme-contract.md` if it’s part of the public theme API.

---

## 7. Summary

| Criterion              | Status |
|------------------------|--------|
| Atomic / primitive structure | ✅ Flat `ui/` primitives; composable in app/features |
| Fonts from base        | ✅ `--font-heading`, `--font-body` (set in app) |
| Font size/line from base | ✅ `--text-*` in theme; Text uses classes only |
| Spacing from base      | ✅ `--spacing-*`; components use token-aligned classes |
| Colors from base      | ✅ All `var(--color-*)`; 5-shade system per family |
| No inline styles (UI) | ✅ Removed from Text; only colors page swatch exception |
| No hardcoded px/hex in UI | ✅ Replaced with `--size-*`, `--shadow-*`, no fallback hex |
| White-label ready     | ✅ New theme = new CSS file; same token names |

The codebase is **optimized for a scalable, white-label design system** with token-only styling and no inline styles in UI components.
