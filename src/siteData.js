export const navigation = [
  {
    label: "Digital",
    href: "/digital",
    items: [
      ["Websites & Shopify", "/digital/websites-shopify"],
      ["Content & Social Media", "/digital/content-social-media"],
      ["Telefonassistenten", "/digital/telefonassistenten"],
      ["Meta & Google Ads", "/digital/ads"],
      ["Apps & Software", "/digital/apps-software"],
    ],
  },
  {
    label: "Expertise",
    href: "/expertise",
    items: [
      ["KI-Consulting", "/expertise/ki-consulting"],
      ["Chelonaki Academy", "/expertise/video-akademie"],
      ["Ernährungsberatung", "/expertise/ernaehrungsberatung"],
      ["Buchproduktion", "/expertise/buchproduktion"],
    ],
  },
  {
    label: "Originals",
    href: "/originals",
    items: [
      ["Eigene Bücher", "/originals/buecher"],
      ["Eigene Apps", "/originals/apps"],
      ["Spiele & Lernwelten", "/originals/spiele"],
      ["Digitale Produkte", "/originals/digitale-produkte"],
    ],
  },
];

export const worlds = [
  {
    number: "01",
    eyebrow: "Für Unternehmen",
    title: "Chelonaki Digital",
    text: "Digitale Systeme, die Unternehmen sichtbar, erreichbar und zukunftsfähig machen.",
    detail: "Websites, Content, Telefonassistenten, Ads und Apps",
    href: "/digital",
    cta: "Explore Digital",
    tone: "digital",
  },
  {
    number: "02",
    eyebrow: "Wissen in Anwendung",
    title: "Chelonaki Expertise",
    text: "Künstliche Intelligenz trifft auf Beratung, Ernährungswissenschaft, Praxiserfahrung und Buchproduktion.",
    detail: "KI-Consulting, Academy, Ernährung und Bücher",
    href: "/expertise",
    cta: "Discover Expertise",
    tone: "expertise",
  },
  {
    number: "03",
    eyebrow: "Eigene Ideenwelten",
    title: "Chelonaki Originals",
    text: "Eigene Bücher, Apps, Spiele und digitale Produkte mit Haltung, Gestaltung und langfristiger Vision.",
    detail: "Bücher, Apps, Spiele und digitale Welten",
    href: "/originals",
    cta: "Enter Originals",
    tone: "originals",
  },
];

export const hubData = {
  digital: {
    label: "Chelonaki Digital · Für Unternehmen",
    title: "Digitale Systeme, die für Ihr Unternehmen arbeiten.",
    intro: "Von der ersten sichtbaren Idee bis zum belastbaren Betrieb verbinden wir Strategie, Gestaltung, Technik und kontrollierte Automatisierung.",
    image: "/assets/project-digital-brand.png",
    cta: "Digitalprojekt anfragen",
    cards: navigation[0].items.map(([title, href], index) => ({
      title,
      href,
      text: [
        "Hochwertige Auftritte und Shops mit klarer Conversion-Struktur.",
        "Planbare Inhalte mit eigener Tonalität, Bildwelt und Qualitätskontrolle.",
        "Erreichbar bleiben, Anfragen strukturieren und Termine koordinieren.",
        "Kampagnen, Creatives, Tracking und Optimierung als zusammenhängendes System.",
        "Modulare Produkte, Portale und Workflows statt kurzfristiger Demos.",
      ][index],
    })),
  },
  expertise: {
    label: "Chelonaki Expertise",
    title: "Wissen wird erst wertvoll, wenn es anwendbar wird.",
    intro: "Wir übersetzen künstliche Intelligenz, Ernährungswissenschaft und Praxiserfahrung in klare Entscheidungen, Lernangebote und veröffentlichungsfähige Inhalte.",
    image: "/assets/chapter-architecture.webp",
    cta: "Erstgespräch buchen",
    cards: navigation[1].items.map(([title, href], index) => ({
      title,
      href,
      text: [
        "Prozesse verstehen, sinnvolle Anwendungsfälle priorisieren und umsetzen.",
        "Strukturierte Video-Lernwelten für KI und Ernährung.",
        "Wissenschaftlich fundierte Beratung für Unternehmen und Privatpersonen.",
        "Von der Buchidee bis zur veröffentlichungsfähigen Datei.",
      ][index],
    })),
  },
  originals: {
    label: "Chelonaki Original",
    title: "Eigene Ideen. Eigene Produkte. Eine gemeinsame Welt.",
    intro: "Unter Originals entstehen Bücher, Apps und Lernwelten, die Ernährung, Gesundheit, Bildung und spielerische Motivation sinnvoll verbinden.",
    image: "/assets/project-nutrition-venture.png",
    cta: "Originals entdecken",
    cards: navigation[2].items.map(([title, href], index) => ({
      title,
      href,
      text: [
        "Fach- und Kinderbücher für Ernährung, Gesundheit und besondere Stoffwechselthemen.",
        "Eigene Ernährungs-, Fitness- und Alltagsanwendungen wie Chelonaki EvoFit.",
        "Altersgerechte Abenteuer, Übungen und spielerische Gesundheitsbildung.",
        "Kurse, Assistenten und personalisierte Inhalte im Chelonaki-Ökosystem.",
      ][index],
    })),
  },
};

