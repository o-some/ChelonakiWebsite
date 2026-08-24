import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";
import translations from "../src/translations.generated.js";
import { services } from "../src/siteData.js";
import {
  getCountryFallbackLanguage,
  getLanguageFromUrl,
  localizePath,
  normalizeLanguageCode,
  resolvePreferredLanguage,
} from "../src/locales.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/assets/app.js"),
    {
      ASSETS: {
        fetch: async (request) => {
          calls.push(new URL(request.url).pathname);
          return new Response("asset", { status: 200 });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(
    response.headers.get("content-security-policy"),
    /frame-ancestors 'none'/,
  );
  assert.match(response.headers.get("permissions-policy"), /camera=\(\)/);
  assert.equal(
    response.headers.get("x-permitted-cross-domain-policies"),
    "none",
  );
  assert.equal(response.headers.get("origin-agent-cluster"), "?1");
});

test("falls back to index.html for an unknown app route", async () => {
  const calls = [];
  const response = await worker.fetch(
    new Request("https://example.test/flow/step-two?source=share", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async (request) => {
          const url = new URL(request.url);
          calls.push(url.pathname + url.search);
          return new Response(
            url.pathname === "/index.html" ? "app" : "missing",
            {
              status: url.pathname === "/index.html" ? 200 : 404,
            },
          );
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
  assert.equal(
    response.headers.get("strict-transport-security"),
    "max-age=31536000; includeSubDomains",
  );
});

test("injects the platform country into HTML before language selection", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/", {
      headers: { accept: "text/html", "cf-ipcountry": "ES" },
    }),
    {
      ASSETS: {
        fetch: async () =>
          new Response("<!doctype html><html><head></head><body></body></html>", {
            headers: {
              "content-type": "text/html; charset=utf-8",
              "content-length": "57",
            },
          }),
      },
    },
  );

  assert.match(
    await response.text(),
    /<meta name="chelonaki-country" content="ES">/,
  );
  assert.equal(response.headers.get("content-length"), null);
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", {
      headers: { accept: "application/json" },
    }),
    new Request("https://example.test/flow", {
      method: "POST",
      headers: { accept: "text/html" },
    }),
  ]) {
    let calls = 0;
    const response = await worker.fetch(request, {
      ASSETS: {
        fetch: async () => {
          calls += 1;
          return new Response("missing", { status: 404 });
        },
      },
    });

    assert.equal(response.status, 404);
    assert.equal(calls, 1);
  }
});

test("chat validates requests and answers safely without a hosted API key", async () => {
  const invalid = await worker.fetch(
    new Request("https://example.test/api/chat", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    }),
    {},
  );
  assert.equal(invalid.status, 400);

  const response = await worker.fetch(
    new Request("https://example.test/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://example.test",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Was kostet eine Website?" }],
        language: "de",
        path: "/",
      }),
    }),
    {},
  );
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  const payload = await response.json();
  assert.equal(payload.mode, "guided");
  assert.match(payload.answer, /1\.000/);
});

test("chat refuses cross-origin requests", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/chat", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://attacker.test",
      },
      body: JSON.stringify({ messages: [{ role: "user", content: "Hallo" }] }),
    }),
    {},
  );
  assert.equal(response.status, 403);
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("Astro emits the application shell and canonical direct routes", async () => {
  const index = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );
  assert.match(index, /<meta name="generator" content="Astro v/);
  assert.match(index, /<astro-island/);
  assert.match(index, /Ihre Idee/);
  assert.match(index, /<main id="main"/);
  await access(
    new URL(
      "../dist/client/medien-ai/social-media/index.html",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../dist/client/ki-beratung-weiterbildung/video-academy/index.html",
      import.meta.url,
    ),
  );
  await access(
    new URL(
      "../dist/client/originals/apps/chelonaki-reply/index.html",
      import.meta.url,
    ),
  );
});

