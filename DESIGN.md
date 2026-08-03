---
name: Chelonaki AI Studio
description: A sanctuary ledger for human-led AI, brands and ventures.
colors:
  midnight-ink: "#071d31"
  deep-navy: "#102a43"
  raised-navy: "#163650"
  mineral-ivory: "#f1eadf"
  bright-paper: "#fbf8f1"
  limestone: "#cfc3b0"
  antique-gold: "#87591a"
  soft-gold: "#d1b475"
  copy-on-dark: "#d4d8da"
  muted-copy: "#59636b"
  error: "#b44a3f"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(56px, 5.1vw, 82px)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.036em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(47px, 4.9vw, 76px)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(35px, 3.5vw, 54px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.026em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.72
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "44px"
  xl: "86px"
components:
  button-primary:
    backgroundColor: "{colors.midnight-ink}"
    textColor: "{colors.bright-paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "48px"
  button-accent:
    backgroundColor: "{colors.soft-gold}"
    textColor: "{colors.midnight-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
    height: "48px"
  input:
    backgroundColor: "{colors.raised-navy}"
    textColor: "{colors.bright-paper}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "13px 14px"
    height: "50px"
---

# Design System: Chelonaki AI Studio

## Overview

**Creative North Star: “The Sanctuary Ledger”**

Chelonaki presents technology through the visual language of architecture, material culture and disciplined editorial publishing. The system is quiet, precise and tactile: warm mineral paper opens the experience, monumental stone carries the focal imagery, and midnight navy gives later chapters weight.

The composition favors asymmetric grids, visible rules and controlled scale changes over generic cards or glowing AI imagery. Motion is slow and architectural. The hero assembles as one material scene, and the capability chapter uses a single sticky focus sequence instead of repeating the same entrance on every component.

**Key Characteristics:**

- Monumental serif typography with restrained sans-serif utility text
- Mineral ivory, midnight navy and deliberately scarce antique gold
- Square-edged controls, hairline rules and large spatial intervals
- Real raster material imagery and a bronze wall medallion instead of simulated stone or AI gradients
- Physical folio leaves, ruled chapters and sculpted thresholds instead of repeated card grids

## Colors

The palette moves between mineral paper and deep navy, with gold used as a precise marker rather than a wash.

### Primary

- **Midnight Ink** (`#071d31`): primary dark surface, navigation actions and core text.
- **Mineral Ivory** (`#f1eadf`): opening surface and warm editorial background.

### Secondary

- **Antique Gold** (`#87591a`): accessible small text and rules on light surfaces.
- **Soft Gold** (`#d1b475`): accents, focus indicators and action surfaces on navy.

### Neutral

- **Bright Paper** (`#fbf8f1`): high-contrast text and legal reading surfaces.
- **Limestone** (`#cfc3b0`): material-neutral reference.
- **Copy on Dark** (`#d4d8da`): secondary copy on navy.
- **Muted Copy** (`#59636b`): secondary copy on light surfaces.

**The Scarce Gold Rule.** Gold marks hierarchy, actions and measurement lines; it never becomes a decorative background field.

## Typography

**Display Font:** Cormorant Garamond with Georgia fallback  
**Body Font:** Manrope with Arial fallback

**Character:** The serif brings carved, old-world editorial character while Manrope keeps product and service information contemporary and legible.

### Hierarchy

- **Display** (500, `clamp(56px, 5.1vw, 82px)`, 0.94): hero statement only.
- **Headline** (500, `clamp(47px, 4.9vw, 76px)`, 0.98): major chapter headings.
- **Title** (500, `clamp(35px, 3.5vw, 54px)`, 1.02): work and capability titles.
- **Body** (400, 15px, 1.72): explanatory copy, kept to a readable editorial measure.
- **Label** (700, 10px, 0.16em tracking): navigation, actions and ledger metadata.

**The Two-Voice Rule.** Serif carries meaning and atmosphere; sans serif carries navigation, explanation and action.

## Layout

The desktop hero is one architectural stage: editorial statement left, arch and Ionic column right, three physical strategy leaves in depth and a compact four-field band at the base. A shallow limestone curve cuts into the navy band. Content uses a fluid gutter of `clamp(24px, 5.4vw, 86px)` and a 1440px content ceiling.

At 1050px wide chapter grids simplify. At 880px the navigation becomes a dialog menu. At 767px the hero becomes a deliberate sequence of statement, architecture, folios and service band without horizontal overflow.

## Elevation & Depth

The system is flat by default. Depth comes from photography, masked imagery, tonal surface changes and overlap. The bronze turtle medallion is photographed as a physical object inset into limestone rather than imitated with CSS. The only ambient shadow belongs to the fixed header after scrolling; dialog depth uses one broad dark shadow.

### Shadow Vocabulary

- **Header Float** (`0 18px 46px rgba(7, 29, 49, 0.08)`): separates the condensed fixed header from content.
- **Dialog Depth** (`0 34px 90px rgba(0, 0, 0, 0.34)`): reserved for protected legal reading surfaces.

**The Material-First Rule.** If depth matters, show it in a real image or a tonal layer before adding a shadow.

## Shapes

Controls, fields, ledgers and image frames use square corners. Hairline borders establish order. The turtle appears as a circular antique-bronze relief recessed into a square limestone image frame; the circle belongs to the physical brand object, not to the interface chrome.

## Components

### Buttons

- **Shape:** square (`0px`) with a 48px minimum height.
- **Primary:** midnight ink on bright paper context, 14px by 24px padding.
- **Accent:** soft gold with midnight text on dark contexts.
- **Hover / Focus:** subtle two-pixel lift, tonal color change and a visible soft-gold focus ring.

### Cards / Containers

The system does not use generic cards. Work areas are composed as image-and-copy chapters. Bordered panels are reserved for the contact form and legal dialog.

### Inputs / Fields

- **Style:** square, translucent navy fill and a restrained light border.
- **Focus:** soft-gold border with a three-pixel translucent focus ring.
- **Error:** warm red border plus a specific text instruction.

### Navigation

Desktop navigation uses small tracked labels and animated gold underlines. Below 1050px it becomes a full-height navy dialog with large serif links and a single gold action.

### Hero Folios

Three overlapping material leaves carry the verbs Klarheit, System and Wirkung. They belong only in the architectural hero and move as one staged entrance.

### Sticky Capability Chapter

On wide screens the studio thesis remains fixed while each capability chapter moves through focus on the right. Below 1050px the same content returns to normal document flow.

### Studio Medallion

The turtle mark is rendered as a tactile bronze-and-navy relief inset into warm limestone. A cropped medallion anchors the hero wall, while the full limestone portrait returns in the founder chapter.

## Do's and Don'ts

### Do:

- **Do** preserve the statement, arch, full column, folios and navy threshold as the first-screen memory.
- **Do** use real architectural or material imagery with intentional crops.
- **Do** keep the bronze turtle medallion as a high-value physical brand object.
- **Do** reserve gold for functional emphasis and measurement-like detail.
- **Do** let typography and spacing create hierarchy before introducing containers.
- **Do** keep legal and form states explicit, readable and keyboard-accessible.

### Don't:

- **Don't** introduce glowing AI gradients, neon circuitry or generic technology imagery.
- **Don't** turn capabilities into a repeated grid of rounded icon cards.
- **Don't** fake stone, embossing or grain with CSS effects.
- **Don't** invent testimonials, metrics, clients or nutrition claims.
- **Don't** soften the system with pills, glass panels or decorative blur.
