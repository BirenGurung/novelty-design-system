# Alert

Use for inline feedback (success, warning, error, info). Prefer **compact** in tight layouts.

## Props

- `variant`: `"success"` | `"warning"` | `"error"` | `"info"` (default: `"info"`)
- `size`: `"default"` | `"compact"`
- `title`: string (required)
- `description`: optional string
- `actionLabel`, `onAction`: optional button
- `onDismiss`: optional () => void
- Standard div attributes

## Example

```tsx
<Alert variant="success" title="Saved" />
<Alert variant="error" title="Error" description="Something went wrong." onDismiss={() => {}} />
```
