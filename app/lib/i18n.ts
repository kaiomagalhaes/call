import { headers } from "next/headers";

export type Locale = "en" | "pt";

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "pt"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export type Messages = {
  htmlLang: string;
  homeMetaTitle: string;
  successMetaTitle: string;
  title: string;
  tagline: string;
  placeholder: string;
  inputLabel: string;
  button: string;
  fineprint: string;
  errorNotAllowed: string;
  errorAlertFailed: string;
  successTitle: string;
  successTagline: string;
  successImageAlt: string;
  successFineprint: string;
};

const DICTIONARIES: Record<Locale, Messages> = {
  en: {
    htmlLang: "en",
    homeMetaTitle: "Call Batman",
    successMetaTitle: "Batman Called",
    title: "Bat-Signal Hotline",
    tagline: "Type a name. Light the sky. Hope for the best.",
    placeholder: "e.g. Commissioner Gordon",
    inputLabel: "Name of the cop in distress",
    button: "Light the Signal",
    fineprint: "Service hours: dusk till dawn. Riddlers and clowns ineligible.",
    errorNotAllowed:
      "Gotham PD says no. Try Batman's pager — and good luck with that.",
    errorAlertFailed:
      "The Bat-Signal flickered out. Take a breath and try again, citizen.",
    successTitle: "The Bat is en route.",
    successTagline:
      "Stay where you are. Try not to die. He prefers a clean scene.",
    successImageAlt: "Batman, brooding, on his way",
    successFineprint:
      "ETA: dramatically. Estimated property damage: moderate.",
  },
  pt: {
    htmlLang: "pt",
    homeMetaTitle: "Chame o Batman",
    successMetaTitle: "Batman a Caminho",
    title: "Linha do Bat-Sinal",
    tagline: "Digite um nome. Acenda o céu. Reze pra dar certo.",
    placeholder: "ex: Comissário Gordon",
    inputLabel: "Nome do policial em apuros",
    button: "Acender o Sinal",
    fineprint:
      "Horário: do anoitecer ao amanhecer. Charadas e palhaços não atendidos.",
    errorNotAllowed:
      "A Polícia de Gotham disse não. Tente o pager do Batman — boa sorte com isso.",
    errorAlertFailed:
      "O Bat-Sinal piscou e apagou. Respire fundo e tente de novo, cidadão.",
    successTitle: "O Morcego está a caminho.",
    successTagline:
      "Fique onde está. Tente não morrer. Ele prefere a cena limpa.",
    successImageAlt: "Batman, pensativo, a caminho",
    successFineprint:
      "Chegada: dramática. Danos materiais estimados: moderados.",
  },
};

export async function getLocale(): Promise<Locale> {
  const headerList = await headers();
  const accept = headerList.get("accept-language") ?? "";
  const candidates = accept
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .filter((tag): tag is string => Boolean(tag));

  for (const tag of candidates) {
    const base = tag.split("-")[0];
    if ((SUPPORTED_LOCALES as readonly string[]).includes(base)) {
      return base as Locale;
    }
  }
  return DEFAULT_LOCALE;
}

export async function getMessages(): Promise<{
  locale: Locale;
  t: Messages;
}> {
  const locale = await getLocale();
  return { locale, t: DICTIONARIES[locale] };
}
