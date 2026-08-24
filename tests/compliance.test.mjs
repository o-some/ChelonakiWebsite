import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { canonicalRoutes } from "../src/astroRoutes.js";
import { enabledLocales } from "../src/locales.js";
import { siteOrigin } from "../src/seoData.js";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("only reviewed locales and the production origin are published", () => {
  assert.deepEqual(
    enabledLocales.map(({ code }) => code),
    ["de"],
  );
  assert.equal(siteOrigin, "https://chelonaki.eu");
});

test("legal information has stable canonical routes", () => {
  for (const route of [
    "/impressum",
    "/datenschutz",
    "/datenschutzeinstellungen",
    "/agb",
    "/widerruf",
    "/barrierefreiheit",
  ])
    assert.ok(canonicalRoutes.includes(route), `${route} is missing`);
});

test("frontend privacy copy matches the analytics-free runtime", async () => {
  const app = await read("../src/App.jsx");
  assert.doesNotMatch(app, /trackEvent|getAnalyticsConsent|ConsentBanner/);
  assert.match(app, /keine optionale Nutzungsstatistik/i);
  assert.match(app, /href="\/datenschutz"/);
});

test("contact errors are programmatically associated and focusable", async () => {
  const app = await read("../src/App.jsx");
  assert.match(app, /role="alert"/);
  assert.match(app, /aria-describedby=/);
  assert.match(app, /querySelector\('\[aria-invalid="true"\]'\)/);
  assert.match(app, /focus\(\{ preventScroll: true \}\)/);
  assert.match(app, /scrollIntoView\(\{ block: "center" \}\)/);
  assert.match(app, /aria-label="Hauptmenü"/);
  assert.match(app, /path !== "\/kontakt" && !legalRoutes\[path\]/);
});

test("static hosting emits baseline security and disclosure files", async () => {
  const headers = await read("../public/_headers");
  const security = await read("../public/.well-known/security.txt");
  assert.match(headers, /Content-Security-Policy:/);
  assert.match(headers, /Strict-Transport-Security:/);
  assert.match(headers, /Permissions-Policy:/);
  assert.match(security, /Contact: mailto:info@chelonaki\.eu/);
  assert.match(security, /Canonical: https:\/\/chelonaki\.eu\/\.well-known\/security\.txt/);
});
