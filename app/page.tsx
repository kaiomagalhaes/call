import type { Metadata } from "next";
import { callBatmanAction } from "./actions";
import { getMessages } from "./lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getMessages();
  return { title: t.homeMetaTitle };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, { t }] = await Promise.all([searchParams, getMessages()]);
  const errorMessage =
    error === "not_allowed"
      ? t.errorNotAllowed
      : error === "alert_failed"
        ? t.errorAlertFailed
        : undefined;

  return (
    <main>
      <h1>{t.title}</h1>
      <p className="tagline">{t.tagline}</p>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <form action={callBatmanAction}>
        <input
          type="text"
          name="victim_name"
          placeholder={t.placeholder}
          aria-label={t.inputLabel}
          autoComplete="off"
          required
        />
        <button type="submit">{t.button}</button>
      </form>

      <p className="fineprint">{t.fineprint}</p>
    </main>
  );
}
