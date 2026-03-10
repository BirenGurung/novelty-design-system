# Novelty Design System

A **portable, expandable, white-label-ready** design system built from Figma. Use it by cloning this repo, copying components and themes into your app, or connecting this repo URL to AI app-building tools.

## What’s in this repo

- **`components/ui/`** — React components (Text, Button, IconButton, Input, Card, etc.) that use **semantic design tokens** only (no hardcoded colors or fonts).
- **`styles/tokens/`** — Semantic token names (theme contract). No brand-specific values here.
- **`styles/themes/`** — One CSS file per brand. **Novelty** (`novelty.css`) is the default theme; add more for white-labeling.
- **`app/`** — Next.js app used as a **showcase** for the design system.

**Tech:** React 19, Next.js 16, Tailwind v4, TypeScript.

## How to use

### Direct use (clone / copy)

1. Clone this repo or copy the folders you need.
2. In your app, import **one theme** from `styles/themes/` (e.g. `novelty.css`) in your root layout or main CSS so all CSS variables are set.
3. Copy or import components from `components/ui/` and use them. They rely on the theme variables (e.g. `var(--color-primary)`, `var(--font-heading)`).
4. See **Theme contract** below for the list of variables your theme (or this repo’s theme) must provide.

### Connecting to AI app builders

Many tools let you connect a “design system” or “component library” by providing a **repo URL**. Point your tool’s design system setting at this repository’s URL and follow that tool’s instructions. The repo is structured so that:

- **README** and **`docs/theme-contract.md`** describe the system and the token list.
- **`components/`** and **`styles/`** are the core; no tool-specific logic in components.
- If your tool expects a specific folder (e.g. `system.md` + `rules/`), you can add that under a name like `design-system-rules/` without changing the core.

## Theme contract (white-label)

A **theme** is a CSS file that sets the same **semantic variable names** to different values. To add a new theme (e.g. for a client):

1. Copy `styles/themes/novelty.css` to e.g. `styles/themes/client-a.css`.
2. Replace the values (colors, font families, radii, etc.) with the new brand. **Keep the same variable names.**
3. In your app, import `client-a.css` instead of `novelty.css` (or switch at runtime). No component code changes.

The full list of semantic tokens is in **`docs/theme-contract.md`**.

## Adding a new component

1. Implement it in `components/ui/` using **only** semantic tokens (e.g. `var(--color-primary)`). No hardcoded hex or font names.
2. Export it from `components/index.ts`.
3. Document it in this README or in `docs/`, and in `design-system-rules/rules/components/` if you use that folder.

## Adding new tokens

1. Add the semantic name in `styles/tokens/` (and in Tailwind `@theme` in your app if you use it).
2. Give it a value in each theme file in `styles/themes/`.
3. Update **`docs/theme-contract.md`** so new themes know what to define.

## Running the showcase

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component showcase.

## License

Private or per your organization’s policy.
