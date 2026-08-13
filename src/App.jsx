import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Buildings, CaretDown, Check, EnvelopeSimple, GlobeHemisphereWest, List, LockKey, X } from "@phosphor-icons/react";
import { hubData, navigation, services, worlds } from "./siteData.js";
import translations from "./translations.generated.js";

const legalViews = {
  impressum: { label: "Rechtliche Angaben", title: "Impressum", content: <><p className="legal-lead">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p><h3>Anbieter</h3><p><mark>[VOLLSTÄNDIGER NAME ODER FIRMA]</mark><br/><mark>[RECHTSFORM]</mark><br/><mark>[LADUNGSFÄHIGE ANSCHRIFT]</mark><br/>Deutschland</p><h3>Vertretung und Kontakt</h3><p>Vertreten durch: <mark>[VERTRETUNGSBERECHTIGTE PERSON]</mark><br/>Telefon: <mark>[TELEFONNUMMER]</mark><br/>E-Mail: <mark>[E-MAIL-ADRESSE]</mark></p><h3>Register und Steuern</h3><p>Registergericht und Registernummer: <mark>[FALLS ZUTREFFEND]</mark><br/>Umsatzsteuer-ID: <mark>[FALLS VORHANDEN]</mark></p><p className="legal-note">Die Betreiberangaben sind vor dem öffentlichen Geschäftsstart zu vervollständigen.</p></> },
  datenschutz: { label: "Datensparsame Vorschau", title: "Datenschutzerklärung", content: <><p className="legal-lead">Diese Vorschau setzt keine optionalen Analyse- oder Marketing-Cookies ein. Reale Datenflüsse und Anbieter müssen vor Veröffentlichung ergänzt und geprüft werden.</p><h3>Verantwortlicher</h3><p><mark>[NAME ODER FIRMA, ANSCHRIFT UND KONTAKTDATEN]</mark></p><h3>Hosting</h3><p>Beim Aufruf können technisch erforderliche Verbindungsdaten verarbeitet werden. Anbieter, Region, Auftragsverarbeitung und Löschfrist: <mark>[ERGÄNZEN]</mark>.</p><h3>Sprachversionen</h3><p>Die angebotenen Sprachfassungen werden direkt von der Website bereitgestellt. Beim Sprachwechsel werden keine Inhalte an einen externen Übersetzungsdienst übermittelt. Die deutsche Fassung bleibt die inhaltliche Ausgangsversion.</p><h3>Kontaktaufnahme</h3><p>Übermittelte Angaben werden ausschließlich zur Bearbeitung der Anfrage verarbeitet. Diese Vorschau versendet noch keine Formulardaten.</p><h3>Ihre Rechte</h3><p>Nach Maßgabe der DSGVO bestehen insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.</p></> },
  cookies: { label: "Datenschutz-Einstellungen", title: "Cookies", content: <><p className="legal-lead">Aktuell sind keine optionalen Cookies oder Tracking-Dienste eingebunden.</p><div className="settings-row"><div><strong>Technisch notwendiger Betrieb</strong><p>Erforderlich für die sichere Auslieferung.</p></div><span><Check size={16}/> Aktiv</span></div><div className="settings-row is-muted"><div><strong>Analyse und Marketing</strong><p>Nicht eingebunden.</p></div><span>Inaktiv</span></div></> },
  barrierefreiheit: { label: "Zugängliche Gestaltung", title: "Barrierefreiheit", content: <><p className="legal-lead">Chelonaki soll unabhängig von Gerät und Eingabemethode gut nutzbar sein.</p><ul><li>Semantische Struktur und Tastaturbedienung</li><li>Sichtbare Fokuszustände und große Bedienflächen</li><li>Kontrastreiche Gestaltung und Bildalternativen</li><li>Reduzierte Bewegung bei Systemeinstellung</li><li>Responsive Darstellung ohne horizontales Scrollen</li></ul><p className="legal-note">Die konkrete BFSG-Anwendbarkeit wird vor einem B2C-Onlineshop gesondert geprüft.</p></> },
};

const labEntries = [
  { title: "Website Studio", status: "Konzept", area: "Web, Apps & Publikationen", text: "Kuratierte Designwelten, Desktop-/Mobilansichten und passende Shopify-Pakete.", href: "/web-apps-publikationen/websites-erstellen-lassen" },
  { title: "Content Studio", status: "Konzept", area: "Medien & KI", text: "Karussells, Kurzvideos, Captions und unterschiedliche Markentonalitäten.", href: "/medien-ai/social-media" },
  { title: "Ads Studio", status: "Konzept", area: "Medien & KI", text: "Creative-Vergleiche, Anzeigenvarianten und nachvollziehbare Testlogik.", href: "/medien-ai/ads" },
  { title: "Voice Lab", status: "In Vorbereitung", area: "Medien & KI", text: "Gesprächslogik, Terminübergabe und transparenter Einsatz eines KI-Assistenten.", href: "/medien-ai/ki-telefon" },
  { title: "App Lab", status: "Prototyp", area: "Web, Apps & Publikationen", text: "Klickbare Nutzerwege, Dashboards und Funktionsbausteine für neue Apps.", href: "/web-apps-publikationen/apps-entwickeln-lassen" },
  { title: "Book Lab", status: "Konzept", area: "Web, Apps & Publikationen", text: "Coverwelten, Ghostwriting, Probeseiten, Illustrationsstile und hochwertiger Buchsatz.", href: "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting" },
  { title: "Reply Lab", status: "In Entwicklung", area: "Medien & KI", text: "Drei editierbare Antwortvorschläge für LinkedIn, Instagram und E-Mail.", href: "/medien-ai/chelonaki-reply" },
  { title: "Video Academy Preview", status: "In Vorbereitung", area: "KI-Beratung & Weiterbildung", text: "KI-Videokurse, Lernmodule und begleitende Arbeitsmaterialien.", href: "/ki-beratung-weiterbildung/video-academy" },
  { title: "Originals Lab", status: "Prototyp", area: "Originals", text: "EvoFit, Chelonaki Reply und weitere Produkte mit offenem Entwicklungsstatus.", href: "/originals/apps" },
];

const qualityPrinciples = [
  ["Klarer Umfang", "Leistungen, Ausschlüsse, Korrekturrunden und Fremdkosten werden vor dem Start verständlich festgehalten."],
  ["Dokumentierte Freigabe", "Inhalte, Kampagnen, Gesprächslogiken und wesentliche Produktstände werden nicht ungeprüft veröffentlicht."],
  ["Menschliche KI-Kontrolle", "Plausibel klingende KI-Ausgaben werden geprüft, bevor sie zum Ergebnis werden."],
  ["Nachvollziehbare Quellen", "Wissenschaftliche und gesundheitliche Inhalte werden belegt und fachlich eingeordnet."],
  ["Datensparsame Systeme", "Daten und Zugriffe werden auf das beschränkt, was für den vereinbarten Zweck erforderlich ist."],
  ["Sicherheit nach Risiko", "Rollen, Tests, Backups und Monitoring richten sich nach dem tatsächlichen Schutzbedarf."],
  ["Transparente Drittanbieter", "Plattformen, Lizenzen, Abhängigkeiten und laufende Fremdkosten werden offen benannt."],
  ["Modular & übergabefähig", "Systeme bleiben nachvollziehbar, erweiterbar und dokumentiert übergebbar."],
  ["Echte Kennzeichnung", "Demo, Prototyp, eigenes Produkt und reale Referenz werden nicht irreführend vermischt."],
  ["Nutzen vor Komplexität", "Technologie kommt zum Einsatz, wenn sie Qualität, Bedienbarkeit oder Skalierbarkeit verbessert."],
];

