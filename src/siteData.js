export const navigation = [
  {
    label: "Web, Apps & Publikationen",
    href: "/web-apps-publikationen",
    items: [
      ["Websites erstellen lassen", "/web-apps-publikationen/websites-erstellen-lassen"],
      ["Apps entwickeln lassen", "/web-apps-publikationen/apps-entwickeln-lassen"],
      ["Bücher erstellen lassen & Ghostwriting", "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting"],
    ],
  },
  {
    label: "Medien & KI",
    href: "/medien-ai",
    items: [
      ["KI Content & Social Media", "/medien-ai/social-media"],
      ["KI Ads für Meta & Google", "/medien-ai/ads"],
      ["KI-Telefonassistenten", "/medien-ai/ki-telefon"],
      ["KI-Antworten für Social Media", "/medien-ai/chelonaki-reply"],
    ],
  },
  {
    label: "KI-Beratung & Weiterbildung",
    href: "/ki-beratung-weiterbildung",
    items: [
      ["KI-Beratung für Unternehmen", "/ki-beratung-weiterbildung/ki-beratung-unternehmen"],
      ["KI-Schulungen & Workshops für Mitarbeiter", "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter"],
      ["Chelonaki Video Academy", "/ki-beratung-weiterbildung/video-academy"],
    ],
  },
  { label: "Originals", href: "/originals", items: [["Eigene Apps", "/originals/apps"], ["Eigene Bücher", "/originals/buecher"]] },
  { label: "Demowelten", href: "/demowelten", items: [] },
  { label: "Über uns", href: "/ueber-uns", items: [] },
];

export const worlds = [
  {
    number: "01",
    eyebrow: "Für Unternehmen & eigene Projekte",
    title: "Web, Apps & Publikationen",
    text: "Digitale Lösungen für Unternehmen, künftige Gründer und Menschen mit einer eigenen Idee.",
    detail: "Websites · Apps · Bücher & Ghostwriting",
    href: "/web-apps-publikationen",
    cta: "Bereich entdecken",
    tone: "digital",
  },
  {
    number: "02",
    eyebrow: "Wissen in Anwendung",
    title: "Medien & KI",
    text: "Künstliche Intelligenz trifft auf Beratung, Ernährungswissenschaft und echte Praxiserfahrung.",
    detail: "Social Media · Ads · KI-Telefon · Reply",
    href: "/medien-ai",
    cta: "Bereich entdecken",
    tone: "expertise",
  },
  {
    number: "03",
    eyebrow: "Eigene Ideenwelten",
    title: "KI-Beratung & Weiterbildung",
    text: "Strategie für Unternehmen, praxisnahe Qualifizierung für Mitarbeiter und flexible Videokurse.",
    detail: "KI-Beratung · Mitarbeiterschulungen · Video Academy",
    href: "/ki-beratung-weiterbildung",
    cta: "Bereich entdecken",
    tone: "expertise",
  },
  { number: "04", eyebrow: "Eigene Produktwelten", title: "Originals", text: "Eigene Apps und Bücher aus dem Chelonaki-Ökosystem.", detail: "Eigene Apps · eigene Bücher", href: "/originals", cta: "Originals entdecken", tone: "originals" },
  { number: "05", eyebrow: "Erleben statt nur lesen", title: "Demowelten", text: "Demos, Prototypen und Experimente, die Ideen vor einer Entscheidung greifbar machen.", detail: "Demos · Prototypen · Experimente", href: "/demowelten", cta: "Demowelten öffnen", tone: "digital" },
  { number: "06", eyebrow: "Herkunft & Haltung", title: "Über uns", text: "Die Familiengeschichte, Kompetenz und Werte hinter Chelonaki.", detail: "Eleftherios · Familie · Qualität", href: "/ueber-uns", cta: "Geschichte kennenlernen", tone: "expertise" },
];

