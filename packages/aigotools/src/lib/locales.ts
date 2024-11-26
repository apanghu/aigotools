import { Pathnames } from "next-intl/navigation";
export const Languages = [
  {
    lang: "en",
    label: "🇺🇸 English",
  },
  {
    lang: "cn",
    label: "🇨🇳 简体中文",
  },
  {
    lang: "tw",
    label: "🇨🇳 繁體中文",
  },
  {
    lang: "es",
    label: "🇪🇸 Español",
  },
  {
    lang: "de",
    label: "🇩🇪 Deutsch",
  },
  {
    lang: "ja",
    label: "🇯🇵 日本語",
  },
  {
    lang: "ru",
    label: "🇷🇺 Русский",
  },
  {
    lang: "pt",
    label: "🇵🇹 Português",
  },
  {
    lang: "ar",
    label: "🇸🇦 العربية",
  },
  {
    lang: "it",
    label: "🇮🇹 Italiano",
  },
  {
    lang: "nl",
    label: "🇳🇱 Nederlands",
  },
  {
    lang: "ko",
    label: "🇰🇷 한국어",
  },
];

export const pathnames = {
  "/": "/",
} satisfies Pathnames<typeof AvailableLocales>;
export const AvailableLocales = Languages.map((l) => l.lang);
