# Vibe Design — Learn UI Design with Figma

## Context

Building a static educational website that teaches UI design with Figma through interactive step-by-step walkthroughs. Bold & colorful visual style. 5+ pages, 5 full lessons.

**Starting point**: Blank Astro project. No existing components or Figma file dependency — everything built fresh. User will clean up any existing files.

**Decisions**: Design all Figma pages first, then implement in Astro. 5 full lessons with real content.

---

## Phase 1: Figma Design (all pages designed before code)

Design 3 pages in Figma as fresh frames. These serve as the visual spec for implementation.

### Page 1: Landing / Home (1440px wide)
- **NavBar** — "Vibe Design" logo, nav links (Lessons, Showcase, About, Resources), light/dark toggle
- **Gradient hero** — bold headline "Learn to Design Beautiful UIs with Figma", subtitle, two CTA buttons. Vibrant gradient background (blue→cyan→orange or similar bold palette).
- **"What You'll Learn" section** — 3 feature cards with icons: Design Tokens, Components, Color Systems
- **Lesson preview grid** — 3 lesson cards showing title, difficulty badge, duration, thumbnail area
- **Social proof / stats strip** — "5 Lessons · Step-by-Step · Free & Open Source"
- **Footer** — 3-column: nav links, about blurb, "Built with Astro"

### Page 2: Lesson Detail (template, 1440px wide)
- **NavBar** (solid background variant)
- **Lesson header** — title, difficulty badge, estimated time, description paragraph
- **Step walkthrough area** (the hero feature):
  - Horizontal numbered step indicator (1, 2, 3, 4, 5) with active/complete states
  - Split panel: left = instruction text + code snippet, right = live preview area
  - Prev/Next navigation buttons + "Step X of Y" label
- **Sidebar TOC** — list of step titles with active highlighting
- **Prev/Next lesson nav** at bottom

### Page 3: Lessons Index (1440px wide)
- **NavBar**
- **Page header** — "Lessons" title + "Filter by:" difficulty chips (All, Beginner, Intermediate)
- **Lesson card grid** — 5 cards in 2-3 columns, each with: color-coded top bar, title, description, difficulty badge, duration
- **Footer**

### Figma components to create (on _Component Masters page):
1. **NavBar** — two variants: Transparent (hero overlap) / Solid
2. **Footer** — single variant
3. **LessonCard** — card with colored header bar, title, description, difficulty badge, duration
4. **StepIndicator** — horizontal numbered dots: Active / Complete / Upcoming states
5. **StepPanel** — split layout: instruction (left) + preview (right)
6. **GradientHero** — headline, subtitle, dual CTAs, gradient background
7. **DifficultyBadge** — Beginner (green) / Intermediate (blue) / Advanced (purple)
8. **CodeBlock** — styled code container with filename tab
9. **Callout** — Tip / Warning / Info variants
10. **Button** — Primary / Secondary / Ghost variants, SM / MD / LG sizes

---

## Phase 2: Astro Implementation

### Setup (from blank)
- `@astrojs/mdx` — lesson content with embedded components
- `@astrojs/sitemap` — SEO
- No Tailwind — vanilla CSS with CSS custom properties
- No UI framework islands — vanilla JS for interactivity

### Theme system (built fresh)

Create `src/styles/global.css` with:
- **4 color palettes** via `[data-theme]` attribute: Ocean (default), Forest, Sunset, Berry
- **Light/Dark scheme** via `[data-scheme]` attribute
- **CSS custom properties**: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-surface`, `--color-text`, etc.
- **Extended marketing tokens**: `--gradient-hero`, `--text-display` (3.5rem), container widths
- **Gradients derived from theme variables** — hero gradient auto-changes when palette switches (the "wow" moment)
- Typography: Inter (body), JetBrains Mono (code) via Google Fonts

### Site map (7 pages)

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.astro` | Landing page with gradient hero |
| `/lessons` | `src/pages/lessons/index.astro` | Lesson browse/filter page |
| `/lessons/[slug]` | `src/pages/lessons/[slug].astro` | Individual lesson with walkthrough |
| `/showcase` | `src/pages/showcase.astro` | Live component playground with theme switcher |
| `/about` | `src/pages/about.astro` | About the project & methodology |
| `/resources` | `src/pages/resources.astro` | Curated tools & references |
| `/404` | `src/pages/404.astro` | Fun branded error page |

### Components to build

