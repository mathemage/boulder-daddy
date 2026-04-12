# boulder-daddy: Professional website for coaching and teaching bouldering/climbing by @mathemage

[![CI](https://github.com/mathemage/boulder-daddy/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mathemage/boulder-daddy/actions/workflows/ci.yml)
[![Code: Apache-2.0](https://img.shields.io/badge/Code-Apache%202.0-blue.svg)](https://choosealicense.com/licenses/apache-2.0/)
[![Content: All rights reserved](https://img.shields.io/badge/Content-All%20rights%20reserved-lightgrey.svg)](./LICENSE-CONTENT)

Professional bouldering coaching website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Features Instagram integration, a contact form with validation, SEO metadata, and a clean, responsive design.

## Requirements

- **Node.js 20.9.0 or newer** (Node 20 LTS recommended)
- **pnpm 10 or newer**

If you use `nvm`, the repository includes an `.nvmrc` so you can switch versions quickly:

```bash
nvm install
nvm use
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4**
- **Zod** for validation
- **React Hook Form** with `@hookform/resolvers`
- **Framer Motion** for animations (with reduced-motion support)
- **clsx** + **tailwind-merge** for class composition
- **Vitest** for testing
- **Prettier** + **ESLint** for formatting and linting

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home
│   ├── coaching/page.tsx   # Coaching details
│   ├── pricing/page.tsx    # Pricing + FAQ
│   ├── about/page.tsx      # Coach bio
│   ├── results/page.tsx    # Testimonials + progress
│   ├── contact/page.tsx    # Contact form
│   ├── legal/privacy/      # Privacy policy
│   ├── api/contact/        # Contact form API route
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/             # React components
│   ├── Header.tsx          # Sticky header with mobile menu
│   ├── Footer.tsx          # Site footer
│   ├── CTAButton.tsx       # Call-to-action button
│   ├── Hero.tsx            # Hero section
│   ├── ServiceCards.tsx    # Service cards grid
│   ├── PricingTable.tsx    # Pricing tiers
│   ├── Testimonials.tsx    # Testimonial cards
│   ├── FAQ.tsx             # Accordion FAQ
│   ├── InstagramGallery.tsx # Instagram photo grid
│   ├── LightboxModal.tsx   # Image lightbox
│   └── ContactForm.tsx     # Contact form with validation
├── content/                # Content data (easy to edit)
│   ├── services.ts         # Coaching offerings
│   ├── site.ts             # Public site and coach data
│   ├── pricing.ts          # Pricing tiers
│   ├── testimonials.ts     # Client testimonials
│   ├── faqs.ts             # FAQ entries
│   └── instagram.json      # Manual Instagram posts
├── lib/                    # Utilities and services
│   ├── cn.ts               # clsx + tailwind-merge helper
│   ├── env.ts              # Typed environment variables
│   ├── schemas/contact.ts  # Zod contact form schema
│   ├── email/index.ts      # Email provider abstraction
│   └── instagram/          # Instagram feed service
│       ├── types.ts
│       ├── getInstagramPosts.ts
│       └── index.ts
└── __tests__/              # Unit tests
    ├── contact-schema.test.ts
    └── instagram-mapping.test.ts
```

## Configuration

Copy `.env.example` to `.env.local` and update any environment-specific values you need:

```bash
cp .env.example .env.local
```

Public site and coach values (brand name, coach name, city, email, site URL, Instagram handle, and booking URL) live in `src/content/site.ts` so they can be versioned with the rest of your site content.

### Environment Variables

| Variable                       | Required | Description                                                           |
| ------------------------------ | -------- | --------------------------------------------------------------------- |
| `INSTAGRAM_MODE`               | No       | `manual`, `proxy`, or `graph` (default: `manual`)                     |
| `INSTAGRAM_MANUAL_JSON_PATH`   | No       | Path to manual Instagram JSON (default: `src/content/instagram.json`) |
| `INSTAGRAM_PROXY_URL`          | No       | URL for RSS/JSON proxy (when mode is `proxy`)                         |
| `INSTAGRAM_GRAPH_ACCESS_TOKEN` | No       | Instagram Graph API token (when mode is `graph`)                      |
| `INSTAGRAM_GRAPH_USER_ID`      | No       | Instagram Graph API user ID (when mode is `graph`)                    |
| `NEXT_PUBLIC_ANALYTICS`        | No       | Analytics provider identifier                                         |

## Instagram Integration

The site supports three Instagram modes:

### 1. Manual (default)

Edit `src/content/instagram.json` with your posts. Each entry needs:

```json
{
  "id": "unique-id",
  "image": "/instagram/POST_ID.jpg",
  "caption": "Post caption",
  "url": "https://www.instagram.com/reel/POST_ID/",
  "timestamp": "2025-01-15T10:00:00Z"
}
```

`image` can point at a checked-in file under `public/` or a remote image URL. The homepage gallery renders the first 12 posts, so keep the file ordered newest-first and add any curated extras after that.

### 2. Proxy

Set `INSTAGRAM_MODE=proxy` and `INSTAGRAM_PROXY_URL` to a JSON endpoint that returns an array of Instagram posts. The service maps common field names (`id`, `shortcode`, `image`, `thumbnail_url`, `display_url`, `caption`, `text`, `url`, `permalink`, `timestamp`, `taken_at`).

> **Note:** If your proxy serves images from a domain not already listed in `next.config.ts` `images.remotePatterns`, you must add it there for `next/image` optimization to work. By default, `*.cdninstagram.com` and `*.fbcdn.net` are allowed.

### 3. Graph API

Set `INSTAGRAM_MODE=graph` with `INSTAGRAM_GRAPH_ACCESS_TOKEN` and `INSTAGRAM_GRAPH_USER_ID`. Requires an approved Facebook/Instagram app with Basic Display or Graph API access. Posts are cached and revalidated every 6 hours.

If proxy or Graph API calls fail, the service automatically falls back to manual JSON.

## Editing Content

All site content lives in `src/content/`:

- **Site profile**: Edit `site.ts` to set your public brand name, coach name, city, email, site URL, Instagram handle, and booking URL
- **Services**: Edit `services.ts` to add/remove/modify coaching offerings
- **Pricing**: Edit `pricing.ts` to update tiers and features
- **Testimonials**: Edit `testimonials.ts` to add client stories
- **FAQs**: Edit `faqs.ts` to update frequently asked questions
- **Instagram**: Edit `instagram.json` for manual Instagram posts

All content files are typed — TypeScript will catch any schema mismatches.

## Email / Contact Form

The contact form submits to `/api/contact` which validates with Zod and sends via the email abstraction in `src/lib/email/index.ts`.

**In development**: Submissions are logged to the console.

**In production**: Integrate with your email provider. The file includes a commented Resend example. You can also integrate SendGrid, Postmark, etc.

Spam protection includes:

- Honeypot field (hidden from users, catches bots)
- Optional reCAPTCHA (set env vars to enable)

## Deploying to Vercel

1. Push your repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add the environment variables from the configuration table above in the Vercel dashboard for both the **Preview** and **Production** environments
4. Deploy — Vercel auto-detects Next.js

### Pull request previews in Vercel

If this repository is connected to Vercel through **Project Settings → Git**, Vercel automatically creates **Preview** deployments for pull requests and non-`main` branches.

You can view those previews in:

- the pull request **Checks** and **Conversation** tabs via the Vercel GitHub app
- the Vercel dashboard under **Deployments** filtered to the **Preview** environment

To keep previews consistent with production, mirror the same runtime variable keys from the configuration table above in Vercel's **Preview** environment. If a value should differ for previews, set it there explicitly; otherwise, copy the production value into Preview as well.

Because Vercel already handles preview deployments for connected repositories, this project does not need a separate GitHub Actions workflow to deploy PR previews. GitHub Actions is used here only for CI validation such as lint, test, and build checks.

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
```

## TODOs

- [x] Set your real coach name, city, and email in `src/content/site.ts`
- [x] Replace placeholder Instagram posts in `src/content/instagram.json` with real content
- [ ] Configure Instagram Graph API (optional — set env vars)
- [ ] Set up email provider (Resend, SendGrid, etc.) in `src/lib/email/index.ts`
- [ ] Add real testimonials and pricing in `src/content/`
- [ ] Add a favicon and OG image in `public/`
- [ ] Configure a custom domain in Vercel

## License

The software source code in this repository is licensed under the
[Apache License 2.0](./LICENSE).

Branding, site copy, testimonials, pricing/content data, and image/media
assets are not licensed under Apache-2.0 and remain all rights reserved.
See [LICENSE-CONTENT](./LICENSE-CONTENT) for the proprietary notice. This
includes `src/content/` and any custom project assets in `public/` unless a
file states otherwise.

Apache-2.0 also does not grant trademark rights in the mathemage name
or branding. Third-party assets remain subject to their own terms.
