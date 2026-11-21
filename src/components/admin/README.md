# Admin loading skeletons

Use the shared skeletons for admin loading states so pages keep consistent spacing and avoid layout shifts.

## Admin spacing baseline

- Admin page sections use a `lg` (24px) vertical gap between the breadcrumb, page heading, and primary content.
- Form and detail cards use the shared `admin-entity-panel` class: 16px padding on small screens, 24px on medium screens, and 32px on desktop.
- Detail fields use a `lg` (24px) grid gap; field labels and values stay close together within each field group.
- Data tables share 16px vertical row padding, 16–20px toolbar and pagination padding, and consistent 16px horizontal cell spacing.
- Keep new admin pages within the common content container; avoid page-specific fixed widths and one-off large card padding.

## Table pages

Use the shared `DataTable` for admin tables. It keeps its toolbar and column headers mounted while the first request is loading, then renders `AdminTableBodySkeleton` rows under those headers. Do not add a second table skeleton in a feature page. The shared table uses up to six placeholder rows regardless of the selected page size.

## Detail pages

Add a route-level `loading.tsx` beside the detail `page.tsx` and render `AdminDetailSkeleton`:

```tsx
import { AdminDetailSkeleton } from "@/components/admin/admin-skeletons";

export default function ItemDetailLoading() {
  return <AdminDetailSkeleton />;
}
```

## Create and edit pages

Use `AdminFormSkeleton` for the form card. Add the page heading and back-navigation placeholders in that route's `loading.tsx`, then render the shared form skeleton beneath them. For page-specific form layouts, compose Mantine `Skeleton` elements while preserving the same responsive card padding (`lg` on small screens, 40px at `sm`, 48px at `lg`) and full-width behavior.

## Shared components

The components live in `admin-skeletons.tsx`:

- `AdminTableBodySkeleton` is used internally by `DataTable`; feature pages should not call it directly.
- `AdminDetailSkeleton` is the default placeholder for full-width entity detail pages.
- `AdminFormSkeleton` is the default placeholder for full-width create/edit forms.

Keep skeletons decorative, match the final page's major blocks and spacing, and avoid rendering fake text or data values that could be mistaken for loaded content.
