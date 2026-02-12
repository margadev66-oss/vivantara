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

For MilesWeb deployments, use the Next.js standalone output for a smaller runtime bundle and predictable start command.

1. In your MilesWeb Node.js app settings, use:
   - **Build command:** `npm run build:milesweb`
   - **Start command:** `npm run start:standalone`
2. Configure environment variables in MilesWeb panel:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` (or `AUTH_SECRET`)
   - `NEXTAUTH_URL` (your production URL)
   - `PORT` (if MilesWeb requires a specific port)
3. If your deployment flow supports post-build commands, run:
   ```bash
   npx prisma migrate deploy
   ```

This repository now enables `output: "standalone"` in `next.config.ts` so MilesWeb can run directly with `node .next/standalone/server.js`.

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
