import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slawkapilates.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SLAWKA — Pilates & Movement Studio · Kragujevac",
  description:
    "Individualni trening na pilates reformeru u Kragujevcu. Align Pilates reformer, časovi od 50 minuta, besplatan probni trening.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SLAWKA",
    title: "SLAWKA — Pilates & Movement Studio",
    description: "Individualni trening na pilates reformeru · Kragujevac",
    locale: "sr_RS",
    alternateLocale: ["en_US"],
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#F2E9D8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