test("SEO and GEO output exposes canonical, crawler and structured-data signals", async () => {
  const canonical = await readFile(
    new URL(
      "../dist/client/de/web-apps-publikationen/websites-erstellen-lassen/index.html",
      import.meta.url,
    ),
    "utf8",
  );
  const legacy = await readFile(
    new URL(
      "../dist/client/de/digital/websites-erstellen-lassen/index.html",
      import.meta.url,
    ),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../dist/client/sitemap.xml", import.meta.url),
    "utf8",
  );
  const robots = await readFile(
    new URL("../dist/client/robots.txt", import.meta.url),
    "utf8",
  );
  const llms = await readFile(
    new URL("../dist/client/llms.txt", import.meta.url),
    "utf8",
  );

  assert.match(canonical, /application\/ld\+json/);
  assert.match(canonical, /"@type":"Organization"/);
  assert.match(canonical, /"@type":"Service"/);
  assert.match(canonical, /"@type":"FAQPage"/);
  assert.match(canonical, /index,follow,max-image-preview:large/);
  assert.match(canonical, /property="og:image"/);
  assert.match(legacy, /name="robots" content="noindex,follow"/);
  assert.match(
    legacy,
    /rel="canonical" href="https:\/\/chelonaki-ai-studio\.o-some\.chatgpt\.site\/de\/web-apps-publikationen\/websites-erstellen-lassen"/,
  );
  assert.doesNotMatch(sitemap, /\/digital\//);
  assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(
    robots,
    /Sitemap: https:\/\/chelonaki-ai-studio\.o-some\.chatgpt\.site\/sitemap\.xml/,
  );
  assert.match(llms, /## Kernleistungen/);
});

test("language decisions follow URL, stored, browser, country and default priority", () => {
  assert.deepEqual(
    resolvePreferredLanguage({
      urlLanguage: "fr",
      storedLanguage: "tr",
      browserLanguages: ["en-US"],
      country: "DE",
    }),
    { language: "fr", source: "url" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({
      storedLanguage: "tr",
      browserLanguages: ["en-US"],
      country: "DE",
    }),
    { language: "tr", source: "stored" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({
      browserLanguages: ["xx", "el-GR"],
      country: "DE",
    }),
    { language: "el", source: "browser" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({ browserLanguages: ["xx"], country: "AT" }),
    { language: "de", source: "country" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({ browserLanguages: ["xx"], country: "CH" }),
    { language: "de", source: "default" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({
      urlLanguage: "es",
      storedLanguage: "de",
      browserLanguages: ["en-US"],
      country: "US",
    }),
    { language: "es", source: "url" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({
      storedLanguage: "it",
      browserLanguages: ["de-DE"],
      country: "DE",
    }),
    { language: "it", source: "stored" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({ browserLanguages: ["es-ES"], country: "DE" }),
    { language: "es", source: "browser" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({
      browserLanguages: ["xx", "en-US"],
      country: "ES",
    }),
    { language: "en", source: "browser" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({ browserLanguages: ["xx"], country: "ES" }),
    { language: "es", source: "country" },
  );
  assert.deepEqual(
    resolvePreferredLanguage({
      storedLanguage: "invalid",
      browserLanguages: ["pt-BR"],
      country: "BR",
    }),
    { language: "pt", source: "browser" },
  );
});

test("locale registry normalizes aliases and keeps localized routes stable", () => {
  assert.equal(normalizeLanguageCode("pt_BR"), "pt");
  assert.equal(normalizeLanguageCode("ja-JP"), null);
  assert.equal(getLanguageFromUrl("/ar/kontakt"), "ar");
  assert.equal(localizePath("/de/kontakt", "it"), "/it/kontakt");
  assert.equal(getCountryFallbackLanguage("CA"), null);
});

test("analytics accepts valid anonymous event payloads without requiring identity", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/analytics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://example.test",
        "cf-ipcountry": "GR",
      },
      body: JSON.stringify({
        event: "page_view",
        displayedLanguage: "el",
        route: "/el",
        viewport: "desktop",
        country: "CLIENT-SHOULD-BE-IGNORED",
      }),
    }),
    {},
  );
  assert.equal(response.status, 202);
  assert.deepEqual(await response.json(), {
    accepted: false,
    reason: "storage_unavailable",
  });
});

test("analytics deletes events after the disclosed 180-day retention period", async () => {
  const statements = [];
  const DB = {
    prepare(sql) {
      statements.push(sql);
      const statement = {
        bind: () => statement,
        run: async () => ({}),
      };
      return statement;
    },
  };
  const response = await worker.fetch(
    new Request("https://example.test/api/analytics", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://example.test",
      },
      body: JSON.stringify({ event: "page_view", route: "/de" }),
    }),
    { DB },
  );

  assert.equal(response.status, 202);
  assert.ok(
    statements.some((sql) =>
      sql.includes("created_at < datetime('now', '-180 days')"),
    ),
  );
});

test("public legal copy is customer-ready and its footer links stay reachable", async () => {
  const app = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
  const styles = await readFile(
    new URL("../src/styles.css", import.meta.url),
    "utf8",
  );
  for (const internalText of [
    "[VOLLSTÄNDIGER NAME ODER FIRMA]",
    "ChatGPT Sites",
    "vor der Freischaltung",
    "gesondert geprüft",
  ])
    assert.ok(!app.includes(internalText), internalText);
  assert.match(app, /Cloudflare, Inc\./);
  assert.match(app, /Muster-Widerrufsformular/);
  assert.match(app, /Barriere melden/);
  assert.match(styles, /\.chat-assistant\.is-footer-hidden\s*{[^}]*pointer-events:\s*none/s);
});

test("all supported languages contain complete, localized dictionaries", () => {
  const languages = [
    "en",
    "el",
    "fr",
    "es",
    "tr",
    "pl",
    "nl",
    "it",
    "pt",
    "ru",
    "ar",
  ];
  assert.deepEqual(Object.keys(translations).sort(), languages.sort());
  for (const language of languages) {
    assert.ok(
      Object.keys(translations[language]).length >= 1379,
      `${language} dictionary is incomplete`,
    );
    assert.ok(
      Object.values(translations[language]).every(
        (value) => typeof value === "string" && value.trim(),
      ),
      `${language} contains an empty translation`,
    );
  }
  assert.equal(translations.el["Medien & KI"], "Μέσα & ΤΝ");
  assert.equal(translations.tr["Medien & KI"], "Medya & YZ");
  assert.equal(translations.ru["Medien & KI"], "Медиа и ИИ");
  assert.match(translations.ar["Medien & KI"], /الذكاء الاصطناعي/);
});

test("every price package exposes a delivery or setup timeframe", () => {
  for (const [path, service] of Object.entries(services)) {
    for (const tier of service.pricing || [])
      assert.ok(tier.duration?.trim(), `${path}: ${tier.name} has no duration`);
  }
  const books =
    services["/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting"]
      .pricing;
  assert.deepEqual(
    books.slice(0, 4).map((tier) => tier.duration),
    ["ca. 2–4 Wochen", "ca. 3–6 Wochen", "ca. 4–8 Wochen", "ca. 6–8 Wochen"],
  );
  const apps =
    services["/web-apps-publikationen/apps-entwickeln-lassen"].pricing;
  assert.deepEqual(
    apps.slice(0, 3).map((tier) => tier.duration),
    ["ca. 4–6 Wochen", "ca. 6–10 Wochen", "ca. 8–12 Wochen"],
  );
});

test("the guided assistant has no external AI transport or secret dependency", async () => {
  const source = await readFile(
    new URL("../worker/index.js", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /api\.openai\.com|OPENAI_API_KEY|Authorization/);
});

test("every local image referenced by the application exists", async () => {
  const sources = await Promise.all([
    readFile(new URL("../src/App.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/siteData.js", import.meta.url), "utf8"),
    readFile(new URL("../src/styles.css", import.meta.url), "utf8"),
  ]);
  const references = [
    ...new Set(
      sources.flatMap(
        (source) => source.match(/\/assets\/[A-Za-z0-9_.-]+/g) || [],
      ),
    ),
  ];
  assert.ok(references.length > 0);
  await Promise.all(
    references.map((reference) =>
      access(new URL(`../public${reference}`, import.meta.url)),
    ),
  );
});
