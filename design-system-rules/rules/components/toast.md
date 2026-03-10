# Toast

Use for transient notifications (success, warning, error, info). Usually rendered in a portal at viewport edge.

## Props

- `variant`: `"success"` | `"warning"` | `"error"` | `"info"`
- `message`: string
- `onDismiss`: optional () => void
- Standard div attributes

## Example

```tsx
<Toast variant="success" message="Profile updated." onDismiss={() => {}} />
```
