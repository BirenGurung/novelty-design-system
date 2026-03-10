# Avatar

Use for user identity (initials or image). Sizes: `small`, `medium`, `large`, `extra-large`.

## Props

- `src`: optional image URL
- `alt`: optional (for image)
- `initials`: optional string (e.g. "JD"); used when no `src`
- `size`: `"small"` | `"medium"` | `"large"` | `"extra-large"`
- Standard div attributes

## Example

```tsx
<Avatar initials="JD" size="medium" />
<Avatar src="/photo.jpg" alt="User" size="large" />
```
