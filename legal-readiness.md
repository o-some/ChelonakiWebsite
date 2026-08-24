# Chelonaki Website - Legal Readiness for Germany

Status: planning and pre-launch review, 3 August 2026

This is an implementation checklist, not individual legal advice. Final company details, hosting, form delivery and the actual sales model must be reviewed before publication.

## Current scope

The current website is a marketing and contact site for a founder-led AI studio. It does not yet sell food, digital products or subscriptions online. The legal layer should therefore cover the actual launch state without pretending that a shop already exists.

## Must be completed before publication

### 1. Provider identification

The legal notice must contain the exact provider name, legal form where applicable, a serviceable postal address, email address and a means of rapid direct communication. Register, register number, VAT ID, economic identification number, supervisory authority and professional information are included only when actually applicable.

The current placeholders must never reach production.

Source: [Section 5 DDG](https://www.gesetze-im-internet.de/ddg/__5.html)

### 2. Stable legal destinations

Impressum and privacy information should have stable, directly reachable URLs or hash destinations in addition to any dialog treatment. They must remain available from every page state. A modal-only implementation is visually convenient but weaker for direct access, sharing and search indexing.

The footer will therefore contain permanent links for:

- Impressum
- Datenschutz
- Datenschutz-Einstellungen only when optional services exist
- Barrierefreiheit or accessibility information where useful or required

### 3. Editorial responsibility

The additional responsible-person statement under Section 18(2) MStV is only included if Chelonaki publishes journalistically edited content. It should not appear as an unexplained placeholder on a simple studio landing page.

Source: [Section 18 MStV](https://www.gesetze-bayern.de/Content/Document/MStV-18)

### 4. Consumer dispute resolution

Before launch, Chelonaki must decide whether it is willing or obliged to participate in a consumer conciliation process. Section 36(3) VSBG exempts businesses with ten or fewer employees on 31 December of the previous year from the general statement in Section 36(1)(1). A statement should only be shown once the actual headcount, B2B/B2C model and participation decision are known.

The former EU ODR link must not be added. The underlying ODR Regulation was repealed from 20 July 2025.

Sources: [Section 36 VSBG](https://www.gesetze-im-internet.de/vsbg/__36.html), [Regulation (EU) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj?locale=de)

### 5. Privacy information

The privacy page must describe the deployed system, not the local preview. At minimum it needs:

- controller identity and contact details
- data-protection officer details if one is required
- each processing purpose and legal basis
- legitimate interests where Article 6(1)(f) is used
- recipients or recipient categories
- third-country transfers and safeguards where applicable
- concrete retention periods or criteria
- data-subject rights and the competent supervisory authority
- whether requested information is required and the consequences of not providing it
- automated decision-making or a clear statement that none takes place, where relevant

For hosting, the actual provider, server location, log fields, retention and processor agreement must be recorded. For the contact form, the delivery provider, recipients, deletion rules and security measures must be named.

Source: [GDPR Article 13](https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32016R0679)

### 6. Contact form

For a project inquiry, processing will normally be explained using Article 6(1)(b) GDPR for pre-contractual steps, with Article 6(1)(f) only where appropriate. The existing mandatory checkbox should acknowledge the privacy information rather than request an unnecessary consent that conflicts with the stated legal basis.

Recommended wording:

> Ich habe die Datenschutzhinweise zur Verarbeitung meiner Anfrage zur Kenntnis genommen.

The live form still needs spam protection, secure transport, server-side validation, a recoverable error state and a documented recipient.

### 7. Cookies, local storage and external services

No consent banner is added merely for appearance. If the production build uses no optional cookies, comparable device access, analytics, embedded video, maps, chat, advertising or external font delivery, a banner may be unnecessary.

When any non-essential storage or access is introduced, it must remain blocked until valid consent. Rejection must be as straightforward as acceptance, withdrawal must be available later and the privacy page must name the service and processing.

Sources: [Section 25 TDDDG](https://www.gesetze-im-internet.de/ttdsg/__25.html), [German DPA guidance for digital services](https://www.datenschutzkonferenz-online.de/orientierungshilfen.html)

### 8. Accessibility

The marketing site will target WCAG 2.2 AA regardless of whether the BFSG applies. The legal application depends on the later consumer service and company size. The BFSG applies to specified consumer services including e-commerce from 28 June 2025, while micro-enterprise treatment and the exact offer require case-specific review.

Sources: [Section 1 BFSG](https://www.gesetze-im-internet.de/bfsg/__1.html), [Section 2 BFSG](https://www.gesetze-im-internet.de/bfsg/__2.html)

## Later food-commerce phase

Food sales are a separate launch gate, not a paragraph added to this studio page. Before enabling checkout, the project needs at least:

- legally complete product information before purchase under Article 14 LMIV
- ingredients, highlighted allergens, net quantity, operator identity, storage/use instructions and nutrition declaration where applicable
- total price, unit price and shipping information under the PAngV
- consumer information, contract flow, withdrawal rules or applicable exceptions, delivery and payment terms
- accessible checkout and durable order confirmation
- product-specific health and nutrition claim review

Sources: [Regulation (EU) No 1169/2011](https://eur-lex.europa.eu/legal-content/DE-EN/ALL/?uri=CELEX%3A32011R1169), [PAngV](https://www.gesetze-im-internet.de/pangv_2022/), [Section 312d BGB](https://www.gesetze-im-internet.de/bgb/__312d.html), [Article 246a Section 1 EGBGB](https://www.gesetze-im-internet.de/bgbeg/art_246a__1.html)

## Information needed from the founder

The final legal copy cannot be completed without:

- full legal name and trading name
- legal form
- serviceable business address
- email and telephone number
- authorised representative
- register and registration number, if any
- VAT ID and/or economic identification number, if any
- business location for the competent data-protection authority
- hosting provider and server region
- final contact-form delivery service and retention period
- whether optional analytics, embeds, newsletter or social pixels will be used
- B2B-only or B2C availability at launch
- employee count and dispute-resolution decision
- whether a recurring editorial publication is planned
