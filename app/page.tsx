import Site from "@/components/Site";
import { CONTACT } from "@/lib/i18n";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "SLAWKA Pilates & Movement Studio",
  url: CONTACT.webHref,
  telephone: "+381617255541",
  sameAs: [CONTACT.instagramHref],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Durmitorska 24",
    addressLocality: "Kragujevac",
    addressCountry: "RS",
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Site />
    </>
  );
}
