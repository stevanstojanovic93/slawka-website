# SLAWKA — Pilates & Movement Studio

Next.js 16 (App Router) site, fully statically generated. Bilingual with a URL per language:

| URL | Language |
|---|---|
| `/` | Serbian (default) |
| `/en` | English |

`/sr` redirects to `/`. Both pages link to each other with `hreflang` for search engines.

## Run locally

Requires Node 24 (`nvm use` picks it up from `.nvmrc`).

```bash
npm install
npm run dev         # http://localhost:3000
npm run lint        # ESLint
npm run typecheck   # TypeScript
npm run build       # production build
npm test            # Playwright + axe accessibility checks (run `npm run build` first)
```

CI (`.github/workflows/ci.yml`) runs all of the above on every push and pull request.

## Edit content

| What | Where |
|---|---|
| Phone, Instagram, address, map coordinates, opening hours, prices, booking link | `lib/site.ts` |
| All text (SR / EN), plan names, studio rules, SEO title & description | `lib/i18n/sr.ts`, `lib/i18n/en.ts` |
| About-section photo | drop `public/images/about.jpg`, then set `ABOUT_PHOTO = "/images/about.jpg"` in `lib/site.ts` |
| Show / hide map | `SHOW_MAP` in `lib/site.ts` |
| Colours, spacing, fonts | `app/styles/tokens.css` |
| Social share image | `public/images/og.jpg` (1200×630) |
| Favicon / iOS icon | `app/icon.svg`, `app/apple-icon.tsx` |

Adding a price plan: add the amount to `PRICES` in `lib/site.ts` and a matching `{ title, sub }` entry to `services.plans` in **both** dictionaries. TypeScript fails the build if the counts don't match.

## Code structure

```
app/[lang]/        layout (fonts, metadata, <html lang>) and page for each language
app/styles/        tokens.css · base.css · utilities.css (shared classes)
components/layout/ Header, NavLinks, LanguageSwitcher, MobileMenu, Footer, SkipLink, Texture
components/sections/ Hero, About, Services (TrialCard, PriceList), Rules (RuleCard), Contact (ContactTiles, MapEmbed)
components/ui/     Logo, Icon, ExternalLink, JsonLd
lib/               site data, i18n dictionaries, JSON-LD and price formatting
tests/             Playwright end-to-end tests
```

Each component has its styles next to it in a `*.module.css` file. Everything renders on the server. The only client-side JavaScript is the scroll-spy in `NavLinks`, the `<dialog>` in `MobileMenu` and the click-to-load `MapEmbed`.

## Deploy to Vercel

1. Push the repository to GitHub.
2. On vercel.com → **Add New… → Project** → import the repo. Next.js is detected automatically; keep the defaults → **Deploy**.
   (Without GitHub: run `npx vercel`, then `npx vercel --prod`.)
3. Optional environment variable: `NEXT_PUBLIC_SITE_URL` = `https://www.yourdomain.com`. It's used for canonical URLs, hreflang, the sitemap and share previews. Defaults to `https://www.slawkapilates.com`.

Security headers (CSP, `nosniff`, referrer and permissions policies) are set in `next.config.ts`. If you add a third-party script or embed, allow its domain in the CSP there.

## Connect your domain

Vercel project → **Settings → Domains** → add `yourdomain.com` and `www.yourdomain.com`.
Then at your domain registrar's DNS settings add the records Vercel shows — typically:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Pick one as primary; Vercel redirects the other and issues HTTPS automatically. DNS changes take from minutes up to 48 h.
