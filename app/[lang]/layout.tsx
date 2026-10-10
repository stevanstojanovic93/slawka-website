import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import { notFound } from "next/navigation";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { SkipLink } from "@/components/layout/SkipLink";
import { Texture } from "@/components/layout/Texture";
import { DEFAULT_LOCALE, getDictionary, isLocale, LOCALES, localePath, OG_LOCALES } from "@/lib/i18n";
import { BRAND, SITE_URL } from "@/lib/site";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/utilities.css";

// Downloaded at build time and served from this domain (no requests to Google at runtime).
const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Figtree({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  const languages = Object.fromEntries(LOCALES.map((l) => [l, localePath(l)]));

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localePath(lang),
      languages: { ...languages, "x-default": localePath(DEFAULT_LOCALE) },
    },
    openGraph: {
      type: "website",
      url: localePath(lang),
      siteName: BRAND.name,
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: t.meta.ogImageAlt }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#F2E9D8",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    // suppressHydrationWarning: the inline script below adds the "js" class before React hydrates.
    <html lang={lang} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        {/* Runs before first paint so reveal-on-scroll content starts hidden instead of flashing. */}
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        <SkipLink label={t.a11y.skipToContent} />
        <Texture />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
