# Figma vs implementation — missing variants and states

Review of the Novelty Design System Figma file (`6U5UUhDtzmcjmXVCzwX1Vi`) against the current codebase. This document lists **missing variants and states** so implementation can be brought in line with the design.

---

## 1. Button

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variants** | Default (filled), Outline, Text, **Danger** | filled, outline, text | **Missing: `danger`** (destructive/error primary action) |
| **States** | Default, Hover, Pressed, Disabled | ✅ (hover/active/disabled in CSS) | OK |
| **Sizes** | Small, Medium, Large | small, medium, large | OK |
| **Text** | Light, Dark, Primary (semantic) | N/A (theme-driven) | OK |

**Action:** Add `variant="danger"` using `--color-error` (and hover/pressed error tokens if needed).

---

## 2. Icon Button

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variants** | Filled, Outline, Clear | filled, outline, clear | OK |
| **States** | Default, Hover, Pressed, Disabled | ✅ | OK |
| **Sizes** | Small (32), Default (40), Large (60) | small (8), medium (10), large (60px) | Small/medium naming aligns; values OK |

**Action:** None required. Optional: ensure pressed state uses `active:` shadow per Figma (already present).

---

## 3. Input (Text field)

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variants** | Default (outline), **Filled**, **Floating Label** | Single outline style | **Missing: `filled`**, **`floatingLabel`** |
| **States** | Default, Hover, Active (focus), Filled (with value), **Warning**, Error, **Success**, **Disabled**, Password, Password hidden | Default, focus, error | **Missing: warning, success, disabled (visual)** |
| **Sizes** | Default, Large (Input-large) | Single size | **Missing: `size="large"`** |

**Action:** Add `variant`: `"default"` \| `"filled"` \| `"floatingLabel"`. Add `status` or use `error`/`warning`/success hint. Add `size="large"`. Add disabled styling. Floating label is a larger UX change (label animates inside border).

---

## 4. Text area

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variants** | Default, **Filled**, **Floating Label** | Single style | **Missing: filled, floatingLabel** |
| **States** | Default, Hover, Active, With value, Warning, Success, Error, **Disabled** | Label, hint, error | **Missing: warning, success, disabled styling** |

**Action:** Mirror Input: add `variant`, status (warning/success), `size` if needed, disabled styling.

---

## 5. Select

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variants** | Default, **Filled**, **Floating Label** | Single | **Missing: filled, floatingLabel** |
| **Sizes** | Default, Small | Single | **Missing: `size="small"`** |
| **States** | Default, With Value, Disabled, Active (open) | placeholder, options, disabled | Active (open) is native; **missing filled/floating/small** |

**Action:** Add `variant` (default | filled | floatingLabel) and `size` (default | small).

---

## 6. Search bar

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variants** | **Filled**, **Outline** | Single (outline-like) | **Missing: filled variant** |
| **States** | Default, Hover, Clear (with value) | Single | Clear = with value; OK |

**Action:** Add `variant="filled"` \| `"outline"`.

---

## 7. Checkbox

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **States** | Default, Hover, Active (checked), Disabled, **Indeterminate** | default, checked, disabled | **Missing: indeterminate** |
| **Sizes** | Medium, Large | medium, large | OK |

**Action:** Support `indeterminate` prop and set `ref.current.indeterminate = true` when provided; style the indeterminate icon (e.g. minus/dash).

---

## 8. Radio

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **States** | Default, Hover, Active, Disabled | default, checked, disabled | OK |
| **Sizes** | Medium, Large | medium, large | OK |

**Action:** None required.

---

## 9. Alert

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **State (variant)** | Success, Warning, Error, Info, **Default** (neutral) | success, warning, error, info | **Missing: `default` (neutral)** |
| **Type** | Default, **Action**, **Banner**, **Action stacked** | Default + optional action button | **Missing: Banner (full-bleed?), Action stacked (action below text)** |
| **Size** | Default, Compact | default, compact | OK |

**Action:** Add `variant="default"` (neutral styling). Optionally add `type="banner"` (full width) and `type="actionStacked"` (action on new line).

---

## 10. Toast

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **State** | Success, Warning, Error, Info, **Default** | success, warning, error, info | **Missing: `default` (neutral)** |
| **Type** | Default, Dismissible | message + optional onDismiss | OK |

