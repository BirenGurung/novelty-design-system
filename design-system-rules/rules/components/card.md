# Card — Figma specs (Novelty Design System)

Reference: [Figma Card frame](https://www.figma.com/design/6U5UUhDtzmcjmXVCzwX1Vi/Novelty-Design-System?node-id=9036-30499)

**Components used inside cards:** Use **Button** for all footer and inline actions (text, outline, or filled per variant). Use **Badge** for tags and status (e.g. "Linked", "Janet Gwin", "Status") with appropriate variant and appearance. Use **IconButton** for header menu (ellipsis), **Avatar** for profile images, **Icon** for row icons and status icons, **Text** for typography.

## Card types

### 1. Profile Card (300px)
- **Variants**: Default | Primary | Primary Alt
- **Layout**: Header (gray-lighter or primary bg) with **centered** title, subtitle, optional status badge. **Large avatar (64px)** centered, overlapping header/body with 4px white border. Body: 32px top padding (clear avatar), 16px horizontal, 8px gap between rows. Footer: border-top, 8px padding, single action.
- **Default**: Header `bg-[gray-lighter]` (#f8f9fa), text muted. No ellipsis.
- **Primary**: Header `bg-primary`, white text. Optional ellipsis **top-right** in header.
- **Primary Alt**: Same as Primary (primary header, **centered overlapping avatar**) + ellipsis **top-right**. (Not "avatar left" — that is User Card.)
- **Footer button**: **Text** variant (primary color, no border) per Figma.
- **Shadow**: None on card; optional on header for User Card only.

### 2. User Card (360px)
- **Variants**: Default (gray-lighter header) | Primary (primary header)
- **Layout**: Header has **avatar 44px on left**, title + subtitle, ellipsis right. Header has **shadow** (0 0 4px rgba(0,0,0,0.16)). No overlapping avatar. Body: 16px padding, 8px gap between rows. Footer: border-top, 16px padding; **left**: optional label + value (e.g. "Enrollment" / "Start: 02/26/2020"); **right**: "View Detail" **outline** button.

### 3. Content Card (391px)
- **Variants**: Default | Accent (4px left bar `--color-error`).
- **Size**: Default (p-4, body-lg) | Compact (p-2, body-md).
- **Layout**: Border + gray-lighter bg + shadow. Header: border-b, **items-center** (vertical center), gap-8px. Left: title (body-lg/16px or body-md/14px), date below. Right: status icons (check, warning) 24px or 16px, ellipsis. Body: 16px or 8px padding, body-lg or body-md. Footer: justify-end, gap-16 (default) or gap-8 (compact), filled primary buttons (medium or small).

### 4. Card List (391px) — content with badge/meta (`headerLayout="list"`)
- **Header layout:** Left column: Title → Badge (e.g. "Janet Gwin") → Sub text (e.g. "Some Text"). Right column: clock + meta (e.g. "20223 Days"), **Status badge**, ellipsis. Body: lorem. Optional accent bar. Use `headerLayout="list"` and `subText` so badge placement matches Figma.

### 5. Media Card / Content Card with Image (391px) — two layouts only
- **No red/accent border:** Media card has no accent variant; only the two layouts below.
- **Layouts:**
  - **`layout="imageFirst"`** (default): Image (175px height) → title + date block → body → footer.
  - **`layout="headerFirst"`**: Title + date block (on top) → image (175px) → body → footer.
- **No internal borders:** Only the outer card has a border. No border between image, title, body, or footer.
- Image area: 175px height, `bg-[var(--color-surface)]`; title/date and body: 16px padding; footer: px-4 py-2, gap-16 between buttons.

## Spacing / tokens
- Header padding: 16px (default), 8px (compact).
- Body padding: 16px (default), 8px (compact).
- Footer: 8px (profile), 16px (user card); content card 16px px, 8px py.
- Avatar overlap: bottom -32px (profile); User Card no overlap.
- Accent bar: 4px width, full height, `--color-error`.
