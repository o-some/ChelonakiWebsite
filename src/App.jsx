import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  EnvelopeSimple,
  List,
  LockKey,
  X,
} from "@phosphor-icons/react";

const capabilities = [
  {
    number: "01",
    title: "AI & Apps",
    summary: "KI verstehen, priorisieren und als nützliches System in den Alltag bringen.",
    details:
      "Wir trennen Möglichkeiten von Moden. Aus einer sinnvollen Einsatzidee entsteht ein belastbarer Prototyp, der Menschen Arbeit abnimmt und Entscheidungen verbessert.",
    tags: ["AI Strategy", "Custom Apps", "Automation"],
  },
  {
    number: "02",
    title: "Brand & Web",
    summary: "Identität, Website und digitale Präsenz aus einer klaren Idee entwickeln.",
    details:
      "Positionierung, Sprache, Gestaltung und Website werden als eine zusammenhängende Architektur entwickelt. So entsteht eine Marke, die nicht auf Lautstärke angewiesen ist.",
    tags: ["Positioning", "Identity", "Webdesign"],
  },
  {
    number: "03",
    title: "Content & Growth",
    summary: "Eine echte Markenstimme in wiederholbare Inhalte und Kampagnen übersetzen.",
    details:
      "KI beschleunigt Recherche, Produktion und Distribution. Die Haltung bleibt menschlich. Daraus wachsen Content- und Marketing-Systeme, die konsistent und trotzdem lebendig sind.",
    tags: ["Social Content", "Campaigns", "Editorial"],
  },
  {
    number: "04",
    title: "Nutrition & Ventures",
    summary: "Ernährungswissenschaft in glaubwürdige Produkte und neue Ventures überführen.",
    details:
      "Hier treffen ernährungswissenschaftliche Ausbildung, Markenaufbau und Produktdenken aufeinander. Die Basis für Food-, Health- und eigene Produktkonzepte mit Substanz.",
    tags: ["Nutrition Science", "Food Concepts", "Ventures"],
  },
];

const method = [
  {
    title: "Verstehen",
    body: "Geschäft, Zielgruppe, Marke und vorhandene Systeme werden präzise eingeordnet.",
  },
  {
    title: "Entscheiden",
    body: "Wir wählen die wenigen Hebel, die echten Nutzen oder belastbaren Lerngewinn versprechen.",
  },
  {
    title: "Bauen",
    body: "Strategie, Design, Technologie und Inhalt entstehen in kurzen sichtbaren Zyklen.",
  },
  {
    title: "Verankern",
    body: "Dokumentation und Übergabe sorgen dafür, dass die Lösung im Unternehmen weiterlebt.",
  },
];

