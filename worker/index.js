const rateLimits = new Map();
const SYSTEM_PROMPT = `Du bist der digitale Chelonaki Assistent auf der Website von Chelonaki, einem KI-gestützten Innovationsstudio. Antworte freundlich, konkret, ruhig und beratend in der Sprache des Besuchers. Deine Aufgabe ist Orientierung und Vorqualifizierung, nicht Druckverkauf.

Leistungen und Einstiegspreise (netto zzgl. USt. für Unternehmen): Websites 1.000 €, 1.750 €, 2.500 €, individuell ab 2.900 €. Apps ab 2.500 €, MVP ab 4.900 €, Advanced ab 7.900 €, Pro ab 12.900 €, Enterprise ab 20.000 €. Bücher: Kinderbuch ab 500 € als eigenständiger begrenzter Einstieg, Book Starter ab 1.000 €, Authority Book 3.000 €, Premium Research Book 6.000 €, individuell auf Anfrage. Persönliches Briefing, vertiefte menschliche Prüfung, Recherche oder Lektorat nur nennen, wenn es laut höherem Paket enthalten ist. KI-Content 500/750/1.250 € pro Monat. KI-Ads 500/750/1.250 € pro Monat, Werbebudget separat. KI-Telefonassistent ab 69/129/219 € pro Monat. Chelonaki Reply 5/19/89 € pro Monat, Enterprise auf Anfrage. KI-Beratung 149 €/Std., Consulting-Tag 1.490 €, Sprint ab 3.990 €. KI-Schulung 1.290 €, Intensivworkshop 2.290 €. Video Academy in Vorbereitung. Originals sind von Chelonaki entwickelte Apps und geschriebene Bücher. Designbeispiele sind auswählbare Gestaltungsrichtungen, keine unverändert verkauften Fertigprodukte.

Seiten: Paketfinder /paketfinder; Designbeispiele /demowelten; Kontakt /kontakt; Websites /web-apps-publikationen/websites-erstellen-lassen; Apps /web-apps-publikationen/apps-entwickeln-lassen; Bücher /web-apps-publikationen/buecher-erstellen-lassen-ghostwriting; Content /medien-ai/social-media; Ads /medien-ai/ads; Telefonassistent /medien-ai/ki-telefon; Reply /medien-ai/chelonaki-reply; Beratung /ki-beratung-weiterbildung/ki-beratung-unternehmen; Schulungen /ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter; Originals /originals.

Erfinde keine Referenzen, Lieferzeiten, Verfügbarkeiten, Rabatte, Garantien, Rechtsauskünfte oder Vertragsbedingungen. Sage bei fehlenden Informationen offen, dass sie im persönlichen Angebot geklärt werden. Preise sind Orientierung und noch kein Angebot. Frage höchstens zwei kurze Dinge nach. Bei medizinischen, rechtlichen, finanziellen, gefährlichen oder völlig themenfremden Fragen gib keine Fachberatung; erkläre knapp deine Rolle. Gib bei sinnvoller Empfehlung eine passende interne URL in Klartext an. Keine Markdown-Tabellen. Maximal etwa 220 Wörter.`;

function secure(request, response) {
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; connect-src 'self'; upgrade-insecure-requests");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin"); headers.set("X-Content-Type-Options", "nosniff"); headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()"); headers.set("Cross-Origin-Opener-Policy", "same-origin"); headers.set("Cross-Origin-Resource-Policy", "same-origin");
  if (new URL(request.url).protocol === "https:") headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
const json = (request, body, status = 200) => secure(request, new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }));

