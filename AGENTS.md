# Project development conventions

## Architecture

- Keep one Next.js App Router application and one repository. Do not introduce services or packages as separate apps.
- Keep `src/app` focused on routes, metadata, layouts, and route handlers. Put business behavior in the owning feature.
- Add a feature folder only when that feature has real code. Do not create empty folders, placeholder exports, or speculative layers.
- A feature owns its UI, schemas, types, and operations when those are needed. Add repositories or services only when they clarify actual domain behavior.
- Put shared components in `src/components` only after at least two features or routes use them.
- Put database access and other Node-only code in `src/server`; mark server-only modules with `server-only`.

## Next.js and performance

- Server Components are the default. Add `"use client"` only for browser APIs, local interaction state, or client-only libraries.
- Fetch data in Server Components or route handlers by default. Use TanStack Query only for client-owned server state that needs caching, refetching, or optimistic updates; do not mount its provider globally before it is used.
- Keep providers as close to their consumers as possible. Mantine's theme provider belongs at the root; avoid unused global providers.
- Use `next/image` for content images and provide accurate `sizes` when using `fill`.
- Prefer named imports so the bundler can remove unused code. Do not add `dynamic()` or memoization without evidence that it reduces work.

## UI and styling

- Use Mantine components for layout, forms, feedback, overlays, and controls before writing custom markup or CSS.
- Use semantic elements through Mantine's `component` prop where practical (`Box component="section"`, for example).
- Keep `src/app/globals.css` limited to resets and genuinely global rules. Prefer Mantine props and theme values; use colocated CSS Modules only for visual treatments that Mantine cannot express cleanly.
- Do not style all Mantine components globally. Prefer Mantine props, theme component defaults, and a component's own class names.
- Avoid one-off wrappers around Mantine components unless they add shared behavior or semantics.

## Naming and declarations

- Use PascalCase nouns for React components and types; camelCase for values and functions.
- Name event handlers with `handle` (`handleSubmit`, `handleClose`), hooks with `use`, and boolean values with `is`, `has`, `can`, or `should`.
- Choose names that describe the action and its subject. Avoid vague names such as `data`, `value`, `process`, or `manager` when a domain name is available.
- Use `const` by default. Use `let` only when reassignment is required; never use `var`.
- Use function declarations for exported React components and named operations. Use arrow functions for callbacks, short local transformations, and values passed inline as callbacks.
- Keep functions small and single-purpose. Do not extract a helper used once unless it makes intent clearer.

## Validation and errors

- Validate untrusted input at API boundaries with the feature's Zod schema.
- Keep secrets and database access on the server. Never expose environment secrets through client modules.
- Return clear, localized user-facing errors; keep internal diagnostics out of responses.
- Do not add mock data or placeholder business behavior to production routes.

## Quality checks

- Before finishing a code change, run `npm run lint`, `npm run typecheck`, and `npm run build` when the environment permits.
- Keep generated Prisma output out of hand-authored source changes. Update `schema.prisma`, then regenerate the client.
