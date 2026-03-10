# Tooltip

Use for short hints on hover/focus. Keep content brief.

## Props

- `content`: string or ReactNode
- `position`: `"top"` | `"bottom"` | `"left"` | `"right"`
- `children`: trigger element
- Standard wrapper attributes

## Example

```tsx
<Tooltip content="Save changes" position="top">
  <Button variant="text">Save</Button>
</Tooltip>
```
