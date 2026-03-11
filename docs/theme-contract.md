# Theme contract

A **theme** is a CSS file that defines the following semantic custom properties. Every theme file (e.g. `styles/themes/novelty.css`) should set these names so components render correctly. Use the same names when creating a new theme for white-labeling.

## Colors

Each color family has **5 shades** in the Novelty theme: `--color-{family}-1` (darkest) through `--color-{family}-5` (lightest). Semantic names below map to these shades; new themes should define the same semantic names.

| Token | Description |
|-------|-------------|
| `--color-primary` | Primary brand color (e.g. buttons, links) |
| `--color-primary-hover` | Primary hover state |
| `--color-primary-pressed` | Primary active/pressed state |
| `--color-primary-muted` | Primary muted/light tint |
| `--color-primary-lighter` | Primary very light background |
| `--color-primary-darker`, `--color-primary-dark`, `--color-primary-main`, `--color-primary-light` | Primary scale (optional) |
| `--color-secondary` | Secondary brand color |
| `--color-secondary-darker` … `--color-secondary-lighter` | Secondary scale (optional) |
| `--color-text` | Default text color |
| `--color-text-muted` | Muted/secondary text |
| `--color-text-darker` | Darker text (e.g. headings) |
| `--color-surface` | Default background surface |
| `--color-border` | Default border color |
| `--color-success`, `--color-success-light`, `--color-success-lighter` | Success (e.g. alerts) |
| `--color-warning`, `--color-warning-light`, `--color-warning-lighter` | Warning |
| `--color-error`, `--color-error-light`, `--color-error-lighter` | Error |
| `--color-info`, `--color-info-light`, `--color-info-lighter` | Info |
| `--color-white`, `--color-black` | Neutrals |
| `--color-button-disabled` | Disabled button background (filled/outline/text); e.g. `#9e9e9e` |

## Typography

| Token | Description |
|-------|-------------|
| `--font-heading` | Font family for headings (set by app when using next/font or similar) |
| `--font-body` | Font family for body text |
| `--font-weight-regular` | 400 |
| `--font-weight-medium` | 500 |
| `--text-hero-size`, `--text-hero-line` | Hero title size and line-height |
| `--text-h1-size`, `--text-h1-line` … `--text-h6-size`, `--text-h6-line` | Heading 1–6 |
| `--text-body-lg-size`, `--text-body-lg-line` | Body large |
| `--text-body-md-size`, `--text-body-md-line` | Body medium |
| `--text-body-sm-size`, `--text-body-sm-line` | Body small |

All size/line values are typically in `px` or `rem`.

## Spacing (4px grid)

| Token | Typical value |
|-------|----------------|
| `--spacing-1` … `--spacing-16` | 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 (px) |

## Radius

| Token | Description |
|-------|-------------|
| `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full` | Border radius |

## Shadow

| Token | Description |
|-------|-------------|
| `--shadow-sm`, `--shadow-md`, `--shadow-lg` | Box shadows |
| `--shadow-button-pressed` | Inner shadow for button/icon-button pressed state (e.g. `inset 0 3px 4px 0 rgba(0,0,0,0.25)`) |

## Component sizes (optional, for white-label layout)

Themes can override these to change component dimensions without code changes:

| Token | Description |
|-------|-------------|
| `--size-tooltip-arrow` | Tooltip arrow border width (e.g. 6px) |
| `--size-card-profile-width`, `--size-card-user-width`, `--size-card-content-width` | Card max-widths (e.g. 300px, 360px, 391px) |
| `--size-media-card-image-height` | Media card image block height (e.g. 175px) |
| `--size-modal-sm`, `--size-modal-md`, `--size-modal-lg`, `--size-modal-xl` | Modal max-widths (e.g. 400px, 600px, 800px, 1000px) |

---

When adding a new theme, copy an existing theme file and replace only the **values**; keep the same **variable names** so all components work without code changes.
