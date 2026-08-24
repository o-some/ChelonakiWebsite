# Chelonaki AI Studio

Astro-/React-Website mit statisch erzeugten Sprachrouten und einem Sites-Edge-Worker für sichere Auslieferung und den regelbasierten Chelonaki-Assistenten.

## Sprache

Die zentrale Registrierung liegt in `src/locales.js`. Die Auswahl erfolgt strikt in dieser Reihenfolge:

1. Sprachpräfix in der URL
2. manuell gespeicherte Auswahl
3. erste unterstützte Sprache aus `navigator.languages`
4. grober Ländercode des Edge-Netzwerks
5. Deutsch

Aktive Sprachen erhalten eigene, direkt aufrufbare URLs, `lang`/`dir`, Canonical- und `hreflang`-Metadaten sowie Einträge in `/sitemap.xml`. Derzeit sind Deutsch, Englisch, Griechisch, Französisch, Spanisch, Türkisch, Polnisch, Niederländisch, Italienisch, Portugiesisch, Russisch und Arabisch freigegeben. Eine weitere Sprache wird zunächst mit `enabled: false` registriert und erst nach vollständiger Prüfung aktiviert.

## Datenschutz

Browser-Geolocation, optionale Nutzungsstatistik, Marketing-Cookies und Werbe-Tracker sind nicht aktiv. Das Kontaktformular öffnet ausschließlich lokal eine vorausgefüllte E-Mail.

Die vorhandene Analytics-API ist nicht an eine D1-Datenbank gebunden und wird vom Frontend nicht aufgerufen. Eine spätere Aktivierung erfordert eine neue Datenschutz-, Consent- und Deployment-Prüfung.

## Entwicklung

```sh
npm run check:astro
npm run test:compliance
npm run build
npm run test:sites
npm run check:release
```

Die Worker-Tests prüfen Sicherheitsheader, Routing, Sprachprioritäten, Locale-Aliase, generierte Sprachrouten und die inaktive Analytics-API.

## SEO und KI-Suchsysteme

Jede kanonische Sprachroute enthält eigene Titel, Beschreibungen, Canonicals, `hreflang`, Open-Graph-/Twitter-Metadaten und JSON-LD. Die strukturierten Daten beschreiben Organisation, Website, Webseite, Breadcrumbs und – soweit auf der Seite sichtbar – Leistungen, Angebote und FAQs. Alte Alias-Routen werden weiterhin ausgeliefert, aber mit `noindex,follow` und Canonical auf ihr aktuelles Ziel aus dem Suchindex herausgehalten.

`public/robots.txt` erlaubt klassische und relevante KI-Suchcrawler und verweist auf die XML-Sitemap. `public/llms.txt` und `public/llms-full.txt` stellen einen knappen beziehungsweise ausführlichen, maschinenlesbaren Unternehmens- und Leistungskontext bereit. Diese Dateien unterstützen die Auffindbarkeit und korrekte Einordnung, garantieren aber keine Platzierung oder Nennung durch Suchmaschinen oder KI-Systeme.
