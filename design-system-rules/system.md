# Design system — system instructions

## Installation

1. Clone or reference this repo. Use React 19 and Tailwind v4.
2. Import **one theme** from `styles/themes/` (e.g. `novelty.css`) in your app entry or root layout so all semantic tokens are set.
3. Use components from `components/ui/`; they consume tokens only (no hardcoded colors or fonts).

## White-labeling

To rebrand: add a new file under `styles/themes/` that defines the **same token names** (see `rules/styling/theme-contract.md` or `docs/theme-contract.md`) with different values. Import that theme instead of `novelty.css`. Do not change component code.

## Expanding

- **New components:** Add to `components/ui/`, export from `components/index.ts`. Use only semantic tokens. Document in `rules/components/<name>.md`.
- **New tokens:** Add in `styles/tokens/`, give values in each theme file, document in `rules/styling/theme-contract.md` and README.

## Directory guide

- `components/ui/` — Button, Text, Input, Card, IconButton, etc. One file per component.
- `styles/tokens/` — Semantic variable names (theme contract).
- `styles/themes/` — One CSS file per brand (novelty.css = default).
- `rules/components/` — Per-component usage and props.
- `rules/patterns/` — Forms, navigation, etc.
- `rules/styling/` — Colors, typography, theme contract.

## Guidelines

- Use only semantic tokens in components (e.g. `var(--color-primary)`). No hex or font names in component code.
- Prefer design system components over ad-hoc markup.
- Follow accessibility: labels for inputs, focus states, aria where needed.