const finderGoals = [
  ["website", "Website oder Shop", "Website Pro", "ab 2.500 € netto", "ca. 4–8 Wochen", "/web-apps-publikationen/websites-erstellen-lassen"],
  ["content", "Regelmäßig Content", "Content Basic", "500 € netto/Monat", "Onboarding ca. 1–3 Wochen", "/medien-ai/social-media"],
  ["ads", "Werbung schalten", "Ads Basic", "500 € netto/Monat", "Start ca. 1–3 Wochen", "/medien-ai/ads"],
  ["voice", "Anrufe unterstützen", "KI-Telefonassistent Basic", "ab 69 € netto/Monat", "ca. 1–4 Wochen", "/medien-ai/ki-telefon"],
  ["app", "App oder Software", "App MVP", "ab 4.900 € netto", "ca. 8–16 Wochen", "/web-apps-publikationen/apps-entwickeln-lassen"],
  ["book", "Wissen als Buch", "Book Starter", "ab 1.000 € netto", "ca. 4–8 Wochen", "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting"],
  ["ai", "KI-Strategie für ein Unternehmen", "KI-Consulting-Tag", "1.490 € netto", "Vorbereitung ca. 2–6 Wochen", "/ki-beratung-weiterbildung/ki-beratung-unternehmen"],
  ["training", "Mitarbeiter mit KI qualifizieren", "KI-Intensivworkshop", "2.290 € netto", "Vorbereitung ca. 2–6 Wochen", "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter"],
  ["academy", "KI flexibel per Video lernen", "Chelonaki Video Academy", "Zugang nach Freigabe", "In Vorbereitung", "/ki-beratung-weiterbildung/video-academy"],
  ["original", "Chelonaki Original", "Originals entdecken", "produktabhängig", "je Produktstatus", "/originals"],
  ["system", "Mehrere Leistungen verbinden", "System-Workshop", "individuelles Angebot", "nach kurzer Qualifizierung", "/kontakt?bereich=Mehrere+Leistungen"],
];

const languageOptions = [
  ["de", "Deutsch", "DE"], ["en", "English", "EN"], ["el", "Ελληνικά", "ΕΛ"], ["fr", "Français", "FR"], ["es", "Español", "ES"],
  ["tr", "Türkçe", "TR"], ["pl", "Polski", "PL"], ["nl", "Nederlands", "NL"], ["it", "Italiano", "IT"], ["pt", "Português", "PT"], ["ru", "Русский", "RU"], ["ar", "العربية", "AR"],
];
const languageUi = {
  de: ["Sprache", "Sprache auswählen"], en: ["Language", "Choose language"], el: ["Γλώσσα", "Επιλογή γλώσσας"], fr: ["Langue", "Choisir la langue"], es: ["Idioma", "Elegir idioma"],
  tr: ["Dil", "Dil seçin"], pl: ["Język", "Wybierz język"], nl: ["Taal", "Kies taal"], it: ["Lingua", "Scegli la lingua"], pt: ["Idioma", "Escolher idioma"], ru: ["Язык", "Выберите язык"], ar: ["اللغة", "اختر اللغة"],
};
const translatedTextNodes = new WeakMap();
const translatedAttributeNodes = new WeakMap();

function getSavedLanguage() {
  const saved = window.localStorage.getItem("chelonaki-language");
  return languageOptions.some(([code]) => code === saved) ? saved : "de";
}

function LanguagePicker({ mobile = false }) {
  const [language, setLanguage] = useState(() => getSavedLanguage());
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);
  useEffect(() => {
    const close = (event) => { if (!pickerRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  const changeLanguage = (next) => {
    window.localStorage.setItem("chelonaki-language", next);
    setLanguage(next);
    window.location.reload();
  };
  const current = languageOptions.find(([code]) => code === language) || languageOptions[0];
  const [languageLabel, chooseLabel] = languageUi[language] || languageUi.de;
  return <div ref={pickerRef} className={`language-picker notranslate ${mobile ? "is-mobile" : ""} ${open ? "is-open" : ""}`} translate="no"><button type="button" className="language-trigger" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open} aria-label={`${languageLabel}: ${current[1]}`}><GlobeHemisphereWest size={17}/><strong>{current[2]}</strong><CaretDown size={12}/></button>{open && <div className="language-options" role="listbox" aria-label={chooseLabel}>{languageOptions.map(([code, name, short]) => <button type="button" role="option" aria-selected={language === code} className={language === code ? "is-active" : ""} onClick={() => changeLanguage(code)} key={code}><span dir={code === "ar" ? "rtl" : "ltr"}>{name}</span><small>{short}</small>{language === code && <Check size={14}/>}</button>)}</div>}</div>;
}

function LocalTranslator({ path }) {
  useLayoutEffect(() => {
    const language = getSavedLanguage();
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    if (language === "de") return undefined;
    const dictionary = translations[language] || {};
    const entries = Object.entries(dictionary).filter(([key, value]) => key !== value && key.length > 2).sort((a, b) => b[0].length - a[0].length);
    const translate = (value) => {
      if (!value?.trim()) return value;
      const leading = value.match(/^\s*/)?.[0] || "";
      const trailing = value.match(/\s*$/)?.[0] || "";
      const core = value.trim();
      if (dictionary[core]) return `${leading}${dictionary[core]}${trailing}`;
      let next = core;
      for (const [source, target] of entries) if (next.includes(source)) next = next.split(source).join(target);
      return `${leading}${next}${trailing}`;
    };
    const translateNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentElement?.closest(".notranslate, script, style, noscript")) return;
        const previous = translatedTextNodes.get(node);
        if (previous?.language === language && previous.value === node.nodeValue) return;
        const next = translate(node.nodeValue);
        if (next !== node.nodeValue) node.nodeValue = next;
        translatedTextNodes.set(node, { language, value: next });
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE || node.matches(".notranslate, script, style, noscript") || node.closest(".notranslate")) return;
      const previousAttributes = translatedAttributeNodes.get(node);
      for (const attribute of ["placeholder", "title", "aria-label"]) if (node.hasAttribute(attribute)) {
        const current = node.getAttribute(attribute);
        if (previousAttributes?.language === language && previousAttributes.values?.[attribute] === current) continue;
        const next = translate(current);
        node.setAttribute(attribute, next);
        const record = translatedAttributeNodes.get(node) || { language, values: {} };
        record.language = language; record.values[attribute] = next; translatedAttributeNodes.set(node, record);
      }
      [...node.childNodes].forEach(translateNode);
    };
    const root = document.getElementById("root");
    translateNode(root);
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
      mutation.addedNodes.forEach(translateNode);
      if (mutation.type === "characterData") translateNode(mutation.target);
    }));
    observer.observe(root, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [path]);
  return null;
}

function SmartLink({ href, children, className = "", onNavigate, ...props }) {
  const internal = href?.startsWith("/");
  return <a href={href} className={className} {...props} onClick={(event) => {
    if (internal && !event.metaKey && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault(); window.history.pushState({}, "", href); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo({ top: 0, behavior: "instant" }); onNavigate?.();
    }
  }}>{children}</a>;
}

function Brand({ inverse = false, compact = false }) {
  return <SmartLink className={`brand ${inverse ? "is-inverse" : ""}`} href="/" aria-label="Chelonaki Startseite"><span className="brand-seal" aria-hidden="true"><img src="/assets/chelonaki-turtle-transparent.png" alt="" width="760" height="760"/></span><span className="brand-name"><strong>CHELONAKI</strong>{!compact && <small>WISDOM WEARS A SHELL</small>}</span></SmartLink>;
}

