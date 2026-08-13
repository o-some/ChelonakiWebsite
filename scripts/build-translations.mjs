import fs from "node:fs/promises";
import { parse } from "@babel/parser";

const sourceFiles = ["src/App.jsx", "src/siteData.js"];
const values = new Set();
const skip = /^(?:[./#?]|https?:|mailto:|tel:)/;

function collect(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length < 2 || skip.test(text) || /^[\d\W]+$/u.test(text)) return;
  values.add(text);
}

function walk(node) {
  if (!node || typeof node !== "object") return;
  if (node.type === "StringLiteral") collect(node.value);
  if (node.type === "JSXText") collect(node.value);
  if (node.type === "TemplateElement") collect(node.value?.cooked);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object" && value.type) walk(value);
  }
}

for (const file of sourceFiles) {
  const source = await fs.readFile(file, "utf8");
  walk(parse(source, { sourceType: "module", plugins: ["jsx"] }));
}

const originals = [...values].sort((a, b) => b.length - a.length);
const languages = ["en", "el", "fr", "es", "tr", "pl", "nl", "it", "pt", "ru", "ar"];
const dictionaries = {};
const sentinel = "__CHELONAKI_SPLIT_7F3A__";
let existingDictionaries = {};
try {
  existingDictionaries = (await import(`../src/translations.generated.js?cache=${Date.now()}`)).default || {};
} catch {}

async function translateBatch(items, language) {
  if (language === "ar") {
    return Promise.all(items.map(async (item) => {
      const params = new URLSearchParams({ client: "gtx", sl: "de", tl: language, dt: "t", q: item });
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
      if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
      const data = await response.json();
      return data[0].map((part) => part[0]).join("").trim();
    }));
  }
  const params = new URLSearchParams({ client: "gtx", sl: "de", tl: language, dt: "t", q: items.join(`\n${sentinel}\n`) });
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!response.ok) throw new Error(`Translation failed: ${response.status}`);
  const data = await response.json();
  const translated = data[0].map((part) => part[0]).join("").split(sentinel).map((part) => part.trim());
  if (translated.length !== items.length) throw new Error(`Unexpected translation count for ${language}: ${translated.length}/${items.length}`);
  return translated;
}

for (const language of languages) {
  const dictionary = { ...(existingDictionaries[language] || {}) };
  const missing = originals.filter((original) => !Object.hasOwn(dictionary, original));
  for (let index = 0; index < missing.length; index += 18) {
    const batch = missing.slice(index, index + 18);
    const translated = await translateBatch(batch, language);
    batch.forEach((original, offset) => { dictionary[original] = translated[offset] || original; });
  }
  dictionaries[language] = dictionary;
  console.log(`${language}: ${missing.length ? `${missing.length} neue Texte übersetzt` : "vorhandene Übersetzungen übernommen"}`);
}

