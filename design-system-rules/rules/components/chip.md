# Chip

Use for tags, filters, or removable tokens. Variants: default, primary, success, error, info, warning, outline. Sizes: small, medium, large.

## Props

- `variant`, `size`, `onDismiss`, children
- Standard span/button attributes

## Example

```tsx
<Chip variant="primary" size="medium">Design</Chip>
<Chip variant="outline" onDismiss={() => {}}>Remove</Chip>
```
