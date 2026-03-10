# Button

Use for primary actions (submit, confirm, navigate). Prefer **filled** for the main CTA, **outline** for secondary, **text** for tertiary.

## Props

- `variant`: `"filled"` | `"outline"` | `"text"` (default: `"filled"`)
- `size`: `"small"` | `"medium"` | `"large"` (default: `"medium"`)
- `leadingIcon`, `trailingIcon`: optional ReactNode (e.g. icon)
- `disabled`: boolean
- Standard button HTML attributes

## Example

```tsx
import { Button } from "@/components";

<Button variant="filled" size="medium">Save</Button>
<Button variant="outline" size="large">Cancel</Button>
<Button variant="text" disabled>Skip</Button>
```

## IconButton

For icon-only actions (e.g. settings, close). Use `IconButton` with `aria-label`. Variants: `filled`, `outline`, `clear`. Sizes: `small`, `medium`, `large` (icon scales: 16px, 20px, 24px). States: default, hover, pressed (inset shadow), disabled. Optional `visualState` for documentation/showcase: `"default"` | `"hover"` | `"pressed"`.
