# Boulder Daddy

Professional bouldering coaching website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Features Instagram integration, a contact form with validation, SEO metadata, and a clean, responsive design.

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

Copy `.env.example` to `.env.local` and update the values:

```bash
cp .env.example .env.local
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SITE_URL` | Yes | Your site URL (e.g., `https://yourdomain.com`) |
| `COACH_NAME` | Yes | Your name as displayed on the site |
| `COACH_CITY` | Yes | Your city/location |
| `COACH_EMAIL` | Yes | Your contact email |
| `COACH_IG_USERNAME` | Yes | Your Instagram handle |
| `BOOKING_URL` | No | External booking link (shows "Book a Session" button if set) |
| `INSTAGRAM_MODE` | Yes | `manual`, `proxy`, or `graph` |
| `INSTAGRAM_MANUAL_JSON_PATH` | No | Path to manual Instagram JSON (default: `src/content/instagram.json`) |
| `INSTAGRAM_PROXY_URL` | No | URL for RSS/JSON proxy (when mode is `proxy`) |
| `INSTAGRAM_GRAPH_ACCESS_TOKEN` | No | Instagram Graph API token (when mode is `graph`) |
| `INSTAGRAM_GRAPH_USER_ID` | No | Instagram Graph API user ID (when mode is `graph`) |
| `RECAPTCHA_SITE_KEY` | No | Google reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | No | Google reCAPTCHA secret key |
| `NEXT_PUBLIC_ANALYTICS` | No | Analytics provider identifier |

## Instagram Integration

The site supports three Instagram modes:

### 1. Manual (default)

Edit `src/content/instagram.json` with your posts. Each entry needs:

```json
{
  "id": "unique-id",
  "image": "https://url-to-image.jpg",
  "caption": "Post caption",
  "url": "https://instagram.com/p/POST_ID",
  "timestamp": "2025-01-15T10:00:00Z"
}
```

### 2. Proxy

Set `INSTAGRAM_MODE=proxy` and `INSTAGRAM_PROXY_URL` to a JSON endpoint that returns an array of Instagram posts. The service maps common field names (`id`, `shortcode`, `image`, `thumbnail_url`, `display_url`, `caption`, `text`, `url`, `permalink`, `timestamp`, `taken_at`).

> **Note:** If your proxy serves images from a domain not already listed in `next.config.ts` `images.remotePatterns`, you must add it there for `next/image` optimization to work. By default, `*.cdninstagram.com` and `*.fbcdn.net` are allowed.

### 3. Graph API

Set `INSTAGRAM_MODE=graph` with `INSTAGRAM_GRAPH_ACCESS_TOKEN` and `INSTAGRAM_GRAPH_USER_ID`. Requires an approved Facebook/Instagram app with Basic Display or Graph API access. Posts are cached and revalidated every 6 hours.

If proxy or Graph API calls fail, the service automatically falls back to manual JSON.

## Editing Content

All site content lives in `src/content/`:

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
3. Add your environment variables in the Vercel dashboard
4. Deploy — Vercel auto-detects Next.js

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

- [ ] Set your real coach name, city, and email in `.env.local`
- [ ] Replace placeholder Instagram posts in `src/content/instagram.json` with real content
- [ ] Configure Instagram Graph API (optional — set env vars)
- [ ] Set up email provider (Resend, SendGrid, etc.) in `src/lib/email/index.ts`
- [ ] Add real testimonials and pricing in `src/content/`
- [ ] Add a favicon and OG image in `public/`
- [ ] Configure a custom domain in Vercel

## License

See [LICENSE](./LICENSE).
