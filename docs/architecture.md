# xehomnay.com architecture

The product is a **modular monolith**: one Next.js App Router application, one deployment unit, and one repository. New folders are introduced only with working code that needs them. Follow [the project conventions](../AGENTS.md) for implementation details.

## Current boundaries

- `src/app`: route entry points, metadata, layouts, and HTTP route handlers.
- `src/features/auth`: credentials authentication, registration validation, forms, and access guards.
- `src/features/cars`: featured vehicle presentation.
- `src/components/layout`: site header/footer, floating contact actions, and authenticated workspaces.
- `src/providers`: the Mantine theme provider. Add other providers only when a feature consumes them.
- `src/lib`: small shared constants and auth configuration.
- `src/server`: server-only Prisma client.
- `prisma`: PostgreSQL schema and migration history. The current business schema contains only users and roles.

The App Router is server-first. Static content and metadata stay in Server Components; interactive elements such as the auth modal and featured vehicle slider are isolated client components. UI layout, forms, navigation, and feedback use Mantine components and theme props. Root global CSS only resets the page margin and establishes the body font.

## Authentication

Auth.js Credentials uses Prisma-backed users and JWT sessions. Registration creates a `USER` account using email and password without an email delivery or verification step. Existing accounts can be promoted with `npm run admin:promote -- email@example.com`. User and admin routes are protected by server-side guards.

## Adding a feature

Create `src/features/<name>` when the feature has real implementation. Start with only the files it needs, such as `components`, `schemas`, and `services`; do not pre-create empty directories. Keep route handlers thin: parse input, call the feature operation, and return an HTTP response. Use repositories or extra layers only when actual persistence/query complexity justifies them.