export const hubData = {
  digital: {
    label: "Für Unternehmen & eigene Projekte",
    title: "Digitale Lösungen, die aus Ihrer Idee etwas Greifbares machen.",
    intro: "Für bestehende Unternehmen, künftige Gründungen und persönliche Vorhaben verbinden wir Strategie, Gestaltung, Technik und kontrollierte Automatisierung.",
    image: "/assets/project-digital-brand.png",
    cta: "Digitalprojekt anfragen",
    cards: navigation[0].items.map(([title, href], index) => ({
      title,
      href,
      text: [
        "Hochwertige Auftritte und Shops mit klarer Conversion-Struktur.",
        "Komplette Bücher: Konzept, Ghostwriting, Recherche, Design und veröffentlichungsfähige Dateien.",
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
    intro: "Wir übersetzen künstliche Intelligenz, Ernährungswissenschaft und Praxiserfahrung in klare Entscheidungen, wirksame Beratung und strukturierte Lernangebote.",
    image: "/assets/chapter-architecture.webp",
    cta: "Erstgespräch buchen",
    cards: navigation[1].items.map(([title, href], index) => ({
      title,
      href,
      text: [
        "Prozesse verstehen, sinnvolle Anwendungsfälle priorisieren und umsetzen.",
        "Strukturierte Video-Lernwelten für KI und Ernährung.",
        "Wissenschaftlich fundierte Beratung für Unternehmen und Privatpersonen.",
      ][index],
    })),
  },
  originals: {
    label: "Chelonaki Original",
    title: "Eigene Ideen. Eigene Produkte. Eine gemeinsame Welt.",
    intro: "Unter Originals entstehen eigene Apps und Bücher, die Ernährung, Gesundheit und alltagstaugliches Wissen sinnvoll verbinden.",
    image: "/assets/project-nutrition-venture.png",
    cta: "Originals entdecken",
    cards: navigation[3].items.map(([title, href], index) => ({
      title,
      href,
      text: [
        "Eigene Ernährungs-, Fitness- und Alltagsanwendungen wie Chelonaki EvoFit.",
        "Fach- und Kinderbücher für Ernährung, Gesundheit und besondere Stoffwechselthemen.",
      ][index],
    })),
  },
};

const b2bNote = "Die dargestellten Paketpreise verstehen sich netto zuzüglich der gesetzlichen Umsatzsteuer und richten sich an Unternehmer im Sinne des § 14 BGB. Private Projekte sind ausdrücklich willkommen und erhalten vor Beauftragung ein gesondertes Angebot mit korrekt ausgewiesenem Gesamtpreis.";

hubData.web = {
  label: "Für Unternehmen",
  title: "Websites, Apps und Publikationen, die ein klares Ergebnis liefern.",
  intro: "Von der ersten Struktur bis zur veröffentlichungsfähigen Lösung verbinden wir Strategie, Gestaltung, Technik und kontrollierte KI-Unterstützung.",
  image: "/assets/project-digital-brand.png", cta: "Projekt anfragen",
  cards: navigation[0].items.map(([title, href], index) => ({ title, href, text: ["Shopify-Websites und Shops mit klarer Nutzerführung.", "Apps für iOS, Android und Web aus einer belastbaren Basis.", "Konzept, Text, Design und veröffentlichungsfähige Buchdateien.", "Professionelles Ghostwriting mit klarer Stimme und menschlicher Freigabe."][index] })),
};
hubData.media = {
  label: "Für Unternehmen",
  title: "Medien und KI, die Sichtbarkeit und Kommunikation planbarer machen.",
  intro: "Content, Werbung, Telefonie und intelligente Antwortvorschläge werden als zusammenhängende Kommunikationsbausteine entwickelt – mit transparenten Grenzen und Freigaben.",
  image: "/assets/hero-architecture.png", cta: "Medien- oder KI-Projekt anfragen",
  cards: navigation[1].items.map(([title, href], index) => ({ title, href, text: ["Planbare Inhalte in einer konsistenten Markenwelt.", "Kampagnen, Creatives, Tracking und Optimierung.", "Anfragen aufnehmen, Fragen beantworten und Termine koordinieren.", "Drei passende Antwortvorschläge für LinkedIn, Instagram und E-Mail – Sie wählen und bearbeiten."][index] })),
};
hubData.advice = {
  label: "Für Unternehmen",
  title: "Der passende Weg von der KI-Strategie zur sicheren Anwendung.",
  intro: "Wir beraten Entscheider, qualifizieren Mitarbeiter in realen Arbeitsabläufen und stellen Wissen über die Chelonaki Video Academy flexibel bereit.",
  image: "/assets/chapter-architecture.webp", cta: "Erstgespräch buchen",
  cards: navigation[2].items.map(([title, href], index) => ({ title, href, text: ["Geschäftsprozesse analysieren, Anwendungsfälle priorisieren und eine realistische Roadmap entwickeln.", "Mitarbeiter in praxisnahen Schulungen und Workshops für ihre konkreten Aufgaben befähigen.", "KI-Wissen flexibel über strukturierte Videokurse und Arbeitsmaterialien aufbauen."][index] })),
};

export const services = {
  "/digital/websites-erstellen-lassen": {
    area: "Digital", label: "Für Unternehmen & eigene Projekte", title: "Websites, die nicht nur gut aussehen, sondern verkaufen.",
    intro: "Wir entwickeln Shopify-Websites und Shops von der Struktur über Design und Text bis zur responsiven Umsetzung und laufenden Optimierung.",
    problem: "Viele Websites erklären zu viel, führen zu wenig und werden nach dem Launch technisch nicht weitergedacht.",
    solution: ["Unternehmenswebsites und Shopify-Shops", "Landingpages und Conversion-Struktur", "Responsive Umsetzung und Basis-SEO", "Formulare, Newsletter, Termine und Integrationen"],
    steps: ["Ziel und Designrichtung festlegen", "Struktur und Inhalte entwickeln", "Shopify responsiv umsetzen", "Prüfen, freigeben und übergeben"],
    pricing: [
      { name: "Website Starter", price: "1.000 €", meta: "bis 5 Seiten · 2 Korrekturrunden" },
      { name: "Website Business", price: "1.750 €", meta: "bis 10 Seiten · Branding · Tracking-Grundsetup" },
      { name: "Website Pro", price: "2.500 €", meta: "bis 15 Seiten · Conversion · Blog · Newsletter", featured: true },
      { name: "Website Individual", price: "ab 2.900 €", meta: "individuelle UX/UI und Funktionen" },
    ],
    note: `${b2bNote} Shopify-Tarife, kostenpflichtige Apps und weitere Fremdkosten sind nicht enthalten.`,
    cta: "Website-Projekt besprechen",
    bookingCta: "Paket auswählen & Website buchen",
    inquiryCta: "Individuelle Website anfragen",
    insight: {
      label: "Warum Shopify",
      title: "Einfacher pflegen. Planbarer weiterentwickeln.",
      text: "Inhalte, Produkte, Bestellungen und viele alltägliche Einstellungen werden in einer zentralen Oberfläche verwaltet. Hosting, zentrale Plattformupdates und TLS-Zertifikate für verbundene Domains reduzieren den technischen Eigenbetrieb – ohne eine absolute Störungsfreiheit zu versprechen.",
      points: ["Zentrale Pflege statt verteilter Systeme", "Weniger selbst betriebene Basiskomponenten", "Direkt für Leistungen und Produkte erweiterbar", "Saubere Übergabe nach persönlicher Einweisung"],
    },
  },
  "/digital/social-media-content": {
    area: "Digital", label: "Für Unternehmen & eigene Projekte", title: "Ein Content-System statt täglicher Improvisation.",
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
    bookingCta: "Content-Paket auswählen & buchen",
    inquiryCta: "Individuelles Content-System anfragen",
  },
  "/digital/ki-telefonassistenten": {
    area: "Digital", label: "Für Unternehmen & eigene Projekte", title: "Erreichbar bleiben, ohne jeden Anruf selbst anzunehmen.",
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
    bookingCta: "KI-Telefonassistent auswählen & buchen",
    inquiryCta: "Individuelle Integration anfragen",
  },
  "/digital/ki-werbung-meta-google": {
    area: "Digital", label: "Für Unternehmen & eigene Projekte", title: "Werbung, die Angebot, Creative und Zielseite zusammen denkt.",
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
    bookingCta: "Werbepaket auswählen & buchen",
    inquiryCta: "Individuelle Kampagne anfragen",
  },
  "/digital/apps-software": {
    area: "Digital", label: "Für Unternehmen, Gründer & Organisationen", title: "Aus einer Idee wird eine App, die Menschen wirklich nutzen können.",
    intro: "Wir entwickeln skalierbare Apps und digitale Produkte für iOS, Android und Web – individuell gestaltet, KI-gestützt und auf einer gemeinsamen technischen Basis.",
    problem: "Ein schneller KI-Prototyp ist noch kein belastbares Unternehmenssystem.",
    solution: ["iOS und Android aus gemeinsamer Codebasis", "Login, Datenbanken, Rollen und Adminbereiche", "Zahlungen, Push, APIs und KI-Funktionen", "Dokumentierte Architektur, Tests und Übergabe"],
    steps: ["Idee und Kernfunktionen prüfen", "Discovery, Nutzerwege und Daten festlegen", "UX/UI und Prototyp abstimmen", "Modular entwickeln, testen und übergeben"],
    pricing: [
      { name: "App Starter", price: "ab 2.500 €", meta: "5–8 Screens · iOS & Android · einfache API" },
      { name: "App MVP", price: "ab 4.900 €", meta: "Login · Datenbank · Admin · Push", featured: true },
      { name: "App Advanced", price: "ab 7.900 €", meta: "Rollen · Zahlungen · mehrere Schnittstellen" },
      { name: "App Pro", price: "ab 12.900 €", meta: "KI · Automationen · umfangreiches Backend" },
      { name: "Custom / Enterprise", price: "ab 20.000 €", meta: "individuelle Infrastruktur und Sicherheitsrahmen" },
    ],
    note: `${b2bNote} iOS und Android sind bei mobilen Standardpaketen aus gemeinsamer Codebasis vorgesehen. Web-App, Entwicklerkonten, Hosting, Datenbanken, Zahlungsanbieter sowie KI- und API-Dienste werden je nach Umfang separat ausgewiesen.`,
    cta: "Kostenlose Ersteinschätzung anfragen",
    bookingCta: "App-Paket auswählen & Projekt starten",
    inquiryCta: "Individuelle Software anfragen",
    insight: {
      label: "Multi-Platform App Development",
      title: "Ein Projekt. iOS und Android inklusive.",
      text: "Flutter oder React Native ermöglichen eine gemeinsame technische Basis. Das reduziert Doppelarbeit bei Entwicklung, Tests und Wartung. Eine Web-App wird abhängig vom Paket ergänzt.",
      points: ["Modular statt festgefahren", "Menschliche Prüfung kritischer Funktionen", "Security by Design nach Schutzbedarf", "Dokumentierte Übergabe und Ausbauplanung"],
    },
  },
  "/expertise/ki-schulungen-consulting": {
    area: "Expertise", label: "Für Unternehmen", title: "KI-Schulungen & Consulting für konkrete Arbeitsabläufe.",
    intro: "Wir analysieren, wo künstliche Intelligenz Zeit spart, Qualität verbessert oder neue Angebote ermöglicht – und übersetzen das in einen konkreten Umsetzungsweg.",
    problem: "Tool-Sammlungen ohne Prioritäten führen selten zu besseren Prozessen.",
    solution: ["KI-Strategie und Prozessanalyse", "Automatisierung wiederkehrender Aufgaben", "Werkzeugauswahl und eigene Assistenten", "Schulungen, Datenschutz und verantwortungsvoller Einsatz"],
    steps: ["Ist-Zustand verstehen", "Anwendungsfälle priorisieren", "Roadmap und Prototyp entwickeln", "Team befähigen und Einführung begleiten"],
    pricing: [
      { name: "Strategieberatung", price: "ab 149 €/Std.", meta: "fokussierte Einzelberatung" },
      { name: "KI-Schulung", price: "1.290 €", meta: "1 Tag · verständlich und praxisnah" },
      { name: "KI-Consulting", price: "1.490 €", meta: "1 Tag · Prozesse und Umsetzung" },
      { name: "KI-Intensivworkshop", price: "2.290 €", meta: "2 Tage · Analyse · Übungen · Fahrplan", featured: true },
      { name: "KI-Transformations-Sprint", price: "ab 3.990 €", meta: "Strategie, Prioritäten und Umsetzungsplan" },
    ],
    note: b2bNote,
    cta: "KI-Erstgespräch buchen",
    bookingCta: "KI-Schulung oder Beratung auswählen",
    inquiryCta: "KI-Erstgespräch buchen",
  },
  "/digital/buchproduktion-ghostwriting": {
    area: "Digital", label: "Für Unternehmen & eigene Buchprojekte", title: "Ihr Buch – geschrieben, gestaltet, veröffentlichungsfertig.",
    intro: "Wir übernehmen die komplette Buchproduktion: Konzept, Recherche, Ghostwriting, Cover, Layout sowie die fertigen Dateien für Print und E-Book.",
    problem: "Fachwissen ist vorhanden, aber Struktur, Zeit, Recherche und hochwertige Umsetzung fehlen.",
    solution: ["Buchkonzept, Positionierung und Kapitelstruktur", "Ghostwriting, Recherche und Quellen", "Cover, Buchsatz, Layout und Bildentwicklung", "Veröffentlichungsfertige PDF- und E-Book-Dateien"],
    steps: ["Idee und Material prüfen", "Konzept und Inhaltsverzeichnis freigeben", "Kapitelweise produzieren", "Lektorat, Layout und finale Freigabe"],
    pricing: [
      { name: "Kinderbuch", price: "ab 500 €", meta: "klar begrenzter Einstieg bis 24 Seiten" },
      { name: "Book Starter", price: "ab 1.000 €", meta: "bis ca. 80 Seiten · Basisdesign · Cover" },
      { name: "Authority Book", price: "3.000 €", meta: "ca. 80–150 Seiten · Konzept · Ghostwriting · Layout", featured: true },
      { name: "Premium Research Book", price: "6.000 €", meta: "Recherche · Quellen · Lektorat · hochwertiges Design" },
      { name: "Individuelles Buchprojekt", price: "auf Anfrage", meta: "Fachbücher, Sonderformate und größere Umfänge" },
    ],
    note: `${b2bNote} Druck, ISBN, Plattformgebühren, Sonderlizenzen und nicht ausdrücklich genannte Fremdleistungen sind nicht enthalten.`,
    cta: "Buchprojekt anfragen",
    bookingCta: "Buchpaket auswählen & Projekt starten",
    inquiryCta: "Individuelles Buchprojekt anfragen",
  },
};

services["/web-apps-publikationen/websites-erstellen-lassen"] = services["/digital/websites-erstellen-lassen"];
services["/web-apps-publikationen/apps-entwickeln-lassen"] = services["/digital/apps-software"];
services["/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting"] = services["/digital/buchproduktion-ghostwriting"];
services["/medien-ai/social-media"] = services["/digital/social-media-content"];
services["/medien-ai/ads"] = services["/digital/ki-werbung-meta-google"];
services["/medien-ai/ki-telefon"] = services["/digital/ki-telefonassistenten"];
services["/medien-ai/automatisierungen"] = { ...services["/digital/apps-software"], title: "KI-Automatisierungen für wiederkehrende Abläufe.", intro: "Wir verbinden Formulare, E-Mail, CRM, Shopify und interne Werkzeuge zu kontrollierten Workflows mit klaren Freigaben.", problem: "Manuelle Übergaben, doppelte Datenpflege und verstreute Werkzeuge kosten Zeit und erzeugen Fehler.", solution: ["Prozessaufnahme und Automations-Check", "Trigger, Aktionen und menschliche Freigaben", "API-, CRM-, Shopify- und Formular-Verbindungen", "Tests, Fehlerwege, Dokumentation und Übergabe"], pricing: [{ name: "Automations-Check", price: "ab 149 €", meta: "Prozess prüfen · Potenzial und Risiken einordnen", featured: true }, { name: "Individueller Workflow", price: "auf Anfrage", meta: "Umfang nach Systemen, Daten und Schnittstellen" }], bookingCta: "Automatisierungsweg auswählen" };
services["/medien-ai/chelonaki-reply"] = {
  area: "Medien & KI", label: "Für Selbstständige, Teams & Marken", title: "Drei passende Antworten. Sie wählen die richtige.",
  intro: "Chelonaki Reply erstellt für eingehende Nachrichten drei unterscheidbare Antwortvorschläge für LinkedIn, Instagram und E-Mail – passend zu Ton, Ziel und Gesprächssituation.",
  problem: "Professionelle Nachrichten bleiben liegen, weil im Alltag Zeit, Formulierungssicherheit oder eine einheitliche Markenstimme fehlen.",
  solution: ["Drei klar unterschiedliche Antwortvorschläge", "Tonarten wie kurz, herzlich, professionell oder vertriebsorientiert", "Eigene Markenbegriffe und No-Go-Aussagen", "Bearbeiten und kopieren vor dem Senden", "Keine unbeaufsichtigten Nachrichten im MVP"],
  steps: ["Kanal und Gesprächskontext wählen", "Ziel und gewünschte Tonalität festlegen", "Drei Vorschläge erzeugen", "Prüfen, bearbeiten und selbst versenden"],
  pricing: [
    { name: "Reply Starter", price: "5 €/Monat", meta: "begrenzte Antworten · 1 persönliches Tonprofil" },
    { name: "Reply Core", price: "19 €/Monat", meta: "bei jährlicher Zahlung · mehr Antworten · eigene Tonalität", featured: true },
    { name: "Reply Pro", price: "89 €/Monat", meta: "bei jährlicher Zahlung · Teams · Markenprofile · Priorität" },
    { name: "Reply Enterprise", price: "auf Anfrage", meta: "individuelle Limits · Rollen · Datenschutz- und Integrationsrahmen" },
  ],
  note: "Der Einstieg beginnt bei 5 € pro Monat. Monatliche Zahlung, Nutzungslimits, Integrationen und mögliche Fremdkosten werden vor dem öffentlichen Produktstart final festgelegt. Preise für Unternehmen netto zzgl. USt.",
  cta: "Zugang vormerken", bookingCta: "Reply-Tarif auswählen", inquiryCta: "Chelonaki Reply testen",
  insight: { label: "Mensch bleibt am Steuer", title: "Schneller antworten, ohne Kontrolle abzugeben.", text: "Reply schlägt Formulierungen vor, trifft aber keine autonome Kommunikationsentscheidung. Im MVP prüfen, bearbeiten und versenden Sie jede Nachricht selbst.", points: ["Kein automatisches Senden", "Vorschläge bleiben editierbar", "Markenstimme als Leitplanke", "Transparente Entwicklungsstufe"] },
};
services["/ki-beratung-weiterbildung/ki-beratung-unternehmen"] = { ...services["/expertise/ki-schulungen-consulting"], area: "KI-Beratung & Weiterbildung", title: "KI-Beratung für Unternehmen – vom Potenzial zur klaren Roadmap.", intro: "Wir analysieren Prozesse, bewerten sinnvolle KI-Anwendungsfälle und entwickeln einen realistischen Umsetzungsplan für Ihr Unternehmen.", problem: "Viele Unternehmen testen einzelne KI-Werkzeuge, ohne Prioritäten, Verantwortlichkeiten und einen belastbaren Einführungsplan festzulegen.", solution: ["Prozess- und Potenzialanalyse", "Priorisierte KI-Anwendungsfälle", "Werkzeug-, Daten- und Risikobewertung", "Roadmap mit nächsten Umsetzungsschritten"], pricing: [{ name: "Strategieberatung", price: "ab 149 €/Std.", meta: "fokussierte Fragestellung und Handlungsempfehlung" }, { name: "KI-Consulting-Tag", price: "1.490 €", meta: "Prozessanalyse · Priorisierung · Umsetzungsplan", featured: true }, { name: "KI-Transformations-Sprint", price: "ab 3.990 €", meta: "vertiefte Analyse · Roadmap · Umsetzungsbegleitung" }], bookingCta: "Beratungsformat auswählen", cta: "KI-Beratung anfragen", inquiryCta: "Unternehmensberatung besprechen" };
services["/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter"] = { ...services["/expertise/ki-schulungen-consulting"], area: "KI-Beratung & Weiterbildung", title: "KI-Schulungen & Workshops für Mitarbeiter.", intro: "Wir befähigen Teams, KI in ihren konkreten Arbeitsabläufen sicher, effizient und verantwortungsvoll einzusetzen.", problem: "Allgemeine Tool-Vorträge verändern den Arbeitsalltag nicht. Mitarbeiter brauchen verständliche Übungen, klare Regeln und Beispiele aus ihren eigenen Aufgaben.", solution: ["Praxisnahe KI-Grundlagen", "Übungen mit realen Arbeitsabläufen", "Prompting, Qualitätskontrolle und Datenschutz", "Gemeinsam entwickelte Vorlagen und Workflows"], pricing: [{ name: "KI-Schulung", price: "1.290 €", meta: "1 Tag · Grundlagen · Übungen · Transfer" }, { name: "KI-Intensivworkshop", price: "2.290 €", meta: "2 Tage · Prozesse · Übungen · gemeinsamer Fahrplan", featured: true }, { name: "Individuelles Teamprogramm", price: "auf Anfrage", meta: "mehrere Teams · Module · begleiteter Praxistransfer" }], bookingCta: "Mitarbeiterformat auswählen", cta: "Mitarbeiterschulung anfragen", inquiryCta: "Schulung für Ihr Team planen" };

export { b2bNote };
