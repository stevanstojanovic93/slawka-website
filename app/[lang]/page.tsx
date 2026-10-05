import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Rules } from "@/components/sections/Rules";
import { Services } from "@/components/sections/Services";
import { JsonLd } from "@/components/ui/JsonLd";
import { getDictionary, isLocale } from "@/lib/i18n";
import { buildLocalBusinessJsonLd } from "@/lib/jsonld";
import styles from "./page.module.css";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <div className={styles.page}>
      <JsonLd data={buildLocalBusinessJsonLd(lang, t)} />
      <Header lang={lang} t={t} />
      <main id="main" tabIndex={-1} className={styles.main}>
        <Hero t={t} />
        <About t={t} />
        <Services lang={lang} t={t} />
        <Rules t={t} />
        <Contact lang={lang} t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