const legalViews = {
  impressum: {
    label: "Rechtliche Angaben",
    title: "Impressum",
    content: (
      <>
        <p className="legal-lead">Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)</p>

        <h3>Anbieter</h3>
        <p>
          <mark>[VOLLSTÄNDIGER NAME ODER FIRMA]</mark>
          <br />
          <mark>[RECHTSFORM, FALLS ZUTREFFEND]</mark>
          <br />
          <mark>[LADUNGSFÄHIGE STRASSE UND HAUSNUMMER]</mark>
          <br />
          <mark>[PLZ UND ORT]</mark>
          <br />
          Deutschland
        </p>

        <h3>Vertretung und Kontakt</h3>
        <p>
          Vertreten durch: <mark>[VERTRETUNGSBERECHTIGTE PERSON]</mark>
          <br />
          Telefon: <mark>[TELEFONNUMMER]</mark>
          <br />
          E-Mail: <mark>[E-MAIL-ADRESSE]</mark>
        </p>

        <h3>Register und Steuern</h3>
        <p>
          Registergericht: <mark>[FALLS ZUTREFFEND]</mark>
          <br />
          Registernummer: <mark>[FALLS ZUTREFFEND]</mark>
          <br />
          Umsatzsteuer-ID oder Wirtschafts-ID: <mark>[FALLS VORHANDEN]</mark>
        </p>

        <h3>Redaktionelle Verantwortung</h3>
        <p>
          Nur falls journalistisch-redaktionelle Inhalte angeboten werden:
          <br />
          <mark>[NAME UND ANSCHRIFT GEMÄSS § 18 ABS. 2 MSTV]</mark>
        </p>

        <h3>Verbraucherstreitbeilegung</h3>
        <p>
          <mark>
            [VOR VERÖFFENTLICHUNG TEILNAHME, NICHTTEILNAHME ODER AUSNAHME NACH § 36
            VSBG FESTLEGEN]
          </mark>
        </p>
        <p className="legal-note">
          Die frühere EU-Plattform zur Online-Streitbeilegung wurde 2025
          eingestellt und wird daher nicht verlinkt.
        </p>
      </>
    ),
  },
  datenschutz: {
    label: "Stand: 3. August 2026",
    title: "Datenschutzerklärung",
    content: (
      <>
        <p className="legal-lead">
          Diese Vorschau ist datensparsam konzipiert. Die Angaben zu Hosting,
          Kontaktweg und realen Dienstleistern müssen vor Veröffentlichung ergänzt
          und rechtlich geprüft werden.
        </p>

        <h3>1. Verantwortlicher</h3>
        <p>
          <mark>[NAME ODER FIRMA, ANSCHRIFT UND KONTAKTDATEN]</mark>
        </p>

        <h3>2. Hosting und Server-Protokolle</h3>
        <p>
          Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch
          erforderliche Verbindungsdaten. Dazu können IP-Adresse, Zeitpunkt,
          angeforderte Ressource, Referrer, Browser und Betriebssystem gehören. Die
          Verarbeitung dient der sicheren und stabilen Bereitstellung auf Grundlage
          von Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Hosting-Anbieter, Serverregion und Speicherdauer:
          <br />
          <mark>[ANBIETER, REGION, AV-VERTRAG UND LÖSCHFRIST]</mark>
        </p>

        <h3>3. Kontaktaufnahme</h3>
        <p>
          Bei einer Kontaktaufnahme verarbeiten wir die übermittelten Angaben zur
          Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO bei
          vorvertraglicher Kommunikation. In anderen Fällen kann Art. 6 Abs. 1 lit. f
          DSGVO einschlägig sein. Die Angaben werden gelöscht, sobald die Anfrage
          erledigt ist und keine gesetzlichen Pflichten entgegenstehen.
        </p>
        <p>
          Empfänger, Übermittlungsweg und konkrete Löschfrist:
          <br />
          <mark>[FORMULAR- ODER E-MAIL-DIENST, EMPFÄNGER UND FRIST]</mark>
        </p>

        <h3>4. Cookies und externe Dienste</h3>
        <p>
          Die vorliegende Fassung setzt keine Analyse-, Marketing- oder
          Personalisierungs-Cookies ein. Sie lädt keine externen Schriftarten,
          Karten, Videos oder Social-Media-Widgets. Nicht notwendige Dienste dürfen
          später erst nach wirksamer Einwilligung aktiviert werden.
        </p>

        <h3>5. Ihre Rechte</h3>
        <p>
          Betroffene Personen haben nach Maßgabe der DSGVO Rechte auf Auskunft,
          Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch.
          Außerdem besteht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde.
        </p>
        <p>
          Zuständige Aufsichtsbehörde:
          <br />
          <mark>[NACH UNTERNEHMENSSITZ EINTRAGEN]</mark>
        </p>

        <h3>6. Datensicherheit und Aktualisierung</h3>
        <p>
          Die Live-Website wird verschlüsselt per HTTPS ausgeliefert und nach dem
          Prinzip der Datenminimierung betrieben. Diese Erklärung ist anzupassen,
          sobald Hosting, Formulare, Analyse, Newsletter oder eingebettete Dienste
          hinzukommen.
        </p>
      </>
    ),
  },
  cookies: {
    label: "Datensparsame Voreinstellung",
    title: "Datenschutz-Einstellungen",
    content: (
      <>
        <p className="legal-lead">
          In dieser Website-Vorschau sind keine optionalen Cookies oder
          Tracking-Dienste aktiviert.
        </p>
        <div className="settings-row">
          <div>
            <strong>Technisch notwendiger Betrieb</strong>
            <p>Erforderlich für die sichere Auslieferung der Website.</p>
          </div>
          <span>
            <Check size={16} weight="bold" aria-hidden="true" />
            Aktiv
          </span>
        </div>
        <div className="settings-row is-muted">
          <div>
            <strong>Analyse und Marketing</strong>
            <p>Nicht eingebunden und nicht aktiv.</p>
          </div>
          <span>Inaktiv</span>
        </div>
        <p className="legal-note">
          Ein Einwilligungsdialog wird erst ergänzt, wenn technisch nicht notwendige
          Speicherungen oder Zugriffe tatsächlich eingesetzt werden.
        </p>
      </>
    ),
  },
  barrierefreiheit: {
    label: "Zugängliche Gestaltung",
    title: "Barrierefreiheit",
    content: (
      <>
        <p className="legal-lead">
          Chelonaki soll unabhängig von Gerät, Eingabemethode oder individuellen
          Einschränkungen gut nutzbar sein.
        </p>
        <h3>Umgesetzte Grundsätze</h3>
        <ul>
          <li>Semantische Struktur und nachvollziehbare Inhaltsreihenfolge</li>
          <li>Tastaturbedienbare Navigation, Dialoge und Formulare</li>
          <li>Sichtbare Fokuszustände und ausreichend große Bedienflächen</li>
          <li>Kontrastreiche Farbgebung und Textalternativen für Bilder</li>
          <li>Reduzierte Bewegung bei entsprechender Systemeinstellung</li>
          <li>Responsive Darstellung ohne horizontale Pflichtbewegung</li>
        </ul>
        <p className="legal-note">
          Die Anwendbarkeit des BFSG hängt vom späteren konkreten Verbraucherangebot
          und der Unternehmensgröße ab. Vor einem B2C-Onlineshop ist eine gesonderte
          Prüfung erforderlich.
        </p>
      </>
    ),
  },
};