function allowRequest(request) {
  const origin = request.headers.get("origin"); if (origin && origin !== new URL(request.url).origin) return false;
  const ip = request.headers.get("cf-connecting-ip") || "unknown"; const now = Date.now(); const current = rateLimits.get(ip);
  if (!current || current.reset < now) { rateLimits.set(ip, { count: 1, reset: now + 300000 }); return true; }
  if (current.count >= 15) return false; current.count += 1;
  if (rateLimits.size > 2000) for (const [key, value] of rateLimits) if (value.reset < now) rateLimits.delete(key);
  return true;
}
function extractText(data) { if (typeof data.output_text === "string") return data.output_text.trim(); return (data.output || []).flatMap((item) => item.content || []).map((item) => item.text || "").join("\n").trim(); }
function localAnswer(messages) {
  const q = messages.at(-1)?.content.toLowerCase() || "";
  if (/web|shop|homepage|seite/.test(q)) return "Für eine Website gibt es vier Einstiege: Starter 1.000 €, Business 1.750 €, Pro 2.500 € und Individual ab 2.900 € netto. Entscheidend sind Seitenumfang, Funktionen und gestalterische Tiefe. Details: /web-apps-publikationen/websites-erstellen-lassen";
  if (/buch|ghost|autor|cover/.test(q)) return "Bei Büchern reicht der Einstieg vom klar begrenzten Kinderbuch ab 500 € über Book Starter ab 1.000 € bis zu Authority Book für 3.000 € und Premium Research Book für 6.000 € netto. Recherche, Lektorat und vertiefte menschliche Prüfung gehören nur zu entsprechend ausgestatteten höheren Paketen. Designs: /demowelten";
  if (/app|software|mvp/.test(q)) return "Apps starten ab 2.500 €. Ein MVP mit Login, Datenbank, Admin und Push beginnt ab 4.900 € netto. Für eine Empfehlung sind Zielgruppe, Kernfunktion und vorhandene Systeme wichtig. Details: /web-apps-publikationen/apps-entwickeln-lassen";
  if (/content|social|instagram|video|karussell/.test(q)) return "KI-Content & Social Media startet bei 500 € netto pro Monat. Business kostet 750 €, Pro 1.250 €. Persönliche Abstimmung und zusätzliche menschliche Prüfung werden nur dort zugesagt, wo sie ausdrücklich enthalten sind. Details: /medien-ai/social-media";
  if (/preis|kosten|paket|angebot/.test(q)) return "Die Preise richten sich nach Leistungsbereich und Umfang. Eine passende Orientierung bietet /paketfinder. Für ein verbindliches Angebot nutzen Sie anschließend /kontakt.";
  return "Ich kann Sie zu Chelonaki-Leistungen, Paketen, Preisen, Designs und dem passenden nächsten Schritt orientieren. Für eine freie individuelle Antwort wird die KI-Verbindung gerade eingerichtet. Nutzen Sie bis dahin /paketfinder oder /kontakt.";
}
async function handleChat(request, env) {
  if (!allowRequest(request)) return json(request, { error: "Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut." }, 429);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return json(request, { error: "Ungültiges Anfrageformat." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 18000) return json(request, { error: "Die Nachricht ist zu lang." }, 413);
  let payload; try { payload = await request.json(); } catch { return json(request, { error: "Ungültige Anfrage." }, 400); }
  const messages = (Array.isArray(payload.messages) ? payload.messages.slice(-10) : []).filter((item) => ["user", "assistant"].includes(item?.role) && typeof item.content === "string").map((item) => ({ role: item.role, content: item.content.trim().slice(0, 1500) })).filter((item) => item.content);
  if (!messages.length || messages.at(-1).role !== "user" || messages.reduce((sum, item) => sum + item.content.length, 0) > 8000) return json(request, { error: "Bitte geben Sie eine kurze Frage ein." }, 400);
  if (!env.OPENAI_API_KEY) return json(request, { answer: localAnswer(messages), mode: "guided" });
  const language = String(payload.language || "de").slice(0, 8); const path = String(payload.path || "/").slice(0, 180);
  const transcript = messages.map((m) => `${m.role === "user" ? "Besucher" : "Assistent"}: ${m.content}`).join("\n\n");
  let response;
  try { response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: env.OPENAI_CHAT_MODEL || "gpt-5-mini", instructions: `${SYSTEM_PROMPT}\nAktuelle Sprache: ${language}. Aktuelle Seite: ${path}.`, input: transcript, max_output_tokens: 520 }) }); } catch { return json(request, { error: "Der Assistent ist kurzzeitig nicht erreichbar." }, 502); }
  if (!response.ok) return json(request, { error: "Der Assistent ist kurzzeitig nicht erreichbar." }, 502);
  const answer = extractText(await response.json()); if (!answer) return json(request, { error: "Ich konnte gerade keine Antwort erzeugen." }, 502);
  return json(request, { answer, mode: "ai" });
}

export default { async fetch(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/api/chat") { if (request.method !== "POST") return json(request, { error: "Methode nicht erlaubt." }, 405); return handleChat(request, env); }
  const response = await env.ASSETS.fetch(request); const acceptsHtml = request.headers.get("accept")?.includes("text/html");
  if (response.status !== 404 || !acceptsHtml || !["GET", "HEAD"].includes(request.method)) return secure(request, response);
  const indexUrl = new URL(request.url); indexUrl.pathname = "/index.html"; indexUrl.search = "";
  return secure(request, await env.ASSETS.fetch(new Request(indexUrl, request)));
} };
