import { hubData, services } from "./siteData.js";

export const siteOrigin = "https://chelonaki.eu";
export const brandName = "Chelonaki";

export const legacyRouteMap = {
  "/digital": "/web-apps-publikationen",
  "/expertise": "/ki-beratung-weiterbildung",
  "/beratung-schulung": "/ki-beratung-weiterbildung",
  "/beratung-schulung/ki-consulting":
    "/ki-beratung-weiterbildung/ki-beratung-unternehmen",
  "/beratung-schulung/ki-schulungen":
    "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
  "/beratung-schulung/workshops":
    "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
  "/beratung-schulung/academy": "/ki-beratung-weiterbildung/video-academy",
  "/beratung-schulung/academy/ki": "/ki-beratung-weiterbildung/video-academy",
  "/beratung-schulung/academy/ernaehrung":
    "/ki-beratung-weiterbildung/video-academy",
  "/beratung-schulung/ernaehrungsberatung": "/ki-beratung-weiterbildung",
  "/beratung-schulung/ernaehrungsberatung/unternehmen":
    "/ki-beratung-weiterbildung",
  "/beratung-schulung/ernaehrungsberatung/privat": "/ki-beratung-weiterbildung",
  "/lab": "/demowelten",
  "/digital/websites-shopify":
    "/web-apps-publikationen/websites-erstellen-lassen",
  "/digital/websites-erstellen-lassen":
    "/web-apps-publikationen/websites-erstellen-lassen",
  "/digital/apps-software": "/web-apps-publikationen/apps-entwickeln-lassen",
  "/digital/buchproduktion-ghostwriting":
    "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  "/digital/social-media-content": "/medien-ai/social-media",
  "/digital/content-social-media": "/medien-ai/social-media",
  "/digital/telefonassistenten": "/medien-ai/ki-telefon",
  "/digital/ki-telefonassistenten": "/medien-ai/ki-telefon",
  "/digital/ads": "/medien-ai/ads",
  "/digital/ki-werbung-meta-google": "/medien-ai/ads",
  "/expertise/ki-consulting":
    "/ki-beratung-weiterbildung/ki-beratung-unternehmen",
  "/expertise/ki-schulungen-consulting":
    "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
  "/expertise/academy": "/ki-beratung-weiterbildung/video-academy",
  "/expertise/ernaehrungsberatung": "/ki-beratung-weiterbildung",
  "/our-story": "/ueber-uns",
  "/originals/spiele": "/originals/apps",
  "/originals/digitale-produkte": "/originals/apps",
  "/web-apps-publikationen/buecher-erstellen-lassen":
    "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  "/web-apps-publikationen/ghostwriting":
    "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
};

export const routeNames = {
  "/": "KI-gestütztes Innovationsstudio",
  "/web-apps-publikationen": "Web, Apps & Publikationen",
  "/medien-ai": "Medien & KI",
  "/ki-beratung-weiterbildung": "KI-Beratung & Weiterbildung",
  "/ki-beratung-weiterbildung/video-academy": "Chelonaki Video Academy",
  "/originals": "Eigene Apps & Bücher",
  "/originals/apps": "Eigene Apps",
  "/originals/apps/evofit": "Chelonaki EvoFit",
  "/originals/apps/chelonaki-reply": "Chelonaki Reply",
  "/originals/buecher": "Eigene Bücher",
  "/demowelten": "Designbeispiele",
  "/paketfinder": "Paketfinder",
  "/qualitaet": "Qualitätsrahmen",
  "/ueber-uns": "Über Chelonaki",
  "/kontakt": "Kontakt",
  "/impressum": "Impressum",
  "/datenschutz": "Datenschutzerklärung",
  "/datenschutzeinstellungen": "Datenschutz-Einstellungen",
  "/agb": "Allgemeine Geschäftsbedingungen",
  "/widerruf": "Widerrufsbelehrung",
  "/barrierefreiheit": "Barrierefreiheit",
  "/web-apps-publikationen/websites-erstellen-lassen":
    "Websites erstellen lassen",
  "/web-apps-publikationen/apps-entwickeln-lassen": "Apps entwickeln lassen",
  "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting":
    "Bücher erstellen lassen & Ghostwriting",
  "/medien-ai/social-media": "KI-Content & Social Media",
  "/medien-ai/ads": "KI-Ads für Meta & Google",
  "/medien-ai/ki-telefon": "KI-Telefonassistenten",
  "/medien-ai/automatisierungen": "KI-Automatisierungen",
  "/medien-ai/chelonaki-reply": "Chelonaki Reply",
  "/ki-beratung-weiterbildung/ki-beratung-unternehmen":
    "KI-Beratung für Unternehmen",
  "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter":
    "KI-Schulung",
};

