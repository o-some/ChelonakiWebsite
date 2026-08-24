import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Buildings,
  CaretDown,
  Check,
  ChatCircleDots,
  EnvelopeSimple,
  GlobeHemisphereWest,
  List,
  LockKey,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  PaperPlaneTilt,
  Sparkle,
  X,
} from "@phosphor-icons/react";
import { hubData, navigation, services, worlds } from "./siteData.js";
import generatedTranslations from "./translations.generated.js";
import translationPatches from "./translations.patches.js";
import {
  enabledLocales,
  getLanguageFromUrl,
  getLocale,
  localizePath,
  normalizeLanguageCode,
  resolvePreferredLanguage,
  stripLanguageFromPath,
} from "./locales.js";

const translations = Object.fromEntries(
  Object.entries(generatedTranslations).map(([language, dictionary]) => [
    language,
    { ...dictionary, ...(translationPatches[language] || {}) },
  ]),
);

const legalViews = {
  impressum: {
    label: "Rechtliche Angaben",
    title: "Impressum",
    content: (
      <>
        <p className="legal-lead">
          Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
        </p>
        <h3>Anbieter</h3>
        <p>
          Chelonaki
          <br />
          Inhaber: Eleftherios Samouladas
          <br />
          Zeppelinstraße 7
          <br />
          68519 Viernheim
          <br />
          Deutschland
        </p>
        <h3>Kontakt</h3>
        <p>
          Telefon: <a href="tel:+491712997495">+49 171 2997495</a>
          <br />
          E-Mail: <a href="mailto:info@chelonaki.eu">info@chelonaki.eu</a>
        </p>
        <h3>Rechtsform</h3>
        <p>Einzelunternehmen</p>
        <h3>Verbraucherstreitbeilegung</h3>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </>
    ),
  },
  datenschutz: {
    label: "Stand: 24. August 2026",
    title: "Datenschutzerklärung",
    content: (
      <>
        <p className="legal-lead">
          Diese Hinweise erklären, welche personenbezogenen Daten beim Besuch
          dieser Website und bei einer Kontaktaufnahme verarbeitet werden.
        </p>
        <h3>Verantwortlicher</h3>
        <p>
          Eleftherios Samouladas, handelnd unter Chelonaki
          <br />
          Zeppelinstraße 7, 68519 Viernheim, Deutschland
          <br />
          Telefon: <a href="tel:+491712997495">+49 171 2997495</a>
          <br />
          E-Mail: <a href="mailto:info@chelonaki.eu">info@chelonaki.eu</a>
        </p>
        <p>
          Datenschutzanfragen können direkt an die oben genannte E-Mail-Adresse
          gerichtet werden.
        </p>
        <h3>Hosting und technische Bereitstellung</h3>
        <p>
          Diese Website wird über die Infrastruktur von Cloudflare, Inc., 101
          Townsend Street, San Francisco, CA 94107, USA, bereitgestellt.
          Cloudflare erbringt insbesondere Hosting-, Auslieferungs-,
          Sicherheits- und Netzwerkdienste. Beim Aufruf verarbeitet Cloudflare
          technisch erforderliche Verbindungsdaten, insbesondere IP-Adresse,
          aufgerufene Adresse, Zeitpunkt, Browser- und Geräteinformationen sowie
          Sicherheits- und Protokolldaten.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
          Interesse liegt in der sicheren, stabilen und missbrauchsgeschützten
          Bereitstellung der Website. Cloudflare verarbeitet Daten in unserem
          Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags. Soweit
          Daten außerhalb des Europäischen Wirtschaftsraums verarbeitet
          werden, stützt Cloudflare die Übermittlung insbesondere auf den
          EU-US-Datenschutzrahmen und die EU-Standardvertragsklauseln. Technische
          Daten werden gelöscht oder anonymisiert, sobald sie für Betrieb,
          Sicherheit und Fehlerbehebung nicht mehr erforderlich sind und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen. Weitere
          Informationen enthält die{" "}
          <a href="https://www.cloudflare.com/privacypolicy/">
            Datenschutzerklärung von Cloudflare
          </a>
          .
        </p>
        <h3>Sprachversionen</h3>
        <p>
          Derzeit ist ausschließlich die geprüfte deutsche Fassung
          veröffentlicht. Weitere Sprachfassungen werden erst nach
          vollständiger inhaltlicher, rechtlicher und muttersprachlicher
          Prüfung freigeschaltet. Inhalte werden nicht an einen externen
          Übersetzungsdienst übermittelt.
        </p>
        <h3>Speicherungen auf Ihrem Gerät</h3>
        <p>
          Auf Wunsch gemerkte Designbeispiele werden im lokalen Speicher Ihres
          Browsers abgelegt. Diese Angaben bleiben auf Ihrem Gerät und können
          über die Browser-Einstellungen gelöscht werden. Die Speicherung dient
          ausschließlich der von Ihnen gewünschten Bedienung der Website;
          Rechtsgrundlagen sind § 25 Abs. 2 Nr. 2 TDDDG und Art. 6 Abs. 1 lit. f
          DSGVO.
        </p>
        <h3>Keine optionale Nutzungsstatistik</h3>
        <p>
          Chelonaki setzt derzeit keine optionale Nutzungsstatistik, keine
          Marketing-Cookies und keine Werbe-Tracker ein. Sollte sich dies
          ändern, werden diese Hinweise vor der Aktivierung angepasst und
          einwilligungspflichtige Funktionen bis zu einer wirksamen
          Einwilligung blockiert.
        </p>
        <h3>Chelonaki Assistent</h3>
        <p>
          Nachrichten an den Assistenten werden an den Server dieser Website
          übertragen, dort regelbasiert beantwortet und nicht in der
          Anwendungsdatenbank gespeichert. Zur Missbrauchsabwehr wird die
          anfragende IP-Adresse vorübergehend im Arbeitsspeicher für eine
          Zugriffsbeschränkung verwendet; der Zeitraum beträgt fünf Minuten.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Bitte übermitteln Sie
          dort keine sensiblen oder vertraulichen Daten.
        </p>
        <h3>Kontakt per Formular, E-Mail und Telefon</h3>
        <p>
          Das Kontaktformular erstellt ausschließlich auf Ihrem Gerät eine
          vorausgefüllte E-Mail und öffnet Ihr E-Mail-Programm. Die eingegebenen
          Formulardaten werden nicht an den Server dieser Website übermittelt.
          Erst wenn Sie die E-Mail absenden oder uns telefonisch kontaktieren,
          verarbeiten wir Ihre Angaben zur Bearbeitung der Anfrage.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen
          oder vertraglichen Anliegen, sonst Art. 6 Abs. 1 lit. f DSGVO.
          Anfragedaten werden grundsätzlich spätestens sechs Monate nach
          Abschluss der Bearbeitung gelöscht, soweit keine gesetzlichen
          Aufbewahrungspflichten oder die Geltendmachung, Ausübung oder
          Verteidigung von Rechtsansprüchen eine längere Speicherung erfordern.
        </p>
        <h3>Ihre Rechte</h3>
        <p>
          Nach Maßgabe der DSGVO bestehen insbesondere Rechte auf Auskunft,
          Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
          Widerspruch. Eine erteilte Einwilligung kann jederzeit mit Wirkung für
          die Zukunft widerrufen werden. Außerdem besteht ein Beschwerderecht
          bei einer Datenschutzaufsichtsbehörde. Für den Sitz des
          Verantwortlichen ist insbesondere der Hessische Beauftragte für
          Datenschutz und Informationsfreiheit, Postfach 3163, 65021 Wiesbaden,
          E-Mail: poststelle@datenschutz.hessen.de, zuständig.
        </p>
      </>
    ),
  },
  cookies: {
    label: "Datenschutz-Einstellungen",
    title: "Datenschutz-Einstellungen",
    content: (
      <>
        <p className="legal-lead">
          Diese Website verwendet derzeit keine optionale Nutzungsstatistik,
          keine Marketing-Cookies und keine Werbe-Tracker.
        </p>
        <div className="settings-row">
          <div>
            <strong>Erforderliche Einstellungen</strong>
            <p>
              Auf Wunsch gemerkte Designbeispiele bleiben ausschließlich in
              Ihrem Browser.
            </p>
          </div>
          <span>
            <Check size={16} /> Aktiv
          </span>
        </div>
        <p>
          Weil keine optionalen Dienste aktiv sind, ist keine Auswahl oder
          Einwilligung erforderlich.
        </p>
      </>
    ),
  },
  agb: {
    label: "Stand: 24. August 2026",
    title: "Allgemeine Geschäftsbedingungen",
    content: (
      <>
        <p className="legal-lead">
          Diese AGB gelten für Verträge über Dienstleistungen, Werkleistungen
          und digitale Leistungen von Chelonaki.
        </p>
        <h3>1. Anbieter und Geltungsbereich</h3>
        <p>
          Vertragspartner ist Eleftherios Samouladas, handelnd unter Chelonaki,
          Zeppelinstraße 7, 68519 Viernheim. Diese AGB gelten für
          Dienstleistungen, Werkleistungen, digitale Inhalte und digitale
          Dienste. Sie gelten gegenüber Unternehmern und Verbrauchern, soweit
          im individuellen Angebot nichts Abweichendes vereinbart wird.
          Individuelle Vereinbarungen und die konkrete Leistungsbeschreibung
          gehen diesen AGB vor.
        </p>
        <h3>2. Vertragsschluss</h3>
        <p>
          Darstellungen, Paketfinder, Preise und Kontaktmöglichkeiten auf der
          Website sind unverbindliche Informationen und kein bindendes Angebot.
          Ein Vertrag kommt durch ein individuelles Angebot von Chelonaki und
          dessen Annahme durch den Kunden oder durch eine ausdrückliche
          Auftragsbestätigung zustande. Eine über die Website vorbereitete oder
          per E-Mail übermittelte Anfrage ist noch keine Bestellung und
          verpflichtet den Kunden nicht zum Vertragsschluss.
        </p>
        <p>
          Die Vertragssprache ist Deutsch. Angebot, Vertragsbedingungen und
          Verbraucherinformationen werden dem Kunden in Textform, in der Regel
          per E-Mail, zur Verfügung gestellt.
        </p>
        <h3>3. Leistungsumfang und Änderungen</h3>
        <p>
          Art, Umfang, Termine, Korrekturrunden, Abnahmen und Vergütung ergeben
          sich aus dem jeweiligen Angebot oder der Leistungsbeschreibung.
          Änderungs- und Zusatzwünsche werden vor ihrer Umsetzung hinsichtlich
          Mehrkosten und Terminfolgen abgestimmt.
        </p>
        <h3>4. Mitwirkung des Kunden</h3>
        <p>
          Der Kunde stellt vereinbarte Inhalte, Zugänge, Freigaben und
          Ansprechpartner rechtzeitig bereit und prüft Zwischenstände innerhalb
          der abgestimmten Fristen. Der Kunde sichert zu, dass bereitgestellte
          Inhalte und Materialien rechtmäßig verwendet werden dürfen.
          Verzögerungen durch fehlende Mitwirkung können vereinbarte Termine
          entsprechend verschieben.
        </p>
        <h3>5. Preise und Zahlung</h3>
        <p>
          Maßgeblich sind die Preise und Zahlungsbedingungen im individuellen
          Angebot. Als netto gekennzeichnete Websitepreise richten sich
          ausschließlich an Unternehmer. Verbraucher erhalten vor
          Vertragsschluss den zu zahlenden Gesamtpreis einschließlich
          anwendbarer Steuern und Abgaben.
          Fremdkosten, Lizenzen, Plattformtarife, Werbebudgets, Druck- oder
          Versandkosten sind nur enthalten, wenn dies ausdrücklich vereinbart
          und vor Vertragsschluss ausgewiesen wurde.
        </p>
        <p>
          Fälligkeit, Abschlagszahlungen und Zahlungsplan ergeben sich aus dem
          individuellen Angebot und der Rechnung.
        </p>
        <h3>6. Termine, Übergabe und Abnahme</h3>
        <p>
          Termine setzen die rechtzeitige Mitwirkung und Freigabe des Kunden
          voraus. Soweit eine Abnahme gesetzlich oder vertraglich vorgesehen
          ist, wird der Kunde das vertragsgemäße Werk nach Bereitstellung prüfen
          und konkrete Mängel mitteilen. Unwesentliche Abweichungen hindern die
          Abnahme nicht.
        </p>
        <h3>7. Digitale Inhalte und Zugänge</h3>
        <p>
          Digitale Inhalte, Downloads, Kurse oder Zugänge werden in der in der
          Produktbeschreibung genannten Form und Dauer bereitgestellt.
          Zugangsdaten sind vor unbefugter Nutzung zu schützen und dürfen nur im
          vereinbarten Umfang weitergegeben werden. Gesetzliche Rechte bei
          digitalen Produkten bleiben unberührt.
        </p>
        <h3>8. Nutzungsrechte und Drittleistungen</h3>
        <p>
          Der vereinbarte Nutzungsumfang ergibt sich aus dem Angebot. Soweit
          nichts anderes vereinbart ist, werden Nutzungsrechte an finalen,
          vollständig bezahlten Arbeitsergebnissen im für den Vertragszweck
          erforderlichen Umfang eingeräumt. Rechte an Entwürfen, nicht gewählten
          Varianten, Arbeitsdateien sowie vorbestehenden Werkzeugen verbleiben
          bei ihrem jeweiligen Rechteinhaber. Für Schriften, Bilder, Software
          und andere Drittinhalte gelten zusätzlich deren Lizenzbedingungen.
        </p>
        <h3>9. Mängel und Haftung</h3>
        <p>
          Es gelten die gesetzlichen Mängelrechte und Haftungsregeln. Bestimmte
          wirtschaftliche Ergebnisse, Reichweiten, Platzierungen oder
          Genehmigungen sind nur geschuldet, wenn dies ausdrücklich vereinbart
          wurde.
        </p>
        <h3>10. Laufzeit und Beendigung</h3>
        <p>
          Laufzeit und Kündigung richten sich nach dem individuellen Vertrag.
          Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt
          unberührt.
        </p>
        <h3>11. Verbraucher und Widerruf</h3>
        <p>
          Verbrauchern stehen die zwingenden gesetzlichen Rechte zu. Besteht bei
          einem Fernabsatzvertrag ein Widerrufsrecht, wird hierüber vor
          Vertragsschluss gesondert belehrt. Die Informationen unter
          „Widerruf“ gelten nur für Verträge, bei denen ein gesetzliches
          Widerrufsrecht tatsächlich besteht.
        </p>
        <h3>12. Verbraucherstreitbeilegung</h3>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
        <h3>13. Schlussbestimmungen</h3>
        <p>
          Es gilt deutsches Recht. Gegenüber Verbrauchern gilt diese Rechtswahl
          nur, soweit dadurch zwingende Schutzvorschriften des Staates ihres
          gewöhnlichen Aufenthalts nicht entzogen werden.
        </p>
      </>
    ),
  },
  widerruf: {
    label: "Für Verbraucher",
    title: "Widerrufsbelehrung",
    content: (
      <>
        <p className="legal-lead">
          Diese Belehrung gilt für Verbraucher bei Fernabsatzverträgen über
          Dienstleistungen und über digitale Inhalte, die nicht auf einem
          körperlichen Datenträger bereitgestellt werden.
        </p>
        <h3>Widerrufsrecht</h3>
        <p>
          Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
          diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage
          ab dem Tag des Vertragsschlusses.
        </p>
        <p>
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns – Eleftherios
          Samouladas, handelnd unter Chelonaki, Zeppelinstraße 7, 68519
          Viernheim, Telefon +49 171 2997495, E-Mail info@chelonaki.eu – mittels
          einer eindeutigen Erklärung, zum Beispiel durch einen mit der Post
          versandten Brief oder eine E-Mail, über Ihren Entschluss informieren.
          Sie können dafür das unten stehende Muster-Widerrufsformular
          verwenden; dies ist nicht vorgeschrieben. Zur Wahrung der Frist reicht
          es aus, dass Sie die Erklärung vor Ablauf der Widerrufsfrist absenden.
        </p>
        <h3>Folgen des Widerrufs</h3>
        <p>
          Wenn Sie den Vertrag widerrufen, erstatten wir alle von Ihnen im
          Zusammenhang mit diesem Vertrag erhaltenen Zahlungen unverzüglich und
          spätestens binnen vierzehn Tagen ab Eingang des Widerrufs. Für die
          Rückzahlung verwenden wir dasselbe Zahlungsmittel wie bei der
          ursprünglichen Zahlung, sofern nicht ausdrücklich etwas anderes
          vereinbart wurde; in keinem Fall werden Ihnen wegen dieser Rückzahlung
          Entgelte berechnet.
        </p>
        <p>
          Haben Sie verlangt, dass eine Dienstleistung während der
          Widerrufsfrist beginnen soll, haben Sie uns einen angemessenen Betrag
          zu zahlen. Dieser entspricht dem Anteil der bis zu Ihrer Mitteilung
          über den Widerruf bereits erbrachten Leistungen am Gesamtumfang der
          vertraglich vorgesehenen Leistungen.
        </p>
        <h3>Vorzeitiges Erlöschen</h3>
        <p>
          Bei einer entgeltlichen Dienstleistung erlischt das Widerrufsrecht mit
          vollständiger Erbringung nur, wenn Sie vor Beginn der Leistung
          ausdrücklich zugestimmt haben, dass wir vor Ablauf der Widerrufsfrist
          mit der Leistung beginnen, und Sie bestätigt haben, dass Sie bei
          vollständiger Vertragserfüllung Ihr Widerrufsrecht verlieren. Bei
          entgeltlichen digitalen Inhalten, die nicht auf einem körperlichen
          Datenträger bereitgestellt werden, erlischt das Widerrufsrecht mit
          Beginn der Vertragserfüllung, wenn Sie zuvor ausdrücklich zugestimmt
          haben, dass wir vor Ablauf der Widerrufsfrist beginnen, Ihre Kenntnis
          vom Verlust des Widerrufsrechts bestätigt haben und Ihnen eine
          Vertragsbestätigung zur Verfügung gestellt wurde.
        </p>
        <h3>Muster-Widerrufsformular</h3>
        <p>
          An Eleftherios Samouladas, handelnd unter Chelonaki, Zeppelinstraße 7,
          68519 Viernheim, E-Mail info@chelonaki.eu:
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über die Erbringung der folgenden Dienstleistung oder über den
          die Bereitstellung des folgenden digitalen Inhalts:
          <br />
          ______________________________________________
          <br />
          Vertrag geschlossen am: ______________________
          <br />
          Name des/der Verbraucher(s): __________________
          <br />
          Anschrift des/der Verbraucher(s): _____________
          <br />
          Datum: _______________________________________
          <br />
          Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier):
          ______________________________________________
          <br />
          (*) Unzutreffendes streichen.
        </p>
      </>
    ),
  },
  barrierefreiheit: {
    label: "Stand: 24. August 2026",
    title: "Barrierefreiheit",
    content: (
      <>
        <p className="legal-lead">
          Wir möchten, dass diese Website unabhängig von persönlichen
          Fähigkeiten, Gerät und Eingabemethode gut zugänglich ist.
        </p>
        <h3>Umgesetzte Maßnahmen</h3>
        <ul>
          <li>Semantische Überschriften, Landmarks und Sprunglink zum Inhalt</li>
          <li>Bedienung der Navigation und Dialoge mit der Tastatur</li>
          <li>Sichtbare Fokusmarkierungen und ausreichend große Bedienelemente</li>
          <li>Textalternativen für inhaltlich relevante Bilder</li>
          <li>Reduzierte Animation bei aktivierter Systemeinstellung</li>
          <li>Responsive Darstellung und vergrößerbare Texte</li>
        </ul>
        <h3>Barriere melden</h3>
        <p>
          Wenn Sie Inhalte nicht erreichen oder bedienen können, schreiben Sie
          bitte an <a href="mailto:info@chelonaki.eu">info@chelonaki.eu</a> oder
          rufen Sie uns unter <a href="tel:+491712997495">+49 171 2997495</a>{" "}
          an. Nennen Sie möglichst die betroffene Seite und die verwendete
          Technik. Wir prüfen die Meldung und bieten auf Wunsch eine
          zugängliche Alternative an.
        </p>
      </>
    ),
  },
};

