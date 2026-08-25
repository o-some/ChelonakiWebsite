import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { canonicalRoutes } from "../src/astroRoutes.js";
import {
  bookCategories,
  bookDesigns,
  canUseBookPackage,
} from "../src/bookDesigns.js";
import { enabledLocales } from "../src/locales.js";
import { siteOrigin } from "../src/seoData.js";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("all prepared locales and the production origin are published", () => {
  assert.deepEqual(
    enabledLocales.map(({ code }) => code),
    ["de", "en", "el", "fr", "es", "tr", "pl", "nl", "it", "pt", "ru", "ar"],
  );
  assert.equal(siteOrigin, "https://www.chelonaki.eu");
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
  assert.match(security, /Canonical: https:\/\/www\.chelonaki\.eu\/\.well-known\/security\.txt/);
});

test("book library contains one unique asset for every catalog entry", async () => {
  assert.equal(bookDesigns.length, 256);
  assert.equal(new Set(bookDesigns.map(({ status }) => status)).size, 256);
  assert.equal(new Set(bookDesigns.map(({ title }) => title)).size, 256);
  assert.equal(new Set(bookDesigns.map(({ image }) => image)).size, 256);
  assert.deepEqual(
    [...new Set(bookDesigns.map(({ bookCategory }) => bookCategory))].sort(),
    bookCategories.slice(1).sort(),
  );

  const expected = bookDesigns.map(({ image }) => image.split("/").at(-1)).sort();
  const actual = (await readdir(new URL("../public/assets/book-designs", import.meta.url)))
    .filter((name) => name.endsWith(".webp"))
    .sort();
  assert.deepEqual(actual, expected);
});

test("children-book pricing is limited to children-book designs", () => {
  assert.equal(
    canUseBookPackage("Kinderbuch & Familie", "Kinderbuch · ab 500 €"),
    true,
  );
  assert.equal(
    canUseBookPackage("Fitness", "Kinderbuch · ab 500 €"),
    false,
  );
  assert.equal(
    canUseBookPackage("Fitness", "Authority Book · 3.000 €"),
    true,
  );
});