function Header({ openMenu, path }) {
  const [solid, setSolid] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  useEffect(() => { const onScroll = () => setSolid(window.scrollY > 24); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  const active = (group) => path === group.href || path.startsWith(`${group.href}/`);
  return <header className={`site-header ${solid ? "is-solid" : ""}`}><Brand/><nav className="desktop-nav" aria-label="Hauptnavigation">{navigation.map((group) => <div className={`nav-group ${group.items.length ? "" : "is-direct"} ${active(group) ? "is-active" : ""} ${openGroup === group.label ? "is-open" : ""}`} key={group.label} onMouseEnter={() => setOpenGroup(group.label)} onMouseLeave={() => setOpenGroup(null)} onFocus={() => setOpenGroup(group.label)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenGroup(null); }}><SmartLink href={group.href} aria-current={active(group) ? "page" : undefined} aria-expanded={group.items.length ? openGroup === group.label : undefined} onNavigate={() => setOpenGroup(null)}>{group.label}</SmartLink>{group.items.length > 0 && <div className="nav-panel"><SmartLink href={group.href} className="nav-overview" onNavigate={() => setOpenGroup(null)}>{group.label} entdecken <ArrowUpRight size={16}/></SmartLink>{group.items.map(([label, href]) => <SmartLink href={href} key={href} onNavigate={() => setOpenGroup(null)}>{label}</SmartLink>)}</div>}</div>)}<LanguagePicker/></nav><SmartLink className="button button-navy header-cta" href="/paketfinder">Passende Lösung finden <ArrowRight size={18}/></SmartLink><button className="menu-trigger" type="button" aria-label="Menü öffnen" onClick={openMenu}><List size={25}/></button></header>;
}

function MobileMenu({ open, onClose, path }) {
  const ref = useRef(null); const [expanded, setExpanded] = useState(null);
  useEffect(() => { if (!ref.current) return; if (open && !ref.current.open) ref.current.showModal(); if (!open && ref.current.open) ref.current.close(); }, [open]);
  const active = (href) => path === href || path.startsWith(`${href}/`);
  return <dialog ref={ref} className="mobile-menu" onClose={onClose} onCancel={(e) => { e.preventDefault(); onClose(); }}><div className="mobile-menu-shell"><div className="mobile-menu-head"><Brand inverse compact/><button type="button" onClick={onClose} aria-label="Menü schließen"><X size={24}/></button></div><nav aria-label="Mobile Navigation">{navigation.map((group) => <div className={`mobile-nav-group ${active(group.href) ? "is-active" : ""}`} key={group.label}><div><SmartLink href={group.href} aria-current={active(group.href) ? "page" : undefined} onNavigate={onClose}>{group.label}</SmartLink>{group.items.length > 0 && <button type="button" aria-label={`${group.label} Untermenü`} aria-expanded={expanded === group.label} onClick={() => setExpanded(expanded === group.label ? null : group.label)}><CaretDown size={20}/></button>}</div>{expanded === group.label && group.items.length > 0 && <div className="mobile-subnav">{group.items.map(([label, href]) => <SmartLink href={href} className={active(href) ? "is-active" : ""} aria-current={active(href) ? "page" : undefined} key={href} onNavigate={onClose}>{label}</SmartLink>)}</div>}</div>)}<LanguagePicker mobile/><SmartLink className={`mobile-about ${active("/qualitaet") ? "is-active" : ""}`} href="/qualitaet" onNavigate={onClose}>Qualität</SmartLink></nav><SmartLink className="button button-gold" href="/paketfinder" onNavigate={onClose}>Passende Lösung finden <ArrowRight size={18}/></SmartLink></div></dialog>;
}

function LegalDialog({ viewKey, onClose }) {
  const ref = useRef(null); const view = viewKey ? legalViews[viewKey] : null;
  useEffect(() => { if (!ref.current) return; if (view && !ref.current.open) ref.current.showModal(); if (!view && ref.current.open) ref.current.close(); }, [view]);
  return <dialog className="legal-dialog" ref={ref} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose(); }}>{view && <div className="legal-shell"><header><div><span>{view.label}</span><h2>{view.title}</h2></div><button type="button" onClick={onClose} aria-label="Schließen"><X size={24}/></button></header><div className="legal-content">{view.content}</div></div>}</dialog>;
}

