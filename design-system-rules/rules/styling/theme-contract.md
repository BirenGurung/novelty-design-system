# Theme contract

See **`docs/theme-contract.md`** in the repo root for the full list of semantic token names that a theme must define. Summary:

- **Colors:** `--color-primary`, `--color-primary-hover`, `--color-text`, `--color-text-muted`, `--color-success`, `--color-warning`, `--color-error`, `--color-info`, `--color-surface`, `--color-border`, etc.
- **Typography:** `--font-heading`, `--font-body`; `--text-h1-size` through `--text-h6-line`; `--text-body-lg-size/line`, `--text-body-md-*`, `--text-body-sm-*`.
- **Spacing:** `--spacing-1` … `--spacing-16` (4px grid).
- **Radius:** `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`.
- **Shadow:** `--shadow-sm`, `--shadow-md`, `--shadow-lg`.

New themes: copy an existing theme file and replace values only; keep the same variable names.