const terminology = {
  en: {
    "Widerruf": "Withdrawal",
    "Web, Apps & Publikationen": "Web, Apps & Publications",
    "Medien & KI": "Media & AI",
    "KI-Beratung & Weiterbildung": "AI Consulting & Training",
    "KI-Content & Social Media": "AI Content & Social Media",
    "KI-Ads für Meta & Google": "AI Ads for Meta & Google",
    "KI-Telefonassistenten": "AI Phone Assistants",
    "KI-Antworten für Social Media": "AI Replies for Social Media",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "AI-POWERED INNOVATION STUDIO",
    "Demowelten": "Demo Worlds",
    "Über uns": "About Us",
    "Von Eleftherios entwickelte Apps": "Apps developed by Eleftherios",
    "Von Eleftherios geschriebene Bücher": "Books written by Eleftherios",
    "Unsere eigenen Apps": "Our own apps",
    "Unsere eigenen Bücher": "Our own books"
  },
  el: {
    "Widerruf": "Υπαναχώρηση",
    "Web, Apps & Publikationen": "Ιστός, Εφαρμογές & Εκδόσεις",
    "Medien & KI": "Μέσα & ΤΝ",
    "KI-Beratung & Weiterbildung": "Συμβουλευτική & Εκπαίδευση ΤΝ",
    "KI-Content & Social Media": "Περιεχόμενο ΤΝ & Κοινωνικά Δίκτυα",
    "KI-Ads für Meta & Google": "Διαφημίσεις ΤΝ για Meta & Google",
    "KI-Telefonassistenten": "Τηλεφωνικοί Βοηθοί ΤΝ",
    "KI-Antworten für Social Media": "Απαντήσεις ΤΝ για Κοινωνικά Δίκτυα",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "ΣΤΟΥΝΤΙΟ ΚΑΙΝΟΤΟΜΙΑΣ ΜΕ ΤΝ",
    "Demowelten": "Κόσμοι Επίδειξης",
    "Über uns": "Σχετικά με εμάς",
    "Von Eleftherios entwickelte Apps": "Εφαρμογές που ανέπτυξε ο Ελευθέριος",
    "Von Eleftherios geschriebene Bücher": "Βιβλία που έγραψε ο Ελευθέριος",
    "Unsere eigenen Apps": "Οι δικές μας εφαρμογές",
    "Unsere eigenen Bücher": "Τα δικά μας βιβλία"
  },
  fr: {
    "Widerruf": "Droit de rétractation",
    "Web, Apps & Publikationen": "Web, Apps & Publications",
    "Medien & KI": "Médias & IA",
    "KI-Beratung & Weiterbildung": "Conseil & Formation IA",
    "KI-Content & Social Media": "Contenu IA & Réseaux sociaux",
    "KI-Ads für Meta & Google": "Publicités IA pour Meta & Google",
    "KI-Telefonassistenten": "Assistants téléphoniques IA",
    "KI-Antworten für Social Media": "Réponses IA pour les réseaux sociaux",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "STUDIO D’INNOVATION PROPULSÉ PAR L’IA",
    "Demowelten": "Univers Démo",
    "Über uns": "À propos",
    "Von Eleftherios entwickelte Apps": "Applications développées par Eleftherios",
    "Von Eleftherios geschriebene Bücher": "Livres écrits par Eleftherios",
    "Unsere eigenen Apps": "Nos propres applications",
    "Unsere eigenen Bücher": "Nos propres livres"
  },
  es: {
    "Widerruf": "Derecho de desistimiento",
    "Web, Apps & Publikationen": "Web, Apps y Publicaciones",
    "Medien & KI": "Medios & IA",
    "KI-Beratung & Weiterbildung": "Consultoría & Formación en IA",
    "KI-Content & Social Media": "Contenido con IA & Redes sociales",
    "KI-Ads für Meta & Google": "Anuncios con IA para Meta y Google",
    "KI-Telefonassistenten": "Asistentes telefónicos con IA",
    "KI-Antworten für Social Media": "Respuestas con IA para redes sociales",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "ESTUDIO DE INNOVACIÓN IMPULSADO POR IA",
    "Demowelten": "Mundos Demo",
    "Über uns": "Sobre nosotros",
    "Von Eleftherios entwickelte Apps": "Aplicaciones desarrolladas por Eleftherios",
    "Von Eleftherios geschriebene Bücher": "Libros escritos por Eleftherios",
    "Unsere eigenen Apps": "Nuestras propias aplicaciones",
    "Unsere eigenen Bücher": "Nuestros propios libros"
  },
  tr: {
    "Widerruf": "Cayma hakkı",
    "Web, Apps & Publikationen": "Web, Uygulamalar & Yayınlar",
    "Medien & KI": "Medya & YZ",
    "KI-Beratung & Weiterbildung": "YZ Danışmanlığı & Eğitim",
    "KI-Content & Social Media": "YZ İçerik & Sosyal Medya",
    "KI-Ads für Meta & Google": "Meta & Google için YZ Reklamları",
    "KI-Telefonassistenten": "YZ Telefon Asistanları",
    "KI-Antworten für Social Media": "Sosyal Medya için YZ Yanıtları",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "YZ DESTEKLİ İNOVASYON STÜDYOSU",
    "Demowelten": "Demo Dünyaları",
    "Über uns": "Hakkımızda",
    "Von Eleftherios entwickelte Apps": "Eleftherios tarafından geliştirilen uygulamalar",
    "Von Eleftherios geschriebene Bücher": "Eleftherios'un yazdığı kitaplar",
    "Unsere eigenen Apps": "Kendi uygulamalarımız",
    "Unsere eigenen Bücher": "Kendi kitaplarımız"
  },
  pl: {
    "Widerruf": "Prawo odstąpienia",
    "Web, Apps & Publikationen": "Web, Aplikacje i Publikacje",
    "Medien & KI": "Media i AI",
    "KI-Beratung & Weiterbildung": "Doradztwo i Szkolenia AI",
    "KI-Content & Social Media": "Treści AI & Social Media",
    "KI-Ads für Meta & Google": "Reklamy AI dla Meta i Google",
    "KI-Telefonassistenten": "Telefoniczni Asystenci AI",
    "KI-Antworten für Social Media": "Odpowiedzi AI w Social Media",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "STUDIO INNOWACJI WSPIERANE PRZEZ AI",
    "Demowelten": "Strefy Demo",
    "Über uns": "O nas",
    "Von Eleftherios entwickelte Apps": "Aplikacje stworzone przez Eleftheriosa",
    "Von Eleftherios geschriebene Bücher": "Książki napisane przez Eleftheriosa",
    "Unsere eigenen Apps": "Nasze własne aplikacje",
    "Unsere eigenen Bücher": "Nasze własne książki"
  },
  nl: {
    "Widerruf": "Herroepingsrecht",
    "Web, Apps & Publikationen": "Web, Apps & Publicaties",
    "Medien & KI": "Media & AI",
    "KI-Beratung & Weiterbildung": "AI-advies & Training",
    "KI-Content & Social Media": "AI-content & Social Media",
    "KI-Ads für Meta & Google": "AI-advertenties voor Meta & Google",
    "KI-Telefonassistenten": "AI-telefoonassistenten",
    "KI-Antworten für Social Media": "AI-antwoorden voor Social Media",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "AI-GEDREVEN INNOVATIESTUDIO",
    "Demowelten": "Demo’s",
    "Über uns": "Over ons",
    "Von Eleftherios entwickelte Apps": "Apps ontwikkeld door Eleftherios",
    "Von Eleftherios geschriebene Bücher": "Boeken geschreven door Eleftherios",
    "Unsere eigenen Apps": "Onze eigen apps",
    "Unsere eigenen Bücher": "Onze eigen boeken"
  },
  it: {
    "Widerruf": "Diritto di recesso",
    "Web, Apps & Publikationen": "Web, App & Pubblicazioni",
    "Medien & KI": "Media & IA",
    "KI-Beratung & Weiterbildung": "Consulenza & Formazione IA",
    "KI-Content & Social Media": "Contenuti IA & Social Media",
    "KI-Ads für Meta & Google": "Annunci IA per Meta & Google",
    "KI-Telefonassistenten": "Assistenti Telefonici IA",
    "KI-Antworten für Social Media": "Risposte IA per i Social Media",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "STUDIO DI INNOVAZIONE BASATO SULL’IA",
    "Demowelten": "Mondi Demo",
    "Über uns": "Chi siamo",
    "Von Eleftherios entwickelte Apps": "App sviluppate da Eleftherios",
    "Von Eleftherios geschriebene Bücher": "Libri scritti da Eleftherios",
    "Unsere eigenen Apps": "Le nostre app",
    "Unsere eigenen Bücher": "I nostri libri"
  },
  pt: {
    "Widerruf": "Direito de livre resolução",
    "Web, Apps & Publikationen": "Web, Apps e Publicações",
    "Medien & KI": "Media & IA",
    "KI-Beratung & Weiterbildung": "Consultoria & Formação em IA",
    "KI-Content & Social Media": "Conteúdo com IA & Redes Sociais",
    "KI-Ads für Meta & Google": "Anúncios com IA para Meta e Google",
    "KI-Telefonassistenten": "Assistentes Telefónicos com IA",
    "KI-Antworten für Social Media": "Respostas com IA para Redes Sociais",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "ESTÚDIO DE INOVAÇÃO COM IA",
    "Demowelten": "Demonstrações",
    "Über uns": "Sobre nós",
    "Von Eleftherios entwickelte Apps": "Aplicações desenvolvidas por Eleftherios",
    "Von Eleftherios geschriebene Bücher": "Livros escritos por Eleftherios",
    "Unsere eigenen Apps": "Nossos próprios aplicativos",
    "Unsere eigenen Bücher": "Nossos próprios livros"
  },
  ru: {
    "Widerruf": "Право на отказ от договора",
    "Web, Apps & Publikationen": "Сайты, приложения и издания",
    "Medien & KI": "Медиа и ИИ",
    "KI-Beratung & Weiterbildung": "Консалтинг и обучение по ИИ",
    "KI-Content & Social Media": "ИИ-контент и социальные сети",
    "KI-Ads für Meta & Google": "ИИ-реклама для Meta и Google",
    "KI-Telefonassistenten": "Телефонные ИИ-ассистенты",
    "KI-Antworten für Social Media": "ИИ-ответы для социальных сетей",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "ИННОВАЦИОННАЯ СТУДИЯ НА БАЗЕ ИИ",
    "Demowelten": "Демо-миры",
    "Über uns": "О нас",
    "Von Eleftherios entwickelte Apps": "Приложения, разработанные Элефтериосом",
    "Von Eleftherios geschriebene Bücher": "Книги, написанные Элефтериосом",
    "Unsere eigenen Apps": "Наши собственные приложения",
    "Unsere eigenen Bücher": "Наши собственные книги"
  },
  ar: {
    "Widerruf": "حق العدول عن العقد",
    "Web, Apps & Publikationen": "الويب والتطبيقات والنشر",
    "Medien & KI": "الإعلام والذكاء الاصطناعي",
    "KI-Beratung & Weiterbildung": "استشارات وتدريب الذكاء الاصطناعي",
    "KI-Content & Social Media": "محتوى ذكي ووسائل التواصل",
    "KI-Ads für Meta & Google": "إعلانات ذكية لـ Meta وGoogle",
    "KI-Telefonassistenten": "مساعدون هاتفيون بالذكاء الاصطناعي",
    "KI-Antworten für Social Media": "ردود ذكية لوسائل التواصل",
    "KI-GESTÜTZTES INNOVATIONSSTUDIO": "استوديو ابتكار مدعوم بالذكاء الاصطناعي",
    "Demowelten": "نماذج تجريبية",
    "Über uns": "من نحن",
    "Von Eleftherios entwickelte Apps": "تطبيقات طوّرها إليفثيريوس",
    "Von Eleftherios geschriebene Bücher": "كتب ألّفها إليفثيريوس",
    "Unsere eigenen Apps": "تطبيقاتنا الخاصة",
    "Unsere eigenen Bücher": "كتبنا الخاصة"
  }
};

for (const language of languages) {
  const abbreviation = { el: "ΤΝ", fr: "IA", es: "IA", tr: "YZ", it: "IA", pt: "IA", ru: "ИИ", ar: "الذكاء الاصطناعي" }[language];
  if (abbreviation) {
    for (const [source, translated] of Object.entries(dictionaries[language])) {
      dictionaries[language][source] = translated.replace(/\bAI\b/g, abbreviation);
    }
  }
  Object.assign(dictionaries[language], terminology[language]);
}

await fs.writeFile("src/translations.generated.js", `// Generated by scripts/build-translations.mjs\nexport default ${JSON.stringify(dictionaries, null, 2)};\n`);
console.log(`Generated ${originals.length} translations in ${languages.length} languages.`);
