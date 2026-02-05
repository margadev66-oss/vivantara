# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and server actions (see `app/actions.ts`, `app/layout.tsx`, and route groups like `app/(public)`). API handlers live under `app/api/`.
- `components/`: Shared React UI components.
- `lib/`: Reusable utilities (data access, auth helpers, etc.).
- `prisma/`: Prisma schema, migrations, and seed script (`schema.prisma`, `migrations/`, `seed.ts`).
- `public/`: Static assets served as-is.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start the local dev server (default `http://localhost:3000`).
- `npm run build`: Create a production build.
- `npm run start`: Run the production build locally.
- `npm run lint`: Run ESLint (Next.js core-web-vitals + TypeScript rules).
- `npm run test`: Run the Vitest suite once (CI-friendly).
- `npm run test:watch`: Run Vitest in watch mode during development.
- `npx prisma migrate dev --name init`: Apply local database migrations.
- `npx tsx prisma/seed.ts`: Seed initial data.

## Coding Style & Naming Conventions
- TypeScript + React with Next.js App Router. Use existing formatting (2-space indentation, double quotes, semicolons).
- Prefer `@/*` import aliases for root paths (configured in `tsconfig.json`).
- Tailwind CSS v4 for styling; keep classes readable and grouped by layout -> typography -> color when possible.

## Testing Guidelines
- Tests run with Vitest + Testing Library in a `jsdom` environment.
- Name tests `*.test.ts` or `*.test.tsx` and place them under `tests/` (e.g., `tests/lib/utils.test.ts`).
- Run `npm run test` before PRs; use `npm run test:watch` for local iteration.

## Commit & Pull Request Guidelines
- Git history is minimal and does not establish a commit convention. Use short, imperative summaries (e.g., "Add admin menu editor").
- PRs should include a clear summary, relevant issue links, and screenshots for UI changes. Note any migration or seed updates.

## Configuration & Security
- Keep secrets in `.env` only. Required variables include `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`.
- Never commit credentials or production connection strings.
