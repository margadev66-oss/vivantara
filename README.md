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
    - `NEXTAUTH_SECRET`: A random string (generate with `openssl rand -base64 32`).
    - `NEXTAUTH_URL`: The URL of your deployed site (e.g., `https://vivantara.vercel.app`).
4.  Redeploy.

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
