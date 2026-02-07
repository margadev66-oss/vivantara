# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router routes, layouts, and API handlers (`app/api/*`). Keep route-specific UI close to route segments (for example `app/(public)/*`).
- `components/`: Shared React components (for example `components/Navbar.tsx`, `components/Footer.tsx`).
- `lib/`: Reusable server/client utilities (auth, data-access helpers, validators, constants).
- `prisma/`: Schema, migrations, and seed logic (`prisma/schema.prisma`, `prisma/migrations/*`, `prisma/seed.ts`).
- `tests/`: Vitest + Testing Library tests (`tests/setup.ts`, `tests/**/*.test.ts[x]`).
- `public/`: Static assets served directly.

## Build, Test, and Development Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Build production bundle.
- `npm run start`: Serve the production build locally.
- `npm run lint`: Run ESLint checks.
- `npm run test`: Run Vitest once (CI-style).
- `npm run test:watch`: Run Vitest in watch mode.
- `npx prisma migrate dev --name <name>`: Create/apply a local migration.
- `npx tsx prisma/seed.ts`: Seed local data.

## Coding Style & Naming Conventions
- Use TypeScript + React with 2-space indentation, double quotes, and semicolons.
- Prefer `@/*` path aliases from `tsconfig.json` over deep relative imports.
- Components: PascalCase file names (`Navbar.tsx`); utilities: descriptive camelCase exports.
- Tailwind CSS v4: group classes by layout, typography, then color for readability.

## Testing Guidelines
- Frameworks: Vitest, Testing Library, and `jsdom` test environment.
- Name tests `*.test.ts` or `*.test.tsx`; place them under `tests/`.
- Add tests for new logic and regression-prone UI flows; run `npm run test` before opening a PR.
- No strict coverage threshold is enforced yet, but meaningful coverage is expected for changed code.

## Commit & Pull Request Guidelines
- Current history is minimal (`Initial commit`), so use short, imperative commit messages (for example `Add admin menu editor`).
- Keep commits focused and atomic; avoid mixing unrelated refactors.
- PRs should include: concise summary, linked issue (if any), screenshots for UI changes, and notes for schema/seed/env updates.
- Confirm `npm run lint` and `npm run test` pass before requesting review.

## Security & Configuration Tips
- Store secrets only in `.env` (for example `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).
- Never commit credentials or production connection strings.
- When changing schema/auth behavior, document migration and environment impacts in the PR.
