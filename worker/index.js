const rateLimits = new Map();
function secure(request, response) {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin"); headers.set("X-Content-Type-Options", "nosniff"); headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()"); headers.set("Cross-Origin-Opener-Policy", "same-origin"); headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set("X-Permitted-Cross-Domain-Policies", "none"); headers.set("Origin-Agent-Cluster", "?1");
  if (new URL(request.url).protocol === "https:") headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
const json = (request, body, status = 200) => secure(request, new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }));

function allowRequest(request) {
  const ip = request.headers.get("cf-connecting-ip") || "unknown"; const now = Date.now(); const current = rateLimits.get(ip);
  if (!current || current.reset < now) { rateLimits.set(ip, { count: 1, reset: now + 300000 }); return true; }
  if (current.count >= 15) return false; current.count += 1;
  if (rateLimits.size > 2000) for (const [key, value] of rateLimits) if (value.reset < now) rateLimits.delete(key);
  return true;
}
function localAnswer(messages) {
  const q = messages.at(-1)?.content.toLowerCase() || "";
  if (/web|shop|homepage|seite/.test(q)) return "Für eine Website gibt es vier Einstiege: Starter 1.000 €, Business 1.750 €, Pro 2.500 € und Individual ab 2.900 € netto. Entscheidend sind Seitenumfang, Funktionen und gestalterische Tiefe. Details: /web-apps-publikationen/websites-erstellen-lassen";
  if (/buch|ghost|autor|cover/.test(q)) return "Bei Büchern reicht der Einstieg vom klar begrenzten Kinderbuch ab 500 € über Book Starter ab 1.000 € bis zu Authority Book für 3.000 € und Premium Research Book für 6.000 € netto. Recherche, Lektorat und vertiefte menschliche Prüfung gehören nur zu entsprechend ausgestatteten höheren Paketen. Designs: /demowelten";
  if (/app|software|mvp/.test(q)) return "Apps starten ab 2.500 €. Ein MVP mit Login, Datenbank, Admin und Push beginnt ab 4.900 € netto. Für eine Empfehlung sind Zielgruppe, Kernfunktion und vorhandene Systeme wichtig. Details: /web-apps-publikationen/apps-entwickeln-lassen";
  if (/content|social|instagram|video|karussell/.test(q)) return "KI-Content & Social Media startet bei 500 € netto pro Monat. Business kostet 750 €, Pro 1.250 €. Persönliche Abstimmung und zusätzliche menschliche Prüfung werden nur dort zugesagt, wo sie ausdrücklich enthalten sind. Details: /medien-ai/social-media";
  if (/preis|kosten|paket|angebot/.test(q)) return "Die Preise richten sich nach Leistungsbereich und Umfang. Eine passende Orientierung bietet /paketfinder. Für ein verbindliches Angebot nutzen Sie anschließend /kontakt.";
  return "Ich kann Sie lokal und datensparsam zu Chelonaki-Leistungen, Paketen, Preisen, Designs und dem passenden nächsten Schritt orientieren. Für eine individuelle Projektprüfung nutzen Sie bitte /paketfinder oder /kontakt.";
}
async function handleChat(request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json(request, { error: "Anfrage nicht erlaubt." }, 403);
  if (!allowRequest(request)) return json(request, { error: "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut." }, 429);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return json(request, { error: "Ungültiges Anfrageformat." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 18000) return json(request, { error: "Die Nachricht ist zu lang." }, 413);
  let payload; try { payload = await request.json(); } catch { return json(request, { error: "Ungültige Anfrage." }, 400); }
  const messages = (Array.isArray(payload.messages) ? payload.messages.slice(-10) : []).filter((item) => ["user", "assistant"].includes(item?.role) && typeof item.content === "string").map((item) => ({ role: item.role, content: item.content.trim().slice(0, 1500) })).filter((item) => item.content);
  if (!messages.length || messages.at(-1).role !== "user" || messages.reduce((sum, item) => sum + item.content.length, 0) > 8000) return json(request, { error: "Bitte geben Sie eine kurze Frage ein." }, 400);
  return json(request, { answer: localAnswer(messages), mode: "guided" });
}

export default { async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/api/chat") { if (request.method !== "POST") return json(request, { error: "Methode nicht erlaubt." }, 405); return handleChat(request); }
  const response = await env.ASSETS.fetch(request); const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) return secure(request, response);
  const indexUrl = new URL(request.url); indexUrl.pathname = "/index.html"; indexUrl.search = "";
  return secure(request, await env.ASSETS.fetch(new Request(indexUrl, request)));
} };