function Brand({ inverse = false, compact = false }) {
  return (
    <a
      className={`brand ${inverse ? "is-inverse" : ""}`}
      href="#top"
      aria-label="Chelonaki Startseite"
    >
      <span className="brand-seal" aria-hidden="true">
        <img src="/assets/chelonaki-turtle-transparent.png" alt="" width="760" height="760" />
      </span>
      <span className="brand-name">
        <strong>CHELONAKI</strong>
        {!compact && <small>AI STUDIO</small>}
      </span>
    </a>
  );
}

function MobileMenu({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    let closeTimer;
    if (open) {
      dialog.classList.remove("is-closing");
      if (!dialog.open) dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.classList.add("is-closing");
      closeTimer = window.setTimeout(() => {
        dialog.close();
        dialog.classList.remove("is-closing");
      }, 180);
    }
    return () => window.clearTimeout(closeTimer);
  }, [open]);

  return (
    <dialog
      className="mobile-menu"
      ref={ref}
      aria-label="Hauptnavigation"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="mobile-menu-shell">
        <div className="mobile-menu-head">
          <Brand inverse compact />
          <button type="button" onClick={onClose} aria-label="Menü schließen">
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile Navigation">
          <a href="#expertise" onClick={onClose}>
            Expertise
          </a>
          <a href="#work" onClick={onClose}>
            Arbeitsfelder
          </a>
          <a href="#studio" onClick={onClose}>
            Studio
          </a>
          <a href="#process" onClick={onClose}>
            Prozess
          </a>
        </nav>
        <a className="button button-gold" href="#contact" onClick={onClose}>
          Projekt besprechen
          <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </dialog>
  );
}

