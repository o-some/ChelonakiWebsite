/** @typedef {'ltr'|'rtl'} LocaleDirection */
/** @typedef {{code:string,htmlLang:string,label:string,nativeLabel:string,direction:LocaleDirection,enabled:boolean,defaultForCountries:string[],aliases:string[],fallbackLocale:string,dateLocale:string,numberLocale:string,currency:string,fontGroup:'latin'|'arabic'|'cjk'|'other'}} LocaleConfig */

/** @type {LocaleConfig[]} */
export const localeRegistry = [
  {
    code: "de",
    htmlLang: "de-DE",
    label: "Deutsch",
    nativeLabel: "Deutsch",
    direction: "ltr",
    enabled: true,
    defaultForCountries: ["DE", "AT"],
    aliases: ["de-DE", "de-AT"],
    fallbackLocale: "en",
    dateLocale: "de-DE",
    numberLocale: "de-DE",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "en",
    htmlLang: "en",
    label: "Englisch",
    nativeLabel: "English",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["US", "GB", "IE", "AU", "NZ"],
    aliases: ["en-US", "en-GB"],
    fallbackLocale: "de",
    dateLocale: "en-GB",
    numberLocale: "en-GB",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "el",
    htmlLang: "el-GR",
    label: "Griechisch",
    nativeLabel: "Ελληνικά",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["GR", "CY"],
    aliases: ["el-GR"],
    fallbackLocale: "en",
    dateLocale: "el-GR",
    numberLocale: "el-GR",
    currency: "EUR",
    fontGroup: "other",
  },
  {
    code: "fr",
    htmlLang: "fr-FR",
    label: "Französisch",
    nativeLabel: "Français",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["FR"],
    aliases: ["fr-FR"],
    fallbackLocale: "en",
    dateLocale: "fr-FR",
    numberLocale: "fr-FR",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "es",
    htmlLang: "es-ES",
    label: "Spanisch",
    nativeLabel: "Español",
    direction: "ltr",
    enabled: false,
    defaultForCountries: [
      "ES",
      "MX",
      "AR",
      "CL",
      "CO",
      "PE",
      "UY",
      "PY",
      "BO",
      "EC",
      "VE",
      "CR",
      "PA",
      "GT",
      "HN",
      "SV",
      "NI",
      "DO",
      "CU",
    ],
    aliases: ["es-ES", "es-MX"],
    fallbackLocale: "en",
    dateLocale: "es-ES",
    numberLocale: "es-ES",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "tr",
    htmlLang: "tr-TR",
    label: "Türkisch",
    nativeLabel: "Türkçe",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["TR"],
    aliases: ["tr-TR"],
    fallbackLocale: "en",
    dateLocale: "tr-TR",
    numberLocale: "tr-TR",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "pl",
    htmlLang: "pl-PL",
    label: "Polnisch",
    nativeLabel: "Polski",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["PL"],
    aliases: ["pl-PL"],
    fallbackLocale: "en",
    dateLocale: "pl-PL",
    numberLocale: "pl-PL",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "nl",
    htmlLang: "nl-NL",
    label: "Niederländisch",
    nativeLabel: "Nederlands",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["NL"],
    aliases: ["nl-NL"],
    fallbackLocale: "en",
    dateLocale: "nl-NL",
    numberLocale: "nl-NL",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "it",
    htmlLang: "it-IT",
    label: "Italienisch",
    nativeLabel: "Italiano",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["IT"],
    aliases: ["it-IT"],
    fallbackLocale: "en",
    dateLocale: "it-IT",
    numberLocale: "it-IT",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "pt",
    htmlLang: "pt-PT",
    label: "Portugiesisch",
    nativeLabel: "Português",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["PT", "BR"],
    aliases: ["pt-PT", "pt-BR"],
    fallbackLocale: "en",
    dateLocale: "pt-PT",
    numberLocale: "pt-PT",
    currency: "EUR",
    fontGroup: "latin",
  },
  {
    code: "ru",
    htmlLang: "ru-RU",
    label: "Russisch",
    nativeLabel: "Русский",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["RU"],
    aliases: ["ru-RU"],
    fallbackLocale: "en",
    dateLocale: "ru-RU",
    numberLocale: "ru-RU",
    currency: "EUR",
    fontGroup: "other",
  },
  {
    code: "ar",
    htmlLang: "ar",
    label: "Arabisch",
    nativeLabel: "العربية",
    direction: "rtl",
    enabled: false,
    defaultForCountries: [
      "SA",
      "AE",
      "EG",
      "JO",
      "LB",
      "IQ",
      "KW",
      "QA",
      "BH",
      "OM",
      "MA",
      "DZ",
      "TN",
    ],
    aliases: ["ar-SA", "ar-EG"],
    fallbackLocale: "en",
    dateLocale: "ar",
    numberLocale: "ar",
    currency: "EUR",
    fontGroup: "arabic",
  },
  {
    code: "ja",
    htmlLang: "ja-JP",
    label: "Japanisch",
    nativeLabel: "日本語",
    direction: "ltr",
    enabled: false,
    defaultForCountries: ["JP"],
    aliases: ["ja-JP"],
    fallbackLocale: "en",
    dateLocale: "ja-JP",
    numberLocale: "ja-JP",
    currency: "JPY",
    fontGroup: "cjk",
  },
];

