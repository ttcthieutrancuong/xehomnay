# Xehomnay architecture

Xehomnay is a single Next.js application organized as a modular monolith.

- `src/app`: App Router routes, layouts, and API route handlers.
- `src/features`: business capabilities, each owning its components, schemas, hooks, and domain code as needed.
- `src/components`: shared UI, layout, navigation, and common components.
- `src/lib`, `src/config`, `src/types`: framework-independent utilities and shared configuration/types.
- `src/server`: server-only repositories, services, policies, and integrations.
- `src/providers`: application-wide client providers.
- `prisma`: Prisma schema and configuration; no business models or migrations exist yet.

Features should own their domain behavior. Keep shared abstractions only when multiple features need them.
