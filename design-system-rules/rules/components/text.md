# Text (typography)

Use for all copy. Variants map to the design system type scale (semantic tokens).

## Props

- `variant`: `"hero"` | `"h1"` … `"h6"` | `"body-lg"` | `"body-md"` | `"body-sm"` (default: `"body-md"`)
- `weight`: `"regular"` | `"medium"` (default: `"regular"`)
- `as`: optional element type (`p`, `span`, `h1`–`h6`, `div`) for semantics
- `className`: optional

## Example

```tsx
import { Text } from "@/components";

<Text variant="h1" as="h1">Page title</Text>
<Text variant="body-lg">Intro paragraph.</Text>
<Text variant="body-sm" weight="medium">Caption</Text>
```

Use semantic `as` for headings (e.g. `as="h2"` when `variant="h2"`) for accessibility.
