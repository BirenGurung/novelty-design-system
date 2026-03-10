# Modal & Dialog

- **Modal**: Primary flow interruption (e.g. confirm discard). Use `open`, `onClose`, `title`, `primaryActionLabel` / `onPrimaryAction`, `cancelLabel`. Children = body content.
- **Dialog**: Short message + single action (e.g. success). Use `open`, `onClose`, `title`, optional `icon`, `actionLabel` / `onAction`, `cancelLabel`. Children = description.

Both use semantic tokens for overlay and panel. Ensure `title` has an `id` when used for aria-labelledby (handled inside components).

## Example

```tsx
<Modal open={open} onClose={() => setOpen(false)} title="Confirm" primaryActionLabel="Delete" onPrimaryAction={() => {}} cancelLabel="Cancel">
  <p>Are you sure?</p>
</Modal>
<Dialog open={open} onClose={() => setOpen(false)} title="Done" actionLabel="OK" onAction={() => {}}>Saved.</Dialog>
```
