# Chelonaki Redesign Audit

## Audit scope

Current responsive marketing website at `http://127.0.0.1:4173/`.

Primary visitor goal: understand what Chelonaki does, trust its judgment, and start a qualified project conversation.

## Captured steps

1. **Hero and capability entry — healthy, but too familiar**
   - Evidence: `qa/redesign-audit/01-current-hero.png`
   - Strengths: coherent ivory/navy/gold palette, strong logo integration, good responsive hierarchy, clear CTA.
   - Risk: the split hero, large serif headline, small uppercase eyebrow and four equal service columns now read as a recognizable “luxury AI landing-page” template. The architecture is attractive, but the page does not yet express a proprietary point of view.

2. **Work narrative — visually polished, strategically thin**
   - Evidence: `qa/redesign-audit/02-current-work.png`
   - Strengths: editorial scale, strong image quality, calm reading rhythm.
   - Risk: the section repeats the same large-serif/eyebrow construction and shows only one abstract project world. It communicates taste more strongly than evidence, method or concrete transformation.

3. **Mobile hero — usable and stable**
   - Evidence: `qa/redesign-audit/03-current-mobile.png`
   - Strengths: clear order, adequate tap target, readable headline, imagery remains legible.
   - Risk: the two CTAs stack into a conventional pattern and the visual identity becomes mostly typography plus one image. The mobile experience lacks a memorable interaction or device-specific composition.

4. **Contact conversion — clear but emotionally flat**
   - Evidence: `qa/redesign-audit/04-current-contact.png`
   - Strengths: visible labels, privacy consent, realistic success path, low-friction copy.
   - Risk: the form feels like a detached utility block after an expressive site. The beige fields and gold submit button do not create a strong final conversion moment, and there is too much passive space above the task.

## Accessibility risks visible from screenshots

- Several small uppercase labels and muted body lines appear close to the minimum useful contrast on ivory.
- Gold text on ivory should be reserved for large or non-essential text; key links need stronger contrast.
- Motion and keyboard behavior cannot be proven from screenshots alone and must remain part of browser QA.

## Highest-impact opportunities

1. Replace repeated section templates with a narrative system: thesis, operating model, evidence, sectors, founder advantage, contact.
2. Turn the Greek architecture into a compositional grid and motion device, not only a hero image.
3. Give the service portfolio one clear model instead of four equal feature columns.
4. Introduce real proof-shaped content without inventing clients or metrics: deliverables, decisions, example outputs and engagement formats.
5. Make the final contact sequence feel like the conclusion of the story, with a stronger navy-to-ivory transition and more decisive copy.

## Evidence limits

- This audit does not claim full WCAG compliance.
- No real client work, testimonials, metrics or company facts were available; the redesign must not invent them.
- Legal placeholder content remains a product constraint until the real company data is supplied.
