# Citral AI — Landing Page

The "coming soon" landing page for [citral.ai](https://citral.ai).

Live: TBD (deploy to Vercel — see below)
Stack: Next.js 16 · Tailwind · Framer Motion · Supabase

## Quick Start

```bash
npm install
cp .env.local.template .env.local   # then fill in Supabase keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://erpkdncdgbcxcohdggwr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_7cHbzFuG-3aqQ-GGWGsP_A_vws4bZXz
```

Get fresh keys from Supabase → Project Settings → API.

## Database Setup

The Supabase project is already provisioned. If you're starting from scratch,
run [`supabase-migration.sql`](./supabase-migration.sql) in the Supabase SQL
Editor. It creates:

- `waitlist_clicks` — logs every Join Waitlist button click
- `contact_submissions` — stores Contact Us modal submissions (name, email, phone, message)

Both tables have RLS enabled with `anon` insert policies.

## Deploy

### Option A — Vercel CLI

```bash
npm i -g vercel
vercel

# Then add env vars (must be done BEFORE the production deploy):
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

vercel --prod

# Custom domain:
vercel domains add citral.ai
```

### Option B — Vercel Dashboard

1. Go to https://vercel.com/new
2. Import `citral-ai/citral-landing` from GitHub
3. Framework: Next.js (auto-detected)
4. Add env vars on the import screen:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy
6. In Settings → Domains, add `citral.ai`

### Option C — Cloudflare Pages

Same flow — connect the GitHub repo, set the env vars, build command
`npm run build`, output `.next`.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          Root layout, metadata, OG tags, fonts
│   ├── page.tsx            Single hero page composition
│   └── globals.css         Tailwind, custom animations (grain, scan beam, period pulse)
├── components/
│   ├── HeroContent.tsx     Logo, headline, CTA, social icons
│   ├── Navbar.tsx          Fixed glass nav with logo + Contact button
│   ├── ContactModal.tsx    Form modal — saves to Supabase
│   ├── WaitlistForm.tsx    Pill button → opens Google Form, logs click to Supabase
│   ├── AuditTerminal.tsx   Auto-typing terminal showing simulated audit output
│   ├── MeshBackground.tsx  Animated WebGL mesh gradient
│   ├── FloatingFragments.tsx  Drifting regulatory text fragments
│   ├── Spotlight.tsx       Mouse-following teal glow
│   └── ScrambleText.tsx    Text scramble animation utility
└── lib/
    └── supabase.ts         Supabase client (env-gated)
```

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion + custom CSS keyframes
- **Background**: `@mesh-gradient/react` (Stripe-style WebGL)
- **Database**: Supabase (Postgres + RLS)
- **Fonts**: Geist Sans/Mono (Vercel) + Instrument Serif (italic display)
- **Forms**: Google Forms (waitlist) + native form → Supabase (contact)

## Brand

- **Tagline**: We Catch What Humans Miss.
- **Colors**:
  - Navy Black `#020a08` (background)
  - Citral Teal `#00C2A8` (primary accent)
  - Signal Gold `#E8C84A` (warnings)
  - Clinical White `#f7f8f8` (text)
  - Alert Red `#FF6B6B` (criticals only)

## Social

- Instagram: [@citral.ai](https://instagram.com/citral.ai)
- LinkedIn: [citral-ai](https://linkedin.com/company/citral-ai)
- Twitter/X: [@citralai](https://twitter.com/citralai)
- Contact: prateek@citral.ai