function HomePage() {
  return <main id="main"><section className="hero home-hero" aria-labelledby="hero-title"><div className="hero-scene" aria-hidden="true"><img className="hero-scene-image" src="/assets/hero-architecture.png" alt="" width="1536" height="1024"/><figure className="hero-medallion"><img src="/assets/chelonaki-wall-medallion.webp" alt="" width="1200" height="1500"/></figure></div><div className="hero-copy"><span className="hero-kicker">KI-GESTÜTZTES INNOVATIONSSTUDIO</span><h1 id="hero-title">Aus Ihrer Idee<br/>wird ein System,<br/><em>das funktioniert.</em></h1><div className="hero-rule"><i/></div><p>Wir entwickeln Websites, Apps, Bücher, Content und intelligente Automatisierungen – von der klaren Strategie bis zum nutzbaren Ergebnis.</p><div className="hero-actions"><SmartLink className="button button-navy" href="/paketfinder">Passende Lösung finden <ArrowRight size={18}/></SmartLink><a className="text-link" href="#worlds">Leistungen entdecken <ArrowRight size={18}/></a></div></div><div className="hero-signature">Strategie · Gestaltung · Technologie · menschlich geprüft</div></section>
  <section className="home-proof" aria-label="Was Chelonaki entwickelt"><span>Websites & Shops</span><span>Apps & Software</span><span>Bücher & Ghostwriting</span><span>Medien & KI</span><span>KI-Beratung & Weiterbildung</span></section>
  <section className="worlds-section" id="worlds" aria-labelledby="worlds-title"><header className="worlds-heading" data-reveal><span>Ein Studio. Sechs klare Bereiche.</span><h2 id="worlds-title">Schneller verstehen,<br/><em>wo Ihr Projekt hingehört.</em></h2></header><div className="world-grid">{worlds.map((world) => <article className={`world-card ${world.tone}`} key={world.title} data-reveal><div className="world-number">{world.number}</div><figure><img src={world.image} alt="" loading="lazy" width="1536" height="1024"/></figure><span className="audience-label"><Buildings size={15}/>{world.eyebrow}</span><h3>{world.title}</h3><p>{world.text}</p><small>{world.detail}</small><SmartLink className="world-link" href={world.href}>{world.cta}<ArrowRight size={18}/></SmartLink></article>)}</div></section>
  <section className="principles-section"><div className="principles-intro"><span>Our standard</span><h2>Fortschritt braucht Haltung.</h2></div><div className="principle-grid">{[["Human responsibility", "KI unterstützt. Der Mensch entscheidet und verantwortet das Ergebnis."], ["Built to last", "Durchdachte Systeme und Inhalte statt kurzfristiger KI-Spielereien."], ["Knowledge in practice", "Wissenschaft, Erfahrung und Technologie werden konkret nutzbar."]].map(([title, text], i) => <article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><FinalCta/></main>;
}

function HubPage({ type }) {
  const data = hubData[type];
  return <main id="main"><section className={`page-hero page-hero-${type}`}><div><span className="audience-label"><Buildings size={15}/>{data.label}</span><h1>{data.title}</h1><p>{data.intro}</p><div className="page-hero-actions"><SmartLink className="button button-gold" href={`/kontakt?bereich=${type}`}>{data.cta}<ArrowRight size={18}/></SmartLink><SmartLink className="text-link text-link-light" href="/paketfinder">Passende Lösung finden <ArrowRight size={18}/></SmartLink></div></div><figure><img src={data.image} alt="Chelonaki Markenwelt" width="1536" height="1024"/></figure></section><section className="service-index"><header><span>Entdecken</span><h2>Womit möchten Sie beginnen?</h2></header><div>{data.cards.map((card, i) => <SmartLink className="service-index-card" href={card.href} key={card.href}><span>0{i+1}</span>{card.image && <figure><img src={card.image} alt="" loading="lazy" width="1536" height="1024"/></figure>}<h3>{card.title}</h3><p>{card.text}</p><ArrowUpRight size={21}/></SmartLink>)}</div></section>{type === "expertise" && <Credentials/>}<Process/><FinalCta label={data.cta}/></main>;
}

function ServicePage({ data }) {
  return <main id="main"><section className="service-hero"><div className="service-hero-copy"><span className="audience-label"><Buildings size={15}/>{data.label}</span><small>{data.area}</small><h1>{data.title}</h1><p>{data.intro}</p><div className="page-hero-actions"><SmartLink className="button button-gold" href={`/kontakt?bereich=${encodeURIComponent(data.bookingCta || data.cta)}`}>{data.bookingCta || data.cta}<ArrowRight size={18}/></SmartLink><SmartLink className="text-link text-link-light" href="/paketfinder">Paketfinder nutzen <ArrowRight size={18}/></SmartLink></div>{data.bookingCta && <p className="booking-status">Die direkte Shopify-Buchung wird nach Anlage der finalen Produkte und rechtlichen Freigaben aktiviert.</p>}</div><figure><img src={data.image || (data.area === "Digital" ? "/assets/project-digital-brand.png" : "/assets/chapter-architecture.webp")} alt={data.imageAlt || "Chelonaki Projektansicht"} width="1536" height="1024"/></figure></section><section className="problem-solution"><div><span>Ausgangssituation</span><h2>{data.problem}</h2></div><div><span>Die Lösung</span><ul>{data.solution.map((item) => <li key={item}><Check size={18}/>{item}</li>)}</ul></div></section>{data.insight && <section className="platform-section"><div><span>{data.insight.label}</span><h2>{data.insight.title}</h2><p>{data.insight.text}</p></div><ul>{data.insight.points.map((point) => <li key={point}><Check size={18}/>{point}</li>)}</ul></section>}<Process items={data.steps}/><ProjectReadiness data={data}/><Pricing data={data}/><FinalCta label={data.inquiryCta || data.cta}/></main>;
}

function ProjectReadiness({ data }) {
  const isApp = data.title.includes("App");
  const needs = isApp ? ["Zielgruppe und priorisierte Kernfunktionen", "Plattformen, Nutzerrollen und vorhandene Systeme", "Daten, Schnittstellen und Datenschutzanforderungen", "Branding, Testpersonen und zuständige Freigabe"] : ["Ziel, Zielgruppe und gewünschtes Ergebnis", "Vorhandene Inhalte, Zugänge und Markenmaterialien", "Rechtlich nutzbare Texte, Bilder und Daten", "Eine zuständige Person für gebündelte Freigaben"];
  return <section className="readiness-section"><div><span>Projektstart</span><h2>Was wir vor dem Start gemeinsam festlegen.</h2><p>Der verbindliche Zeitplan beginnt, sobald Umfang, Zahlung und die benötigten Grundlagen vollständig vorliegen. Die konkrete Laufzeit wird nach Prüfung bestätigt.</p></div><ul>{needs.map((item) => <li key={item}><Check size={18}/>{item}</li>)}</ul></section>;
}

function Pricing({ data }) {
  const [selected, setSelected] = useState(null);
  return <section className="pricing-section"><header><span>Paketpreise für Unternehmen</span><h2>Ein klarer Einstieg.<br/>Ein passender Projektumfang.</h2><p>Wählen Sie ein Paket, um dessen Umfang direkt mit allen anderen Optionen zu vergleichen.</p></header><div className={`pricing-grid ${data.pricing.length === 1 ? "is-single" : ""}`}>{data.pricing.map((tier) => <article className={`${tier.featured ? "featured" : ""} ${selected?.name === tier.name ? "is-selected" : ""}`} key={tier.name}>{tier.featured && <b>Häufig gewählt</b>}<h3>{tier.name}</h3><strong>{tier.price}</strong><p>{tier.meta}</p><button type="button" onClick={() => setSelected(tier)}>{data.bookingCta && tier.price !== "auf Anfrage" ? "Paket auswählen" : "Angebot prüfen"} <ArrowRight size={17}/></button></article>)}</div>{selected && <section className="package-comparison" aria-live="polite"><header><span>Ihre Auswahl</span><h3>{selected.name}</h3><p>{selected.meta}. Hier sehen Sie die Auswahl im direkten Vergleich, bevor Sie eine Anfrage vorbereiten.</p></header><div>{data.pricing.map((tier) => <article className={tier.name === selected.name ? "is-selected" : ""} key={tier.name}><small>{tier.name === selected.name ? "Ausgewählt" : "Alternative"}</small><h4>{tier.name}</h4><strong>{tier.price}</strong><p>{tier.meta}</p>{tier.featured && <b>Häufig gewählt</b>}</article>)}</div><div className="package-comparison-actions"><SmartLink className="button button-gold" href={`/kontakt?bereich=${encodeURIComponent(selected.name)}`}>Mit {selected.name} fortfahren <ArrowRight size={17}/></SmartLink><button className="text-link text-link-light" type="button" onClick={() => setSelected(null)}>Auswahl schließen</button></div></section>}<p className="pricing-note">{data.note}</p></section>;
}

function Process({ items = ["Ziel und Ausgangslage klären", "Frühen funktionierenden Stand zeigen", "Prüfen, freigeben und absichern", "Sauber übergeben und weiterentwickeln"] }) {
  return <section className="process-section"><div className="process-intro"><span>Arbeitsweise</span><h2>Von der Idee zur belastbaren Umsetzung.</h2></div><ol className="method-rail">{items.map((item, i) => <li key={item}><span>0{i+1}</span><h3>{item}</h3></li>)}</ol></section>;
}

function Credentials() {
  return <section className="credentials"><figure><img src="/assets/project-nutrition-venture.png" alt="Mediterrane Zutaten, Notizbuch und Produktkonzept"/></figure><div><span>Die fachliche Grundlage</span><h2>Wissenschaft, Küche, Technik und unternehmerische Praxis.</h2><p>Hinter Chelonaki steht Eleftherios Samouladas: gelernter Koch, studierter Ernährungswissenschaftler, zertifizierter Qualitätsmanagementbeauftragter und fachkundig im Lebensmittelrecht.</p><p>Er studierte außerdem mehrere Semester Informatik und programmiert selbst. Als Mietkoch arbeitete er in mehr als 500 Küchen in ganz Deutschland – vom klassischen Gastronomiebetrieb bis zur Sternegastronomie.</p><ul><li>500+ Küchen</li><li>Ernährungswissenschaft</li><li>Informatik & Entwicklung</li><li>Qualitätsmanagement</li><li>Lebensmittelrecht</li></ul></div></section>;
}

function AcademyPage() {
  return <main id="main"><section className="service-hero"><div className="service-hero-copy"><span className="audience-label"><Buildings size={15}/>KI-Beratung & Weiterbildung</span><small>Chelonaki Video Academy</small><h1>KI-Wissen lernen, wenn es in Ihren Alltag passt.</h1><p>Strukturierte Videokurse führen Schritt für Schritt von den Grundlagen zu anwendbaren Workflows – mit Beispielen, Vorlagen und klaren Qualitätsregeln.</p><div className="page-hero-actions"><SmartLink className="button button-gold" href="/kontakt?bereich=Chelonaki%20Video%20Academy">Zugang vormerken <ArrowRight size={18}/></SmartLink></div></div><figure><img src="/assets/service-training-v2.webp" alt="Praxisnahe KI-Schulung in einer kleinen, konzentrierten Arbeitsgruppe" width="1536" height="1024"/></figure></section><section className="choice-grid"><article><span>Für Mitarbeiter und professionelle Anwender</span><h2>KI-Videokurse</h2><p>Werkzeuge sinnvoll auswählen, wirksam prompten, Ergebnisse prüfen, Abläufe automatisieren und verantwortungsvoll freigeben.</p></article><article><span>Lernweg mit Praxisbezug</span><h2>Vom Modul zur Anwendung</h2><p>Kurze Lerneinheiten, konkrete Übungen, wiederverwendbare Vorlagen und verständliche Zusammenfassungen unterstützen den Transfer.</p></article></section><section className="release-note"><strong>In Vorbereitung</strong><p>Kursumfang, Verkauf, Lernkontrollen, Teilnahmebestätigungen und mögliche Zertifikate werden vor Freigabe abschließend festgelegt und rechtlich geprüft.</p></section><FinalCta label="Video Academy vormerken"/></main>;
}

function LabPage() {
  const [saved, setSaved] = useState(() => { try { return JSON.parse(localStorage.getItem("chelonaki-lab") || "[]"); } catch { return []; } });
  const toggle = (title) => setSaved((current) => { const next = current.includes(title) ? current.filter((item) => item !== title) : [...current, title]; localStorage.setItem("chelonaki-lab", JSON.stringify(next)); return next; });
  return <main id="main"><section className="lab-hero"><div><span>Chelonaki Lab</span><h1>Nicht nur erklären.<br/>Ausprobieren.</h1><p>Hier werden Websites, Apps, Inhalte, Assistenten, Bücher und digitale Produkte erlebbar, bevor Sie ein Paket auswählen oder ein Projekt anfragen.</p><div className="page-hero-actions"><a className="button button-gold" href="#lab-demos">Demos entdecken <ArrowRight size={18}/></a><SmartLink className="text-link text-link-light" href="/paketfinder">Passende Lösung finden <ArrowRight size={18}/></SmartLink></div></div><div className="lab-hero-side"><figure><img src="/assets/service-apps-v2.webp" alt="App-Prototypen, Ablaufkarten und Geräte in einer warmen Entwicklungsumgebung" width="1536" height="1024"/></figure><aside><strong>{String(saved.length).padStart(2, "0")}</strong><span>Ideen in Ihrer Merkliste</span><p>Die Auswahl bleibt nur auf diesem Gerät und ist noch keine Bestellung.</p></aside></div></section><section className="lab-grid-section" id="lab-demos"><header><span>Demo-Welten</span><h2>Ein ehrlicher Blick auf Ideen und Prototypen.</h2><p>Jeder Eintrag zeigt klar, ob es sich um ein Konzept, einen Prototyp oder ein Produkt in Entwicklung handelt. Es werden keine erfundenen Kundenreferenzen gezeigt.</p></header><div className="lab-grid">{labEntries.map((entry, i) => <article key={entry.title}><div className="lab-card-meta"><span>{entry.status}</span><small>{entry.area}</small></div><strong>0{i + 1}</strong><h3>{entry.title}</h3><p>{entry.text}</p><div><SmartLink href={entry.href}>Bereich öffnen <ArrowUpRight size={17}/></SmartLink><button type="button" aria-pressed={saved.includes(entry.title)} onClick={() => toggle(entry.title)}>{saved.includes(entry.title) ? "Gemerkt" : "Merken"}</button></div></article>)}</div></section><section className="lab-transfer"><div><span>Ihre Auswahl</span><h2>Gefunden, was zu Ihrer Idee passt?</h2><p>{saved.length ? `${saved.length} Demo-Welt${saved.length === 1 ? " ist" : "en sind"} vorgemerkt. Im Paketfinder können Sie daraus den passenden nächsten Schritt ableiten.` : "Merken Sie interessante Richtungen oder starten Sie direkt mit Ihrem Ziel im Paketfinder."}</p></div><SmartLink className="button button-gold" href="/paketfinder">Auswahl übernehmen <ArrowRight size={18}/></SmartLink></section></main>;
}

function PackageFinderPage() {
  const [goal, setGoal] = useState(""); const [audience, setAudience] = useState(""); const [scope, setScope] = useState(""); const [timing, setTiming] = useState("");
  const selected = finderGoals.find(([key]) => key === goal);
  const step = !goal ? 1 : !audience ? 2 : !scope ? 3 : !timing ? 4 : 5;
  const reset = () => { setGoal(""); setAudience(""); setScope(""); setTiming(""); };
  const back = () => { if (step === 2) setGoal(""); else if (step === 3) setAudience(""); else if (step === 4) setScope(""); else if (step === 5) setTiming(""); };
  return <main id="main"><section className="finder-page"><header><span>Intelligenter Paketfinder</span><h1>In wenigen Schritten zur passenden Chelonaki-Lösung.</h1><p>Der Finder übersetzt Ziel, Ausgangslage, Umfang und Zeitrahmen in eine verständliche Empfehlung. Kontaktdaten werden nicht abgefragt.</p><div className="finder-progress"><i style={{width: `${step * 20}%`}}/><small>{step === 5 ? "Empfehlung" : `Schritt ${step} von 4`}</small></div>{step > 1 && <button className="finder-back" type="button" onClick={back}>← Eine Frage zurück</button>}</header><div className="finder-panel">{step === 1 && <FinderQuestion title="Was möchten Sie erreichen?" options={finderGoals.map(([value, label]) => [value, label])} onSelect={setGoal}/>} {step === 2 && <FinderQuestion title="Für wen ist die Lösung gedacht?" options={[["business", "Unternehmen oder Team"], ["founder", "Gründung oder eigene Produktidee"], ["private", "Privates Vorhaben"]]} onSelect={setAudience}/>} {step === 3 && <FinderQuestion title="Welcher Umfang passt zu Ihrem Start?" options={[["entry", "Klarer, kleiner Einstieg"], ["core", "Belastbares Kernprodukt"], ["custom", "Individuelle oder komplexe Lösung"]]} onSelect={setScope}/>} {step === 4 && <FinderQuestion title="Wann möchten Sie starten?" options={[["soon", "So bald wie möglich"], ["quarter", "In 1–3 Monaten"], ["later", "Später oder noch offen"]]} onSelect={setTiming}/>} {step === 5 && selected && <FinderResult selected={selected} scope={scope} audience={audience} timing={timing} onReset={reset}/>}</div></section></main>;
}

function FinderQuestion({ title, options, onSelect }) {
  return <section className="finder-question"><span>Ihre Auswahl</span><h2>{title}</h2><div>{options.map(([value, label], i) => <button type="button" key={value} onClick={() => onSelect(value)}><small>{String(i + 1).padStart(2, "0")}</small><strong>{label}</strong><ArrowRight size={19}/></button>)}</div></section>;
}

function FinderResult({ selected, scope, audience, timing, onReset }) {
  const [, label, recommendation, price, duration, href] = selected;
  const custom = scope === "custom";
  return <section className="finder-result"><span>Ihre Empfehlung</span><h2>{custom ? "Individuelle Lösung mit Discovery" : recommendation}</h2><p>Für „{label}“ und den gewählten Umfang ist das der sinnvollste Einstieg. {audience === "private" ? "Vor einer Beauftragung werden Zielgruppe und korrekte Endpreisdarstellung geprüft." : "Leistungsumfang und Nettopreis werden vor dem Start verbindlich festgehalten."}</p><dl><div><dt>Preisrahmen</dt><dd>{custom ? "nach qualifizierter Ersteinschätzung" : price}</dd></div><div><dt>Orientierung</dt><dd>{custom ? "Zeitplan nach Discovery" : duration}</dd></div><div><dt>Start</dt><dd>{timing === "soon" ? "priorisierte Verfügbarkeit prüfen" : timing === "quarter" ? "für die nächsten 1–3 Monate planen" : "unverbindlich vorbereiten"}</dd></div></dl><div className="finder-actions"><SmartLink className="button button-gold" href={custom ? `/kontakt?bereich=${encodeURIComponent(label)}` : href}>{custom ? "Projekt besprechen" : "Empfehlung ansehen"}<ArrowRight size={18}/></SmartLink><button className="text-link text-link-light" type="button" onClick={onReset}>Neu starten</button></div><small className="finder-disclaimer">Die Empfehlung ist eine unverbindliche Orientierung. Der verbindliche Umfang ergibt sich aus Produktbeschreibung oder individuellem Angebot.</small></section>;
}

function QualityPage() {
  return <main id="main"><section className="quality-hero"><div><span>Chelonaki Qualitätsrahmen</span><h1>KI beschleunigt.<br/>Verantwortung bleibt menschlich.</h1><p>Klare Leistungsgrenzen, fachliche Prüfung, sichere technische Entscheidungen und nachvollziehbare Freigaben bilden den gemeinsamen Standard aller Chelonaki-Projekte.</p></div><figure><img src="/assets/service-consulting-v2.webp" alt="Gemeinsame Prüfung von Prozessen und Entscheidungen in einer nahbaren Beratungssituation" width="1536" height="1024"/></figure></section><section className="quality-grid">{qualityPrinciples.map(([title, text], i) => <article key={title}><span>{String(i + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>)}</section><section className="enterprise-section"><div><span>Enterprise-orientierte Anhebung</span><h2>Mehr Schutz, wenn das Projekt ihn braucht.</h2><p>Für anspruchsvollere Systeme kann ein gesonderter Architektur- und Sicherheitsrahmen vereinbart werden. Maßgeblich bleibt immer der konkret dokumentierte Leistungskatalog – nicht ein pauschales Sicherheitsversprechen.</p></div><ul>{["Rollen, Rechte und getrennte Umgebungen", "Code-Reviews, automatisierte Tests und CI/CD", "Secrets-Management, Audit-Logging und Monitoring", "Backup-, Restore- und Reaktionskonzept"].map((item) => <li key={item}><Check size={18}/>{item}</li>)}</ul></section><FinalCta label="Qualitätsrahmen besprechen"/></main>;
}

function OriginalAppsPage() {
  return <main id="main"><section className="original-hero"><div className="original-hero-copy"><span className="audience-label">Von Eleftherios entwickelt</span><h1>Eigene Apps mit einer persönlichen Handschrift.</h1><p>Diese Anwendungen sind keine Kundenaufträge. Eleftherios hat sie aus eigenen Ideen konzipiert und programmiert – für Ernährung, Fitness, Lernen, Kommunikation und einen leichteren Alltag.</p></div><figure><img src="/assets/project-nutrition-venture.png" alt="Ernährungs- und Produktentwicklung mit Notizbuch, mediterranen Zutaten und Modell" width="1536" height="1024"/></figure></section><section className="product-pair"><SmartLink href="/originals/apps/evofit"><span>Eigene App · Prototyp</span><h2>Chelonaki EvoFit</h2><p>Trainingsplanung, Ernährung, Rezepte, Einkauf, Challenges und langfristige Motivation in einer verbundenen Welt.</p><ArrowUpRight size={22}/></SmartLink><SmartLink href="/originals/apps/chelonaki-reply"><span>Eigene App · In Entwicklung</span><h2>Chelonaki Reply</h2><p>Drei passende Antwortvorschläge für LinkedIn, Instagram und E-Mail – mit menschlicher Freigabe als letztem Schritt.</p><ArrowUpRight size={22}/></SmartLink></section></main>;
}

function OriginalAppPage({ app }) {
  const reply = app === "chelonaki-reply";
  const data = reply ? { name: "Chelonaki Reply", title: "Drei passende Antworten. Sie wählen die richtige.", intro: "Schneller, konsistenter und persönlicher auf Nachrichten reagieren – ohne die Kontrolle über Ton und Inhalt abzugeben.", features: ["Drei unterscheidbare Vorschläge", "LinkedIn, Instagram und E-Mail", "Professionell, herzlich, kurz oder vertriebsorientiert", "Bearbeiten und kopieren vor dem Senden", "Markenbegriffe und No-Go-Aussagen", "Menschliche Freigabe als letzter Schritt"] } : { name: "Chelonaki EvoFit", title: "Ernährung und Training, die langfristig in den Alltag passen.", intro: "EvoFit verbindet Planung, Rezepte, Einkauf, Training, Gesundheitswissen, Challenges und spielerische Motivation.", features: ["Personalisierte Trainings- und Ernährungsbereiche", "Rezepte, Einkauf und Wochenplanung", "Fortschritt verständlich darstellen", "Challenges und Schildkröten-Gamification", "Verantwortungsvoller Umgang mit Gesundheitsdaten", "App-, Web- und Beratungsbausteine verbinden"] };
  return <main id="main"><section className="product-hero"><div><span>Chelonaki Original · {reply ? "In Entwicklung" : "Prototyp"}</span><h1>{data.title}</h1><p>{data.intro}</p><SmartLink className="button button-gold" href={`/kontakt?bereich=${encodeURIComponent(data.name)}`}>{reply ? "Frühen Zugang vormerken" : "Testzugang vormerken"}<ArrowRight size={18}/></SmartLink></div><figure><img src={reply ? "/assets/service-content-v2.webp" : "/assets/project-nutrition-venture.png"} alt={reply ? "Geordnete Kommunikationsplanung mit Smartphone und Inhaltskarten" : "Ernährungs- und Produktkonzept mit Notizbuch und mediterranen Zutaten"} width="1536" height="1024"/></figure></section><section className="product-features"><header><span>Geplanter Kern</span><h2>{reply ? "Hilft beim Antworten. Entscheidet nicht für Sie." : "Ein klarer Weg vom Ziel zum Fortschritt."}</h2></header><div>{data.features.map((item, i) => <article key={item}><span>0{i + 1}</span><p>{item}</p></article>)}</div></section><section className="release-note"><strong>{reply ? "MVP-Grenze" : "Entwicklungsstatus"}</strong><p>{reply ? "Die erste Version sendet keine Nachrichten unbeaufsichtigt. Direkte Integrationen werden nur über zulässige Schnittstellen umgesetzt." : "Funktionen, Datenschutzkonzept und Plattformfreigaben werden vor einem öffentlichen Test verbindlich festgelegt."}</p></section></main>;
}

function OriginalDetail({ type }) {
  const map = { buecher: ["Von Eleftherios geschriebene Bücher", "Hier stehen nicht Buchprojekte für Kunden, sondern die eigenen Werke von Eleftherios: Fach-, Koch- und Kinderbücher zu Ernährung, Gesundheit und besonderen Stoffwechselerkrankungen – fundiert, verständlich und für unterschiedliche Altersgruppen geschrieben.", ["Eigene Fachbücher", "Eigene Koch- und Rezeptbücher", "Eigene illustrierte Kinderbücher", "Eigene Comics und Lernabenteuer"]], apps: ["Von Eleftherios entwickelte Apps", "Eigene, von Eleftherios konzipierte und programmierte digitale Werkzeuge, die Training, Ernährung, Rezepte, Planung und Motivation sinnvoll miteinander verbinden.", ["Chelonaki EvoFit", "Eigene Ernährungs- und Fitness-Apps", "Eigene KI-gestützte Alltagsassistenten", "Persönlich entwickelte Produktideen"]] }; const data = map[type];
  if (!data) return <NotFound/>;
  return <main id="main"><section className="original-hero"><div className="original-hero-copy"><span className="audience-label">Eleftherios · Eigenes Werk</span><h1>{data[0]}</h1><p>{data[1]}</p><div>{data[2].map((item) => <span key={item}>{item}</span>)}</div><SmartLink className="button button-gold" href={`/kontakt?bereich=${encodeURIComponent(data[0])}`}>Warteliste & Partnerschaft <ArrowRight size={18}/></SmartLink></div><figure><img src={type === "buecher" ? "/assets/service-books-v2.webp" : "/assets/project-nutrition-venture.png"} alt={type === "buecher" ? "Persönliche Buchentwicklung mit Manuskript, Blindband und handwerklichen Werkzeugen" : "Eigene App- und Produktentwicklung rund um Ernährung und Alltag"} width="1536" height="1024"/></figure></section><section className="release-note"><strong>Eigene Werke & Entwicklungsstände</strong><p>Originals zeigt veröffentlichte, geplante und kommende eigene Produkte von Eleftherios. Medizinische und ernährungsbezogene Inhalte werden quellenbasiert erstellt und vor Veröffentlichung fachlich geprüft.</p></section></main>;
}

function AboutPage() {
  return <main id="main"><section className="story-page-hero"><figure><img src="/assets/chelonaki-wall-medallion.webp" alt="Chelonaki Familienwappen als Schildkrötenrelief"/></figure><div><span>Über Chelonaki</span><h1>Wissen aus Erfahrung. Technologie mit Verantwortung.</h1><p>Hinter Chelonaki steht Eleftherios Samouladas – Ernährungswissenschaftler, gelernter Koch, Produktentwickler, Programmierer und Gründer.</p></div></section><Credentials/><section className="technology-section"><header><span>Technische Kompetenz</span><h2>Der Stack folgt dem Problem. Nicht dem Trend.</h2><p>Technische Möglichkeiten werden nicht nur aus Anwendersicht bewertet. Anforderungen, Datenflüsse, Schnittstellen und Risiken werden gemeinsam mit der Umsetzung gedacht.</p></header><div>{[["Web & Shopify", "HTML · CSS · JavaScript · TypeScript · Shopify Liquid · React · Next.js · Astro"], ["Apps", "Flutter · React Native · iOS · Android · plattformübergreifende Entwicklung"], ["Backend & Daten", "Node.js · Python · Java · SQL · PostgreSQL · Supabase · Firebase · APIs · Webhooks"], ["Qualität & Betrieb", "Git · Tests · CI/CD · Container · Rollen · Logging · Monitoring · Backups"]].map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div><small>Die Liste zeigt mögliche Werkzeuge, keine pauschale Zusage für jedes Paket. Bei Spezialgebieten können ausgewählte Fachleute eingebunden werden.</small></section><section className="about-foundations"><header><span>Vier Grundlagen</span><h2>Worauf unsere Arbeit aufbaut.</h2></header><div>{[["Wissenschaft", "Entscheidungen und Inhalte werden quellenbasiert und fachlich nachvollziehbar entwickelt."], ["Praxis", "Erfahrung aus mehr als 500 Küchen trifft auf reale Abläufe, Menschen und Qualitätsanforderungen."], ["Technologie", "KI und digitale Systeme werden gezielt eingesetzt, wenn sie Qualität, Verständlichkeit oder Effizienz verbessern."], ["Verantwortung", "KI unterstützt. Wesentliche Entscheidungen, Freigaben und Ergebnisse bleiben menschlich verantwortet."]].map(([title, text], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section><article className="story-article"><span className="section-eyebrow">Die Geschichte hinter dem Namen</span><p className="story-lead">Als unser Großvater Georgios gemeinsam mit meinem Bruder und mir durch sein Dorf ging, sagten die Menschen liebevoll: „Da ist er ja – der Georgios mit seinen kleinen Schildkröten.“</p><p>Aus diesem Spitznamen wurde unser Familienwappen. Aus dem Familienwappen wurde viele Jahre später Chelonaki.</p><p>Die Schildkröte steht für uns nicht für Langsamkeit. Sie verkörpert Weisheit, Langlebigkeit, Schutz, Beständigkeit und die Fähigkeit, den eigenen Weg mit Ruhe und Überzeugung zu gehen.</p><blockquote>Wisdom wears a shell.</blockquote><p>Der Claim erinnert daran, dass echte Intelligenz Erfahrung, Schutz, Verantwortung und ein stabiles Fundament braucht.</p></article><FinalCta label="Projekt mit Eleftherios besprechen"/></main>;
}

function ContactPage() {
  const [state, setState] = useState("idle"); const [errors, setErrors] = useState({}); const privacyId = useId(); const query = new URLSearchParams(window.location.search).get("bereich") || "";
  const submit = (e) => { e.preventDefault(); const data = new FormData(e.currentTarget); const next = {}; if (!data.get("name")?.trim()) next.name = true; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.get("email") || "")) next.email = true; if (!data.get("focus")) next.focus = true; if ((data.get("message") || "").trim().length < 20) next.message = true; if (!data.get("privacy")) next.privacy = true; setErrors(next); if (!Object.keys(next).length) setTimeout(() => setState("success"), 500); };
  return <main id="main"><section className="contact-page"><div className="contact-copy"><span>Projekt, Beratung oder Produktanfrage</span><h1>Was möchten Sie mit Chelonaki aufbauen?</h1><p>Wählen Sie den passenden Bereich. Danach fragen wir nur die Informationen ab, die für Ihr Vorhaben wirklich relevant sind.</p><SmartLink className="text-link text-link-light" href="/paketfinder">Erst die passende Lösung finden <ArrowRight size={18}/></SmartLink><div className="contact-promise"><LockKey size={22}/><span><strong>Qualifizierte Anfrage</strong>Eine Anfrage ist noch keine Auftragsannahme. Diese Vorschau versendet noch keine Daten.</span></div></div><div className="contact-panel">{state === "success" ? <div className="form-result"><Check size={36}/><h2>Die Anfrage ist vorbereitet.</h2><p>Der sichere Versand wird nach Ergänzung der finalen Unternehmens- und Datenschutzangaben angebunden.</p><button className="text-link text-link-light" onClick={() => setState("idle")}>Neue Anfrage <ArrowRight size={18}/></button></div> : <form noValidate onSubmit={submit}><div className="field-pair"><label><span>Name *</span><input name="name" autoComplete="name" aria-invalid={errors.name}/>{errors.name && <small className="field-error">Bitte Namen eingeben.</small>}</label><label><span>E-Mail *</span><input name="email" type="email" autoComplete="email" aria-invalid={errors.email}/>{errors.email && <small className="field-error">Bitte E-Mail prüfen.</small>}</label></div><div className="field-pair"><label><span>Unternehmen oder Projekt (optional)</span><input name="company" autoComplete="organization"/></label><label><span>Gewünschte Leistung *</span><select name="focus" defaultValue={query} aria-invalid={errors.focus}><option value="" disabled>Bitte wählen</option><option>Digitalprojekt</option><option>Bücher erstellen lassen & Ghostwriting</option><option>KI-Beratung für Unternehmen</option><option>KI-Schulungen & Workshops für Mitarbeiter</option><option>Chelonaki Video Academy</option><option>Partnerschaft oder Originals</option>{query && <option>{query}</option>}</select>{errors.focus && <small className="field-error">Bitte Bereich wählen.</small>}</label></div><div className="field-pair"><label><span>Budgetrahmen</span><select name="budget" defaultValue=""><option value="">Noch offen</option><option>bis 1.500 €</option><option>1.500–3.000 €</option><option>3.000–6.000 €</option><option>über 6.000 €</option></select></label><label><span>Gewünschter Start</span><select name="start" defaultValue=""><option value="">Noch offen</option><option>so bald wie möglich</option><option>in 1–3 Monaten</option><option>in 3–6 Monaten</option><option>später</option></select></label></div><label><span>Ziel und Ausgangslage *</span><textarea name="message" rows="5" aria-invalid={errors.message}/>{errors.message && <small className="field-error">Bitte mindestens 20 Zeichen schreiben.</small>}</label><label className="privacy-field" htmlFor={privacyId}><input id={privacyId} type="checkbox" name="privacy" aria-invalid={errors.privacy}/><span>Ich habe die Datenschutzhinweise zur Bearbeitung meiner Anfrage zur Kenntnis genommen. *</span></label>{errors.privacy && <small className="field-error">Bitte bestätigen.</small>}<button className="button button-gold submit-button" type="submit">Anfrage vorbereiten <ArrowUpRight size={18}/></button></form>}</div></section></main>;
}

function FinalCta({ label = "Projekt besprechen" }) { return <section className="final-cta"><span>What should we build together?</span><h2>Ob digitales System, fachliches Projekt oder neue Produktidee – wir entwickeln den passenden Weg.</h2><SmartLink className="button button-gold" href="/kontakt">{label}<ArrowRight size={18}/></SmartLink></section>; }

function Footer({ openLegal }) {
  return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Brand inverse/><p>Digitale Systeme. Starke Inhalte. Echtes Wissen.</p><SmartLink href="/ueber-uns">Über uns & unsere Geschichte <ArrowRight size={16}/></SmartLink><SmartLink href="/demowelten">Demowelten <ArrowRight size={16}/></SmartLink><SmartLink href="/qualitaet">Qualitätsrahmen <ArrowRight size={16}/></SmartLink></div><div className="footer-navigation">{navigation.slice(0,4).map((group) => <div key={group.label}><span>{group.label}</span><SmartLink href={group.href}>Übersicht</SmartLink>{group.items.slice(0,3).map(([label, href]) => <SmartLink href={href} key={href}>{label}</SmartLink>)}</div>)}</div><SmartLink className="footer-contact" href="/paketfinder"><EnvelopeSimple size={24}/><span><small>Noch unsicher?</small><strong>Passende Lösung finden</strong></span><ArrowUpRight size={22}/></SmartLink></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Chelonaki</span><div>{Object.entries(legalViews).map(([key, view]) => <button key={key} type="button" onClick={() => openLegal(key)}>{view.title}</button>)}</div><a href="#top">Nach oben <ArrowUpRight size={16}/></a></div></footer>;
}

function RedirectPage({ to }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.history.replaceState({}, "", to);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [to]);
  return <main id="main"><section className="not-found"><span>Weiterleitung</span><h1>Die Seite hat einen neuen Namen.</h1></section></main>;
}

function NotFound() { return <main id="main"><section className="not-found"><span>404</span><h1>Diese Seite trägt ihre Idee noch im Panzer.</h1><SmartLink className="button button-gold" href="/">Zur Startseite</SmartLink></section></main>; }

function RouteView({ path }) {
  const redirects = { "/digital": "/web-apps-publikationen", "/expertise": "/ki-beratung-weiterbildung", "/beratung-schulung": "/ki-beratung-weiterbildung", "/beratung-schulung/ki-consulting": "/ki-beratung-weiterbildung/ki-beratung-unternehmen", "/beratung-schulung/ki-schulungen": "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter", "/beratung-schulung/workshops": "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter", "/beratung-schulung/academy": "/ki-beratung-weiterbildung/video-academy", "/beratung-schulung/academy/ki": "/ki-beratung-weiterbildung/video-academy", "/beratung-schulung/academy/ernaehrung": "/ki-beratung-weiterbildung/video-academy", "/beratung-schulung/ernaehrungsberatung": "/ki-beratung-weiterbildung", "/beratung-schulung/ernaehrungsberatung/unternehmen": "/ki-beratung-weiterbildung", "/beratung-schulung/ernaehrungsberatung/privat": "/ki-beratung-weiterbildung", "/lab": "/demowelten", "/digital/websites-shopify": "/web-apps-publikationen/websites-erstellen-lassen", "/digital/websites-erstellen-lassen": "/web-apps-publikationen/websites-erstellen-lassen", "/digital/apps-software": "/web-apps-publikationen/apps-entwickeln-lassen", "/digital/buchproduktion-ghostwriting": "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting", "/web-apps-publikationen/buecher-erstellen-lassen": "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting", "/web-apps-publikationen/ghostwriting": "/web-apps-publikationen/buecher-erstellen-lassen-ghostwriting", "/digital/social-media-content": "/medien-ai/social-media", "/digital/content-social-media": "/medien-ai/social-media", "/digital/telefonassistenten": "/medien-ai/ki-telefon", "/digital/ki-telefonassistenten": "/medien-ai/ki-telefon", "/digital/ads": "/medien-ai/ads", "/digital/ki-werbung-meta-google": "/medien-ai/ads", "/expertise/ki-consulting": "/ki-beratung-weiterbildung/ki-beratung-unternehmen", "/expertise/ki-schulungen-consulting": "/ki-beratung-weiterbildung/ki-schulungen-workshops-mitarbeiter", "/expertise/academy": "/ki-beratung-weiterbildung/video-academy", "/expertise/ernaehrungsberatung": "/ki-beratung-weiterbildung", "/our-story": "/ueber-uns", "/originals/spiele": "/originals", "/originals/digitale-produkte": "/originals" };
  if (redirects[path]) return <RedirectPage to={redirects[path]}/>; if (path === "/") return <HomePage/>; if (path === "/web-apps-publikationen") return <HubPage type="web"/>; if (path === "/medien-ai") return <HubPage type="media"/>; if (path === "/ki-beratung-weiterbildung") return <HubPage type="advice"/>; if (path === "/originals") return <HubPage type="originals"/>; if (path === "/demowelten") return <LabPage/>; if (path === "/paketfinder") return <PackageFinderPage/>; if (path === "/qualitaet") return <QualityPage/>; if (services[path]) return <ServicePage data={services[path]}/>; if (path === "/ki-beratung-weiterbildung/video-academy" || path.startsWith("/ki-beratung-weiterbildung/video-academy/")) return <AcademyPage/>; if (path === "/originals/apps") return <OriginalAppsPage/>; if (path === "/originals/apps/evofit" || path === "/originals/apps/chelonaki-reply") return <OriginalAppPage app={path.split("/").pop()}/>; if (path.startsWith("/originals/")) return <OriginalDetail type={path.split("/").pop()}/>; if (path === "/ueber-uns") return <AboutPage/>; if (path === "/kontakt") return <ContactPage/>; return <NotFound/>;
}

export function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, "") || "/"); const [menu, setMenu] = useState(false); const [legal, setLegal] = useState(null);
  useEffect(() => { const update = () => setPath(window.location.pathname.replace(/\/$/, "") || "/"); window.addEventListener("popstate", update); return () => window.removeEventListener("popstate", update); }, []);
  useEffect(() => { document.title = path === "/" ? "Chelonaki | Wisdom wears a shell" : `Chelonaki | ${path.split("/").filter(Boolean).pop()?.replaceAll("-", " ") || "Studio"}`; }, [path]);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoReveal = [".service-index-card", ".problem-solution > div", ".platform-section > *", ".method-rail > li", ".pricing-grid > article", ".principle-grid > article", ".credentials > *", ".quality-grid > article", ".lab-grid > article", ".product-features article"];
    document.querySelectorAll(autoReveal.join(",")).forEach((node, index) => { node.dataset.reveal = ""; node.style.setProperty("--reveal-order", index % 6); });
    const nodes = [...document.querySelectorAll("[data-reveal]")];
    if (reduce || !("IntersectionObserver" in window)) { nodes.forEach(n => n.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -5%" });
    nodes.forEach(n => observer.observe(n));
    let frame = 0;
    const updateScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { const max = Math.max(1, document.documentElement.scrollHeight - innerHeight); document.documentElement.style.setProperty("--page-scroll", Math.min(1, scrollY / max)); document.documentElement.style.setProperty("--hero-scroll", Math.min(1, scrollY / Math.max(1, innerHeight))); }); };
    updateScroll(); window.addEventListener("scroll", updateScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", updateScroll); cancelAnimationFrame(frame); };
  }, [path]);
  return <><LocalTranslator path={path}/><a className="skip-link" href="#main">Zum Inhalt</a><div id="top"/><Header path={path} openMenu={() => setMenu(true)}/><MobileMenu open={menu} path={path} onClose={() => setMenu(false)}/><RouteView path={path}/><Footer openLegal={setLegal}/><LegalDialog viewKey={legal} onClose={() => setLegal(null)}/></>;
}
