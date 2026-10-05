# SLAWKA — Pilates & Movement Studio

Next.js 15 (App Router) site, statically generated. Bilingual (SR / EN), responsive, self-hosted fonts.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

## Edit content

| What | Where |
|---|---|
| All text (SR + EN), prices, rules | `lib/i18n.ts` |
| Phone, Instagram, address, map | `CONTACT` in `lib/i18n.ts` |
| About-section photo | drop `public/images/about.jpg`, then set `ABOUT_PHOTO = "/images/about.jpg"` in `components/Site.tsx` |
| Show / hide map | `SHOW_MAP` in `components/Site.tsx` |
| Colors, spacing, type | `app/globals.css` (tokens at the top) |
| SEO title / description | `app/layout.tsx` |
| Social share image | `app/opengraph-image.jpg` (1200×630) |

## Deploy to Vercel

1. Push this folder to a new GitHub repository:
   ```bash
   git init && git add . && git commit -m "SLAWKA website"
   git branch -M main
   git remote add origin https://github.com/<you>/slawka-web.git
   git push -u origin main
   ```
2. On vercel.com → **Add New… → Project** → import the repo. Next.js is detected automatically; keep the defaults → **Deploy**.
   (Without GitHub: run `npx vercel`, then `npx vercel --prod` from this folder.)
3. Optional environment variable: `NEXT_PUBLIC_SITE_URL` = `https://www.yourdomain.com` — used for the canonical URL, sitemap and share previews. Defaults to `https://www.slawkapilates.com`.

## Connect your domain

Vercel project → **Settings → Domains** → add `yourdomain.com` and `www.yourdomain.com`.
Then at your domain registrar's DNS settings add the records Vercel shows — typically:

| Type | Name | Value |
|---|---|---|
| A | `@` | `76.76.21.21` |
| CNAME | `www` | `cname.vercel-dns.com` |

Pick one as primary; Vercel redirects the other and issues HTTPS automatically. DNS changes take from minutes up to 48 h.