**Action:** Add `variant="default"` using neutral background (e.g. surface + border or muted).

---

## 11. Badge

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **State** | Default, success, Error, Info, Warning, **Primary** | default, success, error, info, warning, outline | **Missing: `primary`** |
| **Variant** | Default, Outline | same | OK |
| **Size** | Default, Small | default, small | OK |
| **Type** | **Pill**, **Tag** (rect), **Icon** (icon-only) | Single (pill-like) | **Missing: tag shape, icon-only type** |

**Action:** Add `variant="primary"`. Optionally add `type="tag"` (e.g. less rounded) and `type="icon"` (icon only, no text).

---

## 12. Chip

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Status** | Success, Warning, Error, Default, Info | default, primary, success, error, info, warning, outline | OK (we have primary) |
| **Type** | Default, Dismissible, **Dropdown** | default + onDismiss | **Missing: dropdown (chip that opens a dropdown)** |
| **Size** | Small, Medium, Large | small, medium, large | OK |
| **Style** | Default, Outline | same | OK |

**Action:** Optional: add Chip with dropdown (e.g. `dropdownOptions` or composable DropdownChip). Lower priority.

---

## 13. Avatar

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Size** | Small, Medium, Large, Extra Large | small, medium, large, extra-large | OK |
| **Variant** | Default (initials), Picture, **Loading** | initials, src (picture) | **Missing: loading state (skeleton/spinner)** |

**Action:** Add `loading` prop; when true, show skeleton or spinner overlay (no initials/image).

---

## 14. Card

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| **Variant** | Default, Compact, Alt | Single | **Missing: compact, alt** |
| **State** | Default, Hover, Active | Static | **Missing: hover/active styles** |
| **Style** | Default, Outline, Primary | Single (border) | **Missing: outline emphasis, primary accent** |

**Action:** Add optional `variant="compact"`, `style="outline"` (or variant), and hover/active classes for clickable cards.

---

## 15. Table

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| Implementation | Various list/card tables in Figma | Simple headers + rows | **Missing: sortable, zebra, sticky header, row states** (if in Figma) |

**Action:** Document or add sortable headers, row hover, and zebra striping if present in design.

---

## 16. Modal / Dialog

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| Modal/Dialog | Variants in Figma | Basic modal and dialog | **Missing: size variants, optional icon** (Dialog has icon in design) |

**Action:** Ensure Dialog supports optional icon; add size (e.g. small, medium, large) if in Figma.

---

## 17. Tooltip

| Aspect | Figma | Current implementation | Gap |
|--------|--------|------------------------|-----|
| Position | Top, Bottom, Left, Right | top, bottom, left, right | OK |

**Action:** None required.

---

## 18. Components not yet implemented (from Figma)

- **Switch** (toggle) — State=Enabled/Disabled On/Off, Size=Default/Small  
- **Tabs** — Variant=Default/Boxed, State=Default/Hover/Active, Size=Medium/Large, Style=Border/Filled/Clear/Outline  
- **Accordion** — State=Default/Expanded, Variant=Default/Alt  
- **Dropdown** (menu) — Ellipsis, alignment, states  
- **Pagination**  
- **Nav Item** (sidebar nav)  
- **Date picker / Calendar**  
- **Multiselect**  
- **Skeleton loader**  
- **Drag & drop file**  
- **Phone input**  
- **Dropshadow / Inner shadow** (tokens)

---

## Priority summary

| Priority | Component | Missing items |
|----------|-----------|----------------|
| **P0** | Button | danger variant |
| **P0** | Alert | default variant |
| **P0** | Toast | default variant |
| **P0** | Badge | primary variant (and optionally tag/icon type) |
| **P1** | Input | filled variant, floating label, warning/success/disabled states, size large |
| **P1** | TextArea | filled, floating label, warning/success/disabled |
| **P1** | Checkbox | indeterminate state |
| **P1** | Avatar | loading state |
| **P2** | Select | filled, floating label, size small |
| **P2** | SearchInput | filled variant |
| **P2** | Card | hover/active, variant compact, style outline/primary |
| **P2** | Alert | type banner, action stacked |

This document should be updated as gaps are implemented.
