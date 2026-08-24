# ChelonakiWebsite auf Cloudflare Pages

Die Website ist ein statisch gebautes Astro-/React-Projekt. Cloudflare Pages kann
den erzeugten Ordner direkt veröffentlichen.

## Voraussetzungen

- Das Repository `o-some/ChelonakiWebsite` ist mit Cloudflare verbunden.
- Node.js 22 oder neuer ist als Build-Runtime eingestellt.

## Einrichtung im Cloudflare-Dashboard

1. **Workers & Pages** öffnen.
2. **Create application** → **Pages** → **Connect to Git** wählen.
3. GitHub verbinden und `o-some/ChelonakiWebsite` auswählen.
4. Diese Build-Einstellungen verwenden:

   - Production branch: `main`
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist/client`
   - Root directory: `/`

5. Unter **Environment variables** optional setzen:

   - `NODE_VERSION` = `22`
   - `ASTRO_TELEMETRY_DISABLED` = `1`

6. **Save and Deploy** anklicken.

Cloudflare baut danach bei jedem Push auf `main` automatisch neu.

## Eigene Domain verbinden

Im Pages-Projekt unter **Custom domains** die gewünschte Domain hinzufügen. Wenn
die Domain bereits bei Cloudflare verwaltet wird, legt Cloudflare den DNS-Eintrag
automatisch an. Andernfalls zeigt der Assistent den benötigten CNAME-Eintrag.

## Lokal prüfen

```bash
npm ci
npm run build
```

Der veröffentlichungsfertige Stand liegt anschließend in `dist/client`.

## Hinweis zur Sites-spezifischen Worker-Datei

`worker/index.js`, `db/schema.ts` und `.openai/hosting.json` bleiben im Repository,
damit der bestehende ChatGPT-Sites-Stand weiterhin reproduzierbar ist. Für das
statische Cloudflare-Pages-Hosting wird ausschließlich `dist/client` ausgeliefert.
Die aktuelle Website benötigt dafür keine Cloudflare-D1-Datenbank.
