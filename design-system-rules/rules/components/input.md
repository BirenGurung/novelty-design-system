# Input

Text input with optional label, hint, and error. Uses semantic tokens for border, text, and error colors.

## Props

- `label`: optional string
- `hint`: optional supporting text below the field
- `error`: optional error message (sets border and aria-invalid)
- `leading`, `trailing`: optional ReactNode (e.g. icons)
- Standard input HTML attributes (`placeholder`, `value`, `onChange`, `disabled`, etc.)
- `className`, `inputClassName`: optional

## Example

```tsx
import { Input } from "@/components";

<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Password" type="password" error="Required" />
<Input hint="We'll never share your email." />
```