const legalRoutes = {
  "/impressum": "impressum",
  "/datenschutz": "datenschutz",
  "/datenschutzeinstellungen": "cookies",
  "/agb": "agb",
  "/widerruf": "widerruf",
  "/barrierefreiheit": "barrierefreiheit",
};
const legalPaths = Object.fromEntries(
  Object.entries(legalRoutes).map(([path, key]) => [key, path]),
);

const labEntries = [
  {
    title: "Botanical Ember",
    status: "Buchvorlage 141",
    category: "Bücher",
    area: "Kochbuch · Botanisch",
    text: "Eine helle, florale Editorialwelt mit feiner Serifentypografie, botanischen Illustrationen und ruhiger Rezeptdramaturgie.",
    details:
      "Besonders passend für Kochbücher, Kräuterwissen, Gartenküche, Wellness und hochwertige Food-Marken. Enthalten sind Gestaltungsrichtungen für Cover, Vorwort, Inhaltsverzeichnis, Philosophie, Zutaten, Technik, Rezepte und Autorenprofil.",
    image: "/assets/book-designs/design-1.png",
    href: "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  },
  {
    title: "Sunset Table",
    status: "Buchvorlage 140",
    category: "Bücher",
    area: "Kochbuch · Modern",
    text: "Warme Abendstimmung, kräftige Headlines und eine moderne Bildsprache für gesellige, charakterstarke Genussbücher.",
    details:
      "Ideal für Barbecue, Outdoor Cooking, Gastgeberkonzepte und persönliche Kochmarken. Das System verbindet große Food-Fotografie mit klaren Zutaten-, Technik- und Storytellingseiten.",
    image: "/assets/book-designs/design-2.png",
    href: "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  },
  {
    title: "Olive & Coal",
    status: "Buchvorlage 139",
    category: "Bücher",
    area: "Kochbuch · Mediterran",
    text: "Naturstein, Olivgrün und warme Erdtöne verbinden mediterrane Herkunft mit einem zeitlosen, hochwertigen Buchauftritt.",
    details:
      "Geeignet für mediterrane Küche, Familienrezepte, Produktwelten und kulinarische Herkunftsgeschichten. Die Vorlage bietet viel Raum für Zutatenkunde, Rezepte, Pairings und Persönlichkeit.",
    image: "/assets/book-designs/design-3.png",
    href: "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  },
  {
    title: "Poolside Ritual",
    status: "Buchvorlage 138",
    category: "Bücher",
    area: "Kochbuch · Editorial Pop",
    text: "Türkis, Koralle und starke Kontraste erzeugen eine lebendige Sommerwelt, ohne die Lesbarkeit der Rezepte zu verlieren.",
    details:
      "Eine passende Richtung für moderne Grillbücher, Creator, Lifestyle-Marken und sommerliche Produktkampagnen. Flexible Module tragen Rezepte, Tipps, Saucen, Storys und Personenporträts.",
    image: "/assets/book-designs/design-4.png",
    href: "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  },
  {
    title: "Nordic Firelight",
    status: "Buchvorlage 137",
    category: "Bücher",
    area: "Kochbuch · Skandinavisch",
    text: "Kühle Naturtöne, großzügiger Weißraum und zurückhaltende Goldakzente schaffen eine besonders ruhige Premiumwirkung.",
    details:
      "Empfohlen für nordische Küche, Fisch, Natur, Longevity und reduzierte Fachbücher. Das Layout führt elegant durch Philosophie, Zutaten, Technik, Rezepte und Autorenprofil.",
    image: "/assets/book-designs/design-5.png",
    href: "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  },
  {
    title: "Botanical Atelier",
    status: "Interaktive Webvorlage 03",
    category: "Webseiten",
    area: "Wellness · Food · Beratung",
    text: "Eine helle, botanische Landingpage mit großzügiger Editorialtypografie, ruhigen Inhaltsblöcken und organischer Bildsprache.",
    details:
      "Aus Botanical Ember als digitale Markenwelt weitergedacht: ideal für Ernährungsberatung, Wellness, hochwertige Lebensmittel und persönliche Expertenmarken. Testen Sie Farben und Bereiche direkt in der interaktiven Ansicht.",
    image: "/assets/book-designs/design-1.png",
    href: "/web-apps-publikationen/websites-erstellen-lassen",
    webTheme: "botanical",
    palettes: [
      ["#F6F1E8", "#17362C", "#9BAD91", "#C88E61", "#2B302C"],
      ["#FFF9F0", "#4B2636", "#D6A6A1", "#B68A5A", "#201A1D"],
      ["#F2F1EA", "#17324B", "#A5B8C6", "#D1B06B", "#182029"],
    ],
  },
  {
    title: "Olive & Stone",
    status: "Interaktive Webvorlage 02",
    category: "Webseiten",
    area: "Gastronomie · Hotel · Genuss",
    text: "Mediterraner Naturstein, Olivgrün und warme Erdtöne ergeben eine charakterstarke Premium-Landingpage.",
    details:
      "Die Buchwelt Olive & Coal wird zu einer digitalen Erlebnisfläche mit Storytelling, Angeboten, Herkunft und klarer Anfrageführung. Passend für Hotels, Restaurants, Manufakturen und Genussmarken.",
    image: "/assets/book-designs/design-3.png",
    href: "/web-apps-publikationen/websites-erstellen-lassen",
    webTheme: "olive",
    palettes: [
      ["#EEE9DE", "#29372B", "#8C8A61", "#B9814D", "#171D1A"],
      ["#F4E8D5", "#402B25", "#B56D4E", "#D2AE73", "#251C19"],
      ["#E9ECE7", "#153747", "#7699A1", "#C7A35F", "#12232A"],
      ["#F1EDE5", "#332D49", "#8C79A4", "#C99B63", "#1B1923"],
    ],
  },
  {
    title: "Poolside Studio",
    status: "Interaktive Webvorlage 01",
    category: "Webseiten",
    area: "Creator · Lifestyle · Events",
    text: "Eine lebendige Editorial-Landingpage mit starken Kontrasten, modularen Geschichten und klaren Call-to-Actions.",
    details:
      "Aus Poolside Ritual entsteht eine moderne Website für Creator, Events, Lifestyle-Produkte und mutige persönliche Marken. Die Farbwelten reichen von sommerlich bis elegant-dunkel.",
    image: "/assets/book-designs/design-4.png",
    href: "/web-apps-publikationen/websites-erstellen-lassen",
    webTheme: "poolside",
    palettes: [
      ["#F6E8DB", "#0D5961", "#38A9A3", "#ED765F", "#172B33"],
      ["#F7F2E8", "#243B6B", "#E7B64A", "#E06B57", "#16213A"],
      ["#F0E9E1", "#562E47", "#D8879A", "#D4A85C", "#291B25"],
      ["#ECE8DF", "#142A3A", "#648EA3", "#C59B5D", "#0E1921"],
      ["#F8EFE5", "#28524C", "#9AC0A5", "#EF8D69", "#20312F"],
    ],
  },
  {
    title: "App-Designbeispiele",
    status: "Als Vorlage wählbar",
    category: "Apps",
    area: "Apps & Software",
    text: "Wählen Sie eine Richtung für Navigation, Dashboards und Nutzerführung. Funktionen und Oberfläche entstehen danach passend zu Ihrem Produkt.",
    image: "/assets/design-apps.png",
    href: "/web-apps-publikationen/apps-entwickeln-lassen",
  },
  {
    title: "Content-Designbeispiele",
    status: "Als Vorlage wählbar",
    category: "Content",
    area: "Content & Social Media",
    text: "Vergleichen Sie unterschiedliche Gestaltungswelten für Beiträge, Karussells und Kurzvideos – als Ausgangspunkt für einen konsistenten Markenauftritt.",
    image: "/assets/design-content.png",
    href: "/medien-ai/social-media",
  },
  {
    title: "Anzeigen-Designbeispiele",
    status: "Als Vorlage wählbar",
    category: "Content",
    area: "Meta & Google Ads",
    text: "Entdecken Sie Creative-Richtungen für aufmerksamkeitsstarke Anzeigen. Motive, Formate und Botschaften werden für Ihr Angebot neu entwickelt.",
    image: "/assets/design-ads.png",
    href: "/medien-ai/ads",
  },
  {
    title: "Reply-Oberflächenbeispiele",
    status: "Als Vorlage wählbar",
    category: "Apps",
    area: "KI-Antworten",
    text: "Vergleichen Sie ruhige, kompakte Bedienkonzepte für Antwortvorschläge und menschliche Freigabe auf Social Media und im E-Mail-Alltag.",
    image: "/assets/design-reply.png",
    href: "/medien-ai/chelonaki-reply",
  },
];

const qualityPrinciples = [
  [
    "Klarer Umfang",
    "Leistungen, Ausschlüsse, Korrekturrunden und Fremdkosten werden vor dem Start verständlich festgehalten.",
  ],
  [
    "Dokumentierte Freigabe",
    "Inhalte, Kampagnen, Gesprächslogiken und wesentliche Produktstände werden nicht ungeprüft veröffentlicht.",
  ],
  [
    "Menschliche KI-Kontrolle",
    "Plausibel klingende KI-Ausgaben werden geprüft, bevor sie zum Ergebnis werden.",
  ],
  [
    "Nachvollziehbare Quellen",
    "Wissenschaftliche und gesundheitliche Inhalte werden belegt und fachlich eingeordnet.",
  ],
  [
    "Datensparsame Systeme",
    "Daten und Zugriffe werden auf das beschränkt, was für den vereinbarten Zweck erforderlich ist.",
  ],
  [
    "Sicherheit nach Risiko",
    "Rollen, Tests, Backups und Monitoring richten sich nach dem tatsächlichen Schutzbedarf.",
  ],
  [
    "Transparente Drittanbieter",
    "Plattformen, Lizenzen, Abhängigkeiten und laufende Fremdkosten werden offen benannt.",
  ],
  [
    "Modular & übergabefähig",
    "Systeme bleiben nachvollziehbar, erweiterbar und dokumentiert übergebbar.",
  ],
  [
    "Echte Kennzeichnung",
    "Demo, Prototyp, eigenes Produkt und reale Referenz werden nicht irreführend vermischt.",
  ],
  [
    "Nutzen vor Komplexität",
    "Technologie kommt zum Einsatz, wenn sie Qualität, Bedienbarkeit oder Skalierbarkeit verbessert.",
  ],
];

const finderGoals = [
  [
    "website",
    "Website oder Shop",
    "Website Pro",
    "ab 2.500 € netto",
    "ca. 4–8 Wochen",
    "/web-apps-publikationen/websites-erstellen-lassen",
  ],
  [
    "content",
    "Regelmäßig Content",
    "Content Basic",
    "500 € netto/Monat",
    "Onboarding ca. 1–3 Wochen",
    "/medien-ai/social-media",
  ],
  [
    "ads",
    "Werbung schalten",
    "Ads Basic",
    "500 € netto/Monat",
    "Start ca. 1–3 Wochen",
    "/medien-ai/ads",
  ],
  [
    "voice",
    "Anrufe unterstützen",
    "KI-Telefonassistent Basic",
    "ab 69 € netto/Monat",
    "ca. 1–4 Wochen",
    "/medien-ai/ki-telefon",
  ],
  [
    "app",
    "App oder Software",
    "App MVP",
    "ab 4.900 € netto",
    "ca. 8–16 Wochen",
    "/web-apps-publikationen/apps-entwickeln-lassen",
  ],
  [
    "book",
    "Wissen als Buch",
    "Book Starter",
    "ab 1.000 € netto",
    "ca. 4–8 Wochen",
    "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
  ],
  [
    "ai",
    "KI-Strategie für ein Unternehmen",
    "KI-Consulting-Tag",
    "1.490 € netto",
    "Vorbereitung ca. 2–6 Wochen",
    "/ki-beratung-weiterbildung/ki-beratung-unternehmen",
  ],
  [
    "training",
    "Mitarbeiter mit KI qualifizieren",
    "KI-Intensivworkshop",
    "2.290 € netto",
    "Vorbereitung ca. 2–6 Wochen",
    "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
  ],
  [
    "academy",
    "KI flexibel per Video lernen",
    "Chelonaki Video Academy",
    "Zugang nach Freigabe",
    "In Vorbereitung",
    "/ki-beratung-weiterbildung/video-academy",
  ],
  [
    "original",
    "Chelonaki Original",
    "Originals entdecken",
    "produktabhängig",
    "je Produktstatus",
    "/originals",
  ],
  [
    "system",
    "Mehrere Leistungen verbinden",
    "System-Workshop",
    "individuelles Angebot",
    "nach kurzer Qualifizierung",
    "/kontakt?bereich=Mehrere+Leistungen",
  ],
];

const languageOptions = enabledLocales.map((locale) => [
  locale.code,
  locale.nativeLabel,
  locale.code.toUpperCase(),
]);
const languageUi = {
  de: ["Sprache", "Sprache auswählen"],
  en: ["Language", "Choose language"],
  el: ["Γλώσσα", "Επιλογή γλώσσας"],
  fr: ["Langue", "Choisir la langue"],
  es: ["Idioma", "Elegir idioma"],
  tr: ["Dil", "Dil seçin"],
  pl: ["Język", "Wybierz język"],
  nl: ["Taal", "Kies taal"],
  it: ["Lingua", "Scegli la lingua"],
  pt: ["Idioma", "Escolher idioma"],
  ru: ["Язык", "Выберите язык"],
  ar: ["اللغة", "اختر اللغة"],
};
const translatedTextNodes = new WeakMap();
const translatedAttributeNodes = new WeakMap();

function getSavedLanguage() {
  if (typeof window === "undefined") return "de";
  try {
    const saved =
      window.localStorage.getItem("chelonaki-preferred-language") ||
      window.localStorage.getItem("chelonaki-language");
    return normalizeLanguageCode(saved);
  } catch {
    return null;
  }
}

function getCurrentLanguage() {
  if (typeof window === "undefined") return "de";
  const urlLanguage = getLanguageFromUrl(window.location.pathname);
  const country = document
    .querySelector('meta[name="chelonaki-country"]')
    ?.getAttribute("content");
  return resolvePreferredLanguage({
    urlLanguage,
    storedLanguage: getSavedLanguage(),
    browserLanguages: navigator.languages?.length
      ? navigator.languages
      : [navigator.language],
    country,
  });
}

function LanguagePicker({ mobile = false }) {
  const [language, setLanguage] = useState("de");
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);
  useEffect(() => setLanguage(getCurrentLanguage().language), []);
  useEffect(() => {
    const close = (event) => {
      if (!pickerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const changeLanguage = (next) => {
    const language = normalizeLanguageCode(next);
    if (!language) return;
    try {
      window.localStorage.setItem("chelonaki-preferred-language", language);
      window.localStorage.removeItem("chelonaki-language");
    } catch {}
    window.dispatchEvent(
      new CustomEvent("chelonaki:language", {
        detail: { language, source: "manual" },
      }),
    );
    setLanguage(next);
    const url = new URL(window.location.href);
    url.pathname = localizePath(url.pathname, language);
    window.location.assign(url);
  };
  const current =
    languageOptions.find(([code]) => code === language) || languageOptions[0];
  const [languageLabel, chooseLabel] = languageUi[language] || languageUi.de;
  if (languageOptions.length < 2) return null;
  return (
    <div
      ref={pickerRef}
      className={`language-picker notranslate ${mobile ? "is-mobile" : ""} ${open ? "is-open" : ""}`}
      translate="no"
    >
      <button
        type="button"
        className="language-trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${languageLabel}: ${current[1]}`}
      >
        <GlobeHemisphereWest size={17} />
        <strong>{current[2]}</strong>
        <CaretDown size={12} />
      </button>
      {open && (
        <div
          className="language-options"
          role="listbox"
          aria-label={chooseLabel}
        >
          {languageOptions.map(([code, name, short]) => (
            <button
              type="button"
              role="option"
              aria-selected={language === code}
              className={language === code ? "is-active" : ""}
              onClick={() => changeLanguage(code)}
              key={code}
            >
              <span dir={code === "ar" ? "rtl" : "ltr"}>{name}</span>
              <small>{short}</small>
              {language === code && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function LocalTranslator({ path }) {
  useLayoutEffect(() => {
    const { language } = getCurrentLanguage();
    const locale = getLocale(language);
    document.documentElement.lang = locale.htmlLang;
    document.documentElement.dir = locale.direction;
    if (language === "de") return undefined;
    const dictionary = translations[language] || {};
    const entries = Object.entries(dictionary)
      .filter(([key, value]) => key !== value && key.length > 2)
      .sort((a, b) => b[0].length - a[0].length);
    const translate = (value) => {
      if (!value?.trim()) return value;
      const leading = value.match(/^\s*/)?.[0] || "";
      const trailing = value.match(/\s*$/)?.[0] || "";
      const core = value.trim();
      if (dictionary[core]) return `${leading}${dictionary[core]}${trailing}`;
      let next = core;
      for (const [source, target] of entries)
        if (next.includes(source)) next = next.split(source).join(target);
      return `${leading}${next}${trailing}`;
    };
    const translateNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (
          node.parentElement?.closest(".notranslate, script, style, noscript")
        )
          return;
        const previous = translatedTextNodes.get(node);
        if (
          previous?.language === language &&
          previous.value === node.nodeValue
        )
          return;
        const next = translate(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
        translatedTextNodes.set(node, { language, value: next });
        return;
      }
      if (
        node.nodeType !== Node.ELEMENT_NODE ||
        node.matches(".notranslate, script, style, noscript") ||
        node.closest(".notranslate")
      )
        return;
      const previousAttributes = translatedAttributeNodes.get(node);
      for (const attribute of ["placeholder", "title", "aria-label"])
        if (node.hasAttribute(attribute)) {
          const current = node.getAttribute(attribute);
          if (
            previousAttributes?.language === language &&
            previousAttributes.values?.[attribute] === current
          )
            continue;
          const next = translate(current);
          node.setAttribute(attribute, next);
          const record = translatedAttributeNodes.get(node) || {
            language,
            values: {},
          };
          record.language = language;
          record.values[attribute] = next;
          translatedAttributeNodes.set(node, record);
        }
      [...node.childNodes].forEach(translateNode);
    };
    const root = document.getElementById("root");
    translateNode(root);
    const observer = new MutationObserver((mutations) =>
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(translateNode);
        if (mutation.type === "characterData") translateNode(mutation.target);
      }),
    );
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [path]);
  return null;
}

function SmartLink({ href, children, className = "", onNavigate, ...props }) {
  const internal = href?.startsWith("/");
  const localizedHref =
    internal && typeof window !== "undefined"
      ? (() => {
          const target = new URL(href, window.location.origin);
          const language =
            getLanguageFromUrl(window.location.pathname) ||
            getCurrentLanguage().language;
          target.pathname = localizePath(target.pathname, language);
          return `${target.pathname}${target.search}${target.hash}`;
        })()
      : href;
  return (
    <a
      href={localizedHref}
      className={className}
      {...props}
      onClick={(event) => {
        if (internal && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
          event.preventDefault();
          window.history.pushState({}, "", localizedHref);
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, behavior: "instant" });
          onNavigate?.();
        }
      }}
    >
      {children}
    </a>
  );
}

function Brand({ inverse = false, compact = false }) {
  return (
    <SmartLink
      className={`brand ${inverse ? "is-inverse" : ""}`}
      href="/"
      aria-label="Chelonaki Startseite"
    >
      <span className="brand-seal" aria-hidden="true">
        <img
          src="/assets/chelonaki-turtle-transparent.png"
          alt=""
          width="760"
          height="760"
        />
      </span>
      <span className="brand-name">
        <strong>CHELONAKI</strong>
        {!compact && <small>WISDOM WEARS A SHELL</small>}
      </span>
    </SmartLink>
  );
}

function Header({ openMenu, path, chatCompact, chatOpen, onOpenChat }) {
  const [solid, setSolid] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const active = (group) =>
    path === group.href || path.startsWith(`${group.href}/`);
  return (
    <header className={`site-header ${solid ? "is-solid" : ""}`}>
      <Brand />
      <nav className="desktop-nav" aria-label="Hauptnavigation">
        {navigation.map((group) => (
          <div
            className={`nav-group ${group.items.length ? "" : "is-direct"} ${active(group) ? "is-active" : ""} ${openGroup === group.label ? "is-open" : ""}`}
            key={group.label}
            onMouseEnter={() => setOpenGroup(group.label)}
            onMouseLeave={() => setOpenGroup(null)}
            onFocus={() => setOpenGroup(group.label)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setOpenGroup(null);
            }}
          >
            <SmartLink
              href={group.href}
              aria-current={active(group) ? "page" : undefined}
              aria-expanded={
                group.items.length ? openGroup === group.label : undefined
              }
              onNavigate={() => setOpenGroup(null)}
            >
              {group.label}
            </SmartLink>
            {group.items.length > 0 && (
              <div className="nav-panel">
                <SmartLink
                  href={group.href}
                  className="nav-overview"
                  onNavigate={() => setOpenGroup(null)}
                >
                  {group.label} entdecken <ArrowUpRight size={16} />
                </SmartLink>
                {group.items.map(([label, href]) => (
                  <SmartLink
                    href={href}
                    key={href}
                    onNavigate={() => setOpenGroup(null)}
                  >
                    {label}
                  </SmartLink>
                ))}
              </div>
            )}
          </div>
        ))}
        <LanguagePicker />
      </nav>
      <div className="header-actions">
        <SmartLink
          className="button button-navy header-cta"
          href="/paketfinder"
        >
          Passende Lösung finden <ArrowRight size={18} />
        </SmartLink>
        <button
          className={`header-chat-bot ${chatCompact && !chatOpen ? "is-visible" : ""}`}
          type="button"
          onClick={onOpenChat}
          aria-label="Chat-Bot öffnen"
          aria-hidden={!chatCompact || chatOpen}
          tabIndex={chatCompact && !chatOpen ? 0 : -1}
        >
          <span>
            <img src="/assets/chelonaki-turtle-transparent.png" alt="" />
          </span>
          <small>Chat-Bot</small>
        </button>
      </div>
      <button
        className="menu-trigger"
        type="button"
        aria-label="Menü öffnen"
        onClick={openMenu}
      >
        <List size={25} />
      </button>
    </header>
  );
}

function MobileMenu({ open, onClose, path, onOpenChat }) {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(null);
  useEffect(() => {
    if (!ref.current) return;
    if (open && !ref.current.open) ref.current.showModal();
    if (!open && ref.current.open) ref.current.close();
  }, [open]);
  const active = (href) => path === href || path.startsWith(`${href}/`);
  return (
    <dialog
      ref={ref}
      className="mobile-menu"
      aria-label="Hauptmenü"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
    >
      <div className="mobile-menu-shell">
        <div className="mobile-menu-head">
          <Brand inverse compact />
          <button type="button" onClick={onClose} aria-label="Menü schließen">
            <X size={24} />
          </button>
        </div>
        <nav aria-label="Mobile Navigation">
          {navigation.map((group) => (
            <div
              className={`mobile-nav-group ${active(group.href) ? "is-active" : ""}`}
              key={group.label}
            >
              <div>
                <SmartLink
                  href={group.href}
                  aria-current={active(group.href) ? "page" : undefined}
                  onNavigate={onClose}
                >
                  {group.label}
                </SmartLink>
                {group.items.length > 0 && (
                  <button
                    type="button"
                    aria-label={`${group.label} Untermenü`}
                    aria-expanded={expanded === group.label}
                    onClick={() =>
                      setExpanded(expanded === group.label ? null : group.label)
                    }
                  >
                    <CaretDown size={20} />
                  </button>
                )}
              </div>
              {expanded === group.label && group.items.length > 0 && (
                <div className="mobile-subnav">
                  {group.items.map(([label, href]) => (
                    <SmartLink
                      href={href}
                      className={active(href) ? "is-active" : ""}
                      aria-current={active(href) ? "page" : undefined}
                      key={href}
                      onNavigate={onClose}
                    >
                      {label}
                    </SmartLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <LanguagePicker mobile />
          <SmartLink
            className={`mobile-about ${active("/qualitaet") ? "is-active" : ""}`}
            href="/qualitaet"
            onNavigate={onClose}
          >
            Qualität
          </SmartLink>
        </nav>
        {onOpenChat && (
          <button
            className="mobile-chat-entry"
            type="button"
            onClick={onOpenChat}
          >
            <span>
              <img src="/assets/chelonaki-turtle-transparent.png" alt="" />
            </span>
            <span>
              <small>Fragen zu Leistungen und Preisen</small>
              <strong>Chelonaki Assistent öffnen</strong>
            </span>
            <ChatCircleDots size={22} />
          </button>
        )}
        <SmartLink
          className="button button-gold"
          href="/paketfinder"
          onNavigate={onClose}
        >
          Passende Lösung finden <ArrowRight size={18} />
        </SmartLink>
      </div>
    </dialog>
  );
}

function LegalPage({ viewKey }) {
  const view = legalViews[viewKey];
  return (
    <main id="main" className="legal-page">
      <article className="legal-shell">
        <header>
          <div>
            <span>{view.label}</span>
            <h1>{view.title}</h1>
          </div>
        </header>
        <div className="legal-content notranslate" lang="de">
          {view.content}
        </div>
      </article>
    </main>
  );
}

function HomePage() {
  return (
    <main id="main">
      <section className="hero home-hero" aria-labelledby="hero-title">
        <div className="hero-scene" aria-hidden="true">
          <img
            className="hero-scene-image"
            src="/assets/hero-architecture-liquid-glass-v1.webp"
            alt=""
            width="1600"
            height="1100"
          />
        </div>
        <div className="hero-copy">
          <span className="hero-kicker">KI-GESTÜTZTES INNOVATIONSSTUDIO</span>
          <h1 id="hero-title">
            Ihre Idee.
            <br />
            <em>Unsere kreative Umsetzung.</em>
          </h1>
          <div className="hero-rule">
            <i />
          </div>
          <p>
            Wir übersetzen Ihre Vision in Websites, Apps, Bücher und digitale
            Produkte, die funktionieren.
          </p>
          <div className="hero-actions">
            <SmartLink className="button button-navy" href="/paketfinder">
              Passende Lösung finden <ArrowRight size={18} />
            </SmartLink>
            <a className="text-link" href="#worlds">
              Leistungen entdecken <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-signature">
          Strategie · Gestaltung · Technologie · menschlich geprüft
        </div>
      </section>
      <section className="home-proof" aria-label="Was Chelonaki entwickelt">
        <span>Websites & Shops</span>
        <span>Apps & Software</span>
        <span>Bücher & Ghostwriting</span>
        <span>Medien & KI</span>
        <span>KI-Beratung & Weiterbildung</span>
      </section>
      <section
        className="worlds-section"
        id="worlds"
        aria-labelledby="worlds-title"
      >
        <header className="worlds-heading" data-reveal>
          <span>Ein Studio. Sechs klare Bereiche.</span>
          <h2 id="worlds-title">
            Schneller verstehen,
            <br />
            <em>wo Ihr Projekt hingehört.</em>
          </h2>
        </header>
        <div className="world-grid">
          {worlds.map((world) => (
            <SmartLink
              className={`world-card ${world.tone}`}
              href={world.href}
              key={world.title}
              data-reveal
              aria-label={`${world.title} – ${world.cta}`}
            >
              <div className="world-number">{world.number}</div>
              <figure>
                <img
                  src={world.image}
                  alt=""
                  loading="lazy"
                  width="1536"
                  height="1024"
                />
              </figure>
              <span className="audience-label">
                <Buildings size={15} />
                {world.eyebrow}
              </span>
              <h3>{world.title}</h3>
              <p>{world.text}</p>
              <small>{world.detail}</small>
              <span className="world-link" aria-hidden="true">
                {world.cta}
                <ArrowRight size={18} />
              </span>
            </SmartLink>
          ))}
        </div>
      </section>
      <section className="principles-section">
        <div className="principles-intro">
          <span>Our standard</span>
          <h2>Fortschritt braucht Haltung.</h2>
        </div>
        <div className="principle-grid">
          {[
            [
              "Human responsibility",
              "KI unterstützt. Der Mensch entscheidet und verantwortet das Ergebnis.",
            ],
            [
              "Built to last",
              "Durchdachte Systeme und Inhalte statt kurzfristiger KI-Spielereien.",
            ],
            [
              "Knowledge in practice",
              "Wissenschaft, Erfahrung und Technologie werden konkret nutzbar.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <FinalCta />
    </main>
  );
}

function HubPage({ type }) {
  const data = hubData[type];
  return (
    <main id="main">
      <section className={`page-hero page-hero-${type}`}>
        <div>
          <span className="audience-label">
            <Buildings size={15} />
            {data.label}
          </span>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <div className="page-hero-actions">
            <SmartLink
              className="button button-gold"
              href={`/kontakt?bereich=${type}`}
            >
              {data.cta}
              <ArrowRight size={18} />
            </SmartLink>
            <SmartLink
              className="text-link text-link-light"
              href="/paketfinder"
            >
              Passende Lösung finden <ArrowRight size={18} />
            </SmartLink>
          </div>
        </div>
        <figure>
          <img
            src={data.image}
            alt={data.imageAlt || "Chelonaki Markenwelt"}
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="service-index">
        <header>
          <span>Entdecken</span>
          <h2>Womit möchten Sie beginnen?</h2>
          <p className="section-lead">
            Öffnen Sie den Bereich, der Ihrem Ziel am nächsten kommt. Dort
            finden Sie Leistungsumfang, Vorgehen, Preise, Voraussetzungen und
            den passenden nächsten Schritt.
          </p>
        </header>
        <div>
          {data.cards.map((card, i) => (
            <SmartLink
              className="service-index-card"
              href={card.href}
              key={card.href}
            >
              <span>0{i + 1}</span>
              {card.image && (
                <figure>
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    width="1536"
                    height="1024"
                  />
                </figure>
              )}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <small>Leistung, Ablauf und Möglichkeiten ansehen</small>
              <ArrowUpRight size={21} />
            </SmartLink>
          ))}
        </div>
      </section>
      <HubDecision data={data} />
      {type === "expertise" && <Credentials />}
      <Process />
      <FinalCta label={data.cta} />
    </main>
  );
}

function HubDecision({ data }) {
  return (
    <section className="hub-decision">
      <figure>
        <img
          src={data.decisionImage || "/assets/service-funnel-liquid-glass-v2.webp"}
          alt={data.decisionImageAlt || "Griechisch inspirierter Entscheidungsraum mit transparenten Glasflächen"}
          loading="lazy"
        />
      </figure>
      <div>
        <span>Orientierung vor der Anfrage</span>
        <h2>Sie müssen noch nicht wissen, welches Paket Sie brauchen.</h2>
        <p>
          Entscheidend ist zunächst, welches Ergebnis Sie erreichen möchten. Wir
          ordnen Ziel, Ausgangslage, Budget und Zeitrahmen ein und empfehlen nur
          den Umfang, der für den nächsten sinnvollen Schritt erforderlich ist.
        </p>
        <ol>
          <li>
            <b>01</b>
            <span>
              <strong>Ziel beschreiben</strong>Was soll für Kunden, Mitarbeiter
              oder Nutzer konkret besser werden?
            </span>
          </li>
          <li>
            <b>02</b>
            <span>
              <strong>Ausgangslage prüfen</strong>Welche Inhalte, Systeme,
              Zugänge oder Ideen sind bereits vorhanden?
            </span>
          </li>
          <li>
            <b>03</b>
            <span>
              <strong>Passenden Einstieg wählen</strong>Kleiner Start,
              belastbares Kernprodukt oder individuelle Lösung.
            </span>
          </li>
        </ol>
        <SmartLink className="button button-navy" href="/paketfinder">
          Unverbindliche Empfehlung erhalten <ArrowRight size={18} />
        </SmartLink>
      </div>
    </section>
  );
}

function ServicePage({ data }) {
  return (
    <main id="main">
      <section className="service-hero">
        <div className="service-hero-copy">
          <span className="audience-label">
            <Buildings size={15} />
            {data.label}
          </span>
          <small>{data.area}</small>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <div className="page-hero-actions">
            <SmartLink
              className="button button-gold"
              href={
                data.bookingCta
                  ? "#pakete"
                  : `/kontakt?bereich=${encodeURIComponent(data.cta)}`
              }
            >
              {data.bookingCta || data.cta}
              <ArrowRight size={18} />
            </SmartLink>
            <a className="text-link text-link-light" href="#leistung">
              Leistung vollständig prüfen <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-assurances">
            <span>
              <Check size={15} />
              Klarer Leistungsumfang
            </span>
            <span>
              <Check size={15} />
              Menschliche Freigabe
            </span>
            <span>
              <Check size={15} />
              Nachvollziehbare Übergabe
            </span>
          </div>
          {data.bookingCta && (
            <p className="booking-status">
              Die direkte Shopify-Buchung wird nach Anlage der finalen Produkte
              und rechtlichen Freigaben aktiviert.
            </p>
          )}
        </div>
        <figure>
          <img
            src={data.image || "/assets/service-funnel-liquid-glass-v2.webp"}
            alt={
              data.imageAlt ||
              "Hochwertige griechisch inspirierte Architektur als Chelonaki Projektwelt"
            }
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="problem-solution" id="leistung">
        <div>
          <span>Ausgangssituation</span>
          <h2>{data.problem}</h2>
          <p>
            Das Ziel ist nicht mehr Technik oder mehr Content, sondern ein
            Ergebnis, das im Alltag verständlich eingesetzt, geprüft und
            weiterentwickelt werden kann.
          </p>
        </div>
        <div>
          <span>Die Lösung</span>
          <ul>
            {data.solution.map((item) => (
              <li key={item}>
                <Check size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <ConversionBridge data={data} />
      {data.insight && (
        <section className="platform-section">
          <div>
            <span>{data.insight.label}</span>
            <h2>{data.insight.title}</h2>
            <p>{data.insight.text}</p>
          </div>
          <ul>
            {data.insight.points.map((point) => (
              <li key={point}>
                <Check size={18} />
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}
      <Deliverables data={data} />
      <Process items={data.steps} />
      <MidFunnelCta data={data} />
      <ProjectReadiness data={data} />
      <Pricing data={data} />
      <ServiceFaq data={data} />
      <FinalCta label={data.inquiryCta || data.cta} />
    </main>
  );
}

function ConversionBridge({ data }) {
  const outcomes = data.outcomes || [
    "Ein klar definiertes Ergebnis statt eines offenen Technikprojekts",
    "Ein abgestimmter Umfang mit transparenten Grenzen und Zuständigkeiten",
    "Ein früher prüfbarer Stand, bevor unnötig Zeit und Budget gebunden werden",
    "Eine dokumentierte, nutzbare Übergabe mit verständlichen nächsten Schritten",
  ];
  return (
    <section className="conversion-bridge">
      <header>
        <span>Was Sie am Ende erhalten</span>
        <h2>Vom Versprechen zum überprüfbaren Ergebnis.</h2>
        <p>
          Vor dem Start wird festgehalten, was geliefert, geprüft und übergeben
          wird. So können Sie Leistung, Fortschritt und nächste Entscheidungen
          nachvollziehen.
        </p>
      </header>
      <div>
        {outcomes.map((item, i) => (
          <article key={item}>
            <b>0{i + 1}</b>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Deliverables({ data }) {
  return (
    <section className="deliverables-section">
      <div>
        <span>Leistung & Qualitätskontrolle</span>
        <h2>Was im Projekt konkret passiert.</h2>
        <p>
          Die Umsetzung wird in nachvollziehbare Bausteine zerlegt. Inhalte und
          Funktionen werden nicht ungeprüft veröffentlicht; relevante Grenzen
          und Fremdkosten werden vorab benannt.
        </p>
        <SmartLink className="text-link" href="/qualitaet">
          Chelonaki Qualitätsrahmen ansehen <ArrowRight size={18} />
        </SmartLink>
      </div>
      <div className="deliverables-grid">
        {data.solution.map((item, i) => (
          <article key={item}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
            <p>
              {
                [
                  "Ziel, Umfang und Abnahmekriterien werden vor der Umsetzung gemeinsam festgehalten.",
                  "Ein früher Stand macht Richtung, Inhalt und Bedienung rechtzeitig prüfbar.",
                  "Korrekturen werden gebündelt eingearbeitet und wesentliche Entscheidungen dokumentiert.",
                  "Sie erhalten eine verständliche Übergabe sowie Empfehlungen für Betrieb und Ausbau.",
                ][i % 4]
              }
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MidFunnelCta({ data }) {
  return (
    <section className="mid-funnel-cta">
      <figure>
        <img
          src={data.funnelImage || "/assets/service-funnel-liquid-glass-v2.webp"}
          alt={data.funnelImageAlt || "Griechisch inspirierte Projektwelt mit schwebenden Glasflächen"}
          loading="lazy"
        />
      </figure>
      <div>
        <span>Ohne Verkaufsdruck einordnen</span>
        <h2>Ist diese Lösung für Ihr Vorhaben sinnvoll?</h2>
        <p>
          Schildern Sie kurz Ziel, Ausgangslage und gewünschten Start. Sie
          erhalten eine ehrliche Einordnung, welches Paket passt, wo
          Individualisierung nötig ist und welche Grundlagen vor Projektbeginn
          fehlen.
        </p>
        <ul>
          <li>
            <Check size={17} />
            Keine automatische Bestellung
          </li>
          <li>
            <Check size={17} />
            Keine Empfehlung zum größten Paket ohne Bedarf
          </li>
          <li>
            <Check size={17} />
            Leistungsumfang vor Beauftragung schriftlich
          </li>
        </ul>
        <SmartLink
          className="button button-gold"
          href={`/kontakt?bereich=${encodeURIComponent(data.inquiryCta || data.cta)}`}
        >
          {data.inquiryCta || data.cta}
          <ArrowRight size={18} />
        </SmartLink>
      </div>
    </section>
  );
}

function ServiceFaq({ data }) {
  const faqs = data.faq || [
    [
      "Welcher Umfang ist für den Einstieg sinnvoll?",
      "Das hängt von Ziel, vorhandenen Grundlagen, gewünschtem Start und internen Ressourcen ab. Im Paketfinder erhalten Sie eine erste Orientierung; vor einer Beauftragung wird der Umfang konkret bestätigt.",
    ],
    [
      "Was ist im Preis nicht automatisch enthalten?",
      "Fremdkosten, Plattformtarife, Lizenzen, Werbebudgets, Druck, Hosting oder zusätzliche Schnittstellen sind nur enthalten, wenn sie im gewählten Paket ausdrücklich genannt werden.",
    ],
    [
      "Wie behalte ich während der Umsetzung die Kontrolle?",
      "Sie erhalten definierte Prüf- und Freigabepunkte. Wesentliche Inhalte, Funktionen und Veröffentlichungen werden nicht ohne Ihre vereinbarte Freigabe abgeschlossen.",
    ],
    [
      "Was passiert, wenn sich der Umfang verändert?",
      "Neue Anforderungen werden zuerst hinsichtlich Nutzen, Aufwand, Zeit und Risiken eingeordnet. Eine Erweiterung erfolgt erst nach transparenter Abstimmung.",
    ],
    [
      "Kann ich klein beginnen und später erweitern?",
      "Ja. Die Lösungen werden möglichst modular geplant. Entscheidend ist, dass der erste Umfang bereits ein eigenständig nutzbares Ergebnis liefert.",
    ],
  ];
  return (
    <section className="service-faq">
      <header>
        <span>Häufige Fragen vor der Entscheidung</span>
        <h2>Klarheit, bevor Sie anfragen.</h2>
      </header>
      <div>
        {faqs.map(([question, answer], i) => (
          <details key={question} open={i === 0}>
            <summary>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {question}
              <CaretDown size={20} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ProjectReadiness({ data }) {
  const isApp = data.title.includes("App");
  const needs = isApp
    ? [
        "Zielgruppe und priorisierte Kernfunktionen",
        "Plattformen, Nutzerrollen und vorhandene Systeme",
        "Daten, Schnittstellen und Datenschutzanforderungen",
        "Branding, Testpersonen und zuständige Freigabe",
      ]
    : [
        "Ziel, Zielgruppe und gewünschtes Ergebnis",
        "Vorhandene Inhalte, Zugänge und Markenmaterialien",
        "Rechtlich nutzbare Texte, Bilder und Daten",
        "Eine zuständige Person für gebündelte Freigaben",
      ];
  return (
    <section className="readiness-section">
      <div>
        <span>Projektstart</span>
        <h2>Was wir vor dem Start gemeinsam festlegen.</h2>
        <p>
          Der verbindliche Zeitplan beginnt, sobald Umfang, Zahlung und die
          benötigten Grundlagen vollständig vorliegen. Die konkrete Laufzeit
          wird nach Prüfung bestätigt.
        </p>
      </div>
      <ul>
        {needs.map((item) => (
          <li key={item}>
            <Check size={18} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Pricing({ data }) {
  const featuredTier = data.pricing.find((tier) => tier.featured) || null;
  const [selected, setSelected] = useState(featuredTier);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const tabsRef = useRef(null);
  useEffect(() => {
    setSelected(featuredTier);
  }, [data, featuredTier]);
  const commonFeatures = data.commonFeatures || [
    "Schriftlich definierter Leistungsumfang",
  ];
  const premiumStartIndex = Math.max(
    0,
    data.pricing.findIndex((tier) => tier.featured) >= 0
      ? data.pricing.findIndex((tier) => tier.featured)
      : Math.ceil(data.pricing.length / 2),
  );
  const premiumFeatures = (tier) =>
    tierIndex(tier) >= premiumStartIndex
      ? [
          "Persönliches Briefing mit Ziel- und Prioritätenklärung",
          "Erweiterte menschliche Qualitätsprüfung und Freigabe",
        ]
      : [];
  const ownFeatures = (tier) =>
    tier.features ||
    tier.meta
      .split(/\s*[·;]\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
  const tierIndex = (tier) =>
    data.pricing.findIndex((item) => item.name === tier.name);
  const inheritedFrom = (tier) => {
    const index = tierIndex(tier);
    if (
      data.nonCumulative ||
      index < 1 ||
      tier.resetInheritance ||
      data.pricing[index - 1]?.standalone
    )
      return null;
    return data.pricing[index - 1];
  };
  const cardFeatures = (tier) => [
    `Voraussichtliche Dauer: ${tier.duration || "nach Absprache"}`,
    ...commonFeatures,
    ...(inheritedFrom(tier)
      ? [`Alle Leistungen aus ${inheritedFrom(tier).name}`]
      : []),
    ...ownFeatures(tier),
    ...premiumFeatures(tier),
  ];
  const choose = (tier) => {
    setSelected(tier);
    setComparisonOpen(true);
  };
  const designCategory = data.title.includes("Website")
    ? "Webseiten"
    : data.title.includes("Buch") || data.title.includes("Ghostwriting")
      ? "Bücher"
      : data.title.includes("App")
        ? "Apps"
        : null;
  useEffect(() => {
    if (!comparisonOpen) return undefined;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    const modal = document.querySelector(".package-modal");
    const focusable = () =>
      [
        ...(modal?.querySelectorAll(
          'a[href], button:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) || []),
      ].filter((node) => node.getClientRects().length);
    requestAnimationFrame(() => focusable()[0]?.focus());
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setComparisonOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleKey);
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [comparisonOpen]);
  useEffect(() => {
    if (!comparisonOpen || !selected) return;
    const frame = requestAnimationFrame(() =>
      tabsRef.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      }),
    );
    return () => cancelAnimationFrame(frame);
  }, [comparisonOpen, selected]);
  const packageDetails = (tier, size = 16) => (
    <>
      <div className="package-duration">
        <span>Voraussichtliche Dauer</span>
        <strong>{tier.duration || "nach Absprache"}</strong>
        <small>
          ab vollständigem Briefing, Materialeingang und Projektfreigabe
        </small>
      </div>
      <div className="package-inclusion-group">
        <p>In jedem Paket enthalten</p>
        <ul>
          {commonFeatures.map((item) => (
            <li key={item}>
              <Check size={size} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {inheritedFrom(tier) && (
        <div className="package-inherited">
          <Check size={size} />
          <span>
            <strong>Alles aus {inheritedFrom(tier).name}</strong>
            <small>
              Alle Leistungen der vorherigen Stufe sind enthalten. Höhere Mengen
              und Limits ersetzen die kleineren Werte.
            </small>
          </span>
        </div>
      )}
      <div className="package-inclusion-group is-extra">
        <p>
          {inheritedFrom(tier) ? "Zusätzlich in dieser Stufe" : "Paketumfang"}
        </p>
        <ul>
          {ownFeatures(tier).map((item) => (
            <li key={item}>
              <Check size={size} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      {premiumFeatures(tier).length > 0 && (
        <div className="package-inclusion-group is-premium">
          <p>Ab dieser Stufe zusätzlich</p>
          <ul>
            {premiumFeatures(tier).map((item) => (
              <li key={item}>
                <Check size={size} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
  return (
    <section className="pricing-section">
      <header id="pakete">
        <span>Paketpreise für Unternehmen</span>
        <h2>
          Ein klarer Einstieg.
          <br />
          Ein passender Projektumfang.
        </h2>
        <p>
          Jede Stufe zeigt ihre Basis, übernommene Leistungen und die
          zusätzlichen Vorteile. Beratungsformate werden als eigenständige
          Optionen gekennzeichnet.
        </p>
      </header>
      <div
        className={`pricing-grid ${data.pricing.length === 1 ? "is-single" : ""}`}
      >
        {data.pricing.map((tier) => (
          <article
            className={`${tier.featured ? "featured" : ""} ${selected?.name === tier.name ? "is-selected" : ""}`}
            key={tier.name}
          >
            {tier.featured && <b>Häufig gewählt</b>}
            <h3>{tier.name}</h3>
            <strong>{tier.price}</strong>
            <ul className="pricing-features">
              {cardFeatures(tier).map((item) => (
                <li key={item}>
                  <Check size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => choose(tier)}
            >
              {selected?.name === tier.name
                ? "Auswahl & Vergleich öffnen"
                : data.bookingCta && tier.price !== "auf Anfrage"
                  ? "Paket auswählen"
                  : "Angebot prüfen"}{" "}
              <ArrowRight size={17} />
            </button>
          </article>
        ))}
      </div>
      {selected && comparisonOpen && (
        <div
          className="package-modal-backdrop"
          role="presentation"
          onMouseDown={() => setComparisonOpen(false)}
        >
          <section
            className="package-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="package-modal-head">
              <div>
                <span>Paketauswahl</span>
                <h3 id="package-modal-title">Leistungen klar vergleichen.</h3>
              </div>
              <button
                type="button"
                onClick={() => setComparisonOpen(false)}
                aria-label="Paketvergleich schließen"
              >
                <X size={23} />
              </button>
            </header>
            <nav
              ref={tabsRef}
              className="package-tabs"
              aria-label="Pakete vergleichen"
            >
              {data.pricing.map((tier) => (
                <button
                  type="button"
                  className={tier.name === selected.name ? "is-active" : ""}
                  aria-pressed={tier.name === selected.name}
                  onClick={() => setSelected(tier)}
                  key={tier.name}
                >
                  <span>{tier.name}</span>
                  <small>{tier.price}</small>
                </button>
              ))}
            </nav>
            <div className="package-modal-body">
              <article className="package-focus">
                <span>Ihre aktuelle Auswahl</span>
                <h4>{selected.name}</h4>
                <strong>{selected.price}</strong>
                {selected.featured && <b>Häufig gewählt</b>}
                {packageDetails(selected)}
              </article>
              {data.pricing.length > 1 && (
                <section className="package-alternatives">
                  <header>
                    <span>Alle Alternativen</span>
                    <h4>Unterschiede auf einen Blick.</h4>
                  </header>
                  {data.pricing
                    .filter((tier) => tier.name !== selected.name)
                    .map((tier) => (
                      <details key={tier.name}>
                        <summary>
                          <span>
                            <strong>{tier.name}</strong>
                            <small>{tier.price}</small>
                          </span>
                          <CaretDown size={19} />
                        </summary>
                        {packageDetails(tier, 15)}
                        <button type="button" onClick={() => setSelected(tier)}>
                          Als Auswahl übernehmen
                        </button>
                      </details>
                    ))}
                </section>
              )}
            </div>
            <footer className="package-modal-actions">
              <button type="button" onClick={() => setComparisonOpen(false)}>
                Zurück
              </button>
              <SmartLink
                className="button button-gold"
                href={
                  designCategory
                    ? `/demowelten?bereich=${encodeURIComponent(designCategory)}&paket=${encodeURIComponent(selected.name)}`
                    : `/kontakt?bereich=${encodeURIComponent(selected.name)}`
                }
              >
                <span className="cta-full">
                  {designCategory
                    ? `Design für ${selected.name} auswählen`
                    : `Mit ${selected.name} fortfahren`}
                </span>
                <span className="cta-short">
                  {designCategory ? "Design wählen" : "Anfrage starten"}
                </span>
                <ArrowRight size={17} />
              </SmartLink>
            </footer>
          </section>
        </div>
      )}
      <p className="pricing-note">{data.note}</p>
    </section>
  );
}

function Process({
  items = [
    "Ziel und Ausgangslage klären",
    "Frühen funktionierenden Stand zeigen",
    "Prüfen, freigeben und absichern",
    "Sauber übergeben und weiterentwickeln",
  ],
}) {
  return (
    <section className="process-section">
      <div className="process-intro">
        <span>Arbeitsweise</span>
        <h2>Von der Idee zur belastbaren Umsetzung.</h2>
      </div>
      <ol className="method-rail">
        {items.map((item, i) => (
          <li key={item}>
            <span>0{i + 1}</span>
            <h3>{item}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Credentials() {
  return (
    <section className="credentials">
      <figure>
        <img
          src="/assets/chapter-architecture.webp"
          alt="Griechisch inspirierter Wissensraum als fachliche Grundlage von Chelonaki"
        />
      </figure>
      <div>
        <span>Die fachliche Grundlage</span>
        <h2>Wissenschaft, Küche, Technik und unternehmerische Praxis.</h2>
        <p>
          Hinter Chelonaki steht Eleftherios Samouladas: gelernter Koch,
          studierter Ernährungswissenschaftler, zertifizierter
          Qualitätsmanagementbeauftragter und fachkundig im Lebensmittelrecht.
        </p>
        <p>
          Er studierte außerdem mehrere Semester Informatik und programmiert
          selbst. Als Mietkoch arbeitete er in mehr als 500 Küchen in ganz
          Deutschland – vom klassischen Gastronomiebetrieb bis zur
          Sternegastronomie.
        </p>
        <ul>
          <li>500+ Küchen</li>
          <li>Ernährungswissenschaft</li>
          <li>Informatik & Entwicklung</li>
          <li>Qualitätsmanagement</li>
          <li>Lebensmittelrecht</li>
        </ul>
      </div>
    </section>
  );
}

function AcademyPage() {
  return (
    <main id="main">
      <section className="service-hero">
        <div className="service-hero-copy">
          <span className="audience-label">
            <Buildings size={15} />
            KI-Beratung & Weiterbildung
          </span>
          <small>Chelonaki Video Academy</small>
          <h1>KI-Wissen lernen, wenn es in Ihren Alltag passt.</h1>
          <p>
            Strukturierte Videokurse führen Schritt für Schritt von den
            Grundlagen zu anwendbaren Workflows – mit Beispielen, Vorlagen und
            klaren Qualitätsregeln.
          </p>
          <div className="page-hero-actions">
            <SmartLink
              className="button button-gold"
              href="/kontakt?bereich=Chelonaki%20Video%20Academy"
            >
              Zugang vormerken <ArrowRight size={18} />
            </SmartLink>
          </div>
        </div>
        <figure>
          <img
            src="/assets/academy-hero-liquid-glass-v1.webp"
            alt="Griechisch inspiriertes Lernatelier mit Videokurs auf Tablet und transparenten Lernkarten"
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="choice-grid">
        <article>
          <span>Für Mitarbeiter und professionelle Anwender</span>
          <h2>KI-Videokurse</h2>
          <p>
            Werkzeuge sinnvoll auswählen, wirksam prompten, Ergebnisse prüfen,
            Abläufe automatisieren und verantwortungsvoll freigeben.
          </p>
        </article>
        <article>
          <span>Lernweg mit Praxisbezug</span>
          <h2>Vom Modul zur Anwendung</h2>
          <p>
            Kurze Lerneinheiten, konkrete Übungen, wiederverwendbare Vorlagen
            und verständliche Zusammenfassungen unterstützen den Transfer.
          </p>
        </article>
      </section>
      <section className="release-note">
        <strong>In Vorbereitung</strong>
        <p>
          Kursumfang, Verkauf, Lernkontrollen, Teilnahmebestätigungen und
          mögliche Zertifikate werden vor Freigabe abschließend festgelegt und
          rechtlich geprüft.
        </p>
      </section>
      <FinalCta label="Video Academy vormerken" />
    </main>
  );
}

function WebDesignPreview({ entry, compact = false }) {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [section, setSection] = useState("start");
  const palette = entry.palettes?.[paletteIndex] || [
    "#F4EFE6",
    "#0A2A3F",
    "#8CA08D",
    "#C49A55",
    "#17212A",
  ];
  const copy = {
    botanical: {
      brand: "VERDEA",
      eyebrow: "Wissen, das natürlich wirkt",
      title: "Aus guter Beratung wird echte Veränderung.",
      text: "Ernährung, Wissen und Alltag in einer ruhigen, klaren Markenwelt verbunden.",
      offer: "Programme",
      about: "Philosophie",
    },
    olive: {
      brand: "MERAKI HOUSE",
      eyebrow: "Mediterranean stories",
      title: "Geschmack hat eine Herkunft.",
      text: "Ein digitaler Auftritt für Orte, Produkte und Menschen mit Charakter.",
      offer: "Erlebnisse",
      about: "Unsere Geschichte",
    },
    poolside: {
      brand: "LIDO STUDIO",
      eyebrow: "Create something memorable",
      title: "Ideen, die Menschen mitnehmen.",
      text: "Mutige Gestaltung, klare Angebote und ein Auftritt, der im Kopf bleibt.",
      offer: "Projekte",
      about: "Das Studio",
    },
  }[entry.webTheme];
  const sectionCopy =
    section === "about"
      ? [
          copy.about,
          "Die Geschichte hinter der Marke",
          "Haltung, Herkunft und Persönlichkeit werden nicht versteckt, sondern zum roten Faden der Website.",
        ]
      : section === "offer"
        ? [
            copy.offer,
            "Angebote klar und wertig präsentieren",
            "Leistungen werden verständlich strukturiert, damit Besucher schneller erkennen, was zu ihnen passt.",
          ]
        : [copy.eyebrow, copy.title, copy.text];
  return (
    <div
      className={`web-demo ${compact ? "is-compact" : ""}`}
      style={{
        "--demo-bg": palette[0],
        "--demo-primary": palette[1],
        "--demo-soft": palette[2],
        "--demo-accent": palette[3],
        "--demo-ink": palette[4],
      }}
    >
      <div className="web-demo-browser">
        <i />
        <i />
        <i />
        <span>{entry.title.toLowerCase().replaceAll(" ", "-")}.studio</span>
      </div>
      <div className="web-demo-page">
        <nav>
          <strong>{copy.brand}</strong>
          <div>
            <button
              type="button"
              className={section === "start" ? "is-active" : ""}
              onClick={() => !compact && setSection("start")}
            >
              Start
            </button>
            <button
              type="button"
              className={section === "about" ? "is-active" : ""}
              onClick={() => !compact && setSection("about")}
            >
              {copy.about}
            </button>
            <button
              type="button"
              className={section === "offer" ? "is-active" : ""}
              onClick={() => !compact && setSection("offer")}
            >
              {copy.offer}
            </button>
          </div>
        </nav>
        <section>
          <div>
            <small>{sectionCopy[0]}</small>
            <h3>{sectionCopy[1]}</h3>
            <p>{sectionCopy[2]}</p>
            <span>
              Mehr entdecken <ArrowRight size={compact ? 10 : 15} />
            </span>
          </div>
          <div className="web-demo-visual">
            <img src={entry.image} alt="" />
            <i />
          </div>
        </section>
        <footer>
          <span>Strategie</span>
          <span>Design</span>
          <span>Umsetzung</span>
        </footer>
      </div>
      {!compact && (
        <div className="web-demo-controls">
          <span>Farbwelt auswählen</span>
          <div>
            {entry.palettes.map((colors, index) => (
              <button
                type="button"
                className={index === paletteIndex ? "is-active" : ""}
                onClick={() => setPaletteIndex(index)}
                aria-label={`Farbwelt ${index + 1}`}
                aria-pressed={index === paletteIndex}
                key={colors.join("")}
              >
                <i style={{ background: colors[1] }} />
                <i style={{ background: colors[2] }} />
                <i style={{ background: colors[3] }} />
              </button>
            ))}
          </div>
          <small>Klicken Sie auch auf die Menüpunkte in der Vorschau.</small>
        </div>
      )}
    </div>
  );
}

function LabPage() {
  const [saved, setSaved] = useState([]);
  const [category, setCategory] = useState(null);
  const [bookCategory, setBookCategory] = useState("Alle");
  const [visible, setVisible] = useState(8);
  const [detail, setDetail] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [bookPackage, setBookPackage] = useState("Authority Book · 3.000 €");
  const [carriedPackage, setCarriedPackage] = useState("");
  const galleryRef = useRef(null);
  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem("chelonaki-lab") || "[]"));
    } catch {
      setSaved([]);
    }
  }, []);
  const toggle = (title) =>
    setSaved((current) => {
      const next = current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title];
      localStorage.setItem("chelonaki-lab", JSON.stringify(next));
      return next;
    });
  const categories = [
    [
      "Bücher",
      "Buchdesigns",
      "Cover, Inhaltsseiten, Kapitel, Rezepte und Editorialsysteme",
    ],
    [
      "Webseiten",
      "Webseitendesigns",
      "Aufbau, Bildsprache, Typografie und Nutzerführung",
    ],
    [
      "Apps",
      "App-Designs",
      "Navigation, Dashboards und digitale Produktoberflächen",
    ],
    [
      "Content",
      "Content-Designs",
      "Social Media, Karussells, Kurzvideos und Anzeigen",
    ],
  ];
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incomingCategory = params.get("bereich");
    const incomingPackage = params.get("paket") || "";
    if (categories.some(([value]) => value === incomingCategory)) {
      setCategory(incomingCategory);
    }
    if (incomingPackage) {
      setCarriedPackage(incomingPackage);
      if (incomingCategory === "Bücher") {
        const bookPackageLabels = {
          Kinderbuch: "Kinderbuch · ab 500 €",
          "Book Starter": "Book Starter · ab 1.000 €",
          "Authority Book": "Authority Book · 3.000 €",
          "Premium Research Book": "Premium Research Book · 6.000 €",
          "Individuelles Buchprojekt":
            "Individuelles Buchprojekt · auf Anfrage",
        };
        setBookPackage(bookPackageLabels[incomingPackage] || incomingPackage);
      }
    }
  }, []);
  useEffect(() => {
    if (!category || !carriedPackage) return;
    const scrollToGallery = () => {
      const target = document.querySelector(".lab-gallery");
      if (!target) return;
      const headerOffset = window.innerWidth <= 760 ? 82 : 104;
      window.scrollTo({
        top: window.scrollY + target.getBoundingClientRect().top - headerOffset,
        behavior: "instant",
      });
    };
    const frame = requestAnimationFrame(() =>
      requestAnimationFrame(scrollToGallery),
    );
    const settledScroll = window.setTimeout(scrollToGallery, 320);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settledScroll);
    };
  }, [category, carriedPackage]);
  const bookCategories = [
    "Alle",
    "Kochbuch",
    "Kinderbuch",
    "Fitness",
    "Gesundheit",
    "Ernährung",
    "Heilkunde",
    "Esoterik",
  ];
  const categoryEntries = category
    ? labEntries.filter((entry) => entry.category === category)
    : [];
  const entryBookCategory = (entry) =>
    entry.bookCategory || entry.area?.split(" · ")[0] || "Sonstige";
  const filtered =
    category === "Bücher" && bookCategory !== "Alle"
      ? categoryEntries.filter(
          (entry) => entryBookCategory(entry) === bookCategory,
        )
      : categoryEntries;
  const shown = filtered.slice(0, visible);
  const chooseCategory = (next) => {
    setCategory(next);
    setBookCategory("Alle");
    setVisible(8);
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        galleryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        }),
      ),
    );
  };
  useEffect(() => {
    if (!detail) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event) => {
      if (event.key === "Escape" && !zoomImage) setDetail(null);
    };
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", close);
    };
  }, [detail, zoomImage]);
  useEffect(() => {
    if (!zoomImage) return undefined;
    setZoomLevel(1);
    const close = (event) => {
      if (event.key === "Escape") setZoomImage(null);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [zoomImage]);
  return (
    <main id="main">
      <section className="lab-hero is-simple">
        <div>
          <span>Chelonaki Designbibliothek</span>
          <h1>
            Design entdecken.
            <br />
            Eigenständig weiterentwickeln.
          </h1>
          <p>
            Wählen Sie zuerst den Bereich, für den Sie eine visuelle Richtung
            suchen. Danach können Sie einzelne Vorlagen öffnen, vergleichen und
            für Ihr Projekt merken.
          </p>
          <div className="page-hero-actions">
            <a className="button button-gold" href="#lab-demos">
              Bereich auswählen <ArrowRight size={18} />
            </a>
            <SmartLink
              className="text-link text-link-light"
              href="/paketfinder"
            >
              Passende Leistung finden <ArrowRight size={18} />
            </SmartLink>
          </div>
        </div>
      </section>
      <section className="lab-how">
        <header>
          <span>So funktioniert die Auswahl</span>
          <h2>Inspiration ohne Baukasten-Look.</h2>
        </header>
        <ol>
          <li>
            <strong>01</strong>
            <h3>Filtern & ansehen</h3>
            <p>
              Vergleichen Sie Stile nach Buch, Website, App oder
              Anwendungsbereich.
            </p>
          </li>
          <li>
            <strong>02</strong>
            <h3>Details & Preis</h3>
            <p>
              Öffnen Sie eine Vorlage, wählen Sie den gewünschten Projektumfang
              und merken Sie Ihren Favoriten.
            </p>
          </li>
          <li>
            <strong>03</strong>
            <h3>Individualisieren</h3>
            <p>
              Farben, Texte, Inhalte und Details werden für Ihr Projekt
              eigenständig entwickelt.
            </p>
          </li>
        </ol>
      </section>
      <section className="lab-grid-section" id="lab-demos">
        <header>
          <span>Kuratierte Designvorlagen</span>
          <h2>Welchen Bereich möchten Sie gestalten?</h2>
          <p>
            Öffnen Sie eine Kategorie, um die verfügbaren Designrichtungen zu
            sehen. Jede Vorlage dient als Ausgangspunkt und wird für Ihr Projekt
            individuell angepasst.
          </p>
          {carriedPackage && (
            <div className="carried-package" role="status">
              <span>Vorausgewähltes Paket</span>
              <strong>{carriedPackage}</strong>
              <small>
                Ihre Paketauswahl bleibt für die Designanfrage gespeichert.
              </small>
            </div>
          )}
        </header>
        <div className="design-category-grid">
          {categories.map(([value, label, description]) => (
            <button
              type="button"
              className={category === value ? "is-active" : ""}
              aria-pressed={category === value}
              onClick={() => chooseCategory(value)}
              key={value}
            >
              <span>{label}</span>
              <p>{description}</p>
              <small>
                {labEntries.filter((entry) => entry.category === value).length}{" "}
                {labEntries.filter((entry) => entry.category === value)
                  .length === 1
                  ? "Vorlage"
                  : "Vorlagen"}
              </small>
              <ArrowRight size={19} />
            </button>
          ))}
        </div>
        {category && (
          <div className="lab-gallery" ref={galleryRef}>
            <div className="lab-gallery-head">
              <div>
                <span>Ausgewählter Bereich</span>
                <h3>{categories.find(([value]) => value === category)?.[1]}</h3>
              </div>
              <button type="button" onClick={() => setCategory(null)}>
                Andere Kategorie wählen
              </button>
            </div>
            {category === "Bücher" && (
              <div
                className="book-category-filter"
                aria-label="Buchkategorie auswählen"
              >
                <div>
                  <span>Buchkategorie</span>
                  <p>
                    Filtern Sie die Designvorlagen nach dem Thema Ihres
                    Buchprojekts.
                  </p>
                </div>
                <div>
                  {bookCategories.map((item) => {
                    const count =
                      item === "Alle"
                        ? categoryEntries.length
                        : categoryEntries.filter(
                            (entry) => entryBookCategory(entry) === item,
                          ).length;
                    return (
                      <button
                        type="button"
                        className={bookCategory === item ? "is-active" : ""}
                        aria-pressed={bookCategory === item}
                        onClick={() => {
                          setBookCategory(item);
                          setVisible(8);
                        }}
                        key={item}
                      >
                        <span>{item}</span>
                        <small>{count}</small>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <div className="lab-results-head">
              <span>
                {shown.length} von {filtered.length} Vorlagen sichtbar
              </span>
              <small>Neue Vorlagen können laufend ergänzt werden.</small>
            </div>
            {category === "Bücher" && filtered.length === 0 && (
              <div className="book-category-empty">
                <span>{bookCategory}</span>
                <h3>
                  Für diese Kategorie werden gerade neue Designvorlagen
                  vorbereitet.
                </h3>
                <p>
                  Die Filterstruktur ist bereits angelegt. Weitere Buchdesigns
                  können später ohne Umbau ergänzt und automatisch hier
                  einsortiert werden.
                </p>
                <button type="button" onClick={() => setBookCategory("Alle")}>
                  Alle Buchdesigns ansehen <ArrowRight size={17} />
                </button>
              </div>
            )}
            <div className="lab-grid">
              {shown.map((entry) => (
                <article key={entry.title}>
                  <button
                    className={`lab-image-button ${entry.webTheme ? "is-web-demo" : ""}`}
                    type="button"
                    onClick={() => setDetail(entry)}
                    aria-label={`Details zu ${entry.title} öffnen`}
                  >
                    {entry.webTheme ? (
                      <WebDesignPreview entry={entry} compact />
                    ) : (
                      <img
                        src={entry.image}
                        alt={
                          entry.category === "Bücher"
                            ? `Mehrseitige Buchdesignvorlage ${entry.title}`
                            : ""
                        }
                        loading="lazy"
                        width="1536"
                        height="1024"
                      />
                    )}
                    <span>
                      {entry.webTheme ? "Interaktiv öffnen" : "Design ansehen"}{" "}
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                  <div className="lab-card-meta">
                    <span>{entry.status}</span>
                    <small>{entry.area}</small>
                  </div>
                  <h3>{entry.title}</h3>
                  <p>{entry.text}</p>
                  <div>
                    <button
                      type="button"
                      className="lab-detail-link"
                      onClick={() => setDetail(entry)}
                    >
                      {entry.webTheme ? "Demo öffnen" : "Mehr erfahren"}{" "}
                      <ArrowUpRight size={17} />
                    </button>
                    <button
                      type="button"
                      aria-pressed={saved.includes(entry.title)}
                      onClick={() => toggle(entry.title)}
                    >
                      {saved.includes(entry.title)
                        ? "Ausgewählt"
                        : "Als Vorlage merken"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
            {visible < filtered.length && (
              <div className="lab-load-more">
                <button
                  type="button"
                  onClick={() => setVisible((value) => value + 6)}
                >
                  Weitere Designs anzeigen <ArrowRight size={17} />
                </button>
                <span>Noch {filtered.length - visible} verfügbar</span>
              </div>
            )}
          </div>
        )}
      </section>
      <section className="lab-transfer">
        <div>
          <span>Ihre Designauswahl</span>
          <h2>Welche Richtung passt zu Ihrer Idee?</h2>
          <p>
            {saved.length
              ? `${saved.length} Beispiel${saved.length === 1 ? " ist" : "e sind"} ausgewählt. Nutzen Sie den Paketfinder oder nennen Sie uns Ihre Auswahl im Erstgespräch.`
              : "Merken Sie passende Beispiele. Danach können Sie die richtige Leistung finden oder Ihre bevorzugte Richtung direkt mit uns besprechen."}
          </p>
        </div>
        <SmartLink className="button button-gold" href="/paketfinder">
          Mit Auswahl weiter <ArrowRight size={18} />
        </SmartLink>
      </section>
      {detail && (
        <div
          className="design-detail-backdrop"
          role="presentation"
          onMouseDown={() => setDetail(null)}
        >
          <section
            className={`design-detail ${detail.webTheme ? "is-web-demo" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="design-detail-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="design-detail-close"
              type="button"
              onClick={() => setDetail(null)}
              aria-label="Detailansicht schließen"
            >
              <X size={22} />
            </button>
            <figure>
              {detail.webTheme ? (
                <WebDesignPreview entry={detail} />
              ) : (
                <button
                  className="design-detail-image"
                  type="button"
                  onClick={() => setZoomImage(detail)}
                  aria-label={`${detail.title} im Vollbild öffnen`}
                >
                  <img
                    src={detail.image}
                    alt={`Designansicht ${detail.title}`}
                    width="1536"
                    height="1024"
                  />
                  <span>
                    <MagnifyingGlassPlus size={18} /> Vollbild & Zoom
                  </span>
                </button>
              )}
            </figure>
            <div className="design-detail-copy">
              <span className="design-area-label">{detail.area}</span>
              <h2 id="design-detail-title">{detail.title}</h2>
              <p>{detail.details || detail.text}</p>
              {carriedPackage && detail.category !== "Bücher" && (
                <div className="design-package-choice">
                  <span>Ausgewähltes Paket</span>
                  <strong>{carriedPackage}</strong>
                  <small>
                    Dieses Paket wird zusammen mit Ihrer Designauswahl an die
                    Anfrage übergeben.
                  </small>
                </div>
              )}
              {detail.category === "Bücher" ? (
                <>
                  <div className="design-package-choice">
                    <label htmlFor="book-package">Gewünschter Buchumfang</label>
                    <select
                      id="book-package"
                      value={bookPackage}
                      onChange={(event) => setBookPackage(event.target.value)}
                    >
                      <option>Kinderbuch · ab 500 €</option>
                      <option>Book Starter · ab 1.000 €</option>
                      <option>Authority Book · 3.000 €</option>
                      <option>Premium Research Book · 6.000 €</option>
                      <option>Individuelles Buchprojekt · auf Anfrage</option>
                    </select>
                    <small>
                      Die Vorlage bestimmt die Designrichtung. Seitenzahl,
                      Recherche, Ghostwriting, Lektorat, Bilder und Druck
                      richten sich nach dem gewählten Paket und dem
                      verbindlichen Angebot.
                    </small>
                  </div>
                  <SmartLink
                    className="button button-gold"
                    href={`/kontakt?bereich=${encodeURIComponent(`${detail.title} · ${bookPackage}`)}`}
                  >
                    Design & Paket anfragen <ArrowRight size={18} />
                  </SmartLink>
                </>
              ) : (
                <SmartLink
                  className="button button-gold"
                  href={
                    detail.webTheme
                      ? `/kontakt?bereich=${encodeURIComponent(`Webdesign ${detail.title}${carriedPackage ? ` · ${carriedPackage}` : ""}`)}`
                      : detail.href
                  }
                >
                  {detail.webTheme
                    ? carriedPackage
                      ? "Design & Paket anfragen"
                      : "Webdesign anfragen"
                    : "Passenden Bereich öffnen"}{" "}
                  <ArrowRight size={18} />
                </SmartLink>
              )}
              <button
                type="button"
                className="design-save"
                aria-pressed={saved.includes(detail.title)}
                onClick={() => toggle(detail.title)}
              >
                {saved.includes(detail.title)
                  ? "Aus Auswahl entfernen"
                  : "Als Vorlage merken"}
              </button>
            </div>
          </section>
        </div>
      )}
      {zoomImage && (
        <div
          className="design-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={`${zoomImage.title} Vollbildansicht`}
        >
          <header>
            <div>
              <small>Designansicht</small>
              <strong>{zoomImage.title}</strong>
            </div>
            <div className="design-zoom-controls">
              <button
                type="button"
                onClick={() =>
                  setZoomLevel((value) => Math.max(1, value - 0.5))
                }
                disabled={zoomLevel <= 1}
                aria-label="Verkleinern"
              >
                <MagnifyingGlassMinus size={21} />
              </button>
              <span>{Math.round(zoomLevel * 100)} %</span>
              <button
                type="button"
                onClick={() =>
                  setZoomLevel((value) => Math.min(4, value + 0.5))
                }
                disabled={zoomLevel >= 4}
                aria-label="Vergrößern"
              >
                <MagnifyingGlassPlus size={21} />
              </button>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                aria-label="Vollbild schließen"
              >
                <X size={23} />
              </button>
            </div>
          </header>
          <div
            className="design-zoom-stage"
            onDoubleClick={() => setZoomLevel((value) => (value === 1 ? 2 : 1))}
          >
            <img
              src={zoomImage.image}
              alt={`Vergrößerte Designansicht ${zoomImage.title}`}
              style={{ width: `${zoomLevel * 100}%` }}
              draggable="false"
            />
          </div>
          <footer>
            Mit zwei Fingern verschieben · Doppeltippen oder die Tasten zum
            Zoomen verwenden
          </footer>
        </div>
      )}
    </main>
  );
}

function PackageFinderPage() {
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [scope, setScope] = useState("");
  const [timing, setTiming] = useState("");
  const selected = finderGoals.find(([key]) => key === goal);
  const step = !goal ? 1 : !audience ? 2 : !scope ? 3 : !timing ? 4 : 5;
  const reset = () => {
    setGoal("");
    setAudience("");
    setScope("");
    setTiming("");
  };
  const back = () => {
    if (step === 2) setGoal("");
    else if (step === 3) setAudience("");
    else if (step === 4) setScope("");
    else if (step === 5) setTiming("");
  };
  return (
    <main id="main">
      <section className="finder-page">
        <header>
          <span>Intelligenter Paketfinder</span>
          <h1>In wenigen Schritten zur passenden Chelonaki-Lösung.</h1>
          <p>
            Der Finder übersetzt Ziel, Ausgangslage, Umfang und Zeitrahmen in
            eine verständliche Empfehlung. Kontaktdaten werden nicht abgefragt.
          </p>
          <div className="finder-progress">
            <i style={{ width: `${step * 20}%` }} />
            <small>{step === 5 ? "Empfehlung" : `Schritt ${step} von 4`}</small>
          </div>
          {step > 1 && (
            <button className="finder-back" type="button" onClick={back}>
              ← Eine Frage zurück
            </button>
          )}
        </header>
        <div className="finder-panel">
          {step === 1 && (
            <FinderQuestion
              title="Was möchten Sie erreichen?"
              options={finderGoals.map(([value, label]) => [value, label])}
              onSelect={setGoal}
            />
          )}{" "}
          {step === 2 && (
            <FinderQuestion
              title="Für wen ist die Lösung gedacht?"
              options={[
                ["business", "Unternehmen oder Team"],
                ["founder", "Gründung oder eigene Produktidee"],
                ["private", "Privates Vorhaben"],
              ]}
              onSelect={setAudience}
            />
          )}{" "}
          {step === 3 && (
            <FinderQuestion
              title="Welcher Umfang passt zu Ihrem Start?"
              options={[
                ["entry", "Klarer, kleiner Einstieg"],
                ["core", "Belastbares Kernprodukt"],
                ["custom", "Individuelle oder komplexe Lösung"],
              ]}
              onSelect={setScope}
            />
          )}{" "}
          {step === 4 && (
            <FinderQuestion
              title="Wann möchten Sie starten?"
              options={[
                ["soon", "So bald wie möglich"],
                ["quarter", "In 1–3 Monaten"],
                ["later", "Später oder noch offen"],
              ]}
              onSelect={setTiming}
            />
          )}{" "}
          {step === 5 && selected && (
            <FinderResult
              selected={selected}
              scope={scope}
              audience={audience}
              timing={timing}
              onReset={reset}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function FinderQuestion({ title, options, onSelect }) {
  return (
    <section className="finder-question">
      <span>Ihre Auswahl</span>
      <h2>{title}</h2>
      <div>
        {options.map(([value, label], i) => (
          <button type="button" key={value} onClick={() => onSelect(value)}>
            <small>{String(i + 1).padStart(2, "0")}</small>
            <strong>{label}</strong>
            <ArrowRight size={19} />
          </button>
        ))}
      </div>
    </section>
  );
}

function FinderResult({ selected, scope, audience, timing, onReset }) {
  const [, label, recommendation, price, duration, href] = selected;
  const custom = scope === "custom";
  return (
    <section className="finder-result">
      <span>Ihre Empfehlung</span>
      <h2>{custom ? "Individuelle Lösung mit Discovery" : recommendation}</h2>
      <p>
        Für „{label}“ und den gewählten Umfang ist das der sinnvollste Einstieg.{" "}
        {audience === "private"
          ? "Vor einer Beauftragung werden Zielgruppe und korrekte Endpreisdarstellung geprüft."
          : "Leistungsumfang und Nettopreis werden vor dem Start verbindlich festgehalten."}
      </p>
      <dl>
        <div>
          <dt>Preisrahmen</dt>
          <dd>{custom ? "nach qualifizierter Ersteinschätzung" : price}</dd>
        </div>
        <div>
          <dt>Orientierung</dt>
          <dd>{custom ? "Zeitplan nach Discovery" : duration}</dd>
        </div>
        <div>
          <dt>Start</dt>
          <dd>
            {timing === "soon"
              ? "priorisierte Verfügbarkeit prüfen"
              : timing === "quarter"
                ? "für die nächsten 1–3 Monate planen"
                : "unverbindlich vorbereiten"}
          </dd>
        </div>
      </dl>
      <div className="finder-actions">
        <SmartLink
          className="button button-gold"
          href={custom ? `/kontakt?bereich=${encodeURIComponent(label)}` : href}
        >
          {custom ? "Projekt besprechen" : "Empfehlung ansehen"}
          <ArrowRight size={18} />
        </SmartLink>
        <button
          className="button button-outline-light"
          type="button"
          onClick={onReset}
        >
          Neu starten
        </button>
      </div>
      <small className="finder-disclaimer">
        Die Empfehlung ist eine unverbindliche Orientierung. Der verbindliche
        Umfang ergibt sich aus Produktbeschreibung oder individuellem Angebot.
      </small>
    </section>
  );
}

function QualityPage() {
  return (
    <main id="main">
      <section className="quality-hero">
        <div>
          <span>Chelonaki Qualitätsrahmen</span>
          <h1>
            KI beschleunigt.
            <br />
            Verantwortung bleibt menschlich.
          </h1>
          <p>
            Klare Leistungsgrenzen, fachliche Prüfung, sichere technische
            Entscheidungen und nachvollziehbare Freigaben bilden den gemeinsamen
            Standard aller Chelonaki-Projekte.
          </p>
        </div>
        <figure>
          <img
            src="/assets/quality-framework-liquid-glass-v1.webp"
            alt="Messingwaage mit drei transparenten Qualitätsstandards in griechischer Architektur"
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="quality-grid">
        {qualityPrinciples.map(([title, text], i) => (
          <article key={title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>
      <section className="enterprise-section">
        <div>
          <span>Enterprise-orientierte Anhebung</span>
          <h2>Mehr Schutz, wenn das Projekt ihn braucht.</h2>
          <p>
            Für anspruchsvollere Systeme kann ein gesonderter Architektur- und
            Sicherheitsrahmen vereinbart werden. Maßgeblich bleibt immer der
            konkret dokumentierte Leistungskatalog – nicht ein pauschales
            Sicherheitsversprechen.
          </p>
        </div>
        <ul>
          {[
            "Rollen, Rechte und getrennte Umgebungen",
            "Code-Reviews, automatisierte Tests und CI/CD",
            "Secrets-Management, Audit-Logging und Monitoring",
            "Backup-, Restore- und Reaktionskonzept",
          ].map((item) => (
            <li key={item}>
              <Check size={18} />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <FinalCta label="Qualitätsrahmen besprechen" />
    </main>
  );
}

function OriginalAppsPage() {
  return (
    <main id="main">
      <section className="original-hero">
        <div className="original-hero-copy">
          <span className="audience-label">Von Eleftherios entwickelt</span>
          <h1>Eigene Apps mit einer persönlichen Handschrift.</h1>
          <p>
            Diese Anwendungen sind keine Kundenaufträge. Eleftherios hat sie aus
            eigenen Ideen konzipiert und programmiert – für Ernährung, Fitness,
            Lernen, Kommunikation und einen leichteren Alltag.
          </p>
        </div>
        <figure>
          <img
            src="/assets/project-nutrition-venture.png"
            alt="Ernährungs- und Produktentwicklung mit Notizbuch, mediterranen Zutaten und Modell"
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="product-pair">
        <SmartLink href="/originals/apps/evofit">
          <span>Eigene App · Prototyp</span>
          <h2>Chelonaki EvoFit</h2>
          <p>
            Trainingsplanung, Ernährung, Rezepte, Einkauf, Challenges und
            langfristige Motivation in einer verbundenen Welt.
          </p>
          <ArrowUpRight size={22} />
        </SmartLink>
        <SmartLink href="/originals/apps/chelonaki-reply">
          <span>Eigene App · In Entwicklung</span>
          <h2>Chelonaki Reply</h2>
          <p>
            Drei passende Antwortvorschläge für LinkedIn, Instagram und E-Mail –
            mit menschlicher Freigabe als letztem Schritt.
          </p>
          <ArrowUpRight size={22} />
        </SmartLink>
      </section>
    </main>
  );
}

function OriginalAppPage({ app }) {
  const reply = app === "chelonaki-reply";
  const data = reply
    ? {
        name: "Chelonaki Reply",
        title: "Drei passende Antworten. Sie wählen die richtige.",
        intro:
          "Schneller, konsistenter und persönlicher auf Nachrichten reagieren – ohne die Kontrolle über Ton und Inhalt abzugeben.",
        features: [
          "Drei unterscheidbare Vorschläge",
          "LinkedIn, Instagram und E-Mail",
          "Professionell, herzlich, kurz oder vertriebsorientiert",
          "Bearbeiten und kopieren vor dem Senden",
          "Markenbegriffe und No-Go-Aussagen",
          "Menschliche Freigabe als letzter Schritt",
        ],
      }
    : {
        name: "Chelonaki EvoFit",
        title: "Ernährung und Training, die langfristig in den Alltag passen.",
        intro:
          "EvoFit verbindet Planung, Rezepte, Einkauf, Training, Gesundheitswissen, Challenges und spielerische Motivation.",
        features: [
          "Personalisierte Trainings- und Ernährungsbereiche",
          "Rezepte, Einkauf und Wochenplanung",
          "Fortschritt verständlich darstellen",
          "Challenges und Schildkröten-Gamification",
          "Verantwortungsvoller Umgang mit Gesundheitsdaten",
          "App-, Web- und Beratungsbausteine verbinden",
        ],
      };
  return (
    <main id="main">
      <section className="product-hero">
        <div>
          <span>
            Chelonaki Original · {reply ? "In Entwicklung" : "Prototyp"}
          </span>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <SmartLink
            className="button button-gold"
            href={`/kontakt?bereich=${encodeURIComponent(data.name)}`}
          >
            {reply ? "Frühen Zugang vormerken" : "Testzugang vormerken"}
            <ArrowRight size={18} />
          </SmartLink>
        </div>
        <figure>
          <img
            src={
              reply
                ? "/assets/reply-product-liquid-glass-v1.webp"
                : "/assets/project-digital-brand.png"
            }
            alt={
              reply
                ? "Smartphone mit drei schwebenden Antwortkarten in einem griechisch inspirierten Studio"
                : "Ernährungs- und Produktkonzept mit Notizbuch und mediterranen Zutaten"
            }
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="product-features">
        <header>
          <span>Geplanter Kern</span>
          <h2>
            {reply
              ? "Hilft beim Antworten. Entscheidet nicht für Sie."
              : "Ein klarer Weg vom Ziel zum Fortschritt."}
          </h2>
        </header>
        <div>
          {data.features.map((item, i) => (
            <article key={item}>
              <span>0{i + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="release-note">
        <strong>{reply ? "MVP-Grenze" : "Entwicklungsstatus"}</strong>
        <p>
          {reply
            ? "Die erste Version sendet keine Nachrichten unbeaufsichtigt. Direkte Integrationen werden nur über zulässige Schnittstellen umgesetzt."
            : "Funktionen, Datenschutzkonzept und Plattformfreigaben werden vor einem öffentlichen Test verbindlich festgelegt."}
        </p>
      </section>
    </main>
  );
}

function OriginalDetail({ type }) {
  const map = {
    buecher: [
      "Von Eleftherios geschriebene Bücher",
      "Hier stehen nicht Buchprojekte für Kunden, sondern die eigenen Werke von Eleftherios: Fach-, Koch- und Kinderbücher zu Ernährung, Gesundheit und besonderen Stoffwechselerkrankungen – fundiert, verständlich und für unterschiedliche Altersgruppen geschrieben.",
      [
        "Eigene Fachbücher",
        "Eigene Koch- und Rezeptbücher",
        "Eigene illustrierte Kinderbücher",
        "Eigene Comics und Lernabenteuer",
      ],
    ],
    apps: [
      "Von Eleftherios entwickelte Apps",
      "Eigene, von Eleftherios konzipierte und programmierte digitale Werkzeuge, die Training, Ernährung, Rezepte, Planung und Motivation sinnvoll miteinander verbinden.",
      [
        "Chelonaki EvoFit",
        "Eigene Ernährungs- und Fitness-Apps",
        "Eigene KI-gestützte Alltagsassistenten",
        "Persönlich entwickelte Produktideen",
      ],
    ],
  };
  const data = map[type];
  if (!data) return <NotFound />;
  return (
    <main id="main">
      <section className="original-hero">
        <div className="original-hero-copy">
          <span className="audience-label">Eleftherios · Eigenes Werk</span>
          <h1>{data[0]}</h1>
          <p>{data[1]}</p>
          <div>
            {data[2].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <SmartLink
            className="button button-gold"
            href={`/kontakt?bereich=${encodeURIComponent(data[0])}`}
          >
            Warteliste & Partnerschaft <ArrowRight size={18} />
          </SmartLink>
        </div>
        <figure>
          <img
            src={
              type === "buecher"
                ? "/assets/service-funnel-editorial.webp"
                : "/assets/project-nutrition-venture.png"
            }
            alt={
              type === "buecher"
                ? "Persönliche Buchentwicklung mit Manuskript, Blindband und handwerklichen Werkzeugen"
                : "Eigene App- und Produktentwicklung rund um Ernährung und Alltag"
            }
            width="1536"
            height="1024"
          />
        </figure>
      </section>
      <section className="release-note">
        <strong>Eigene Werke & Entwicklungsstände</strong>
        <p>
          Originals zeigt veröffentlichte, geplante und kommende eigene Produkte
          von Eleftherios. Medizinische und ernährungsbezogene Inhalte werden
          quellenbasiert erstellt und vor Veröffentlichung fachlich geprüft.
        </p>
      </section>
    </main>
  );
}

function AboutPage() {
  return (
    <main id="main">
      <section className="story-page-hero">
        <figure>
          <img
            src="/assets/chelonaki-wall-medallion.webp"
            alt="Chelonaki Familienwappen als Schildkrötenrelief"
          />
        </figure>
        <div>
          <span>Über Chelonaki</span>
          <h1>Wissen aus Erfahrung. Technologie mit Verantwortung.</h1>
          <p>
            Hinter Chelonaki steht Eleftherios Samouladas –
            Ernährungswissenschaftler, gelernter Koch, Produktentwickler,
            Programmierer und Gründer.
          </p>
        </div>
      </section>
      <Credentials />
      <section className="technology-section">
        <header>
          <span>Technische Kompetenz</span>
          <h2>Der Stack folgt dem Problem. Nicht dem Trend.</h2>
          <p>
            Technische Möglichkeiten werden nicht nur aus Anwendersicht
            bewertet. Anforderungen, Datenflüsse, Schnittstellen und Risiken
            werden gemeinsam mit der Umsetzung gedacht.
          </p>
        </header>
        <div>
          {[
            [
              "Web & Shopify",
              "HTML · CSS · JavaScript · TypeScript · Shopify Liquid · React · Next.js · Astro",
            ],
            [
              "Apps",
              "Flutter · React Native · iOS · Android · plattformübergreifende Entwicklung",
            ],
            [
              "Backend & Daten",
              "Node.js · Python · Java · SQL · PostgreSQL · Supabase · Firebase · APIs · Webhooks",
            ],
            [
              "Qualität & Betrieb",
              "Git · Tests · CI/CD · Container · Rollen · Logging · Monitoring · Backups",
            ],
          ].map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <small>
          Die Liste zeigt mögliche Werkzeuge, keine pauschale Zusage für jedes
          Paket. Bei Spezialgebieten können ausgewählte Fachleute eingebunden
          werden.
        </small>
      </section>
      <section className="about-foundations">
        <header>
          <span>Vier Grundlagen</span>
          <h2>Worauf unsere Arbeit aufbaut.</h2>
        </header>
        <div>
          {[
            [
              "Wissenschaft",
              "Entscheidungen und Inhalte werden quellenbasiert und fachlich nachvollziehbar entwickelt.",
            ],
            [
              "Praxis",
              "Erfahrung aus mehr als 500 Küchen trifft auf reale Abläufe, Menschen und Qualitätsanforderungen.",
            ],
            [
              "Technologie",
              "KI und digitale Systeme werden gezielt eingesetzt, wenn sie Qualität, Verständlichkeit oder Effizienz verbessern.",
            ],
            [
              "Verantwortung",
              "KI unterstützt. Wesentliche Entscheidungen, Freigaben und Ergebnisse bleiben menschlich verantwortet.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span>0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <article className="story-article">
        <span className="section-eyebrow">Die Geschichte hinter dem Namen</span>
        <p className="story-lead">
          Als unser Großvater Georgios gemeinsam mit meinem Bruder und mir durch
          sein Dorf ging, sagten die Menschen liebevoll: „Da ist er ja – der
          Georgios mit seinen kleinen Schildkröten.“
        </p>
        <p>
          Aus diesem Spitznamen wurde unser Familienwappen. Aus dem
          Familienwappen wurde viele Jahre später Chelonaki.
        </p>
        <p>
          Die Schildkröte steht für uns nicht für Langsamkeit. Sie verkörpert
          Weisheit, Langlebigkeit, Schutz, Beständigkeit und die Fähigkeit, den
          eigenen Weg mit Ruhe und Überzeugung zu gehen.
        </p>
        <blockquote>Wisdom wears a shell.</blockquote>
        <p>
          Der Claim erinnert daran, dass echte Intelligenz Erfahrung, Schutz,
          Verantwortung und ein stabiles Fundament braucht.
        </p>
      </article>
      <FinalCta label="Projekt mit Eleftherios besprechen" />
    </main>
  );
}

function ContactPage() {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const privacyId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const focusErrorId = useId();
  const messageErrorId = useId();
  const privacyErrorId = useId();
  const query =
    typeof window === "undefined"
      ? ""
      : new URLSearchParams(window.location.search).get("bereich") || "";
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = {};
    if (!data.get("name")?.trim()) next.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email") || ""))
      next.email = true;
    if (!data.get("focus")) next.focus = true;
    if ((data.get("message") || "").trim().length < 20) next.message = true;
    if (!data.get("privacy")) next.privacy = true;
    setErrors(next);
    if (Object.keys(next).length) return;
    const subject = `Projektanfrage: ${data.get("focus")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `E-Mail: ${data.get("email")}`,
      data.get("company") && `Unternehmen/Projekt: ${data.get("company")}`,
      `Gewünschte Leistung: ${data.get("focus")}`,
      `Budgetrahmen: ${data.get("budget") || "Noch offen"}`,
      `Gewünschter Start: ${data.get("start") || "Noch offen"}`,
      "",
      "Ziel und Ausgangslage:",
      data.get("message"),
    ]
      .filter((line) => line !== false && line !== null && line !== undefined)
      .join("\n");
    window.location.href = `mailto:info@chelonaki.eu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  useEffect(() => {
    if (!Object.keys(errors).length) return;
    const frame = window.requestAnimationFrame(() => {
      const field = formRef.current?.querySelector('[aria-invalid="true"]');
      field?.focus({ preventScroll: true });
      field?.scrollIntoView({ block: "center" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [errors]);
  return (
    <main id="main">
      <section className="contact-page">
        <div className="contact-copy">
          <span>Projekt, Beratung oder Produktanfrage</span>
          <h1>Was möchten Sie mit Chelonaki aufbauen?</h1>
          <p>
            Wählen Sie den passenden Bereich. Danach fragen wir nur die
            Informationen ab, die für Ihr Vorhaben wirklich relevant sind.
          </p>
          <SmartLink className="text-link text-link-light" href="/paketfinder">
            Erst die passende Lösung finden <ArrowRight size={18} />
          </SmartLink>
          <div className="contact-promise">
            <LockKey size={22} />
            <span>
              <strong>Qualifizierte Anfrage</strong>Eine Anfrage ist noch keine
              Auftragsannahme. Das Formular öffnet Ihr E-Mail-Programm.
            </span>
          </div>
        </div>
        <div className="contact-panel">
          <form
            ref={formRef}
            className="contact-form"
            noValidate
            onSubmit={submit}
          >
              {Object.keys(errors).length > 0 && (
                <div className="form-global-error" role="alert">
                  Bitte prüfen Sie die markierten Pflichtfelder. Der Fokus
                  springt zum ersten Feld mit einem Fehler.
                </div>
              )}
              <div className="field-pair">
                <label>
                  <span>Name *</span>
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? nameErrorId : undefined}
                  />
                  {errors.name && (
                    <small className="field-error" id={nameErrorId}>
                      Bitte Namen eingeben.
                    </small>
                  )}
                </label>
                <label>
                  <span>E-Mail *</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? emailErrorId : undefined}
                  />
                  {errors.email && (
                    <small className="field-error" id={emailErrorId}>
                      Bitte E-Mail prüfen.
                    </small>
                  )}
                </label>
              </div>
              <div className="field-pair">
                <label>
                  <span>Unternehmen oder Projekt (optional)</span>
                  <input name="company" autoComplete="organization" />
                </label>
                <label>
                  <span>Gewünschte Leistung *</span>
                  <select
                    name="focus"
                    defaultValue={query}
                    required
                    aria-invalid={Boolean(errors.focus)}
                    aria-describedby={errors.focus ? focusErrorId : undefined}
                  >
                    <option value="" disabled>
                      Bitte wählen
                    </option>
                    <option>Digitalprojekt</option>
                    <option>Bücher erstellen lassen & Ghostwriting</option>
                    <option>KI-Beratung für Unternehmen</option>
                    <option>KI-Schulungen & Workshops für Mitarbeiter</option>
                    <option>Chelonaki Video Academy</option>
                    <option>Partnerschaft oder Originals</option>
                    {query && <option>{query}</option>}
                  </select>
                  {errors.focus && (
                    <small className="field-error" id={focusErrorId}>
                      Bitte Bereich wählen.
                    </small>
                  )}
                </label>
              </div>
              <div className="field-pair">
                <label>
                  <span>Budgetrahmen</span>
                  <select name="budget" defaultValue="">
                    <option value="">Noch offen</option>
                    <option>bis 1.500 €</option>
                    <option>1.500–3.000 €</option>
                    <option>3.000–6.000 €</option>
                    <option>über 6.000 €</option>
                  </select>
                </label>
                <label>
                  <span>Gewünschter Start</span>
                  <select name="start" defaultValue="">
                    <option value="">Noch offen</option>
                    <option>so bald wie möglich</option>
                    <option>in 1–3 Monaten</option>
                    <option>in 3–6 Monaten</option>
                    <option>später</option>
                  </select>
                </label>
              </div>
              <label>
                <span>Ziel und Ausgangslage *</span>
                <textarea
                  name="message"
                  rows="5"
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? messageErrorId : undefined
                  }
                />
                {errors.message && (
                  <small className="field-error" id={messageErrorId}>
                    Bitte mindestens 20 Zeichen schreiben.
                  </small>
                )}
              </label>
              <div className="privacy-field">
                <input
                  id={privacyId}
                  type="checkbox"
                  name="privacy"
                  required
                  aria-invalid={Boolean(errors.privacy)}
                  aria-describedby={
                    errors.privacy ? privacyErrorId : undefined
                  }
                />
                <span>
                  <label htmlFor={privacyId}>Ich habe die </label>
                  <SmartLink href="/datenschutz">Datenschutzhinweise</SmartLink>
                  <label htmlFor={privacyId}>
                    {" "}zur Bearbeitung meiner Anfrage zur Kenntnis genommen. *
                  </label>
                </span>
              </div>
              {errors.privacy && (
                <small className="field-error" id={privacyErrorId}>
                  Bitte bestätigen.
                </small>
              )}
              <button
                className="button button-gold submit-button"
                type="submit"
              >
                E-Mail-Anfrage öffnen <ArrowUpRight size={18} />
              </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function FinalCta({ label = "Projekt besprechen" }) {
  return (
    <section className="final-cta">
      <span>What should we build together?</span>
      <h2>
        Ob digitales System, fachliches Projekt oder neue Produktidee – wir
        entwickeln den passenden Weg.
      </h2>
      <SmartLink className="button button-gold" href="/kontakt">
        {label}
        <ArrowRight size={18} />
      </SmartLink>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Brand inverse />
          <p>Digitale Systeme. Starke Inhalte. Echtes Wissen.</p>
          <SmartLink href="/ueber-uns">
            Über uns & unsere Geschichte <ArrowRight size={16} />
          </SmartLink>
          <SmartLink href="/demowelten">
            Designbeispiele <ArrowRight size={16} />
          </SmartLink>
          <SmartLink href="/qualitaet">
            Qualitätsrahmen <ArrowRight size={16} />
          </SmartLink>
        </div>
        <div className="footer-navigation">
          {navigation.slice(0, 4).map((group) => (
            <div key={group.label}>
              <span>{group.label}</span>
              <SmartLink href={group.href}>Übersicht</SmartLink>
              {group.items.slice(0, 3).map(([label, href]) => (
                <SmartLink href={href} key={href}>
                  {label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>
        <SmartLink className="footer-contact" href="/paketfinder">
          <EnvelopeSimple size={24} />
          <span>
            <small>Noch unsicher?</small>
            <strong>Passende Lösung finden</strong>
          </span>
          <ArrowUpRight size={22} />
        </SmartLink>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Chelonaki</span>
        <div>
          {Object.entries(legalViews).map(([key, view]) => (
            <SmartLink key={key} href={legalPaths[key]}>
              {view.title}
            </SmartLink>
          ))}
        </div>
        <a href="#top">
          Nach oben <ArrowUpRight size={16} />
        </a>
      </div>
    </footer>
  );
}

const chatSuggestions = [
  "Welche Leistung passt zu meinem Projekt?",
  "Was kostet eine professionelle Website?",
  "Welche Buchpakete gibt es?",
  "Zeig mir passende Designbeispiele.",
];

function ChatAssistant({
  path,
  open,
  setOpen,
  compact,
  setCompact,
  footerVisible,
}) {
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hallo, ich bin der Chelonaki Assistent. Ich helfe Ihnen bei Leistungen, Paketen, Preisen, Designbeispielen und der Wahl des passenden nächsten Schritts. Was möchten Sie aufbauen?",
    },
  ]);
  const logRef = useRef(null);
  useEffect(() => {
    if (open)
      window.setTimeout(
        () =>
          logRef.current?.scrollTo({
            top: logRef.current.scrollHeight,
            behavior: "smooth",
          }),
        40,
      );
  }, [messages, open, busy]);
  const dismissLauncher = () => {
    setCompact(true);
  };
  const closeToHeader = () => {
    setOpen(false);
    setCompact(true);
  };

  const submit = async (suggestion) => {
    const content = (suggestion || input).trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.slice(-10),
          language: document.documentElement.lang || "de",
          path,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || typeof data.answer !== "string" || !data.answer.trim())
        throw new Error(
          data.error || "Der Assistent ist gerade nicht erreichbar.",
        );
      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `${error.message} Sie können alternativ direkt den Paketfinder öffnen oder eine Anfrage senden.`,
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside
      className={`chat-assistant ${open ? "is-open" : ""} ${compact && !open ? "is-compact" : ""} ${footerVisible && !open ? "is-footer-hidden" : ""}`}
      aria-label="Chelonaki Assistent"
    >
      {open && (
        <section
          className="chat-panel"
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-title"
        >
          <header className="chat-head">
            <span className="chat-avatar">
              <img src="/assets/chelonaki-turtle-transparent.png" alt="" />
            </span>
            <span>
              <strong id="chat-title">Chelonaki Assistent</strong>
              <small>
                <i /> Regelbasiert · datensparsame Orientierung
              </small>
            </span>
            <button
              className="chat-minimize"
              type="button"
              onClick={closeToHeader}
              aria-label="Chat minimieren"
            >
              <X size={18} />
            </button>
          </header>
          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.map((message, index) => (
              <div
                className={`chat-message is-${message.role}`}
                key={`${message.role}-${index}`}
              >
                <span>
                  {message.role === "assistant" && <Sparkle size={14} />}
                </span>
                <p>{message.content}</p>
              </div>
            ))}
            {busy && (
              <div className="chat-message is-assistant is-typing">
                <span>
                  <Sparkle size={14} />
                </span>
                <p>
                  <i />
                  <i />
                  <i />
                </p>
              </div>
            )}
          </div>
          {messages.length === 1 && (
            <div className="chat-suggestions">
              {chatSuggestions.map((label) => (
                <button type="button" onClick={() => submit(label)} key={label}>
                  {label}
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          )}
          <form
            className="chat-compose"
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <label>
              <span className="sr-only">Ihre Frage</span>
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                }}
                rows="1"
                maxLength="1500"
                placeholder="Frage zu Leistungen, Preisen oder Ihrem Projekt …"
              />
            </label>
            <button
              type="submit"
              disabled={!input.trim() || busy}
              aria-label="Nachricht senden"
            >
              <PaperPlaneTilt size={20} />
            </button>
          </form>
          <footer>
            KI kann Fehler machen. Verbindliche Leistungen und Preise bestätigen
            wir im persönlichen Angebot.
          </footer>
        </section>
      )}
      <div className="chat-launcher-shell">
        <button
          className="chat-launcher"
          type="button"
          onClick={() => (open ? closeToHeader() : setOpen(true))}
          aria-expanded={open}
          aria-label={open ? "Chat schließen" : "Chelonaki Assistent öffnen"}
        >
          <span>
            <img src="/assets/chelonaki-turtle-transparent.png" alt="" />
          </span>
          <strong>Fragen Sie Chelonaki</strong>
          {open ? <X size={20} /> : <ChatCircleDots size={21} />}
        </button>
        {!open && (
          <button
            className="chat-launcher-dismiss"
            type="button"
            onClick={dismissLauncher}
            aria-label="Chat zum Schildkröten-Symbol minimieren"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </aside>
  );
}

function RedirectPage({ to }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.history.replaceState({}, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [to]);
  return (
    <main id="main">
      <section className="not-found">
        <span>Weiterleitung</span>
        <h1>Die Seite hat einen neuen Namen.</h1>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main id="main">
      <section className="not-found">
        <span>404</span>
        <h1>Diese Seite trägt ihre Idee noch im Panzer.</h1>
        <SmartLink className="button button-gold" href="/">
          Zur Startseite
        </SmartLink>
      </section>
    </main>
  );
}

function RouteView({ path }) {
  const redirects = {
    "/digital": "/web-apps-publikationen",
    "/expertise": "/ki-beratung-weiterbildung",
    "/beratung-schulung": "/ki-beratung-weiterbildung",
    "/beratung-schulung/ki-consulting":
      "/ki-beratung-weiterbildung/ki-beratung-unternehmen",
    "/beratung-schulung/ki-schulungen":
      "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
    "/beratung-schulung/workshops":
      "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
    "/beratung-schulung/academy": "/ki-beratung-weiterbildung/video-academy",
    "/beratung-schulung/academy/ki": "/ki-beratung-weiterbildung/video-academy",
    "/beratung-schulung/academy/ernaehrung":
      "/ki-beratung-weiterbildung/video-academy",
    "/beratung-schulung/ernaehrungsberatung": "/ki-beratung-weiterbildung",
    "/beratung-schulung/ernaehrungsberatung/unternehmen":
      "/ki-beratung-weiterbildung",
    "/beratung-schulung/ernaehrungsberatung/privat":
      "/ki-beratung-weiterbildung",
    "/lab": "/demowelten",
    "/digital/websites-shopify":
      "/web-apps-publikationen/websites-erstellen-lassen",
    "/digital/websites-erstellen-lassen":
      "/web-apps-publikationen/websites-erstellen-lassen",
    "/digital/apps-software": "/web-apps-publikationen/apps-entwickeln-lassen",
    "/digital/buchproduktion-ghostwriting":
      "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
    "/web-apps-publikationen/buecher-erstellen-lassen":
      "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
    "/web-apps-publikationen/ghostwriting":
      "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting",
    "/digital/social-media-content": "/medien-ai/social-media",
    "/digital/content-social-media": "/medien-ai/social-media",
    "/digital/telefonassistenten": "/medien-ai/ki-telefon",
    "/digital/ki-telefonassistenten": "/medien-ai/ki-telefon",
    "/digital/ads": "/medien-ai/ads",
    "/digital/ki-werbung-meta-google": "/medien-ai/ads",
    "/expertise/ki-consulting":
      "/ki-beratung-weiterbildung/ki-beratung-unternehmen",
    "/expertise/ki-schulungen-consulting":
      "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter",
    "/expertise/academy": "/ki-beratung-weiterbildung/video-academy",
    "/expertise/ernaehrungsberatung": "/ki-beratung-weiterbildung",
    "/our-story": "/ueber-uns",
    "/originals/spiele": "/originals",
    "/originals/digitale-produkte": "/originals",
  };
  if (redirects[path]) return <RedirectPage to={redirects[path]} />;
  if (path === "/") return <HomePage />;
  if (path === "/web-apps-publikationen") return <HubPage type="web" />;
  if (path === "/medien-ai") return <HubPage type="media" />;
  if (path === "/ki-beratung-weiterbildung") return <HubPage type="advice" />;
  if (path === "/originals") return <HubPage type="originals" />;
  if (path === "/demowelten") return <LabPage />;
  if (path === "/paketfinder") return <PackageFinderPage />;
  if (path === "/qualitaet") return <QualityPage />;
  if (services[path]) return <ServicePage data={services[path]} />;
  if (
    path === "/ki-beratung-weiterbildung/video-academy" ||
    path.startsWith("/ki-beratung-weiterbildung/video-academy/")
  )
    return <AcademyPage />;
  if (path === "/originals/apps") return <OriginalAppsPage />;
  if (
    path === "/originals/apps/evofit" ||
    path === "/originals/apps/chelonaki-reply"
  )
    return <OriginalAppPage app={path.split("/").pop()} />;
  if (path.startsWith("/originals/"))
    return <OriginalDetail type={path.split("/").pop()} />;
  if (path === "/ueber-uns") return <AboutPage />;
  if (path === "/kontakt") return <ContactPage />;
  if (legalRoutes[path]) return <LegalPage viewKey={legalRoutes[path]} />;
  return <NotFound />;
}

export function App({ initialPath = "/", initialLocale = "de" }) {
  const [path, setPath] = useState(() =>
    typeof window === "undefined"
      ? initialPath
      : stripLanguageFromPath(
          window.location.pathname.replace(/\/$/, "") || "/",
        ),
  );
  const [menu, setMenu] = useState(false);
  const [chat, setChat] = useState(false);
  const [chatCompact, setChatCompact] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const chatAllowed = path !== "/kontakt" && !legalRoutes[path];
  useEffect(() => {
    if (chatAllowed) return;
    setChat(false);
    setChatCompact(false);
  }, [chatAllowed]);
  useEffect(() => {
    const update = () =>
      setPath(
        stripLanguageFromPath(
          window.location.pathname.replace(/\/$/, "") || "/",
        ),
      );
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  useLayoutEffect(() => {
    const decision = getCurrentLanguage();
    const locale = getLocale(decision.language || initialLocale);
    document.documentElement.lang = locale.htmlLang;
    document.documentElement.dir = locale.direction;
    document.documentElement.dataset.locale = locale.code;
    document.documentElement.dataset.localeSource = decision.source;
    document.documentElement.dataset.fontGroup = locale.fontGroup;
    if (!getLanguageFromUrl(window.location.pathname)) {
      const url = new URL(window.location.href);
      url.pathname = localizePath(url.pathname, locale.code);
      window.history.replaceState({}, "", url);
    }
    window.dispatchEvent(
      new CustomEvent("chelonaki:language-resolved", { detail: decision }),
    );
  }, [initialLocale]);
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [path]);
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFooterVisible(entry.isIntersecting),
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [path]);
  useEffect(() => {
    const routeNames = {
      "/": "Aus Ideen werden funktionierende Systeme",
      "/web-apps-publikationen": "Web, Apps & Publikationen",
      "/medien-ai": "Medien & KI",
      "/ki-beratung-weiterbildung": "KI-Beratung & Weiterbildung",
      "/originals": "Eigene Apps & Bücher",
      "/demowelten": "Designbeispiele",
      "/paketfinder": "Paketfinder",
      "/qualitaet": "Qualitätsrahmen",
      "/ueber-uns": "Über uns",
      "/kontakt": "Kontakt",
      "/impressum": "Impressum",
      "/datenschutz": "Datenschutzerklärung",
      "/datenschutzeinstellungen": "Datenschutz-Einstellungen",
      "/agb": "Allgemeine Geschäftsbedingungen",
      "/widerruf": "Widerrufsbelehrung",
      "/barrierefreiheit": "Barrierefreiheit",
    };
    const name =
      services[path]?.title || routeNames[path] || "Chelonaki Studio";
    document.title = `Chelonaki | ${name}`;
  }, [path]);
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const autoReveal = [
      ".service-index-card",
      ".problem-solution > div",
      ".platform-section > *",
      ".method-rail > li",
      ".pricing-grid > article",
      ".principle-grid > article",
      ".credentials > *",
      ".quality-grid > article",
      ".lab-grid > article",
      ".product-features article",
    ];
    document.querySelectorAll(autoReveal.join(",")).forEach((node, index) => {
      node.dataset.reveal = "";
      node.style.setProperty("--reveal-order", index % 6);
    });
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -5%" },
    );
    nodes.forEach((n) => observer.observe(n));
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(
          1,
          document.documentElement.scrollHeight - innerHeight,
        );
        document.documentElement.style.setProperty(
          "--page-scroll",
          Math.min(1, scrollY / max),
        );
        document.documentElement.style.setProperty(
          "--hero-scroll",
          Math.min(1, scrollY / Math.max(1, innerHeight)),
        );
      });
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      cancelAnimationFrame(frame);
    };
  }, [path]);
  return (
    <>
      <LocalTranslator path={path} />
      <a className="skip-link" href="#main">
        Zum Inhalt
      </a>
      <div id="top" />
      <Header
        path={path}
        openMenu={() => setMenu(true)}
        chatCompact={chatAllowed && chatCompact}
        chatOpen={chat}
        onOpenChat={() => {
          setChatCompact(false);
          setChat(true);
        }}
      />
      <MobileMenu
        open={menu}
        path={path}
        onClose={() => setMenu(false)}
        onOpenChat={
          chatAllowed
            ? () => {
                setMenu(false);
                setChat(true);
              }
            : null
        }
      />
      <RouteView path={path} />
      <Footer />
      {chatAllowed && (
        <ChatAssistant
          path={path}
          open={chat}
          setOpen={setChat}
          compact={chatCompact}
          setCompact={setChatCompact}
          footerVisible={footerVisible}
        />
      )}
    </>
  );
}