const b2bNote = "Alle Preise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer. Das Angebot richtet sich ausschließlich an Unternehmer im Sinne des § 14 BGB.";

export const services = {
  "/digital/websites-shopify": {
    area: "Digital", label: "Für Unternehmen", title: "Websites, die nicht nur gut aussehen, sondern verkaufen.",
    intro: "Wir entwickeln Shopify-Websites und Shops von der Struktur über Design und Text bis zur responsiven Umsetzung und laufenden Optimierung.",
    problem: "Viele Websites erklären zu viel, führen zu wenig und werden nach dem Launch technisch nicht weitergedacht.",
    solution: ["Unternehmenswebsites und Shopify-Shops", "Landingpages und Conversion-Struktur", "Responsive Umsetzung und Basis-SEO", "Formulare, Newsletter, Termine und Integrationen"],
    steps: ["Ziel und Designrichtung festlegen", "Struktur und Inhalte entwickeln", "Shopify responsiv umsetzen", "Prüfen, freigeben und übergeben"],
    pricing: [
      { name: "Website Starter", price: "1.000 €", meta: "bis 5 Seiten · 2 Korrekturrunden" },
      { name: "Website Pro", price: "2.500 €", meta: "bis 15 Seiten · Conversion · Blog · Newsletter", featured: true },
      { name: "Website Individual", price: "ab 2.900 €", meta: "individuelle UX/UI und Funktionen" },
    ],
    note: `${b2bNote} Shopify-Tarife, kostenpflichtige Apps und weitere Fremdkosten sind nicht enthalten.`,
    cta: "Website-Projekt besprechen",
  },
  "/digital/content-social-media": {
    area: "Digital", label: "Für Unternehmen", title: "Ein Content-System statt täglicher Improvisation.",
    intro: "Wir planen, produzieren, prüfen und veröffentlichen Inhalte in einer eigenen Markenwelt – vollständig KI-gestützt, aber nicht ungeprüft.",
    problem: "Unregelmäßige Inhalte, wechselnde Bildsprachen und fehlende Prozesse kosten Reichweite und vor allem Zeit.",
    solution: ["KI-Videos und Karussells", "Marken-, Themen- und Stilkonzept", "Captions, Redaktionsplanung und Veröffentlichung", "Reporting und laufende Optimierung"],
    steps: ["Marke und Themen schärfen", "Produktionssystem definieren", "Freigabezyklus einrichten", "Veröffentlichen und optimieren"],
    pricing: [
      { name: "Content Basic", price: "500 €/Monat", meta: "20 KI-Videos · 40 Karussells à 5 Slides" },
      { name: "Content Business", price: "750 €/Monat", meta: "30 KI-Videos · 60 Karussells à 5 Slides", featured: true },
      { name: "Content Pro", price: "1.250 €/Monat", meta: "60 KI-Videos · 120 Karussells à 5 Slides" },
    ],
    note: `${b2bNote} Drehs, Darsteller, Studios, Sonderlizenzen und externe Produktionskosten sind nicht enthalten.`,
    cta: "Content-System anfragen",
  },
  "/digital/telefonassistenten": {
    area: "Digital", label: "Für Unternehmen", title: "Erreichbar bleiben, ohne jeden Anruf selbst anzunehmen.",
    intro: "Der KI-Telefonassistent beantwortet wiederkehrende Fragen, nimmt Anliegen auf und koordiniert je nach Paket Termine, Leads oder Bestellungen.",
    problem: "Verpasste Anrufe bedeuten verpasste Kunden – gleichzeitig dürfen Datenschutz, Transparenz und Eskalation nicht dem Zufall überlassen werden.",
    solution: ["Eingehende Anrufe im vereinbarten Fair-Use-Rahmen", "FAQ, Nachrichten und Gesprächszusammenfassungen", "Termin- und Leadlogik", "CRM-, Shopify- oder API-Anbindung im Pro-Paket"],
    steps: ["Zweck und erlaubte Gesprächslogik klären", "Wissen und Eskalationen definieren", "Testgespräche und Freigabe", "Sicher starten und nachschärfen"],
    pricing: [
      { name: "Basic", price: "ab 69 €/Monat", meta: "828 € pro Jahr bei jährlicher Vorauszahlung" },
      { name: "Business", price: "ab 129 €/Monat", meta: "Termine · Leads · individuelle Logik", featured: true },
      { name: "Pro", price: "ab 219 €/Monat", meta: "Integrationen · mehrere Rufnummern · Workflows" },
    ],
    note: `${b2bNote} Monatlich kündbar ab 99 €/Monat zuzüglich 149 € Einrichtung. Ab drei Monaten Mindestlaufzeit entfällt die Einrichtungspauschale. Ausgehende Anrufe werden ab 0,12–0,19 €/Minute berechnet und erfolgen nur im rechtlich zulässigen Rahmen.`,
    cta: "Telefonassistent konfigurieren",
  },
  "/digital/ads": {
    area: "Digital", label: "Für Unternehmen", title: "Werbung, die Angebot, Creative und Zielseite zusammen denkt.",
    intro: "Chelonaki entwickelt und optimiert Meta- und Google-Kampagnen mit nachvollziehbarem Tracking und verständlichen Handlungsempfehlungen.",
    problem: "Einzelne Anzeigen ohne klare Botschaft, passende Landingpage und saubere Messung verbrennen Budget.",
    solution: ["Strategie und Zielgruppenanalyse", "Anzeigentexte, Bild- und Video-Creatives", "A/B-Tests, Remarketing und Tracking", "Budgetüberwachung, Reporting und Optimierung"],
    steps: ["Angebot und Ziel definieren", "Kampagne und Creatives bauen", "Tracking prüfen", "Testen und laufend optimieren"],
    pricing: [
      { name: "Ads Basic", price: "500 €/Monat", meta: "1 Plattform · bis 3 Kampagnen" },
      { name: "Ads Business", price: "750 €/Monat", meta: "2 Plattformen · bis 6 Kampagnen", featured: true },
      { name: "Ads Pro", price: "1.250 €/Monat", meta: "bis 3 Plattformen · Funnel und Strategie-Call" },
    ],
    note: `${b2bNote} Das Werbebudget und externe Tools sind nicht enthalten und werden direkt vom Kunden getragen.`,
    cta: "Werbekampagne besprechen",
  },
  "/digital/apps-software": {
    area: "Digital", label: "Für Unternehmen", title: "Digitale Produkte, die mit Ihrem Unternehmen wachsen können.",
    intro: "Wir entwickeln modulare Web-Apps, mobile Anwendungen, Portale, Dashboards und KI-Assistenten mit klaren Rollen und prüfbaren Prozessen.",
    problem: "Ein schneller KI-Prototyp ist noch kein belastbares Unternehmenssystem.",
    solution: ["Web-, Mobile- und interne Apps", "Portale, Dashboards und Workflows", "Rollenbasierte Rechte und geschützte Schnittstellen", "Projektabhängige Tests, Monitoring und Datenschutz"],
    steps: ["Anwendungsfall und Risiken klären", "Funktionierenden MVP entwickeln", "Mit echten Nutzern prüfen", "Modular ausbauen und betreiben"],
    pricing: [{ name: "Individuelles Softwareprojekt", price: "auf Anfrage", meta: "nach Funktionen, Plattformen, Integrationen und Sicherheit", featured: true }],
    note: `${b2bNote} Der konkrete Standard ergibt sich aus dem vereinbarten Sicherheits- und Leistungskatalog.`,
    cta: "App-Idee prüfen lassen",
  },
  "/expertise/ki-consulting": {
    area: "Expertise", label: "Für Unternehmen", title: "Die richtigen KI-Systeme. Nicht möglichst viele Tools.",
    intro: "Wir analysieren, wo künstliche Intelligenz Zeit spart, Qualität verbessert oder neue Angebote ermöglicht – und übersetzen das in einen konkreten Umsetzungsweg.",
    problem: "Tool-Sammlungen ohne Prioritäten führen selten zu besseren Prozessen.",
    solution: ["KI-Strategie und Prozessanalyse", "Automatisierung wiederkehrender Aufgaben", "Werkzeugauswahl und eigene Assistenten", "Schulungen, Datenschutz und verantwortungsvoller Einsatz"],
    steps: ["Ist-Zustand verstehen", "Anwendungsfälle priorisieren", "Roadmap und Prototyp entwickeln", "Team befähigen und Einführung begleiten"],
    pricing: [
      { name: "Strategieberatung", price: "ab 149 €/Std.", meta: "fokussierte Einzelberatung" },
      { name: "KI-Intensivworkshop", price: "2.290 €", meta: "2 Tage · Analyse · Übungen · Fahrplan", featured: true },
      { name: "AI Transformation Sprint", price: "ab 3.990 €", meta: "Strategie, Prioritäten und Umsetzungsplan" },
    ],
    note: b2bNote,
    cta: "KI-Erstgespräch buchen",
  },
  "/expertise/buchproduktion": {
    area: "Expertise", label: "Für Unternehmen und professionelle Personenmarken", title: "Aus Ihrem Wissen wird ein professionelles Buch.",
    intro: "Konzept, Recherche, Ghostwriting, Gestaltung und veröffentlichungsfähige Dateien entstehen in einem abgestimmten Produktionsprozess.",
    problem: "Fachwissen ist vorhanden, aber Struktur, Zeit, Recherche und hochwertige Umsetzung fehlen.",
    solution: ["Positionierung, Zielgruppe und Inhaltskonzept", "Ghostwriting, Recherche und Quellen", "Cover, Buchsatz und Bildentwicklung", "Druckfähige PDF und E-Book-Version"],
    steps: ["Idee und Material prüfen", "Konzept und Inhaltsverzeichnis freigeben", "Kapitelweise produzieren", "Lektorat, Layout und finale Freigabe"],
    pricing: [
      { name: "Kinderbuch", price: "ab 500 €", meta: "klar begrenzter Einstieg bis 24 Seiten" },
      { name: "Authority Book", price: "3.000 €", meta: "ca. 80–150 Seiten · Konzept · Ghostwriting · Layout", featured: true },
      { name: "Premium Research Book", price: "6.000 €", meta: "Recherche · Quellen · Lektorat · hochwertiges Design" },
    ],
    note: `${b2bNote} Druck, ISBN, Plattformgebühren, Sonderlizenzen und nicht ausdrücklich genannte Fremdleistungen sind nicht enthalten.`,
    cta: "Buchprojekt anfragen",
  },
};

export { b2bNote };
