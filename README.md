# Chelonaki AI Studio

Astro-/React-Website mit statisch erzeugten Sprachrouten und einem Sites-Edge-Worker für Länder-Fallback und einwilligungsgebundene, anonyme Nutzungsstatistiken.

## Sprache

Die zentrale Registrierung liegt in `src/locales.js`. Die Auswahl erfolgt strikt in dieser Reihenfolge:

1. Sprachpräfix in der URL
2. manuell gespeicherte Auswahl
3. erste unterstützte Sprache aus `navigator.languages`
4. grober Ländercode des Edge-Netzwerks
5. Deutsch

Aktive Sprachen erhalten eigene, direkt aufrufbare URLs (`/de`, `/en`, `/el` usw.), `lang`/`dir`, Canonical- und `hreflang`-Metadaten sowie Einträge in `/sitemap.xml`. Schweiz, Belgien und Kanada werden wegen ihrer Mehrsprachigkeit nicht per Land festgelegt. Eine neue Sprache wird zunächst mit `enabled: false` registriert und erst nach vollständiger Übersetzung und Prüfung aktiviert.

## Geolocation und Datenschutz

Der Worker liest ausschließlich den groben ISO-Ländercode aus der Hosting-Umgebung und injiziert ihn als Meta-Angabe in HTML. Browser-Geolocation wird nicht verwendet. Vollständige IP-Adressen, exakte Standorte und Formulardaten werden nicht in der Analyse-Datenbank gespeichert.

Das Frontend sendet Analyseereignisse erst nach ausdrücklicher Einwilligung. Erfasst werden können Seitenaufruf, automatische oder manuelle Sprachwahl, Paketwahl und der Beginn bzw. Abschluss einer Kontaktanfrage. Die Einstellung kann im Cookie-/Datenschutzdialog geändert werden.

## Datenhaltung

Sites bindet D1 als `DB`. Das Schema liegt in `.openai/drizzle/0000_analytics.sql` und `db/schema.ts`. Der Worker validiert Ereignisnamen, akzeptiert nur Same-Origin-JSON und leitet das Land ausschließlich serverseitig ab.

## Entwicklung

```sh
npm run check:astro
npm run build
npm run test:sites
```

Die Worker-Tests prüfen Sicherheitsheader, Routing, Sprachprioritäten, Locale-Aliase, generierte Sprachrouten und die Analytics-API.
