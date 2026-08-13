import { services } from "./siteData.js";

const canonicalRoutes = [
  "/web-apps-publikationen", "/medien-ai", "/ki-beratung-weiterbildung",
  "/ki-beratung-weiterbildung/video-academy", "/originals", "/originals/apps",
  "/originals/apps/evofit", "/originals/apps/chelonaki-reply", "/originals/buecher",
  "/demowelten", "/paketfinder", "/qualitaet", "/ueber-uns", "/kontakt",
  ...Object.keys(services),
];

const legacyRoutes = [
  "/digital", "/expertise", "/beratung-schulung", "/beratung-schulung/ki-consulting",
  "/beratung-schulung/ki-schulungen", "/beratung-schulung/workshops",
  "/beratung-schulung/academy", "/beratung-schulung/academy/ki",
  "/beratung-schulung/academy/ernaehrung", "/beratung-schulung/ernaehrungsberatung",
  "/beratung-schulung/ernaehrungsberatung/unternehmen", "/beratung-schulung/ernaehrungsberatung/privat",
  "/lab", "/digital/websites-shopify", "/digital/websites-erstellen-lassen",
  "/digital/apps-software", "/digital/buchproduktion-ghostwriting",
  "/digital/social-media-content", "/digital/content-social-media", "/digital/telefonassistenten",
  "/digital/ki-telefonassistenten", "/digital/ads", "/digital/ki-werbung-meta-google",
  "/expertise/ki-consulting", "/expertise/ki-schulungen-consulting", "/expertise/academy",
  "/expertise/ernaehrungsberatung", "/our-story", "/originals/spiele",
  "/originals/digitale-produkte", "/web-apps-publikationen/buecher-erstellen-lassen",
  "/web-apps-publikationen/ghostwriting",
];

export const astroRoutes = [...new Set([...canonicalRoutes, ...legacyRoutes])];
