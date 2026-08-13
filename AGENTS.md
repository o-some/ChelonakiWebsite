# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable Chelonaki design decisions

- The selected visual target is the combined light “Ivory Villa” direction with the monumental classical column and editorial discipline of the dark “Hellenic Editorial” direction.
- Preserve the authentic Chelonaki turtle logo. The visual system uses warm ivory/limewash, deep Aegean navy, restrained antique gold, serif editorial typography, and subtle Greek architectural references.
- Structure Chelonaki around three concrete worlds: Chelonaki Digital (websites and Shopify, client book production and ghostwriting, social content systems, telephone assistants, Meta/Google ads, apps and software), Chelonaki Expertise (AI training and consulting, Academy and nutrition consulting), and Chelonaki Originals (own specialist books, nutrition apps and further digital products).
- Name the client-facing book service "Buchproduktion & Ghostwriting" and position it under Digital. Make the result explicit: concept, writing, research, design and publication-ready files.
- Remove "Spiele & Lernwelten" from Originals without a replacement category until the user decides on a new name or direction.
- Use the descriptive service names and canonical URLs from the revised company profile, including `/digital/websites-erstellen-lassen`, `/digital/social-media-content`, `/digital/ki-telefonassistenten`, `/digital/ki-werbung-meta-google`, `/expertise/ki-schulungen-consulting`, `/expertise/academy`, and `/ueber-uns`. Preserve the listed legacy URLs as client-side redirects.
- Present Shopify as the planned sales and booking system, but do not imply that checkout is active until final products, operator details, tax logic and legal approvals are configured.
- Digital is inclusive of established companies, future founders and personal projects. Use the concise audience label "Für Unternehmen & eigene Projekte" at the category level and explain future founders in the supporting copy. Keep displayed net package prices explicitly B2B, while welcoming private projects through a separately calculated, correctly displayed consumer total-price offer.
- Keep the homepage editorial and emotional: it explains only the three worlds, the family story, the quality promise and the next contact step. Detailed services and pricing belong on their respective subpages.
- Keep B2B and private nutrition offers visually, verbally and structurally separate. A visible audience label must precede every price, including on mobile.
- Use the exact conversion target for each area: Digital project inquiry, consulting first call, B2B nutrition offer, private nutrition appointment, book-project inquiry, Academy access, Originals purchase/waitlist, and app demo or inquiry.
- Avoid AI clichés and “AI slop”: no neon brains, glowing orbs, fake code, particle fields, generic glass cards, invented client logos, fake awards, fake metrics, buzzword-heavy copy, scroll hijacking, or excessive motion.
- Copy must name real deliverables, limits, approvals and credentials. Avoid vague agency phrases such as “echter Wert”, “Wirkungsfelder”, “Ideen, die bleiben”, “mit Substanz” and interchangeable attitude-first slogans when a concrete statement is possible.
- Motion should be architectural and restrained: clipped text reveals, a vertical image mask, a compacting navigation, a traced gold rule, and very shallow parallax. Support `prefers-reduced-motion`.
- Keep the hero's three large architectural material planes, but do not place the former three labeled folio cards ("Klarheit", "System", "Wirkung") or any replacement text cards over them. Let that scene remain quiet, spacious and primarily visual.
- The complete site must include a legally planned German footer and accessible legal-information views. Missing real company details must remain visibly marked placeholders, never invented facts.
