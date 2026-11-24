# xehomnay.com

Foundation for xehomnay.com, a single Next.js App Router application using a modular monolith and feature-based source layout.

## Getting started

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` when configuring local environment values.
3. Run `npm run dev`.

Authentication uses email and password. Registration is available immediately without email verification. See [docs/architecture.md](docs/architecture.md).

## Authentication setup

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and a random `AUTH_SECRET` (for example, generate one with `openssl rand -base64 32`).
2. Run `npm install`, then apply pending database migrations with `npm run db:deploy`.
3. Register at `/register` and sign in at `/login`. Registration does not send email.
4. Grant an existing account administrator access with `npm run admin:promote -- your@email.com`.
5. Run `npm run dev`.