function LegalDialog({ viewKey, onClose }) {
  const ref = useRef(null);
  const view = viewKey ? legalViews[viewKey] : null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (view && !dialog.open) dialog.showModal();
    if (!view && dialog.open) dialog.close();
  }, [view]);

  return (
    <dialog
      className="legal-dialog"
      ref={ref}
      aria-labelledby="legal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {view && (
        <div className="legal-shell">
          <header>
            <div>
              <span>{view.label}</span>
              <h2 id="legal-title">{view.title}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label={`${view.title} schließen`}>
              <X size={24} aria-hidden="true" />
            </button>
          </header>
          <div className="legal-content">{view.content}</div>
        </div>
      )}
    </dialog>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [legalView, setLegalView] = useState(null);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [formState, setFormState] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  const privacyId = useId();

  useEffect(() => {
    const updateLegalFromHash = () => {
      const key = window.location.hash.replace("#", "");
      setLegalView(legalViews[key] ? key : null);
    };
    updateLegalFromHash();
    window.addEventListener("hashchange", updateLegalFromHash);
    return () => window.removeEventListener("hashchange", updateLegalFromHash);
  }, []);

  useEffect(() => {
    const sentinel = document.querySelector("[data-header-sentinel]");
    if (!sentinel) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderSolid(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -7% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const openLegal = (key) => {
    window.location.hash = key;
    setLegalView(key);
  };

  const closeLegal = () => {
    setLegalView(null);
    if (legalViews[window.location.hash.replace("#", "")]) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#footer`);
    }
  };

  const validateForm = (form) => {
    const data = new FormData(form);
    const nextErrors = {};
    if (!String(data.get("name") || "").trim()) nextErrors.name = "Bitte geben Sie Ihren Namen ein.";
    const email = String(data.get("email") || "").trim();
    if (!email) nextErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Bitte prüfen Sie die E-Mail-Adresse.";
    if (!data.get("focus")) nextErrors.focus = "Bitte wählen Sie einen Schwerpunkt.";
    if (String(data.get("message") || "").trim().length < 20)
      nextErrors.message = "Bitte beschreiben Sie das Vorhaben in mindestens 20 Zeichen.";
    if (!data.get("privacy")) nextErrors.privacy = "Bitte bestätigen Sie die Datenschutzhinweise.";
    setFormErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validateForm(form)) {
      window.requestAnimationFrame(() => {
        form.querySelector("[aria-invalid='true']")?.focus();
      });
      return;
    }
    setFormState("submitting");
    window.setTimeout(() => {
      setFormState(navigator.onLine === false ? "error" : "success");
    }, 650);
  };

  const fieldError = (name) =>
    formErrors[name] ? (
      <span className="field-error" id={`${name}-error`} role="alert">
        {formErrors[name]}
      </span>
    ) : null;

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt
      </a>
      <div className="header-sentinel" data-header-sentinel aria-hidden="true" />

      <header className={`site-header ${headerSolid ? "is-solid" : ""}`}>
        <Brand />
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          <a href="#expertise">Expertise</a>
          <a href="#work">Arbeitsfelder</a>
          <a href="#studio">Studio</a>
          <a href="#process">Prozess</a>
        </nav>
        <a className="button button-navy header-cta" href="#contact">
          Projekt besprechen
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <button
          className="menu-trigger"
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <List size={24} aria-hidden="true" />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-scene" aria-hidden="true">
            <img
              className="hero-scene-image"
              src="/assets/hero-architecture.png"
              alt=""
              width="1536"
              height="1024"
              fetchPriority="high"
            />
            <figure className="hero-medallion">
              <img
                src="/assets/chelonaki-wall-medallion.webp"
                alt=""
                width="1200"
                height="1500"
              />
            </figure>
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">
              Wir
              <br />
              übersetzen KI
              <br />
              in echten Wert.
            </h1>
            <div className="hero-rule" aria-hidden="true">
              <i />
            </div>
            <p>
              Chelonaki ist aus einer persönlichen Überzeugung entstanden:
              Technologie wird wertvoll, wenn sie Menschen klarer entscheiden,
              mutiger gestalten und gesünder leben lässt.
            </p>
            <div className="hero-actions">
              <a className="button button-navy" href="#contact">
                Projekt besprechen
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="text-link" href="#expertise">
                Expertise ansehen
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-folios" aria-label="Chelonakis Arbeitsweise">
            <div className="hero-folio hero-folio-one">
              <span>Klarheit</span>
              <strong>Klar sehen, was zählt.</strong>
            </div>
            <div className="hero-folio hero-folio-two">
              <span>System</span>
              <strong>Ideen tragfähig ordnen.</strong>
            </div>
            <div className="hero-folio hero-folio-three">
              <span>Wirkung</span>
              <strong>Wert schaffen, der bleibt.</strong>
            </div>
          </div>

          <div className="hero-capability-band">
            <div className="hero-band-intro">
              <p>
                Eine Firma.
                <br />
                <em>Vier Wirkungsfelder.</em>
              </p>
              <span>Strategie, Gestaltung und Systeme aus einer Hand.</span>
            </div>
            <nav className="hero-band-grid" aria-label="Direkt zu den Arbeitsfeldern">
              {capabilities.map((item) => (
                <a href={`#capability-${item.number}`} key={item.title}>
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                  <small>{item.summary}</small>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="architecture" id="expertise" aria-labelledby="architecture-title">
          <div className="architecture-copy">
            <span className="section-mark" aria-hidden="true" />
            <h2 id="architecture-title">Intelligenz braucht Architektur.</h2>
            <p>
              Ich beginne nicht mit Tools, sondern mit dem Menschen, der am Ende
              besser arbeiten, entscheiden oder leben soll. Erst dann bekommt
              Technologie ihren Platz.
            </p>
            <a className="text-link text-link-light" href="#capabilities">
              Unser Ansatz
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <figure className="architecture-figure" data-reveal>
            <img
              src="/assets/chapter-architecture.webp"
              alt="Rauer heller Stein mit eingravierten architektonischen Proportionslinien"
              width="1672"
              height="941"
            />
          </figure>
        </section>

        <section className="capabilities-section" id="capabilities" aria-labelledby="capabilities-title">
          <div className="capabilities-heading" data-reveal>
            <h2 id="capabilities-title">Vier Wege. Eine Haltung.</h2>
            <p>
              Jeder Weg beginnt mit einer anderen Frage. Alle folgen derselben
              Überzeugung: Klarheit vor Tempo, Charakter vor Lautstärke und Nutzen
              vor Neuheit.
            </p>
            <blockquote>
              „Nicht mehr KI. Mehr Urteilskraft in dem, was wir mit ihr bauen.“
            </blockquote>
          </div>
          <div className="capability-index">
            {capabilities.map((item) => (
              <article
                id={`capability-${item.number}`}
                className="capability-entry"
                key={item.title}
                data-reveal="chapter"
              >
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.details}</p>
                <ul aria-label={`${item.title} Leistungen`}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <header className="work-heading" data-reveal="copy">
            <h2 id="work-title">Was daraus entstehen kann.</h2>
            <p>
              Keine künstlichen Fallstudien. Drei konkrete Arbeitsräume, in denen
              Chelonaki Systeme, Marken und Ventures aufbauen kann.
            </p>
          </header>

          <article className="work-feature" data-reveal="image">
            <figure>
              <img
                src="/assets/project-digital-brand.png"
                alt="Tablet mit einem präzisen dunkelblauen Markensystem auf einem hellen Materialtisch"
                width="1408"
                height="1024"
                loading="lazy"
              />
            </figure>
            <div>
              <h3>Digitale Systeme, die im Alltag bestehen.</h3>
              <p>
                Wir priorisieren den Nutzen, bauen den passenden Prototyp und
                übersetzen die Erkenntnisse in ein belastbares Produkt- oder
                Automationssystem.
              </p>
              <ul>
                <li>KI-Strategie und Use-Case-Auswahl</li>
                <li>Prototyping und individuelle Anwendungen</li>
                <li>Automationen und interne Werkzeuge</li>
              </ul>
            </div>
          </article>

          <div className="work-pair">
            <article className="work-portrait" data-reveal="image">
              <figure>
                <img
                  src="/assets/hero-architecture.png"
                  alt="Helle architektonische Szene mit Säule, Bögen und abstrakten Materialflächen"
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
              </figure>
              <div>
                <h3>Markenauftritte, die nicht austauschbar klingen.</h3>
                <p>
                  Positionierung, Webdesign und KI-gestützte Content-Systeme werden
                  gemeinsam entwickelt.
                </p>
              </div>
            </article>

            <article className="work-nutrition" data-reveal="image">
              <div>
                <h3>Neue Produktwelten mit wissenschaftlicher Substanz.</h3>
                <p>
                  Ernährungskompetenz, Markenaufbau und digitale Entwicklung treffen
                  aufeinander, bevor ein späteres Food-Angebot entsteht.
                </p>
              </div>
              <figure>
                <img
                  src="/assets/project-nutrition-venture.png"
                  alt="Mediterrane Lebensmittel, Notizbuch und eine minimalistische Produktverpackung"
                  width="1408"
                  height="1024"
                  loading="lazy"
                />
              </figure>
            </article>
          </div>
        </section>

        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="process-intro" data-reveal="copy">
            <h2 id="process-title">Erst Klarheit. Dann Geschwindigkeit.</h2>
            <p>
              Der Prozess bleibt bewusst kompakt. Jede Entscheidung muss sich am
              tatsächlichen Problem und an der späteren Nutzung messen lassen.
            </p>
          </div>
          <ol className="method-rail">
            {method.map((item) => (
              <li key={item.title} data-reveal="line">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="studio-section" id="studio" aria-labelledby="studio-title">
          <figure className="studio-medallion" data-reveal="image">
            <img
              src="/assets/chelonaki-wall-medallion.webp"
              alt="Antikes bronzenes Chelonaki-Schildkrötenrelief, eingelassen in eine helle Kalksteinwand"
              width="1200"
              height="1500"
              loading="lazy"
            />
          </figure>
          <div className="studio-copy" data-reveal="copy">
            <h2 id="studio-title">
              Ich baue Chelonaki
              <br />
              für Ideen, die bleiben.
            </h2>
            <p>
              Ich komme aus der Ernährungswissenschaft. Dort habe ich gelernt, dass
              gute Entscheidungen Kontext, Evidenz und Verantwortung brauchen. Genau
              so behandle ich KI: nicht als Show, sondern als Werkzeug, das eine
              menschliche Idee präziser und wirksamer macht.
            </p>
            <p>
              Deshalb bleiben Strategie, kreative Richtung und technische
              Entscheidungen nah beieinander. Für Spezialdisziplinen entsteht das
              passende Team um die Aufgabe, nicht um eine Agenturstruktur.
            </p>
            <div className="studio-principles">
              <span>Menschlich geführt</span>
              <span>Datensparsam gedacht</span>
              <span>Langfristig gestaltet</span>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-copy" data-reveal="copy">
            <span className="section-mark" aria-hidden="true" />
            <h2 id="contact-title">Erzählen Sie mir, was besser werden soll.</h2>
            <p>
              Keine fertige Lösung nötig. Beschreiben Sie den Ausgangspunkt, die
              Ambition oder auch nur das Problem. Sie erhalten eine ehrliche
              Einschätzung, ob und wie Chelonaki helfen kann.
            </p>
            <div className="contact-promise">
              <LockKey size={22} aria-hidden="true" />
              <span>
                <strong>Direkter Austausch</strong>
                Vertraulich, ohne Sales-Show und ohne automatisierte Bewertung.
              </span>
            </div>
          </div>

          <div className="contact-panel" data-reveal="image">
            {formState === "success" ? (
              <div className="form-result" role="status">
                <Check size={36} weight="bold" aria-hidden="true" />
                <h3>Die Anfrage ist vorbereitet.</h3>
                <p>
                  Diese Vorschau versendet noch keine Daten. Vor dem Livegang wird der
                  sichere Versand an die bestätigte Kontaktadresse angebunden.
                </p>
                <button
                  className="text-link text-link-light"
                  type="button"
                  onClick={() => setFormState("idle")}
                >
                  Neue Anfrage
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={handleSubmit}>
                {formState === "error" && (
                  <div className="form-global-error" role="alert">
                    Die Anfrage konnte nicht vorbereitet werden. Bitte prüfen Sie
                    Ihre Verbindung und versuchen Sie es erneut.
                  </div>
                )}

                <div className="field-pair">
                  <label>
                    <span>Name *</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      aria-invalid={Boolean(formErrors.name)}
                      aria-describedby={formErrors.name ? "name-error" : undefined}
                      onBlur={(event) => {
                        if (event.currentTarget.value.trim())
                          setFormErrors((current) => ({ ...current, name: undefined }));
                      }}
                    />
                    {fieldError("name")}
                  </label>
                  <label>
                    <span>E-Mail *</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                    />
                    {fieldError("email")}
                  </label>
                </div>

                <div className="field-pair">
                  <label>
                    <span>Unternehmen</span>
                    <input type="text" name="company" autoComplete="organization" />
                  </label>
                  <label>
                    <span>Schwerpunkt *</span>
                    <select
                      name="focus"
                      defaultValue=""
                      aria-invalid={Boolean(formErrors.focus)}
                      aria-describedby={formErrors.focus ? "focus-error" : undefined}
                    >
                      <option value="" disabled>
                        Bitte wählen
                      </option>
                      <option>AI Strategy und Consulting</option>
                      <option>Apps und digitale Produkte</option>
                      <option>Brand und Website</option>
                      <option>Content und Marketing</option>
                      <option>Nutrition und Ventures</option>
                      <option>Noch offen</option>
                    </select>
                    {fieldError("focus")}
                  </label>
                </div>

                <label>
                  <span>Worum geht es? *</span>
                  <textarea
                    name="message"
                    rows="5"
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                  />
                  {fieldError("message")}
                </label>

                <label className="privacy-field" htmlFor={privacyId}>
                  <input
                    id={privacyId}
                    type="checkbox"
                    name="privacy"
                    aria-invalid={Boolean(formErrors.privacy)}
                    aria-describedby={formErrors.privacy ? "privacy-error" : undefined}
                  />
                  <span>
                    Ich habe die{" "}
                    <a href="#datenschutz" onClick={(event) => {
                      event.preventDefault();
                      openLegal("datenschutz");
                    }}>
                      Datenschutzhinweise
                    </a>{" "}
                    zur Verarbeitung meiner Anfrage zur Kenntnis genommen. *
                  </span>
                </label>
                {fieldError("privacy")}

                <button
                  className="button button-gold submit-button"
                  type="submit"
                  disabled={formState === "submitting"}
                >
                  {formState === "submitting" ? "Wird vorbereitet" : "Anfrage vorbereiten"}
                  <ArrowUpRight size={19} aria-hidden="true" />
                </button>
                <p className="form-note">
                  Vorschau: Es werden noch keine Daten übertragen. Pflichtfelder sind
                  mit * gekennzeichnet.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand inverse />
            <p>
              AI, digitale Produkte und Marken mit Substanz.
              <br />
              The future needs roots.
            </p>
          </div>
          <div className="footer-navigation">
            <div>
              <span>Entdecken</span>
              <a href="#expertise">Expertise</a>
              <a href="#work">Arbeitsfelder</a>
              <a href="#process">Prozess</a>
              <a href="#studio">Studio</a>
            </div>
            <div>
              <span>Rechtliches</span>
              {Object.entries(legalViews).map(([key, view]) => (
                <a
                  href={`#${key}`}
                  key={key}
                  onClick={(event) => {
                    event.preventDefault();
                    openLegal(key);
                  }}
                >
                  {view.title}
                </a>
              ))}
            </div>
          </div>
          <a className="footer-contact" href="#contact">
            <EnvelopeSimple size={24} aria-hidden="true" />
            <span>
              <small>Ein Projekt im Kopf?</small>
              <strong>Projekt besprechen</strong>
            </span>
            <ArrowUpRight size={22} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Chelonaki</span>
          <span>Independent AI Studio, Germany</span>
          <a href="#top">
            Nach oben
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </footer>

      <LegalDialog viewKey={legalView} onClose={closeLegal} />
    </>
  );
}
