# Citral AI — Landing Page

The "coming soon" landing page for Citral AI.

## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Get these from Supabase → Project Settings → API.

## Database Setup

Run `supabase-migration.sql` in the Supabase SQL Editor. This creates:

- `waitlist_clicks` — tracks when users click "Join Waitlist"
- `contact_submissions` — stores form data from the Contact Us modal

Both tables have RLS enabled with anon insert policies.

## Deploy

```bash
npm run build
```

Deploys cleanly to Vercel, Cloudflare Pages, or any Node host. Set the env vars
in your hosting provider's dashboard.

## Stack

- Next.js 16 App Router
- Tailwind CSS
- Framer Motion
- @mesh-gradient/react
- Supabase
- Geist + Instrument Serif fonts
