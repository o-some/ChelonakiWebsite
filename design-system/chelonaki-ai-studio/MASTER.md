# Chelonaki AI Studio - Design System

> Brand commitments and the approved visual mock override any automated catalogue recommendation.
> The initial catalogue match (AI purple, neo-brutalism, nutrition-counter pattern) was rejected because it conflicts with Chelonaki's confirmed identity.

**Mode:** Persuade  
**Redesign:** visual overhaul with product truth, logo, legal content, navigation and conversion path preserved  
**Design dials:** Variance 8/10, Motion 6/10, Density 3/10

## Design Read

Chelonaki is a selective, founder-led AI studio for German-speaking businesses and brands. The visual language joins contemporary consultancy clarity with Greek architectural restraint. It must feel cultured, exact and human-led, never like a generic AI startup or a costume-version of antiquity.

## Brand Commitments

- Preserve the Chelonaki name, turtle/column logo and Greek cultural reference.
- Preserve dark navy, mineral ivory, restrained gold and soft white.
- Greek architecture is a structural idea: proportion, rhythm, carved depth and shadow. Avoid temple clip-art, laurel clichés and vaporwave statues.
- Old-money means discretion, material quality and editorial confidence. Avoid gold overload, glossy black luxury and fashion-template affectation.
- The site must explain a broad but coherent offer: AI apps, consulting, content, marketing, web and brand systems, plus nutrition-led ventures.

## Color System

One neutral family and one accent are used across the whole page.

| Role | Token | Value | Use |
|---|---|---:|---|
| Deep navy | `--ink` | `#071A2E` | Primary text, dark surfaces, navigation |
| Midnight navy | `--ink-soft` | `#102A43` | Secondary dark surface |
| Mineral ivory | `--paper` | `#F2EEE5` | Main light surface |
| Soft white | `--paper-bright` | `#FBFAF7` | Form fields and high-contrast quiet areas |
| Antique gold | `--gold` | `#9B6B24` | Accent, rules, focus and small emphasis |
| Gold light | `--gold-soft` | `#D6BD84` | Decorative highlight on dark surfaces |
| Stone | `--stone` | `#CEC7B8` | Borders and muted material detail |
| Muted ink | `--ink-muted` | `#536171` | Secondary copy on light |
| Muted paper | `--paper-muted` | `#C9D0D8` | Secondary copy on dark |
| Error | `--error` | `#A23B32` | Form error state only |

Gold is the only accent. It is never used for long body copy. All text/background pairs must meet WCAG AA.

## Typography

- **Display:** a self-hosted, high-character serif that supports the Greek heritage brief. The current Cormorant Garamond is acceptable only if the approved mock is best matched by it; otherwise source a less familiar editorial face before build.
- **Body and UI:** Manrope, already self-hosted in the project.
- Display type carries large statements and selected short quotations only.
- Body copy remains 16px minimum, 1.55-1.7 line-height, 65-75 characters wide.
- No monospace as decoration. No mixed-family word emphasis. No em dash or en dash separators.

## Geometry and Material

- Default geometry is sharp or very lightly softened. No generic rounded-card field.
- Buttons may be compact pills only if used consistently as controls; content containers stay sharp.
- Use large image/asset planes, fine rules and carved negative space instead of repeated cards.
- Shadows are mineral-tinted, offset and soft. No glows, hard block shadows or gold halos.
- Paper and stone textures must be real raster assets, subtle and fixed. Never CSS grain on scrolling containers.

## Layout System

- Desktop container: max 1440px with fluid side gutters.
- Breakpoints: 375, 768, 1024 and 1440px.
- Desktop is asymmetric and editorial. Below 768px every composition becomes a deliberate single column.
- Hero fits within `100dvh`, navigation stays at or below 80px and all primary actions remain visible.
- Use at least four section layout families across the page.
- Do not repeat the current generic split hero, equal four-card grid or eyebrow-plus-heading rhythm.
- No section numbers, scroll cues, decorative weather/location strips or floating micro-copy.

## Motion System

Motion must communicate hierarchy and architectural depth.

1. **Hero assembly:** logo, statement and column enter as one coordinated reveal. 500-750ms, exponential ease-out.
2. **Column depth:** subtle 5-10% parallax on the column or its shadow only. Never move body copy.
3. **Chapter transition:** one curtain-like or mask-based transition from the hero into the next chapter. This is the authored signature moment.
4. **Section reveals:** restrained local reveals for major groups only, 350-500ms with small offsets.
5. **Feedback:** buttons and links respond within 150-250ms and remain usable while animating.

Only transform, opacity, clip-path and bounded filter effects may animate. Respect `prefers-reduced-motion`; the static fallback must preserve the full composition and content.

## Interaction and Accessibility

- One primary CTA intent across navigation, hero and close.
- All links and buttons have visible hover, active and focus-visible states.
- Touch targets are at least 44x44px with at least 8px separation.
- Use semantic landmarks, a skip link, sequential headings and descriptive alternative text.
- The contact form uses visible labels, validation on blur/submit, inline recovery text, disabled/loading state and an `aria-live` result message.
- Mobile navigation traps focus while open, closes with Escape and restores focus to the trigger.

## Content Rules

- Copy is concrete, in natural German and free of invented customers, metrics, testimonials or certifications.
- Avoid AI clichés such as "revolutionieren", "nahtlos", "next-gen", "Grenzen neu denken" and vague luxury language.
- Explain the breadth through one unifying mechanism: Chelonaki selects, builds and applies useful AI under founder-led judgment.
- Nutrition is differentiated by the founder's scientific background. It is not framed as medical treatment.
- Legal text and company facts are never silently changed.

## Required States

- Contact form: idle, focused, invalid, submitting, success and recoverable error.
- Mobile menu: closed, open, keyboard and reduced-motion states.
- Images/assets: reserved aspect ratios, responsive sources and meaningful fallbacks.
- No speculative loading skeletons are needed for static marketing sections.

## Pre-Delivery

- Compare desktop and mobile renders against the approved mock at matching viewports.
- Test 375, 768, 1024 and 1440px widths with no horizontal overflow.
- Verify contrast, keyboard navigation, reduced motion and form recovery.
- Run the project build, tests, mechanical design detector and Lighthouse.
- Re-read every visible string and confirm no invented claims or legal regressions.
