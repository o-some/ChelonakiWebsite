import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import worker from "../worker/index.js";
import translations from "../src/translations.generated.js";
import { services } from "../src/siteData.js";

test("serves existing static assets without a fallback", async () => {
  const calls = [];
  const response = await worker.fetch(new Request("https://example.test/assets/app.js"), {
    ASSETS: {
      fetch: async (request) => {
        calls.push(new URL(request.url).pathname);
        return new Response("asset", { status: 200 });
      },
    },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/assets/app.js"]);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy"), /frame-ancestors 'none'/);
  assert.match(response.headers.get("permissions-policy"), /camera=\(\)/);
  assert.equal(response.headers.get("x-permitted-cross-domain-policies"), "none");
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
          return new Response(url.pathname === "/index.html" ? "app" : "missing", {
            status: url.pathname === "/index.html" ? 200 : 404,
          });
        },
      },
    },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["/flow/step-two?source=share", "/index.html"]);
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000; includeSubDomains");
});

test("does not turn missing API or write requests into the app shell", async () => {
  for (const request of [
    new Request("https://example.test/api/missing", { headers: { accept: "application/json" } }),
    new Request("https://example.test/flow", { method: "POST", headers: { accept: "text/html" } }),
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
  const invalid = await worker.fetch(new Request("https://example.test/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: [] }) }), {});
  assert.equal(invalid.status, 400);

  const response = await worker.fetch(new Request("https://example.test/api/chat", { method: "POST", headers: { "content-type": "application/json", origin: "https://example.test" }, body: JSON.stringify({ messages: [{ role: "user", content: "Was kostet eine Website?" }], language: "de", path: "/" }) }), {});
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type"), /application\/json/);
  const payload = await response.json();
  assert.equal(payload.mode, "guided");
  assert.match(payload.answer, /1\.000/);
});

test("chat refuses cross-origin requests", async () => {
  const response = await worker.fetch(new Request("https://example.test/api/chat", { method: "POST", headers: { "content-type": "application/json", origin: "https://attacker.test" }, body: JSON.stringify({ messages: [{ role: "user", content: "Hallo" }] }) }), {});
  assert.equal(response.status, 403);
});

test("emits the files required by Sites packaging", async () => {
  await access(new URL("../dist/client/index.html", import.meta.url));
  await access(new URL("../dist/server/index.js", import.meta.url));
  await access(new URL("../dist/.openai/hosting.json", import.meta.url));
});

test("Astro emits the application shell and canonical direct routes", async () => {
  const index = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");
  assert.match(index, /<meta name="generator" content="Astro v/);
  assert.match(index, /<astro-island/);
  assert.match(index, /Aus Ihrer Idee/);
  assert.match(index, /<main id="main"/);
  await access(new URL("../dist/client/medien-ai/social-media/index.html", import.meta.url));
  await access(new URL("../dist/client/ki-beratung-weiterbildung/video-academy/index.html", import.meta.url));
  await access(new URL("../dist/client/originals/apps/chelonaki-reply/index.html", import.meta.url));
});

test("all supported languages contain complete, localized dictionaries", () => {
  const languages = ["en", "el", "fr", "es", "tr", "pl", "nl", "it", "pt", "ru", "ar"];
  assert.deepEqual(Object.keys(translations).sort(), languages.sort());
  for (const language of languages) {
    assert.ok(Object.keys(translations[language]).length >= 1379, `${language} dictionary is incomplete`);
    assert.ok(Object.values(translations[language]).every((value) => typeof value === "string" && value.trim()), `${language} contains an empty translation`);
  }
  assert.equal(translations.el["Medien & KI"], "Μέσα & ΤΝ");
  assert.equal(translations.tr["Medien & KI"], "Medya & YZ");
  assert.equal(translations.ru["Medien & KI"], "Медиа и ИИ");
  assert.match(translations.ar["Medien & KI"], /الذكاء الاصطناعي/);
});

test("every price package exposes a delivery or setup timeframe", () => {
  for (const [path, service] of Object.entries(services)) {
    for (const tier of service.pricing || []) assert.ok(tier.duration?.trim(), `${path}: ${tier.name} has no duration`);
  }
  const books = services["/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting"].pricing;
  assert.deepEqual(books.slice(0, 4).map((tier) => tier.duration), ["ca. 2–4 Wochen", "ca. 3–6 Wochen", "ca. 4–8 Wochen", "ca. 6–8 Wochen"]);
  const apps = services["/web-apps-publikationen/apps-entwickeln-lassen"].pricing;
  assert.deepEqual(apps.slice(0, 3).map((tier) => tier.duration), ["ca. 4–6 Wochen", "ca. 6–10 Wochen", "ca. 8–12 Wochen"]);
});

test("the guided assistant has no external AI transport or secret dependency", async () => {
  const source = await readFile(new URL("../worker/index.js", import.meta.url), "utf8");
  assert.doesNotMatch(source, /api\.openai\.com|OPENAI_API_KEY|Authorization/);
});

test("every local image referenced by the application exists", async () => {
  const sources = await Promise.all([
    readFile(new URL("../src/App.jsx", import.meta.url), "utf8"),
    readFile(new URL("../src/siteData.js", import.meta.url), "utf8"),
    readFile(new URL("../src/styles.css", import.meta.url), "utf8"),
  ]);
  const references = [...new Set(sources.flatMap((source) => source.match(/\/assets\/[A-Za-z0-9_.-]+/g) || []))];
  assert.ok(references.length > 0);
  await Promise.all(references.map((reference) => access(new URL(`../public${reference}`, import.meta.url))));
});
