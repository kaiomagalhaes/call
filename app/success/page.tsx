import type { Metadata } from "next";
import { getMessages } from "../lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getMessages();
  return { title: t.successMetaTitle };
}

export default async function SuccessPage() {
  const { t } = await getMessages();
  return (
    <main>
      <h1>{t.successTitle}</h1>
      <p className="tagline">{t.successTagline}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="success-image"
        src="https://i.ytimg.com/vi/i00wXlIktog/sddefault.jpg"
        alt={t.successImageAlt}
      />
      <p className="fineprint">{t.successFineprint}</p>
    </main>
  );
}