| Component | Purpose |
|-----------|---------|
| `NavBar.astro` | Sticky nav. `transparent` prop for hero pages. Mobile hamburger. |
| `Footer.astro` | 3-column footer |
| `ThemeToggle.astro` | Compact light/dark switcher for NavBar |
| `GradientHero.astro` | Hero section with gradient from `--color-primary` → `--color-accent` |
| `Button.astro` | Primary / Secondary / Ghost × SM / MD / LG |
| `Badge.astro` | Difficulty badges (beginner/intermediate/advanced) + status variants |
| `LessonCard.astro` | Clickable card linking to `/lessons/[slug]` |
| `StepWalkthrough.astro` | **Hero component.** SSR all steps, vanilla JS toggles visibility. |
| `StepIndicator.astro` | Numbered dot bar with active/complete/upcoming states |
| `CodeBlock.astro` | `<pre><code>` with JetBrains Mono, copy button, filename tab |
| `Callout.astro` | Tip/Warning/Info boxes |
| `Card.astro` | General-purpose content card |
| `ThemeSwitcher.astro` | Full theme panel for Showcase page (palette + scheme + font) |

### Content collection (5 full lessons)

```
src/content/
  config.ts
  lessons/
    01-design-tokens.json
    02-auto-layout.json
    03-component-variants.json
    04-color-systems.json
    05-typography-scale.json
```

| # | Title | Difficulty | Duration | Walkthrough builds... |
|---|-------|-----------|----------|----------------------|
| 1 | Design Tokens & Variables | Beginner | 15 min | A color swatch grid — hardcoded hex → CSS variables → theme switching |
| 2 | Auto Layout Fundamentals | Beginner | 20 min | A card component — fixed box → padded container → responsive layout |
| 3 | Component Variants | Intermediate | 25 min | A button system — single button → sizes → styles → states |
| 4 | Building Color Systems | Intermediate | 20 min | Light/dark toggle — light only → semantic tokens → palette switching |
| 5 | Typography at Scale | Intermediate | 15 min | Type hierarchy — one size → modular scale → font pairing |

### StepWalkthrough — technical design

- All steps **SSR'd into DOM** at build time — works without JS, good for SEO
- Vanilla JS controller toggles `.step--active` CSS classes
- CSS transitions on `opacity` + `transform` for smooth step animation
- **Keyboard navigation** — ArrowLeft / ArrowRight
- Each step shows: instruction text + optional code snippet (left) + visual preview (right)
- Step previews render **inline HTML/CSS** showing the progressive build (not depending on external components)

### Layouts

| Layout | Purpose |
|--------|---------|
| `Layout.astro` | Root shell: `<html>`, fonts, global CSS, NavBar, Footer, SEO meta |
| `LessonLayout.astro` | Wraps Layout, adds lesson header, TOC sidebar, prev/next nav |

---

## Implementation order

### A. Foundation
1. Install `@astrojs/mdx` + `@astrojs/sitemap`, configure `astro.config.mjs`
2. Create `src/styles/global.css` (full theme system: 4 palettes, light/dark, gradients, typography)
3. Build `Layout.astro` (root shell with fonts, global CSS, SEO meta)
4. Build `NavBar.astro` + `ThemeToggle.astro` + `Footer.astro`

### B. Landing page
5. Build `Button.astro` + `Badge.astro` (needed by other components)
6. Build `GradientHero.astro`
7. Build `LessonCard.astro` + `Card.astro`
8. Build `index.astro` landing page

### C. Lesson infrastructure
9. Create `src/content/config.ts` with lessons collection schema
10. Build `CodeBlock.astro` + `Callout.astro`
11. Build `StepIndicator.astro` + `StepWalkthrough.astro`
12. Build `LessonLayout.astro`
13. Build `src/pages/lessons/[slug].astro`

### D. Content
14. Write all 5 lesson JSON files with full educational content and step data
15. Build `src/pages/lessons/index.astro` with filtering

### E. Remaining pages
16. Build `showcase.astro` with `ThemeSwitcher.astro`
17. Build `about.astro`, `resources.astro`, `404.astro`

### F. Polish
18. Astro View Transitions for cinematic page navigation
19. Responsive breakpoints (mobile nav, stacked walkthrough)
20. Final visual QA + Lighthouse audit

---

## Verification

1. `npm run dev` — all 7 routes render without errors
2. `npm run build` — static build succeeds with all pages generated
3. Theme switching — hero gradient + all elements respond to palette and scheme changes
4. Step walkthrough — click through all steps, keyboard nav works, transitions smooth
5. Lesson routing — all 5 lessons load at `/lessons/[slug]`
6. Mobile — 375px viewport, layout adapts correctly
7. Lighthouse — target 95+ on all 4 categories

---

## Demo workflow

1. **Design** all 3 pages in Figma (using TalkToFigma MCP) — fresh, no dependencies
2. **Implement** in Astro from scratch
3. **Show** theme switching live — gradient hero morphs, components adapt
4. **Walk through** a lesson — step-by-step interactive content
5. **Side-by-side** Figma design vs live site at the end
