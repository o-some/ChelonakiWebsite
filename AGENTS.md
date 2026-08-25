# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`.

## Hosting boundary

- This site has been exported from ChatGPT Sites to `https://github.com/o-some/ChelonakiWebsite` and is now GitHub-only.
- Treat the former ChatGPT Sites project as frozen and fully out of scope. Do not inspect, edit, save, deploy, publish, synchronize, or otherwise operate on it.
- Make every future code change in this GitHub repository and publish only by pushing the intended commit to its GitHub remote. Production is `https://www.chelonaki.eu` through the repository's existing deployment path.
- The legacy Sites compatibility files may remain in the repository, but do not use or modify them for a Sites handoff.

## Durable Chelonaki design decisions

- The selected visual target is the combined light “Ivory Villa” direction with the monumental classical column and editorial discipline of the dark “Hellenic Editorial” direction.
- Preserve the authentic Chelonaki turtle logo. The visual system uses warm ivory/limewash, deep Aegean navy, restrained antique gold, serif editorial typography, and subtle Greek architectural references.
- Tell the family-name story accurately: Georgios loved playing with turtles as a small child and received his affectionate nickname from that; when villagers later saw him with his grandsons, they said, "Da ist er ja – der Georgios mit seinen kleinen Schildkrötchen."
- Structure Chelonaki around three concrete worlds: Chelonaki Digital (websites and Shopify, client book production and ghostwriting, social content systems, telephone assistants, Meta/Google ads, apps and software), Chelonaki Expertise (AI training and consulting, Academy and nutrition consulting), and Chelonaki Originals (own specialist books, nutrition apps and further digital products).
- Name the client-facing book service "Buchproduktion & Ghostwriting" and position it under Digital. Make the result explicit: concept, writing, research, design and publication-ready files.
- Remove "Spiele & Lernwelten" from Originals without a replacement category until the user decides on a new name or direction.
- Use the descriptive service names and canonical URLs from the revised company profile, including `/digital/websites-erstellen-lassen`, `/digital/social-media-content`, `/digital/ki-telefonassistenten`, `/digital/ki-werbung-meta-google`, `/expertise/ki-schulungen-consulting`, `/expertise/academy`, and `/ueber-uns`. Preserve the listed legacy URLs as client-side redirects.
- Present Shopify as the planned sales and booking system, but do not imply that checkout is active until final products, operator details, tax logic and legal approvals are configured.
- Keep Chelonaki Lab as a secondary cross-world demo hub, never as a fourth business world. Every demo must state whether it is a concept, prototype, product in development, Chelonaki Original or real customer work.
- Use "Passende Lösung finden" as the primary header action and route it to an interactive, non-binding package finder. The finder recommends based on the user's goal and must not default everyone to the largest package.
- Maintain `/qualitaet` as the complete ten-point Chelonaki quality framework, with human control of AI results, honest labeling and project-specific security rather than absolute guarantees.
- Show the app packages as App Starter (from €2,500), App MVP (from €4,900, recommended), App Advanced (from €7,900), App Pro (from €12,900) and Custom/Enterprise (from €20,000), with iOS and Android included via a shared codebase for standard mobile projects.
- Under Originals apps, keep dedicated product pages for EvoFit and Chelonaki Reply. Reply provides three editable suggestions for LinkedIn, Instagram and email; it never sends autonomously in the MVP.
- Present Eleftherios as an nutrition scientist, trained cook, product developer, programmer and founder. His technical background includes several semesters of computer science and hands-on programming; communicate technologies as possible tools, not blanket delivery promises.
- Digital is inclusive of established companies, future founders and personal projects. Use the concise audience label "Für Unternehmen & eigene Projekte" at the category level and explain future founders in the supporting copy. Keep displayed net package prices explicitly B2B, while welcoming private projects through a separately calculated, correctly displayed consumer total-price offer.
- Keep the homepage editorial and emotional: it explains only the three worlds, the family story, the quality promise and the next contact step. Detailed services and pricing belong on their respective subpages.
- Keep B2B and private nutrition offers visually, verbally and structurally separate. A visible audience label must precede every price, including on mobile.
- Use the exact conversion target for each area: Digital project inquiry, consulting first call, B2B nutrition offer, private nutrition appointment, book-project inquiry, Academy access, Originals purchase/waitlist, and app demo or inquiry.
- Avoid AI clichés and “AI slop”: no neon brains, glowing orbs, fake code, particle fields, generic glass cards, invented client logos, fake awards, fake metrics, buzzword-heavy copy, scroll hijacking, or excessive motion.
- Copy must name real deliverables, limits, approvals and credentials. Avoid vague agency phrases such as “echter Wert”, “Wirkungsfelder”, “Ideen, die bleiben”, “mit Substanz” and interchangeable attitude-first slogans when a concrete statement is possible.
- Motion should be architectural and restrained: clipped text reveals, a vertical image mask, a compacting navigation, a traced gold rule, and very shallow parallax. Support `prefers-reduced-motion`.
- Keep the hero's three large architectural material planes, but do not place the former three labeled folio cards ("Klarheit", "System", "Wirkung") or any replacement text cards over them. Let that scene remain quiet, spacious and primarily visual.
- The complete site must include a legally planned German footer and accessible legal-information views. Missing real company details must remain visibly marked placeholders, never invented facts.
- Treat every commercial service page as a complete, calm sales journey: problem, desired outcome, concrete deliverables, quality controls, process, prerequisites, pricing comparison, objection handling and several context-appropriate next actions. Add useful decision information instead of generic marketing filler.
- Keep every book package visible in the book-design dropdown. Only designs in "Kinderbuch & Familie" may select and request "Kinderbuch · ab 500 €"; show that option disabled for every other book category.
- Use purposeful premium editorial imagery throughout longer sales journeys to provide visual rhythm, while preserving the ivory, Aegean navy, antique gold and Greek architectural identity.
- Keep the production dependency tree free of known audit findings where compatible fixes exist, and preserve restrictive response security headers in the Sites worker.
