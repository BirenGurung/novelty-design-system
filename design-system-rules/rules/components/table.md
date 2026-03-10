# Table

Use for tabular data. Token-based styling (borders, background). Minimal implementation: headers + rows.

## Props

- `headers`: string[]
- `rows`: (string | number)[][]
- Standard table attributes

## Example

```tsx
<Table
  headers={["Name", "Role", "Status"]}
  rows={[["Jane", "Admin", "Active"], ["John", "User", "Inactive"]]}
/>
```
