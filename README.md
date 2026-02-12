# Vivartana Platform

A dynamic marketing website for a high-end business management advisory firm.

## Technology Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** PostgreSQL (via Prisma ORM)
- **Auth:** NextAuth.js
- **Icons:** Lucide React

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Database Setup:**
    
    The project is configured to use PostgreSQL. 
    Make sure `.env` contains a valid `DATABASE_URL`.

    Initialize the database and run migrations:
    ```bash
    npx prisma migrate dev --name init
    ```

    Seed the database with initial data (Admin user, Menu items, Pages, Settings):
    ```bash
    npx tsx prisma/seed.ts
    ```
    
    *Admin Credentials created: `admin@vivartana.com` / `password123`*

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Admin Dashboard

Access the admin panel at `/admin`.
Log in with the credentials created during the seed step.

**Features:**
- **Global Settings:** Update the Hero statement, About Bio, and Pillars.
- **Pages Content:** Edit the content of standard pages (e.g., /vivartana/individuals).
- **Menu Management:** Rename navigation items.
- **Writing/Blog:** Create, Edit, and Delete articles with Rich Text support (HTML).
- **Enquiries:** View messages submitted via the Contact form.

## Deployment

### Vercel (Recommended)

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Configure Environment Variables in Vercel Project Settings:
    - `DATABASE_URL`: Your PostgreSQL connection string (e.g., from Neon, Supabase, or Railway).
    - `NEXTAUTH_SECRET` (or `AUTH_SECRET`): A random string (generate with `openssl rand -base64 32`).
    - `NEXTAUTH_URL`: The URL of your deployed site (e.g., `https://vivantara.vercel.app`).
4.  Redeploy.

`NEXTAUTH_SECRET`/`AUTH_SECRET` is required in production. If missing, NextAuth throws `NO_SECRET` and admin login fails.

### MilesWeb (Node.js Hosting)

MilesWeb/cPanel environments commonly use symlinked `node_modules`. Turbopack can fail in this setup, so this project is configured to use **Webpack** for both dev and build commands.

1. In MilesWeb Node.js app settings, use:
   - **Build command:** `npm run build:milesweb`
   - **Start command:** `npm run start`
2. Configure environment variables in MilesWeb panel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` (or `AUTH_SECRET`)
   - `NEXTAUTH_URL` (your production URL)
   - `PORT` (if MilesWeb requires a specific port)
3. Build once locally or in CI with a clean output folder:
   ```bash
   npm run clean:build
   npm run build
   ```
4. If your host created problematic symlinked modules, run a clean reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```
5. Run production migrations during deploy:
   ```bash
   npx prisma migrate deploy
   ```

This repository keeps `output: "standalone"` enabled in `next.config.ts`, and production start now uses `node .next/standalone/server.js`.


#### MilesWeb/cPanel crash fix (`rayon-core` / `ThreadPoolBuildError`)

If build logs show messages like:
- `experimental.useWasmBinary ... will be ignored`
- `we're using WASM bindings`
- `rayon-core ... ThreadPoolBuildError ... Resource temporarily unavailable`

then your host is falling back to the WASM SWC toolchain under strict process limits. This repo now builds with:
- `NEXT_DISABLE_SWC_WASM=1`
- `RAYON_NUM_THREADS=1`
- `next build --webpack`

So simply run:
```bash
npm run build:milesweb
```

Also remove any custom host env/config that forces WASM mode (for example `experimental.useWasmBinary` or similar platform toggles).

### AWS Amplify (SSR)

This repo includes an `amplify.yml` that writes selected Amplify environment variables into `.env.production` before running `next build`.

Set these in Amplify **App settings -> Environment variables**:
- `DATABASE_URL`
- `NEXTAUTH_SECRET` (or `AUTH_SECRET`)
- `NEXTAUTH_URL` (your deployed HTTPS URL)

If neither `NEXTAUTH_SECRET` nor `AUTH_SECRET` is set, the Amplify build now fails early with a clear error.

### Database Migration on Production

Ensure you run migrations against your production database during the build process or manually via CLI.
```bash
npx prisma migrate deploy
```

## Design System

- **Canvas:** Cloud White (`#FAFAFA`)
- **Thought:** Midnight Blue (`#1F2E46`)
- **Warmth:** Warm Taupe (`#A89F91`)
- **Action:** Sunset Coral (`#E07B7B`)