export const enabledLocales = localeRegistry.filter((locale) => locale.enabled);
export const defaultLocale = "de";
export const ambiguousCountryCodes = ["CH", "BE", "CA"];
export const localeByCode = Object.fromEntries(
  localeRegistry.map((locale) => [locale.code, locale]),
);

export function normalizeLanguageCode(value) {
  if (!value || typeof value !== "string") return null;
  const normalized = value.trim().replace("_", "-").toLowerCase();
  const match = localeRegistry.find((locale) =>
    [locale.code, locale.htmlLang, ...locale.aliases].some(
      (alias) => alias.toLowerCase() === normalized,
    ),
  );
  const base = normalized.split("-")[0];
  const locale = match || localeByCode[base];
  return locale?.enabled ? locale.code : null;
}

export function getLanguageFromUrl(pathname = "/") {
  const segment = pathname.split("/").filter(Boolean)[0];
  return normalizeLanguageCode(segment);
}

export function stripLanguageFromPath(pathname = "/") {
  const language = getLanguageFromUrl(pathname);
  if (!language) return pathname || "/";
  const stripped = pathname.replace(new RegExp(`^/${language}(?=/|$)`), "");
  return stripped || "/";
}

export function localizePath(pathname, language) {
  const valid = normalizeLanguageCode(language) || defaultLocale;
  const base = stripLanguageFromPath(pathname);
  return `/${valid}${base === "/" ? "" : base}`;
}

export function getCountryFallbackLanguage(country) {
  const code = String(country || "").toUpperCase();
  if (!code || ambiguousCountryCodes.includes(code)) return null;
  return (
    enabledLocales.find((locale) => locale.defaultForCountries.includes(code))
      ?.code || (localeByCode.en?.enabled ? "en" : defaultLocale)
  );
}

export function resolvePreferredLanguage({
  urlLanguage,
  storedLanguage,
  browserLanguages = [],
  country,
} = {}) {
  const url = normalizeLanguageCode(urlLanguage);
  if (url) return { language: url, source: "url" };
  const stored = normalizeLanguageCode(storedLanguage);
  if (stored) return { language: stored, source: "stored" };
  for (const candidate of browserLanguages || []) {
    const browser = normalizeLanguageCode(candidate);
    if (browser) return { language: browser, source: "browser" };
  }
  const countryLanguage = getCountryFallbackLanguage(country);
  if (countryLanguage) return { language: countryLanguage, source: "country" };
  return { language: defaultLocale, source: "default" };
}

export const getLocale = (code) =>
  localeByCode[normalizeLanguageCode(code) || defaultLocale];
export const formatNumber = (value, code, options) =>
  new Intl.NumberFormat(getLocale(code).numberLocale, options).format(value);
export const formatDate = (value, code, options) =>
  new Intl.DateTimeFormat(getLocale(code).dateLocale, options).format(value);
export const formatList = (value, code, options) =>
  new Intl.ListFormat(getLocale(code).dateLocale, options).format(value);
export const formatPlural = (value, code, options) =>
  new Intl.PluralRules(getLocale(code).dateLocale, options).select(value);