export const defaultFaqs = [
  [
    "Welcher Umfang ist für den Einstieg sinnvoll?",
    "Das hängt von Ziel, vorhandenen Grundlagen, gewünschtem Start und internen Ressourcen ab. Im Paketfinder erhalten Sie eine erste Orientierung; vor einer Beauftragung wird der Umfang konkret bestätigt.",
  ],
  [
    "Was ist im Preis nicht automatisch enthalten?",
    "Fremdkosten, Plattformtarife, Lizenzen, Werbebudgets, Druck, Hosting oder zusätzliche Schnittstellen sind nur enthalten, wenn sie im gewählten Paket ausdrücklich genannt werden.",
  ],
  [
    "Wie behalte ich während der Umsetzung die Kontrolle?",
    "Sie erhalten definierte Prüf- und Freigabepunkte. Wesentliche Inhalte, Funktionen und Veröffentlichungen werden nicht ohne Ihre vereinbarte Freigabe abgeschlossen.",
  ],
  [
    "Was passiert, wenn sich der Umfang verändert?",
    "Neue Anforderungen werden zuerst hinsichtlich Nutzen, Aufwand, Zeit und Risiken eingeordnet. Eine Erweiterung erfolgt erst nach transparenter Abstimmung.",
  ],
  [
    "Kann ich klein beginnen und später erweitern?",
    "Ja. Die Lösungen werden möglichst modular geplant. Entscheidend ist, dass der erste Umfang bereits ein eigenständig nutzbares Ergebnis liefert.",
  ],
];

const hubByRoute = {
  "/web-apps-publikationen": hubData.web,
  "/medien-ai": hubData.media,
  "/ki-beratung-weiterbildung": hubData.advice,
  "/originals": hubData.originals,
};

export const getCanonicalRoute = (route) => legacyRouteMap[route] || route;
export const isLegacyRoute = (route) => Boolean(legacyRouteMap[route]);

export function getPageContent(route) {
  const canonicalRoute = getCanonicalRoute(route);
  const service = services[canonicalRoute];
  const hub = hubByRoute[canonicalRoute];
  const name =
    routeNames[canonicalRoute] ||
    service?.title ||
    hub?.title ||
    "Chelonaki Studio";
  const description =
    service?.intro ||
    hub?.intro ||
    "Chelonaki entwickelt Websites, Apps, Bücher, KI-Content, KI-Beratung und digitale Systeme – strategisch geplant, menschlich geprüft und verständlich übergeben.";
  return { canonicalRoute, service, hub, name, description };
}

const parsePrice = (value = "") => {
  const match = String(value)
    .replace(/\./g, "")
    .match(/\d+(?:,\d+)?/);
  return match ? match[0].replace(",", ".") : undefined;
};

export function buildStructuredData({
  route,
  locale,
  localeConfig,
  translate,
  canonical,
  title,
  description,
}) {
  const { canonicalRoute, service, name } = getPageContent(route);
  const language = localeConfig.htmlLang;
  const logo = `${siteOrigin}/assets/chelonaki-turtle-mark.png`;
  const brandImage = `${siteOrigin}/assets/chelonaki-logo.png`;
  const image = `${siteOrigin}${service?.image || "/assets/service-funnel-liquid-glass-v2.webp"}`;
  const organizationId = `${siteOrigin}/#organization`;
  const websiteId = `${siteOrigin}/#website`;
  const pageId = `${canonical}#webpage`;
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: brandName,
      url: siteOrigin,
      logo: { "@type": "ImageObject", url: logo, width: 740, height: 740 },
      image: brandImage,
      slogan: "Wisdom wears a shell.",
      founder: {
        "@type": "Person",
        name: "Eleftherios Samouladas",
        jobTitle: "Gründer, Produktentwickler und Ernährungswissenschaftler",
      },
      knowsAbout: [
        "Webentwicklung",
        "App-Entwicklung",
        "Shopify",
        "Künstliche Intelligenz",
        "KI-Beratung",
        "KI-Schulungen",
        "Ghostwriting",
        "Buchproduktion",
        "Ernährungswissenschaft",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteOrigin,
      name: brandName,
      inLanguage: language,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": pageId,
      url: canonical,
      name: title,
      description,
      inLanguage: language,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      primaryImageOfPage: { "@type": "ImageObject", url: image },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: translate("Startseite"),
          item: `${siteOrigin}/${locale}`,
        },
        ...(canonicalRoute === "/"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: translate(name),
                item: canonical,
              },
            ]),
      ],
    },
  ];

  if (service) {
    graph.push({
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: translate(service.title),
      description: translate(service.intro),
      url: canonical,
      image,
      inLanguage: language,
      provider: { "@id": organizationId },
      areaServed: ["DE", "AT", "CH", "EU"],
      serviceType: translate(service.area || "Digitale Dienstleistung"),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: translate("Pakete und Leistungen"),
        itemListElement: (service.pricing || []).map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          description: `${tier.meta}. ${tier.duration}`,
          price: parsePrice(tier.price),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${canonical}#pakete`,
          itemOffered: { "@type": "Service", name: tier.name },
        })),
      },
    });
    const faqs = service.faq || defaultFaqs;
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      inLanguage: language,
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: translate(question),
        acceptedAnswer: { "@type": "Answer", text: translate(answer) },
      })),
    });
  }

  if (canonicalRoute === "/ueber-uns") {
    graph.push({
      "@type": "Person",
      "@id": `${siteOrigin}/ueber-uns#eleftherios`,
      name: "Eleftherios Samouladas",
      url: canonical,
      worksFor: { "@id": organizationId },
      jobTitle: "Gründer, Produktentwickler und Ernährungswissenschaftler",
      knowsAbout: [
        "Ernährungswissenschaft",
        "Produktentwicklung",
        "Künstliche Intelligenz",
        "Softwareentwicklung",
        "Qualitätsmanagement",
        "Lebensmittelrecht",
      ],
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
